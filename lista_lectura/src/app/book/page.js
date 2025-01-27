"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ListBook() {
    const [books, setBooks] = useState([]);

    async function fetchBooks() {
        const response = await fetch("/api/book");
        const body = await response.json();
        setBooks(body);
    }

    useEffect(() => {
        fetchBooks();
    }, []);

    async function deleteBook(idDelete) {
        if (window.confirm("¿Desea eliminar el libro?")) {
            const response = await fetch("/api/book", {
                method: "DELETE",
                headers: { "Content-Type": "application-json" },
                body: JSON.stringify({ id: idDelete }),
            });
            fetchBooks();
        }
    }

    async function updateRead(idUpdate, newRead) {
        const response = await fetch("/api/book", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: idUpdate,
                read: newRead,
            }),
        });

        if (response.ok) {
            fetchProducts();
        } else {
            alert("Error al actualizar el estado de lectura");
        }
    }

    return (
        <div>
            <h1>Lista de Libros</h1>
            {books.map((book) => (
                <div key={book.id}>
                    <p>
                        <b>TITULO:</b> {book.titulo}
                    </p>
                    <p>
                        <b>AUTOR:</b>
                        {book.autor}
                    </p>
                    <input
                        type="checkbox"
                        onChange={(e) => updateRead(book.id, e.target.checked)}
                    />
                    <button onClick={() => deleteBook(book.id)}>
                        ELIMINAR
                    </button>
                </div>
            ))}
            <br />
            <br />
            <button>
                <Link href="/book/create">
                    <b>AÑADIR LIBRO</b>
                </Link>
            </button>
        </div>
    );
}
