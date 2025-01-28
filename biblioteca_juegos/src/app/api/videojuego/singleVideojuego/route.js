import supabase from "../../../supabase";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const { data: videojuego, error } = await supabase
        .from("videojuego")
        .select("*")
        .eq("id", id)
        .single();

    return new Response(JSON.stringify(videojuego), { status: 200 });
}
