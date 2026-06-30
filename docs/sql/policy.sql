ALTER TABLE identity.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
ON identity.user_profiles
FOR SELECT
USING (
    auth.uid() = user_id
);

CREATE POLICY "Users can insert own profile"
ON identity.user_profiles
FOR INSERT
WITH CHECK (
    auth.uid() = user_id
);

CREATE POLICY "Users can update own profile"
ON identity.user_profiles
FOR UPDATE
USING (
    auth.uid() = user_id
);