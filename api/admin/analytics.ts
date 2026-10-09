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

    const [profilesRes, usageRes, srsRes] = await Promise.all([
      supabase.from('profiles').select('target_level, current_level, streak_days, xp, level, created_at'),
      supabase.from('user_usage_daily').select('lessons_completed, practice_questions_completed, speaking_minutes_spent, date'),
      supabase.from('srs_items').select('stage, repetitions, item_type'),
    ]);

    const profiles = profilesRes.data || [];
    const usage = usageRes.data || [];
    const srs = srsRes.data || [];

    // Target Level Distribution
    const levelCounts: Record<string, number> = { N5: 0, N4: 0, N3: 0, N2: 0, N1: 0 };
    for (const p of profiles) {
      const lvl = p.target_level || 'N5';
      if (levelCounts[lvl] !== undefined) levelCounts[lvl]++;
    }

    // Totals
    const totalLessons = usage.reduce((acc, u) => acc + (u.lessons_completed || 0), 0);
    const totalPracticeQuestions = usage.reduce((acc, u) => acc + (u.practice_questions_completed || 0), 0);
    const totalSpeakingMinutes = Number(
      usage.reduce((acc, u) => acc + (Number(u.speaking_minutes_spent) || 0), 0).toFixed(1)
    );

    // SRS Mastery Stages
    const srsStages: Record<string, number> = {
      apprentice: 0, // stage 0-4
      guru: 0,       // stage 5-6
      master: 0,     // stage 7-8
      enlightened: 0 // stage 9+
    };

    for (const item of srs) {
      const st = item.stage || 0;
      if (st <= 4) srsStages.apprentice++;
      else if (st <= 6) srsStages.guru++;
      else if (st <= 8) srsStages.master++;
      else srsStages.enlightened++;
    }

    return res.status(200).json({
      levelDistribution: levelCounts,
      totalLearners: profiles.length,
      totalLessonsCompleted: totalLessons,
      totalPracticeQuestions: totalPracticeQuestions,
      totalSpeakingMinutes: totalSpeakingMinutes,
      totalSrsItemsTracked: srs.length,
      srsStages,
      dailyTrend: usage.slice(-14),
    });
  } catch (error: any) {
    console.error('admin learning analytics error:', error);
    return res.status(500).json({ error: error?.message || 'Failed to fetch learning analytics' });
  }
}
