-- ==========================================================
-- NEOJLPT Master: Enterprise Admin Console & Security Migration
-- Migration: 20261010_admin_console_enterprise.sql
-- Administrator: neowin001@gmail.com
-- ==========================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------
-- 1. Admin Authorization Helper Function
-- ----------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN LOWER(TRIM(COALESCE(auth.jwt() ->> 'email', ''))) = 'neowin001@gmail.com';
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- ----------------------------------------------------------
-- 2. Audit Logs Table (Append-Only)
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_user_id TEXT NOT NULL,
  admin_email TEXT NOT NULL,
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT,
  details JSONB DEFAULT '{}'::jsonb,
  ip_address TEXT,
  user_agent TEXT,
  status TEXT DEFAULT 'success' CHECK (status IN ('success', 'failure')),
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_admin_audit_time ON public.admin_audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_audit_action ON public.admin_audit_logs(action, target_type);
CREATE INDEX IF NOT EXISTS idx_admin_audit_email ON public.admin_audit_logs(admin_email);

-- Enable RLS on audit logs
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin audit logs viewable only by superadmin" ON public.admin_audit_logs;
CREATE POLICY "Admin audit logs viewable only by superadmin"
  ON public.admin_audit_logs FOR SELECT
  USING (public.is_admin_user() OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Admin audit logs insertable only by superadmin or service_role" ON public.admin_audit_logs;
CREATE POLICY "Admin audit logs insertable only by superadmin or service_role"
  ON public.admin_audit_logs FOR INSERT
  WITH CHECK (public.is_admin_user() OR auth.role() = 'service_role');

-- Prevent UPDATE and DELETE on audit logs to guarantee append-only integrity
DROP POLICY IF EXISTS "Prevent update on admin audit logs" ON public.admin_audit_logs;
DROP POLICY IF EXISTS "Prevent delete on admin audit logs" ON public.admin_audit_logs;

-- ----------------------------------------------------------
-- 3. API & AI Usage Logs Table
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.api_usage_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT,
  feature TEXT NOT NULL,
  provider TEXT NOT NULL DEFAULT 'gemini',
  model TEXT NOT NULL DEFAULT 'gemini-2.0-flash',
  endpoint TEXT,
  input_tokens INTEGER DEFAULT 0,
  output_tokens INTEGER DEFAULT 0,
  total_tokens INTEGER DEFAULT 0,
  estimated_cost NUMERIC(10, 6) DEFAULT 0.000000,
  cache_hit BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'success' CHECK (status IN ('success', 'error', 'rate_limited')),
  error_category TEXT,
  duration_ms INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_api_usage_created ON public.api_usage_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_api_usage_user ON public.api_usage_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_api_usage_feature ON public.api_usage_logs(feature);

ALTER TABLE public.api_usage_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own api usage" ON public.api_usage_logs;
CREATE POLICY "Users can view own api usage"
  ON public.api_usage_logs FOR SELECT
  USING (auth.uid()::text = user_id OR public.is_admin_user() OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Insert api usage allowed for auth and service_role" ON public.api_usage_logs;
CREATE POLICY "Insert api usage allowed for auth and service_role"
  ON public.api_usage_logs FOR INSERT
  WITH CHECK (true);

-- ----------------------------------------------------------
-- 4. Payment Transactions Table
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.payment_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE SET NULL,
  plan TEXT NOT NULL CHECK (plan IN ('PRO', 'PREMIUM')),
  amount NUMERIC(8, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  payment_status TEXT NOT NULL DEFAULT 'succeeded' CHECK (payment_status IN ('succeeded', 'pending', 'failed', 'refunded')),
  payment_provider TEXT NOT NULL DEFAULT 'stripe',
  provider_tx_id TEXT,
  customer_email TEXT,
  is_refunded BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_payment_tx_user ON public.payment_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_tx_created ON public.payment_transactions(created_at DESC);

ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own payment transactions" ON public.payment_transactions;
CREATE POLICY "Users can view own payment transactions"
  ON public.payment_transactions FOR SELECT
  USING (auth.uid()::text = user_id OR public.is_admin_user() OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Admins or service_role can manage payment transactions" ON public.payment_transactions;
CREATE POLICY "Admins or service_role can manage payment transactions"
  ON public.payment_transactions FOR ALL
  USING (public.is_admin_user() OR auth.role() = 'service_role');

-- ----------------------------------------------------------
-- 5. Extend Gift Codes with Campaign, Allowed Email & Notes
-- ----------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'gift_codes' AND column_name = 'campaign_name'
  ) THEN
    ALTER TABLE public.gift_codes ADD COLUMN campaign_name TEXT DEFAULT 'General';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'gift_codes' AND column_name = 'allowed_email'
  ) THEN
    ALTER TABLE public.gift_codes ADD COLUMN allowed_email TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'gift_codes' AND column_name = 'notes'
  ) THEN
    ALTER TABLE public.gift_codes ADD COLUMN notes TEXT;
  END IF;
END $$;

-- ----------------------------------------------------------
-- 6. Relax and Expand Subscription Status Constraints
-- ----------------------------------------------------------
DO $$
DECLARE
  v_conname TEXT;
BEGIN
  SELECT conname INTO v_conname
  FROM pg_constraint
  WHERE conrelid = 'public.subscriptions'::regclass
    AND contype = 'c'
    AND conname LIKE '%status%';
  
  IF v_conname IS NOT NULL THEN
    EXECUTE 'ALTER TABLE public.subscriptions DROP CONSTRAINT ' || quote_ident(v_conname);
  END IF;

  ALTER TABLE public.subscriptions ADD CONSTRAINT subscriptions_status_check
    CHECK (status IN ('active', 'canceled', 'cancelled', 'expired', 'past_due', 'trialing', 'pending', 'refunded', 'revoked'));
END $$;

-- Add transaction_reference and notes to subscriptions if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'subscriptions' AND column_name = 'transaction_reference'
  ) THEN
    ALTER TABLE public.subscriptions ADD COLUMN transaction_reference TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name = 'subscriptions' AND column_name = 'notes'
  ) THEN
    ALTER TABLE public.subscriptions ADD COLUMN notes TEXT;
  END IF;
