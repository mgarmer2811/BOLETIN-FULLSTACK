"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateEvent() {
    const [newEvent, setNewEvent] = useState({
        titulo: "",
        descripcion: "",
        fecha: new Date().toISOString().split("T")[0],
        ubicacion: "",
    });
    const router = useRouter();

    function handleInputChange(e) {
        setNewEvent({
            ...newEvent,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const today = new Date().toISOString().split("T")[0];
        if (newEvent.fecha < today) {
            alert("La fecha debe ser futura.");
            return;
        }

        const response = await fetch("/api/event", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newEvent),
        });

        if (response.ok) {
            alert("Evento creado con éxito!");
            router.push("/event");
        } else {
            alert("Hubo un error al crear el evento.");
        }
    }

    return (
        <div>
            <h1>Crear Nuevo Evento</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Título:
                    <input
                        type="text"
                        name="titulo"
                        value={newEvent.titulo}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Descripción:
                    <textarea
                        name="descripcion"
                        value={newEvent.descripcion}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Fecha:
                    <input
                        type="date"
                        name="fecha"
                        value={newEvent.fecha}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Ubicación:
                    <input
                        type="text"
                        name="ubicacion"
                        value={newEvent.ubicacion}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <br />
                <button type="submit">Crear Evento</button>
            </form>
        </div>
    );
}
