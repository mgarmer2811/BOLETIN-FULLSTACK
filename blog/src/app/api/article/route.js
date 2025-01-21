import supabase from "../../../supabase";

export async function GET() {
    const { data: articles, error } = await supabase
        .from("articulo")
        .select("*")
        .order("fecha_publicacion");

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return new Response(JSON.stringify(articles), { status: 200 });
}

export async function DELETE(request) {
    const body = await request.json();
    const id = body.id;

    const { data: deleteData, error } = await supabase
        .from("articulo")
        .delete()
        .eq("id", id);

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return new Response(JSON.stringify({ success: "Deletion Succesful!" }), {
        status: 200,
    });
}
