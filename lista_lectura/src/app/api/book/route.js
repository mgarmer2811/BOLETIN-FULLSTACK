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

export async function PATCH(request) {
    const { id, read } = await request.json();

    const { data, error } = await supabase
        .from("libro")
        .update({ leido: read })
        .eq("id", id);

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(request) {
    const body = await request.json();
    const book = body.book;

    const { data, error } = await supabase.from("libro").insert(book);

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return new Response(JSON.stringify(data), { status: 201 });
}
