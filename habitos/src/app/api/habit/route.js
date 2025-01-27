import supabase from "../../supabase";

export async function GET() {
    const { data: habits, error } = await supabase.from("habito").select("*");

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return new Response(JSON.stringify(habits), { status: 200 });
}

export async function POST(request) {
    const body = await request.json();
    const habit = body.habit;

    const { data: createHabit, error } = await supabase
        .from("habito")
        .insert(habit);

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return new Response(
        JSON.stringify({ sucess: "Habito creado con exito" }, { status: 201 })
    );
}

export async function PATCH(request) {
    const { id, completed } = await request.json();

    const { data, error } = await supabase
        .from("habito")
        .update({ completado: completed })
        .eq("id", id);

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return new Response(JSON.stringify(data), { status: 200 });
}

export async function DELETE(request) {
    const body = await request.json();
    const id = body.id;

    const { data: deleteData, error } = await supabase
        .from("habito")
        .delete()
        .eq("id", id);

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return new Response(JSON.stringify(deleteData), { status: 200 });
}
