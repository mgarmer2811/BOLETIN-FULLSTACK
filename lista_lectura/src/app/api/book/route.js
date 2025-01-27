import supabase from "../../supabase";

export async function GET() {
    const { data: books, error } = await supabase
        .from("libro")
        .select("*")
        .order("titulo");

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return new Response(JSON.stringify(books), { status: 200 });
}

export async function DELETE(request) {
    const body = await request.json();
    const id = body.id;

    const { data: deleteData, error } = await supabase
        .from("libro")
        .delete()
        .eq("id", id);

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return new Response(
        JSON.stringify({ sucess: "Borrado realizado con exito!" }),
        { status: 200 }
    );
}
