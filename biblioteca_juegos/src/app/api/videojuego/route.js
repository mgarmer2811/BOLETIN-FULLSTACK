import supabase from "../../supabase";

export async function GET() {
    const { data: videojuegos, error } = await supabase
        .from("videojuego")
        .select("*")
        .order("titulo");

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return new Response(JSON.stringify(videojuegos), { status: 200 });
}

export async function DELETE(request) {
    const body = await request.json();
    const id = body.id;

    const { data: deleteData, error } = await supabase
        .from("videojuego")
        .delete()
        .eq("id", id);

    if (error) {
        return new Response(JSON.stringify(error), { status: 404 });
    }

    return new Response(JSON.stringify({ sucess: "Borrado con exito!" }), {
        status: 200,
    });
}

export async function POST(request) {
    const body = await request.json();
    const videojuego = body.videojuego;
    const { data: createData, error } = await supabase
        .from("videojuego")
        .insert(videojuego);

    if (error) {
        return new Response(JSON.stringify(error), { status: 400 });
    }
    return new Response(
        JSON.stringify(
            { sucess: "Videojuego añadido con exito!" },
            { status: 201 }
        )
    );
}

export async function PUT(request) {
    const body = await request.json();
    const id = body.id;

    const { data: updateData, error } = await supabase
        .from("videojuego")
        .update(body.actualizacion)
        .eq("id", id);

    if (error) {
        return new Response(JSON.stringify(error), { status: 404 });
    }
    return new Response(
        JSON.stringify(
            { sucess: "Actualizacion realizada con exito!" },
            { status: 200 }
        )
    );
}
