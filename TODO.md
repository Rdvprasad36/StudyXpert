# Supabase Integration Tasks

- [x] Add Supabase environment variables to .env.local
- [x] Update lib/auth-service.ts to use Supabase auth instead of localStorage
- [ ] Fix ESLint errors in auth pages (unused 'loading' in signup-form.tsx, parsing error in signup-page.tsx)
- [ ] Enable signup form in app/auth/signup-form.tsx (remove disabled attributes, use loading state)
- [ ] Test signup and login functionality with Supabase
- [ ] Handle profile updates and data retrieval for logged-in users
- [ ] Create profiles table in Supabase if not exists (id, email, username, full_name, student_id, department, year, role, created_at, updated_at)
