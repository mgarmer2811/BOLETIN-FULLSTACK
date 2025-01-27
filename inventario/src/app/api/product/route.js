import supabase from "../../../supabase";

export async function GET() {
    const { data: products, error } = await supabase
        .from("producto")
        .select("*")
        .order("nombre");

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return new Response(JSON.stringify(products), { status: 200 });
}

export async function POST(request) {
    const body = await request.json();
    const product = body.product;
    const { data: createProduct, error } = await supabase
        .from("producto")
        .insert(product);

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return new Response(
        JSON.stringify(
            { success: "Producto creado con exito!" },
            { status: 201 }
        )
    );
}

export async function PATCH(request) {
    const { id, stock } = await request.json(); // lo mismo que hacer: const body = await request.json()       const id = body.id      const stock = body.stock

    if (typeof stock !== "number" || stock < 0) {
        return new Response(
            JSON.stringify({
                error: "Stock invalido. Debe ser un numero mayor o igual que 0",
            }),
            { status: 500 }
        );
    }

    const { data, error } = await supabase
        .from("producto")
        .update({ stock })
        .eq("id", id);

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return new Response(JSON.stringify(data), { status: 200 });
}
