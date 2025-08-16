-- Add dob column to students and admins tables if missing

ALTER TABLE students ADD COLUMN IF NOT EXISTS dob DATE;

ALTER TABLE admins ADD COLUMN IF NOT EXISTS dob DATE;
