const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://xifgqvjqlpdfvtvzbnmk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpZmdxdmpxbHBkZnZ0dnpibm1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MTkwNDgsImV4cCI6MjA2NzE5NTA0OH0.O9k6UkvMWBPd6JLTCqWq3KcF4jZViPywWoi85FmS7yg';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
