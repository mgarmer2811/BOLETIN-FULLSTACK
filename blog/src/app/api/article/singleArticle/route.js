import supabase from "../../../../supabase";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const { data: article, error } = await supabase
        .from("articulo")
        .select("*")
        .eq("id", id)
        .single();

    return new Response(JSON.stringify(article), { status: 200 });
}

export async function POST(request) {
    const body = await request.json();
    const article = body.article;
    const { data: createData, error } = await supabase
        .from("articulo")
        .insert(article);

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return new Response(
        JSON.stringify(
            { sucess: "Article created succesfully!" },
            { status: 201 }
        )
    );
}
