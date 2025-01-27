"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ListBook() {
    const [books, setBooks] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("all");

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
            await fetch("/api/book", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: idDelete }),
            });
            fetchBooks();
        }
    }

    async function updateRead(idUpdate, newRead) {
        const response = await fetch("/api/book", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: idUpdate,
                read: newRead,
            }),
        });

        if (response.ok) {
            fetchBooks();
        } else {
            alert("Error al actualizar el estado de lectura");
        }
    }

    return (
        <div>
            <h1>Lista de Libros</h1>

            <label htmlFor="filter">Mostrar:</label>
            <select
                id="filter"
                onChange={(e) => setSelectedFilter(e.target.value)}
            >
                <option value="all">Todos</option>
                <option value="read">Leídos</option>
                <option value="unread">No leídos</option>
            </select>

            {books
                .filter((book) => {
                    if (selectedFilter === "read") return book.leido;
                    if (selectedFilter === "unread") return !book.leido;
                    return true;
                })
                .map((book) => (
                    <div key={book.id}>
                        <p>
                            <b>TITULO:</b> {book.titulo}
                        </p>
                        <p>
                            <b>AUTOR:</b> {book.autor}
                        </p>
                        <label>
                            Leído:
                            <input
                                type="checkbox"
                                checked={book.leido}
                                onChange={(e) =>
                                    updateRead(book.id, e.target.checked)
                                }
                            />
                        </label>
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
