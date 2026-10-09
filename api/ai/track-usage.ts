import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSupabaseAdmin } from '../_utils/supabaseAdmin';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    userId,
    feature,
    provider = 'gemini',
    model = 'gemini-2.0-flash',
    endpoint,
    inputTokens = 0,
    outputTokens = 0,
    cacheHit = false,
    status = 'success',
    errorCategory,
    durationMs = 0,
  } = req.body || {};

  if (!feature) {
    return res.status(400).json({ error: 'Missing required feature parameter' });
  }

  try {
    const supabase = getSupabaseAdmin();

    const inTok = Math.max(0, parseInt(inputTokens, 10) || 0);
    const outTok = Math.max(0, parseInt(outputTokens, 10) || 0);
    const totTok = inTok + outTok;

    // Real pricing calculation
    let estimatedCost = 0.0;
    if (!cacheHit) {
      if (model.includes('pro')) {
        // Gemini 1.5 Pro: $1.25/1M input, $5.00/1M output
        estimatedCost = (inTok * 0.00000125) + (outTok * 0.00000500);
      } else {
        // Gemini 2.0 Flash / Default: $0.10/1M input, $0.40/1M output
        estimatedCost = (inTok * 0.00000010) + (outTok * 0.00000040);
      }
    }

    const { error } = await supabase.from('api_usage_logs').insert({
      user_id: userId || null,
      feature: feature.substring(0, 50),
      provider,
      model,
      endpoint: endpoint ? endpoint.substring(0, 100) : null,
      input_tokens: inTok,
      output_tokens: outTok,
      total_tokens: totTok,
      estimated_cost: Number(estimatedCost.toFixed(6)),
      cache_hit: Boolean(cacheHit),
      status: status === 'error' ? 'error' : status === 'rate_limited' ? 'rate_limited' : 'success',
      error_category: errorCategory || null,
      duration_ms: Math.max(0, parseInt(durationMs, 10) || 0),
    });

    if (error) throw error;

    // If userId provided, also increment daily usage in user_usage_daily
    if (userId && !userId.startsWith('guest')) {
      const today = new Date().toISOString().split('T')[0];
      await supabase.rpc('increment_user_ai_usage', {
        p_user_id: userId,
        p_date: today,
      }).catch(() => {
        // Ignore if RPC does not exist yet
      });
    }

    return res.status(200).json({ success: true, estimatedCost });
  } catch (error: any) {
    console.error('track-usage error:', error);
    return res.status(500).json({ error: error?.message || 'Failed to record usage' });
  }
}
