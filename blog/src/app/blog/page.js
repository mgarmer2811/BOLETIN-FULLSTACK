"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function articleList() {
    const [articles, setarticles] = useState([]);

    useEffect(() => {
        fetchArticles();
    }, []);

    async function fetchArticles() {
        const response = await fetch("/api/article");
        const body = await response.json();
        setarticles(body);
    }

    async function deleteArticle(idDelete) {
        if (window.confirm("Desea eliminar este articulo del blog?")) {
            const response = await fetch("api/article", {
                method: "DELETE",
                headers: { ContentType: "application-json" },
                body: JSON.stringify({ id: idDelete }),
            });
            fetchArticles();
        }
    }

    return (
        <div>
            <h1>Noticias del día</h1>
            {articles.map((article) => (
                <article key={article.id}>
                    <h2>
                        <Link href={"/blog/" + article.id}>
                            {article.titulo}
                        </Link>
                    </h2>
                    <p>
                        <strong>Autor:</strong> {article.autor}
                    </p>
                    <p>
                        <strong>Fecha de Publicación:</strong>{" "}
                        {article.fecha_publicacion}
                    </p>
                    <button onClick={() => deleteArticle(article.id)}>
                        <strong>ELIMINAR</strong>
                    </button>
                </article>
            ))}
            <br />
            <br />
            <button>
                <Link href={"/blog/createArticle"}>
                    <b>ENVIAR ARTICULO</b>
                </Link>
            </button>
        </div>
    );
}