END $$;

-- ----------------------------------------------------------
-- 7. High-Concurrency Atomic Gift Code Redemption Procedure
-- ----------------------------------------------------------
CREATE OR REPLACE FUNCTION public.redeem_gift_code(
  p_user_id TEXT,
  p_code TEXT
)
RETURNS JSONB AS $$
DECLARE
  v_gift RECORD;
  v_user_email TEXT;
  v_now TIMESTAMPTZ := TIMEZONE('utc'::text, NOW());
  v_new_end TIMESTAMPTZ;
  v_sub_id UUID;
  v_clean_code TEXT;
  v_current_sub RECORD;
BEGIN
  -- Normalize inputs
  p_user_id := TRIM(p_user_id);
  v_clean_code := UPPER(TRIM(p_code));

  IF p_user_id IS NULL OR p_user_id = '' OR p_user_id LIKE 'guest_%' OR p_user_id = 'guest' THEN
    RETURN jsonb_build_object('success', false, 'error', 'Authentication required. Please sign in to redeem gift codes.');
  END IF;

  IF v_clean_code IS NULL OR v_clean_code = '' THEN
    RETURN jsonb_build_object('success', false, 'error', 'Invalid gift code format.');
  END IF;

  -- Fetch user email from profiles
  SELECT email INTO v_user_email
  FROM public.profiles
  WHERE id = p_user_id
  LIMIT 1;

  -- 1. Lock the gift code row for update (prevents concurrent race condition over redemption limit)
  SELECT * INTO v_gift
  FROM public.gift_codes
  WHERE UPPER(TRIM(code)) = v_clean_code
  FOR UPDATE;

  IF v_gift IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Gift code not found. Please verify the code and try again.');
  END IF;

  IF NOT v_gift.is_active THEN
    RETURN jsonb_build_object('success', false, 'error', 'This gift code has been deactivated or revoked.');
  END IF;

  IF v_gift.expires_at IS NOT NULL AND v_gift.expires_at < v_now THEN
    RETURN jsonb_build_object('success', false, 'error', 'This gift code expired on ' || to_char(v_gift.expires_at, 'YYYY-MM-DD') || '.');
  END IF;

  IF v_gift.times_redeemed >= v_gift.max_redemptions THEN
    RETURN jsonb_build_object('success', false, 'error', 'This gift code has already reached its maximum redemption limit.');
  END IF;

  -- Check allowed_email restriction if specified
  IF v_gift.allowed_email IS NOT NULL AND TRIM(v_gift.allowed_email) <> '' THEN
    IF v_user_email IS NULL OR LOWER(TRIM(v_user_email)) <> LOWER(TRIM(v_gift.allowed_email)) THEN
      RETURN jsonb_build_object('success', false, 'error', 'This gift code is assigned to a specific email address.');
    END IF;
  END IF;

  -- Check if user already redeemed this specific gift code
  IF EXISTS (
    SELECT 1 FROM public.gift_code_redemptions
    WHERE gift_code_id = v_gift.id AND user_id = p_user_id
  ) THEN
    RETURN jsonb_build_object('success', false, 'error', 'You have already redeemed this gift code.');
  END IF;

  -- Check for existing active subscription to stack validity safely (do not overwrite earlier start date)
  SELECT * INTO v_current_sub
  FROM public.subscriptions
  WHERE user_id = p_user_id
    AND status = 'active'
    AND current_period_end > v_now
  ORDER BY current_period_end DESC
  LIMIT 1;

  IF v_current_sub IS NOT NULL AND v_current_sub.current_period_end > v_now THEN
    -- Stack duration onto existing subscription expiry
    v_new_end := v_current_sub.current_period_end + (v_gift.duration_days || ' days')::INTERVAL;
    
    -- Update existing subscription to higher plan if gift is PREMIUM and existing is PRO
    IF v_gift.plan = 'PREMIUM' AND v_current_sub.plan = 'PRO' THEN
      UPDATE public.subscriptions
      SET plan = 'PREMIUM',
          current_period_end = v_new_end,
          updated_at = v_now
      WHERE id = v_current_sub.id;
      v_sub_id := v_current_sub.id;
    ELSE
      UPDATE public.subscriptions
      SET current_period_end = v_new_end,
          updated_at = v_now
      WHERE id = v_current_sub.id;
      v_sub_id := v_current_sub.id;
    END IF;
  ELSE
    -- Brand new subscription grant
    v_new_end := v_now + (v_gift.duration_days || ' days')::INTERVAL;
    INSERT INTO public.subscriptions (
      user_id, plan, status, billing_cycle, subscription_source, current_period_start, current_period_end
    )
    VALUES (
      p_user_id, v_gift.plan, 'active', 'monthly', 'gift', v_now, v_new_end
    )
    RETURNING id INTO v_sub_id;
  END IF;

  -- Atomically increment times_redeemed and deactivate if limit reached
  UPDATE public.gift_codes
  SET times_redeemed = times_redeemed + 1,
      is_active = CASE WHEN (times_redeemed + 1) >= max_redemptions THEN FALSE ELSE is_active END
  WHERE id = v_gift.id;

  -- Insert redemption record
  INSERT INTO public.gift_code_redemptions (
    gift_code_id, user_id, plan, duration_days, subscription_id
  )
  VALUES (
    v_gift.id, p_user_id, v_gift.plan, v_gift.duration_days, v_sub_id
  );

  -- Update user profile account_type
  UPDATE public.profiles
  SET is_premium = TRUE,
      account_type = v_gift.plan,
      updated_at = v_now
  WHERE id = p_user_id;

  -- Log in audit logs
  INSERT INTO public.admin_audit_logs (
    admin_user_id, admin_email, action, target_type, target_id, details, status
  )
  VALUES (
    p_user_id,
    COALESCE(v_user_email, 'user'),
    'gift_code_redeemed',
    'gift_code',
    v_gift.id::text,
    jsonb_build_object(
      'code', v_clean_code,
      'plan', v_gift.plan,
      'duration_days', v_gift.duration_days,
      'expires_at', v_new_end
    ),
    'success'
  );

  RETURN jsonb_build_object(
    'success', true,
    'plan', v_gift.plan,
    'durationDays', v_gift.duration_days,
    'expiresAt', v_new_end,
    'message', 'Congratulations! You have activated ' || v_gift.plan || ' access for ' || v_gift.duration_days || ' days.'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ----------------------------------------------------------
-- 8. Comprehensive Overview Statistics Stored Procedure
-- ----------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_admin_dashboard_stats()
RETURNS JSONB AS $$
DECLARE
  v_now TIMESTAMPTZ := TIMEZONE('utc'::text, NOW());
  v_today_start TIMESTAMPTZ := date_trunc('day', v_now);
  v_week_start TIMESTAMPTZ := v_now - INTERVAL '7 days';
  v_month_start TIMESTAMPTZ := v_now - INTERVAL '30 days';

  -- User Metrics
  v_total_users INTEGER := 0;
  v_registered_today INTEGER := 0;
  v_registered_this_week INTEGER := 0;
  v_registered_this_month INTEGER := 0;
  v_active_today INTEGER := 0;
  v_active_last_7d INTEGER := 0;
  v_active_last_30d INTEGER := 0;
  v_free_users INTEGER := 0;
  v_pro_users INTEGER := 0;
  v_premium_users INTEGER := 0;
  v_gift_access_users INTEGER := 0;
  v_expired_subs INTEGER := 0;
  v_expiring_soon_7d INTEGER := 0;
  v_expiring_soon_30d INTEGER := 0;

  -- Subscription Metrics
  v_active_paid_subs INTEGER := 0;
  v_active_gift_subs INTEGER := 0;

  -- API Usage Metrics
  v_total_api_calls INTEGER := 0;
  v_api_calls_today INTEGER := 0;
  v_api_calls_month INTEGER := 0;
  v_cache_hits INTEGER := 0;
  v_total_tokens BIGINT := 0;
  v_input_tokens BIGINT := 0;
  v_output_tokens BIGINT := 0;
  v_estimated_ai_cost NUMERIC(10, 4) := 0.0000;
  v_api_errors INTEGER := 0;

  -- Payment & Revenue
  v_total_revenue NUMERIC(10, 2) := 0.00;
  v_successful_payments INTEGER := 0;
  v_failed_payments INTEGER := 0;
  v_refunded_payments INTEGER := 0;
BEGIN
  -- 1. User stats
  SELECT COUNT(*) INTO v_total_users FROM public.profiles;
  SELECT COUNT(*) INTO v_registered_today FROM public.profiles WHERE created_at >= v_today_start;
  SELECT COUNT(*) INTO v_registered_this_week FROM public.profiles WHERE created_at >= v_week_start;
  SELECT COUNT(*) INTO v_registered_this_month FROM public.profiles WHERE created_at >= v_month_start;
  SELECT COUNT(*) INTO v_active_today FROM public.profiles WHERE last_active_date = CURRENT_DATE;
  SELECT COUNT(*) INTO v_active_last_7d FROM public.profiles WHERE last_active_date >= (CURRENT_DATE - INTERVAL '7 days')::date;
  SELECT COUNT(*) INTO v_active_last_30d FROM public.profiles WHERE last_active_date >= (CURRENT_DATE - INTERVAL '30 days')::date;

  SELECT COUNT(*) INTO v_free_users FROM public.profiles WHERE (account_type = 'FREE' OR account_type IS NULL) AND is_premium = FALSE;
  SELECT COUNT(*) INTO v_pro_users FROM public.profiles WHERE account_type = 'PRO';
  SELECT COUNT(*) INTO v_premium_users FROM public.profiles WHERE account_type = 'PREMIUM' OR role = 'admin';

  -- 2. Subscriptions
  SELECT COUNT(DISTINCT user_id) INTO v_gift_access_users
  FROM public.subscriptions
  WHERE subscription_source = 'gift' AND status = 'active' AND current_period_end > v_now;

  SELECT COUNT(*) INTO v_active_paid_subs
  FROM public.subscriptions
  WHERE subscription_source IN ('stripe', 'web') AND status = 'active' AND current_period_end > v_now;

  SELECT COUNT(*) INTO v_active_gift_subs
  FROM public.subscriptions
  WHERE subscription_source = 'gift' AND status = 'active' AND current_period_end > v_now;

  SELECT COUNT(*) INTO v_expiring_soon_7d
  FROM public.subscriptions
  WHERE status = 'active' AND current_period_end > v_now AND current_period_end <= (v_now + INTERVAL '7 days');

  SELECT COUNT(*) INTO v_expiring_soon_30d
  FROM public.subscriptions
  WHERE status = 'active' AND current_period_end > v_now AND current_period_end <= (v_now + INTERVAL '30 days');

  SELECT COUNT(*) INTO v_expired_subs
  FROM public.subscriptions
  WHERE status = 'expired' OR current_period_end <= v_now;

  -- 3. API Usage
  SELECT 
    COUNT(*),
    COALESCE(SUM(CASE WHEN created_at >= v_today_start THEN 1 ELSE 0 END), 0),
    COALESCE(SUM(CASE WHEN created_at >= v_month_start THEN 1 ELSE 0 END), 0),
    COALESCE(SUM(CASE WHEN cache_hit THEN 1 ELSE 0 END), 0),
    COALESCE(SUM(total_tokens), 0),
    COALESCE(SUM(input_tokens), 0),
    COALESCE(SUM(output_tokens), 0),
    COALESCE(SUM(estimated_cost), 0.0),
    COALESCE(SUM(CASE WHEN status = 'error' THEN 1 ELSE 0 END), 0)
  INTO
    v_total_api_calls,
    v_api_calls_today,
    v_api_calls_month,
    v_cache_hits,
    v_total_tokens,
    v_input_tokens,
    v_output_tokens,
    v_estimated_ai_cost,
    v_api_errors
  FROM public.api_usage_logs;

  -- 4. Payment stats
  SELECT
    COALESCE(SUM(CASE WHEN payment_status = 'succeeded' THEN amount ELSE 0 END), 0.00),
    COALESCE(SUM(CASE WHEN payment_status = 'succeeded' THEN 1 ELSE 0 END), 0),
    COALESCE(SUM(CASE WHEN payment_status = 'failed' THEN 1 ELSE 0 END), 0),
    COALESCE(SUM(CASE WHEN payment_status = 'refunded' OR is_refunded = TRUE THEN 1 ELSE 0 END), 0)
  INTO
    v_total_revenue,
    v_successful_payments,
    v_failed_payments,
    v_refunded_payments
  FROM public.payment_transactions;

  RETURN jsonb_build_object(
    'users', jsonb_build_object(
      'total', v_total_users,
      'registeredToday', v_registered_today,
      'registeredThisWeek', v_registered_this_week,
      'registeredThisMonth', v_registered_this_month,
      'activeToday', v_active_today,
      'activeLast7d', v_active_last_7d,
      'activeLast30d', v_active_last_30d,
      'free', v_free_users,
      'pro', v_pro_users,
      'premium', v_premium_users,
      'giftActive', v_gift_access_users,
      'expiredSubs', v_expired_subs,
      'expiringSoon7d', v_expiring_soon_7d,
      'expiringSoon30d', v_expiring_soon_30d
    ),
    'subscriptions', jsonb_build_object(
      'activePaid', v_active_paid_subs,
      'activeGift', v_active_gift_subs,
      'expiring7d', v_expiring_soon_7d,
      'expiring30d', v_expiring_soon_30d,
      'expired', v_expired_subs
    ),
    'apiUsage', jsonb_build_object(
      'totalCalls', v_total_api_calls,
      'callsToday', v_api_calls_today,
      'callsThisMonth', v_api_calls_month,
      'cacheHits', v_cache_hits,
      'cacheHitRate', CASE WHEN v_total_api_calls > 0 THEN ROUND((v_cache_hits::numeric / v_total_api_calls::numeric) * 100, 1) ELSE 0.0 END,
      'totalTokens', v_total_tokens,
      'inputTokens', v_input_tokens,
      'outputTokens', v_output_tokens,
      'estimatedCost', v_estimated_ai_cost,
      'errors', v_api_errors
    ),
    'revenue', jsonb_build_object(
      'totalRevenue', v_total_revenue,
      'successfulPayments', v_successful_payments,
      'failedPayments', v_failed_payments,
      'refunds', v_refunded_payments
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Guarantee neowin001@gmail.com account is initialized as Superadmin
SELECT public.ensure_admin_account('neowin001@gmail.com');
