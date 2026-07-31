DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='storage' AND tablename='objects' AND policyname='admins manage media') THEN
    CREATE POLICY "admins manage media" ON storage.objects
      FOR ALL TO authenticated
      USING (bucket_id = 'media' AND public.is_admin())
      WITH CHECK (bucket_id = 'media' AND public.is_admin());
  END IF;
END $$;