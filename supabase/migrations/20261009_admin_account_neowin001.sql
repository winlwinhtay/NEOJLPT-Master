-- ==========================================================
-- NEOJLPT Master: Designate neowin001@gmail.com as Admin Account
-- Migration: 20261009_admin_account_neowin001.sql
-- Description: Unconditional Administrator access, bypass subscription checks,
--              permanent 100% ad-free experience, unlimited AI & speaking practice.
-- ==========================================================

-- 1. Helper function to ensure admin role and perpetual subscription for an email
CREATE OR REPLACE FUNCTION public.ensure_admin_account(p_email TEXT)
RETURNS VOID AS $$
DECLARE
  v_user_id TEXT;
  v_now TIMESTAMPTZ := TIMEZONE('utc'::text, NOW());
  v_perpetual_end TIMESTAMPTZ := v_now + INTERVAL '100 years';
BEGIN
  p_email := LOWER(TRIM(p_email));
  IF p_email IS NULL OR p_email = '' THEN
    RETURN;
  END IF;

  -- 1. Look up user ID from auth.users if available
  SELECT id::text INTO v_user_id
  FROM auth.users
  WHERE LOWER(TRIM(email)) = p_email
  LIMIT 1;

  -- 2. If not found in auth.users, check public.profiles
  IF v_user_id IS NULL THEN
    SELECT id INTO v_user_id
    FROM public.profiles
    WHERE LOWER(TRIM(email)) = p_email
    LIMIT 1;
  END IF;

  -- 3. If a user record exists, promote to ADMIN
  IF v_user_id IS NOT NULL THEN
    -- Update public.profiles
    UPDATE public.profiles
    SET role = 'admin',
        is_premium = TRUE,
        account_type = 'ADMIN',
        updated_at = v_now
    WHERE id = v_user_id;

    -- Upsert perpetual subscription in public.subscriptions
    IF EXISTS (SELECT 1 FROM public.subscriptions WHERE user_id = v_user_id) THEN
      UPDATE public.subscriptions
      SET plan = 'PREMIUM',
          status = 'active',
          billing_cycle = 'yearly',
          subscription_source = 'admin_promo',
          current_period_start = v_now,
          current_period_end = v_perpetual_end,
          updated_at = v_now
      WHERE user_id = v_user_id;
    ELSE
      INSERT INTO public.subscriptions (
        user_id,
        plan,
        status,
        billing_cycle,
        subscription_source,
        current_period_start,
        current_period_end
      ) VALUES (
        v_user_id,
        'PREMIUM',
        'active',
        'yearly',
        'admin_promo',
        v_now,
        v_perpetual_end
      );
    END IF;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Trigger on public.profiles to automatically enforce ADMIN role for neowin001@gmail.com
CREATE OR REPLACE FUNCTION public.trg_enforce_admin_email()
RETURNS TRIGGER AS $$
BEGIN
  IF LOWER(TRIM(COALESCE(NEW.email, ''))) = 'neowin001@gmail.com' THEN
    NEW.role := 'admin';
    NEW.is_premium := TRUE;
    NEW.account_type := 'ADMIN';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_enforce_admin_on_profiles ON public.profiles;
CREATE TRIGGER trg_enforce_admin_on_profiles
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.trg_enforce_admin_email();

-- 3. Trigger after profile creation/update to ensure active perpetual subscription
CREATE OR REPLACE FUNCTION public.trg_ensure_admin_subscription()
RETURNS TRIGGER AS $$
DECLARE
  v_now TIMESTAMPTZ := TIMEZONE('utc'::text, NOW());
  v_perpetual_end TIMESTAMPTZ := v_now + INTERVAL '100 years';
BEGIN
  IF NEW.role = 'admin' OR LOWER(TRIM(COALESCE(NEW.email, ''))) = 'neowin001@gmail.com' THEN
    IF EXISTS (SELECT 1 FROM public.subscriptions WHERE user_id = NEW.id) THEN
      UPDATE public.subscriptions
      SET plan = 'PREMIUM',
          status = 'active',
          billing_cycle = 'yearly',
          subscription_source = 'admin_promo',
          current_period_start = v_now,
          current_period_end = v_perpetual_end,
          updated_at = v_now
      WHERE user_id = NEW.id;
    ELSE
      INSERT INTO public.subscriptions (
        user_id,
        plan,
        status,
        billing_cycle,
        subscription_source,
        current_period_start,
        current_period_end
      ) VALUES (
        NEW.id,
        'PREMIUM',
        'active',
        'yearly',
        'admin_promo',
        v_now,
        v_perpetual_end
      );
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_ensure_admin_subscription_after ON public.profiles;
CREATE TRIGGER trg_ensure_admin_subscription_after
  AFTER INSERT OR UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.trg_ensure_admin_subscription();

