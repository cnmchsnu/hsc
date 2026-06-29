GRANT USAGE ON SCHEMA identity TO anon;
GRANT USAGE ON SCHEMA identity TO authenticated;
GRANT USAGE ON SCHEMA identity TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA identity
TO authenticated;

GRANT ALL
ON ALL TABLES IN SCHEMA identity
TO service_role;