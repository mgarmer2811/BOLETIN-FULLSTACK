import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://iiwysdgdywvznrbsmqki.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlpd3lzZGdkeXd2em5yYnNtcWtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NDcyNTAsImV4cCI6MjA1MjQyMzI1MH0.URZywM-HPvMHcWE5z67Rjs-0k4uAY5t4bxcOJEqjENA";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const { data: contact, error } = await supabase
        .from("contacto")
        .select("*")
        .eq("id", id)
        .single();

    return new Response(JSON.stringify(contact), { status: 200 });
}