-- 4. Update get_user_entitlements to immediately recognize neowin001@gmail.com as ADMIN
CREATE OR REPLACE FUNCTION public.get_user_entitlements(p_user_id TEXT)
RETURNS JSONB AS $$
DECLARE
  v_role TEXT := 'user';
  v_account_type TEXT := 'GUEST';
  v_email TEXT := '';
  v_sub RECORD;
  v_settings RECORD;
  v_daily_usage RECORD;
  v_has_active_sub BOOLEAN := FALSE;
  v_is_gift BOOLEAN := FALSE;
  v_now TIMESTAMPTZ := TIMEZONE('utc'::text, NOW());
  v_is_admin BOOLEAN := FALSE;
BEGIN
  -- Fetch global settings
  SELECT * INTO v_settings FROM public.monetization_settings WHERE id = 'global' LIMIT 1;
  IF v_settings IS NULL THEN
    v_settings.guest_daily_lessons := 3;
    v_settings.guest_daily_ai_requests := 3;
    v_settings.guest_daily_speaking_minutes := 2;
    v_settings.free_daily_ai_requests := 10;
    v_settings.free_daily_speaking_minutes := 5;
    v_settings.pro_daily_ai_requests := 50;
    v_settings.pro_daily_speaking_minutes := 30;
    v_settings.premium_daily_ai_requests := 200;
    v_settings.premium_daily_speaking_minutes := 120;
  END IF;

  -- If user ID starts with 'guest_' or is empty, return GUEST entitlements
  IF p_user_id IS NULL OR p_user_id = '' OR p_user_id LIKE 'guest_%' OR p_user_id = 'guest' THEN
    RETURN jsonb_build_object(
      'accountType', 'GUEST',
      'subscriptionPlan', 'FREE',
      'subscriptionStatus', 'none',
      'subscriptionSource', 'none',
      'subscriptionStart', null,
      'subscriptionEnd', null,
      'adsEnabled', true,
      'courseAccess', 'preview',
      'grammarAccess', 'preview',
      'vocabularyAccess', 'preview',
      'kanjiAccess', 'preview',
      'readingAccess', 'preview',
      'listeningAccess', 'preview',
      'speakingAccess', 'preview',
      'aiDailyLimit', COALESCE(v_settings.guest_daily_ai_requests, 3),
      'speakingDailyLimit', COALESCE(v_settings.guest_daily_speaking_minutes, 2),
      'mockTestAccess', 'preview',
      'advancedAnalytics', false,
      'learningPathLevel', 'preview',
      'saveProgress', false,
      'bookmarks', false,
      'exports', false,
      'isGuest', true
    );
  END IF;

  -- Check profiles table for user role, account_type & email
  SELECT role, account_type, email INTO v_role, v_account_type, v_email
  FROM public.profiles
  WHERE id = p_user_id
  LIMIT 1;

  -- Check if user is neowin001@gmail.com or admin
  IF v_role = 'admin' 
     OR LOWER(TRIM(COALESCE(v_email, ''))) = 'neowin001@gmail.com'
     OR EXISTS (
       SELECT 1 FROM auth.users 
       WHERE id::text = p_user_id AND LOWER(TRIM(email)) = 'neowin001@gmail.com'
     ) THEN
    v_is_admin := TRUE;
  END IF;

  IF v_is_admin THEN
    -- Ensure profile record is synchronized as admin
    UPDATE public.profiles
    SET role = 'admin',
        is_premium = TRUE,
        account_type = 'ADMIN',
        updated_at = v_now
    WHERE id = p_user_id AND (role != 'admin' OR is_premium = FALSE OR account_type != 'ADMIN');

    RETURN jsonb_build_object(
      'accountType', 'ADMIN',
      'subscriptionPlan', 'PREMIUM',
      'subscriptionStatus', 'active',
      'subscriptionSource', 'admin',
      'subscriptionStart', v_now,
      'subscriptionEnd', v_now + INTERVAL '100 years',
      'adsEnabled', false,
      'courseAccess', 'full',
      'grammarAccess', 'full',
      'vocabularyAccess', 'full',
      'kanjiAccess', 'full',
      'readingAccess', 'full',
      'listeningAccess', 'full',
      'speakingAccess', 'full',
      'aiDailyLimit', 999999,
      'speakingDailyLimit', 999999,
      'mockTestAccess', 'full',
      'advancedAnalytics', true,
      'learningPathLevel', 'complete',
      'saveProgress', true,
      'bookmarks', true,
      'exports', true,
      'isGuest', false
    );
  END IF;

  -- Check active subscription
  SELECT * INTO v_sub
  FROM public.subscriptions
  WHERE user_id = p_user_id
    AND status = 'active'
    AND current_period_end > v_now
  ORDER BY 
    CASE WHEN plan = 'PREMIUM' THEN 1 ELSE 2 END,
    current_period_end DESC
  LIMIT 1;

  IF v_sub IS NOT NULL THEN
    v_has_active_sub := TRUE;
    v_is_gift := (v_sub.subscription_source = 'gift');

    -- Auto-update profiles is_premium flag if needed
    UPDATE public.profiles
    SET is_premium = TRUE,
        account_type = v_sub.plan,
        updated_at = v_now
    WHERE id = p_user_id AND (is_premium = FALSE OR account_type != v_sub.plan);

    RETURN jsonb_build_object(
      'accountType', CASE WHEN v_is_gift THEN ('GIFT_' || v_sub.plan) ELSE v_sub.plan END,
      'subscriptionPlan', v_sub.plan,
      'subscriptionStatus', 'active',
      'subscriptionSource', v_sub.subscription_source,
      'subscriptionStart', v_sub.current_period_start,
      'subscriptionEnd', v_sub.current_period_end,
      'adsEnabled', false,
      'courseAccess', 'full',
      'grammarAccess', 'full',
      'vocabularyAccess', 'full',
      'kanjiAccess', 'full',
      'readingAccess', 'full',
      'listeningAccess', 'full',
      'speakingAccess', 'full',
      'aiDailyLimit', CASE WHEN v_sub.plan = 'PREMIUM' THEN v_settings.premium_daily_ai_requests ELSE v_settings.pro_daily_ai_requests END,
      'speakingDailyLimit', CASE WHEN v_sub.plan = 'PREMIUM' THEN v_settings.premium_daily_speaking_minutes ELSE v_settings.pro_daily_speaking_minutes END,
      'mockTestAccess', 'full',
      'advancedAnalytics', true,
      'learningPathLevel', 'complete',
      'saveProgress', true,
      'bookmarks', true,
      'exports', true,
      'isGuest', false
    );
  END IF;

  -- If subscription has expired, revert profile status to FREE safely
  UPDATE public.profiles
  SET is_premium = FALSE,
      account_type = 'FREE',
      updated_at = v_now
  WHERE id = p_user_id AND is_premium = TRUE;

  -- Standard FREE Authenticated Account
  RETURN jsonb_build_object(
    'accountType', 'FREE',
    'subscriptionPlan', 'FREE',
    'subscriptionStatus', 'none',
    'subscriptionSource', 'none',
    'subscriptionStart', null,
    'subscriptionEnd', null,
    'adsEnabled', true,
    'courseAccess', 'foundational',
    'grammarAccess', 'substantial',
    'vocabularyAccess', 'substantial',
    'kanjiAccess', 'substantial',
    'readingAccess', 'selected',
    'listeningAccess', 'selected',
    'speakingAccess', 'limited',
    'aiDailyLimit', COALESCE(v_settings.free_daily_ai_requests, 10),
    'speakingDailyLimit', COALESCE(v_settings.free_daily_speaking_minutes, 5),
    'mockTestAccess', 'limited',
    'advancedAnalytics', false,
    'learningPathLevel', 'basic',
    'saveProgress', true,
    'bookmarks', true,
    'exports', false,
    'isGuest', false
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Execute immediately for neowin001@gmail.com
SELECT public.ensure_admin_account('neowin001@gmail.com');
