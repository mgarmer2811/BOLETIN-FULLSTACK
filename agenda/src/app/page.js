"use client"
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    
    return (
        <div>
            <h1>Bro, esta es la pagina principal</h1>
            <br />
            <br />
            <button onClick={() => router.push("/contact")}>Ir a la agenda de contactos</button>
        </div>
    );
}
