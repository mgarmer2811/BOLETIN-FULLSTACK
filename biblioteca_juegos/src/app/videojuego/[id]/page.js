"use client";

import { use } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VideoJuegoDetalles({ params }) {
    const { id } = use(params);
    const [videojuego, setVideojuego] = useState(null);
    const [titulo, setTitulo] = useState("");
    const [plataforma, setPlataforma] = useState("");
    const [genero, setGenero] = useState("");
    const [fechaLanzamiento, setFechaLanzamiento] = useState("");
    const [estado, setEstado] = useState(false);
    const [editando, setEditando] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchVideojuego();
    }, []);

    async function fetchVideojuego() {
        const url = "/api/videojuego/singleVideojuego?id=" + id;
        const response = await fetch(url);
        const data = await response.json();

        setTitulo(data.titulo);
        setPlataforma(data.plataforma);
        setGenero(data.genero);
        setFechaLanzamiento(data.fecha_lanzamiento);
        setEstado(data.completado);

        setVideojuego(data);
    }

    async function actualizarVideojuego(e) {
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
            method: "PUT",
            headers: { "Content-Type": "application-json" },
            body: JSON.stringify({
                id: id,
                actualizacion: {
                    titulo: titulo,
                    plataforma: plataforma,
                    genero: genero,
                    fecha_lanzamiento: fechaLanzamiento,
                    completado: estado,
                },
            }),
        });
        fetchVideojuego();
        setEditando(false);
    }

    function volver() {
        router.push("/videojuego");
    }

    if (!videojuego) {
        return <p>Cargando detalles del videojuego...</p>;
    } else if (videojuego && !editando) {
        return (
            <div>
                <p>
                    <b>TITULO:</b> {videojuego.titulo}
                </p>
                <p>
                    <b>PLATAFORMA:</b> {videojuego.plataforma}
                </p>
                <p>
                    <b>GENERO:</b> {videojuego.genero}
                </p>
                <p>
                    <b>FECHA DE LANZAMIENTO: </b> {videojuego.fecha_lanzamiento}
                </p>
                <p>
                    <b>ESTADO: </b>
                    {videojuego.completado ? "Completado" : "No completado"}
                </p>
                <br />
                <button onClick={() => setEditando(true)}>Modificar</button>
                <button onClick={() => volver()}>Volver a Inicio</button>
            </div>
        );
    } else {
        return (
            <div>
                <h1>Editando videojuego</h1>
                <form onSubmit={(e) => actualizarVideojuego(e)}>
                    <label>Titulo</label>
                    <input
                        type="text"
                        onChange={(e) => setTitulo(e.target.value)}
                        defaultValue={titulo}
                        required
                    />
                    <br />
                    <label>Plataforma</label>
                    <input
                        type="text"
                        onChange={(e) => setPlataforma(e.target.value)}
                        defaultValue={plataforma}
                        required
                    />
                    <br />
                    <label>Genero</label>
                    <input
                        type="text"
                        onChange={(e) => setGenero(e.target.value)}
                        defaultValue={genero}
                        required
                    />
                    <br />
                    <label>Fecha de lanzamiento</label>
                    <input
                        type="date"
                        onChange={(e) => setFechaLanzamiento(e.target.value)}
                        defaultValue={fechaLanzamiento}
                        required
                    />
                    <br />
                    <label>Estado</label>
                    <input
                        type="checkbox"
                        onChange={(e) => setEstado(e.target.value)}
                        defaultChecked={estado}
                        required
                    />
                    <br />
                    <br />
                    <input type="submit" value="Guardar" />
                </form>
            </div>
        );
    }
}
