import supabase from "../../supabase";

export async function GET() {
    const { data: events, error } = await supabase.from("evento").select("*");

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return new Response(JSON.stringify(events), { status: 200 });
}

export async function POST(request) {
    const event = await request.json();

    const { data: createData, error } = await supabase
        .from("evento")
        .insert(event);

    if (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
    return new Response(JSON.stringify(createData), { status: 200 });
}
