"use client";

import { use } from "react";
import { useState, useEffect } from "react";

export default function EventDetail({ params }) {
    const { id } = use(params);
    const [event, setEvent] = useState(null);

    useEffect(() => {
        fetchEventDetail();
    }, []);

    async function fetchEventDetail() {
        const url = "/api/event/singleEvent?id=" + id;
        const response = await fetch(url);
        const data = await response.json();
        setEvent(data);
    }

    function handleRegisterAttendance() {
        if (event) {
            const updatedEvent = { ...event, asistentes: event.asistentes + 1 };
            fetch("/api/event/singleEvent", {
                method: "PATCH",
                headers: { "Content-Type": "application-json" },
                body: JSON.stringify(updatedEvent),
            });
        }
    }

    if (!event) {
        return <p>Cargando evento...</p>;
    }

    return (
        <div>
            <h1>{event.titulo}</h1>
            <p>
                <strong>Descripción:</strong> {event.descripcion}
            </p>
            <p>
                <strong>Fecha:</strong> {new Date(event.fecha).toLocaleString()}
            </p>
            <p>
                <strong>Ubicación:</strong> {event.ubicacion}
            </p>
            <p>
                <strong>Asistentes:</strong> {event.asistentes}
            </p>
            <button onClick={handleRegisterAttendance}>
                Registrarse como asistente
            </button>
        </div>
    );
}
