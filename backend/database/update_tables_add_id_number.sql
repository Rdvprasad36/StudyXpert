-- Add id_number column to students and admins tables if missing

ALTER TABLE students ADD COLUMN IF NOT EXISTS id_number VARCHAR(50) UNIQUE;

ALTER TABLE admins ADD COLUMN IF NOT EXISTS id_number VARCHAR(50) UNIQUE;
