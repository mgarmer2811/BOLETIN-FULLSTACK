import supabase from "../../../supabase";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const { data: event, error } = await supabase
        .from("evento")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return new Response(JSON.stringify(event), { status: 200 });
}

export async function PATCH(request) {
    const event = await request.json();
    const { data: error } = await supabase
        .from("evento")
        .update({ asistentes: event.asistentes })
        .eq("id", event.id);

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return new Response(JSON.stringify(data), { status: 200 });
}
