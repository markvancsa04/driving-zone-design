
CREATE POLICY "admins manage media" ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'media' AND public.is_admin())
  WITH CHECK (bucket_id = 'media' AND public.is_admin());

CREATE POLICY "authenticated read media" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'media');
