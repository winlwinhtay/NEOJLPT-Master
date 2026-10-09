import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAdmin } from '../_utils/auth';
import { getSupabaseAdmin } from '../_utils/supabaseAdmin';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const admin = await requireAdmin(req, res);
  if (!admin) return;

  try {
    const supabase = getSupabaseAdmin();
    const timeframe = (req.query.timeframe as string) || '30d'; // 'today' | '7d' | '30d' | 'all'
    const feature = (req.query.feature as string) || '';
    const page = Math.max(1, parseInt((req.query.page as string) || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt((req.query.limit as string) || '25', 10)));

    const now = new Date();
    let startDate: string | null = null;
    if (timeframe === 'today') {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    } else if (timeframe === '7d') {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    } else if (timeframe === '30d') {
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
    }

    // 1. Fetch Paginated Logs
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let logsQuery = supabase
      .from('api_usage_logs')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);

    if (startDate) {
      logsQuery = logsQuery.gte('created_at', startDate);
    }
    if (feature && feature !== 'ALL') {
      logsQuery = logsQuery.eq('feature', feature);
    }

    const { data: logs, count, error: logsError } = await logsQuery;
    if (logsError) throw logsError;

    // 2. Fetch Aggregated Breakdown by Feature
    let aggQuery = supabase
      .from('api_usage_logs')
      .select('feature, model, total_tokens, estimated_cost, cache_hit, status');

    if (startDate) {
      aggQuery = aggQuery.gte('created_at', startDate);
    }

    const { data: allRecords } = await aggQuery;
    const records = allRecords || [];

    const featureStats: Record<
      string,
      { calls: number; tokens: number; cost: number; cacheHits: number; errors: number }
    > = {};

    let totalCalls = records.length;
    let totalTokens = 0;
    let totalCost = 0.0;
    let totalCacheHits = 0;
    let totalErrors = 0;

    for (const r of records) {
      const feat = r.feature || 'general';
      if (!featureStats[feat]) {
        featureStats[feat] = { calls: 0, tokens: 0, cost: 0.0, cacheHits: 0, errors: 0 };
      }
      featureStats[feat].calls += 1;
      featureStats[feat].tokens += Number(r.total_tokens) || 0;
      featureStats[feat].cost += Number(r.estimated_cost) || 0.0;
      if (r.cache_hit) featureStats[feat].cacheHits += 1;
      if (r.status === 'error') featureStats[feat].errors += 1;

      totalTokens += Number(r.total_tokens) || 0;
      totalCost += Number(r.estimated_cost) || 0.0;
      if (r.cache_hit) totalCacheHits += 1;
      if (r.status === 'error') totalErrors += 1;
    }

    const cacheHitRate = totalCalls > 0 ? Number(((totalCacheHits / totalCalls) * 100).toFixed(1)) : 0.0;

    return res.status(200).json({
      summary: {
        totalCalls,
        totalTokens,
        totalCost: Number(totalCost.toFixed(4)),
        totalCacheHits,
        cacheHitRate,
        totalErrors,
      },
      featureBreakdown: featureStats,
      logs: logs || [],
      totalLogs: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error: any) {
    console.error('admin api usage error:', error);
    return res.status(500).json({ error: error?.message || 'Failed to fetch API usage' });
  }
}
