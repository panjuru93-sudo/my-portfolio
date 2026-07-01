import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rmruupekxdrhqnxfgtxd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtcnV1cGVreGRyaHFueGZndHhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxMjA4MjgsImV4cCI6MjA5NzY5NjgyOH0.Cf2amfMeCDB9t6AgBcKSO00tjNJEuSKKOCjasFNPQRU';

export const supabase = createClient(supabaseUrl, supabaseKey);
