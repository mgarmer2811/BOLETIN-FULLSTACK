"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ListVideojuegos() {
    const [videojuegos, setVideojuegos] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchVideojuegos();
    }, []);

    async function fetchVideojuegos() {
        const response = await fetch("/api/videojuego");
        const body = await response.json();
        setVideojuegos(body);
    }

    async function eliminarVideojuego(idEliminar) {
        if (window.confirm("Desea eliminar el videojuego?")) {
            const response = await fetch("/api/videojuego", {
                method: "DELETE",
                headers: { "Content-Type": "application-json" },
                body: JSON.stringify({ id: idEliminar }),
            });

            if (response.ok) {
                alert("Se ha eliminado el videojuego con exito!");
            }
            fetchVideojuegos();
        }
    }

    function irAnadir() {
        router.push("/videojuego/create");
    }

    if (videojuegos.length == 0) {
        return (
            <div>
                <h1>NO HAY VIDEOJUEGOS EN LA LISTA</h1>
                <br />
                <br />
                <button onClick={irAnadir}>Añadir videojuego</button>
            </div>
        );
    }

    return (
        <div>
            <h1>Lista de videojuegos</h1>
            {videojuegos.map((videojuego) => (
                <div key={videojuego.id}>
                    <Link href={"/videojuego/" + videojuego.id}>
                        <div>
                            <p>
                                <b>TITULO:</b> {videojuego.titulo}
                            </p>
                            <p>
                                <b>PLATAFORMA:</b> {videojuego.plataforma}
                            </p>
                        </div>
                    </Link>
                    <button onClick={() => eliminarVideojuego(videojuego.id)}>
                        <b>Eliminar</b>
                    </button>
                </div>
            ))}
            <br />
            <br />
            <button onClick={irAnadir}>Añadir videojuego</button>
        </div>
    );
}
