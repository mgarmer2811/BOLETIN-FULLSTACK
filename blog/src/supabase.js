import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://dgaetvqmdipxemlrrtue.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnYWV0dnFtZGlweGVtbHJydHVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczOTc0MDEsImV4cCI6MjA1Mjk3MzQwMX0.ie7j4mHAISDV7T0Ilo17y5MNPvQ36Gql_ngbVavccp8";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
