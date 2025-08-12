import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://epegetangczhtouixwfc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwZWdldGFuZ2N6aHRvdWl4d2ZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0Mzc4MDYsImV4cCI6MjA2NDAxMzgwNn0.PyCs3wWExKSXaYk1A9UKzsD_BmfDZzdxE0602E1J6ag';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
