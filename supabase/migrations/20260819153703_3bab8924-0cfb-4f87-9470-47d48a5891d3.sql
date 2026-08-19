REVOKE SELECT ON public.orders FROM anon, authenticated;
DROP POLICY IF EXISTS "Demo orders are publicly viewable" ON public.orders;