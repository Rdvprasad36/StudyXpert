-- Add username column to students and admins tables if missing

ALTER TABLE students ADD COLUMN IF NOT EXISTS username VARCHAR(100) UNIQUE;

ALTER TABLE admins ADD COLUMN IF NOT EXISTS username VARCHAR(100) UNIQUE;
