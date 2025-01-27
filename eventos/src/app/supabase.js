import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://iiwysdgdywvznrbsmqki.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlpd3lzZGdkeXd2em5yYnNtcWtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NDcyNTAsImV4cCI6MjA1MjQyMzI1MH0.URZywM-HPvMHcWE5z67Rjs-0k4uAY5t4bxcOJEqjENA";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
