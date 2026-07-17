GRANT USAGE ON SCHEMA identity TO anon;
GRANT USAGE ON SCHEMA identity TO authenticated;
GRANT USAGE ON SCHEMA identity TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA identity
TO authenticated;

GRANT ALL
ON ALL TABLES IN SCHEMA identity
TO service_role;

GRANT USAGE ON SCHEMA commerce TO anon;
GRANT USAGE ON SCHEMA commerce TO authenticated;
GRANT USAGE ON SCHEMA commerce TO service_role;

GRANT SELECT, INSERT, UPDATE, DELETE
ON ALL TABLES IN SCHEMA commerce
TO authenticated;

GRANT ALL
ON ALL TABLES IN SCHEMA commerce
TO service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA commerce
GRANT SELECT ON TABLES TO anon, authenticated;

GRANT USAGE ON SCHEMA pricing TO anon, authenticated;

GRANT SELECT ON ALL TABLES IN SCHEMA pricing TO anon, authenticated;

ALTER DEFAULT PRIVILEGES IN SCHEMA pricing 
GRANT SELECT ON TABLES TO anon, authenticated;
GRANT USAGE ON SCHEMA inventory TO anon, authenticated;

GRANT SELECT ON ALL TABLES IN SCHEMA inventory TO anon, authenticated;