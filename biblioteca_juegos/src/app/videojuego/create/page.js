"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateContact() {
    const [titulo, setTitulo] = useState("");
    const [plataforma, setPlataforma] = useState("");
    const [genero, setGenero] = useState("");
    const [fechaLanzamiento, setFechaLanzamiento] = useState("");
    const [estado, setEstado] = useState(false);
    const router = useRouter();

    function volver() {
        router.push("/videojuego");
    }

    async function anadirVideojuego(e) {
        e.preventDefault();

        if (titulo === "") {
            alert("El campo del titulo esta vacio. Completelo");
            return;
        }

        if (plataforma === "") {
            alert("El campo de la plataforma esta vacio. Completelo");
            return;
        }

        if (genero === "") {
            alert("El campo del genero esta vacio. Completelo");
            return;
        }

        if (fechaLanzamiento === "") {
            alert("El campo de la fecha esta vacio. Completelo");
            return;
        }

        const response = await fetch("/api/videojuego", {
            method: "POST",
            headers: { "Content-Type": "application-json" },
            body: JSON.stringify({
                videojuego: {
                    titulo: titulo,
                    plataforma: plataforma,
                    genero: genero,
                    fecha_lanzamiento: fechaLanzamiento,
                    completado: estado,
                },
            }),
        });

        if (response.ok) {
            alert("Contacto creado con exito!");
            volver();
        }
    }

    return (
        <div>
            <h1>Añadir videojuego</h1>
            <form onSubmit={(e) => anadirVideojuego(e)}>
                <label>Titulo</label>
                <input
                    type="text"
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />
                <br />
                <label>Plataforma</label>
                <input
                    type="text"
                    onChange={(e) => setPlataforma(e.target.value)}
                    required
                />
                <br />
                <label>Genero</label>
                <input
                    type="text"
                    onChange={(e) => setGenero(e.target.value)}
                    required
                />
                <br />
                <label>Fecha de lanzamiento</label>
                <input
                    type="date"
                    onChange={(e) => setFechaLanzamiento(e.target.value)}
                    required
                />
                <br />
                <label>Estado</label>
                <input
                    type="checkbox"
                    onChange={(e) => setEstado(e.target.value)}
                    required
                />
                <br />
                <br />
                <input type="submit" value="Añadir videojuego" />
                <br />
                <br />
            </form>
        </div>
    );
}
