"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function EventList() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    async function fetchEvents() {
        const today = new Date().toISOString().split("T")[0];
        const response = await fetch("/api/event");
        const data = await response.json();

        const filteredData = data.filter((event) => event.fecha >= today);
        setEvents(filteredData);
    }

    return (
        <div>
            <h1>Próximos Eventos</h1>
            <div>
                {events.map((event) => (
                    <div key={event.id}>
                        <p className="header-2">
                            <Link href={"/event/" + event.id}>
                                {event.titulo}
                            </Link>
                        </p>
                        <p>
                            <strong>Descripción:</strong> {event.descripcion}
                        </p>
                        <p>
                            <strong>Fecha:</strong>{" "}
                            {new Date(event.fecha).toLocaleString()}
                        </p>
                        <p>
                            <strong>Ubicación:</strong> {event.ubicacion}
                        </p>
                        <p>
                            <strong>Asistentes:</strong> {event.asistentes}
                        </p>
                    </div>
                ))}
                <br />
                <br />
                <button>
                    <Link href="/event/create">Agregar nuevo evento</Link>
                </button>
            </div>
        </div>
    );
}
