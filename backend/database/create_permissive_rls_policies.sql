-- Enable Row Level Security on users and admins tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Create permissive policy on users table for all commands to public role
CREATE POLICY "Permissive policy on users" ON users
AS PERMISSIVE
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Create permissive policy on admins table for all commands to public role
CREATE POLICY "Permissive policy on admins" ON admins
AS PERMISSIVE
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Note: These policies allow all operations to all roles.
-- Use with caution and adjust for production environments.
