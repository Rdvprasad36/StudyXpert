-- Enable Row Level Security on students and admins tables
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to insert into students table
CREATE POLICY "Allow authenticated insert on students" ON students
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Create policy to allow authenticated users to select from students table
CREATE POLICY "Allow authenticated select on students" ON students
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Create policy to allow authenticated users to insert into admins table
CREATE POLICY "Allow authenticated insert on admins" ON admins
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Create policy to allow authenticated users to select from admins table
CREATE POLICY "Allow authenticated select on admins" ON admins
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Note: Adjust policies as per your app's security requirements.
