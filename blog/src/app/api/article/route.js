import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dgaetvqmdipxemlrrtue.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnYWV0dnFtZGlweGVtbHJydHVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczOTc0MDEsImV4cCI6MjA1Mjk3MzQwMX0.ie7j4mHAISDV7T0Ilo17y5MNPvQ36Gql_ngbVavccp8"
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(){
    const {data : articles, error} = await supabase.from("articulo").select("*").order("fecha_publicacion");
    
    if(error){
        return new Response(JSON.stringify(error),{status:500})
    }
    return new Response(JSON.stringify(articles),{status:200})
}

export async function DELETE(request){
    const body = await request.json();
    const id = body.id;

    const { data: deleteData, error} = await supabase.from("articulo").delete().eq("id",id);
    
    if(error){
        return new Response(JSON.stringify(error),{status:500});
    }
    return new Response(JSON.stringify({success:"Deletion Succesful!"}),{status:200});
}