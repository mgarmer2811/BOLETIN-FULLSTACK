"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateBook() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [isRead, setIsRead] = useState(false);
    const router = useRouter();

    async function createBook(e) {
        e.preventDefault();

        const response = await fetch("/api/book", {
            method: "POST",
            headers: { "Content-Type": "application-json" },
            body: JSON.stringify({
                book: {
                    titulo: title,
                    autor: author,
                    leido: isRead,
                },
            }),
        });

        if (response.ok) {
            alert("Libro creado con exito");
        }
    }

    return (
        <div>
            <h1>Añadir Libro</h1>
            <form onSubmit={(e) => createBook(e)}>
                <label>Titulo</label>
                <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <br />
                <label>Autor</label>
                <input
                    type="text"
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
                <br />
                <label>Ya lo has leido?</label>
                <input
                    type="checkbox"
                    onChange={(e) => setIsRead(e.target.value)}
                />
                <br />
                <br />
                <input type="submit" value="Añadir Libro" />
            </form>
            <br />
            <br />
            <button onClick={() => router.push("/book")}>Volver a Lista</button>
        </div>
    );
}
