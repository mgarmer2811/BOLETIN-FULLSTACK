import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://iiwysdgdywvznrbsmqki.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlpd3lzZGdkeXd2em5yYnNtcWtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NDcyNTAsImV4cCI6MjA1MjQyMzI1MH0.URZywM-HPvMHcWE5z67Rjs-0k4uAY5t4bxcOJEqjENA";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
    const { data: contacts, error } = await supabase
        .from("contacto")
        .select("*")
        .order("nombre", { ascending: true });

    return new Response(JSON.stringify(contacts), { status: 200 });
}

export async function POST(request) {
    const body = await request.json();
    const contact = body.contact;
    const { data: createData, error } = await supabase
        .from("contacto")
        .insert(contact);

    if (error) {
        return new Response(JSON.stringify(error), { status: 400 });
    }
    return new Response(
        JSON.stringify({ sucess: "Contacto creado con exito" }, { status: 201 })
    );
}

export async function PUT(request) {
    const body = await request.json();
    const id = body.id;

    const { data: updateData, error } = await supabase
        .from("contacto")
        .update(body.update)
        .eq("id", id);

    if (error) {
        return new Response(JSON.stringify({ error: error }), { status: 404 });
    }

    return new Response(JSON.stringify({ sucess: "Update succesful" }), {
        status: 200,
    });
}

export async function DELETE(request) {
    const body = await request.json();
    const id = body.id;

    const { data: deleteData, error } = await supabase
        .from("contacto")
        .delete()
        .eq("id", id);

    if (error) {
        return new Response(JSON.stringify(error), { status: 404 });
    }

    return new Response(JSON.stringify({ sucess: "Deletion succesful" }), {
        status: 200,
    });
}
