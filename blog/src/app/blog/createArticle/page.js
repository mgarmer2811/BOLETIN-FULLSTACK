"use client";

import { useState } from "react";
import Link from "next/link";

export default function createArticle() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");

    async function createArticle(event) {
        event.preventDefault();

        if (title === "") {
            alert("El articulo DEBE tener un titulo");
            return;
        }
        if (content === "") {
            alert("El articulo DEBE contener informacion");
            return;
        }
        if (author === "") {
            alert("El articulo DEBE tener un autor");
            return;
        }

        if (title.length > 150) {
            alert("El titulo NO puede superar los 150 caracteres");
            return;
        }

        const currentDateTime = new Date().toISOString();
        const response = await fetch("/api/article/singleArticle", {
            method: "POST",
            headers: { ContentType: "application-json" },
            body: JSON.stringify({
                article: {
                    titulo: title,
                    contenido: content,
                    autor: author,
                    fecha_publicacion: currentDateTime,
                },
            }),
        });
    }

    return (
        <div>
            <h1>Añadir articulo</h1>
            <form onSubmit={createArticle}>
                <label>Titulo</label>
                <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={150}
                    required
                />
                <br />
                <label>Informacion</label>
                <input
                    type="text"
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <br />
                <label>Autor</label>
                <input
                    type="text"
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
                <input type="submit" value="Enviar" />
            </form>
            <br />
            <br />
            <button>
                <Link href={"/blog"}>
                    <b>VOLVER A INICIO</b>
                </Link>
            </button>
        </div>
    );
}
