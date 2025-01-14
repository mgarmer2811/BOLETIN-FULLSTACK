"use client";
import { use } from "react";
import { useState, useEffect } from "react";

export default function Contact({ params }) {
    const { id } = use(params);
    const [contact, setContact] = useState();

    async function fetchContact() {
        const url = "/api/contact/contactUser?id=" + id;
        const response = await fetch(url);
        const cont = await response.json();

        setContact(cont);
    }

    useEffect(() => {
        fetchContact();
    }, []);

    while (!contact) {
        return <h1>Cargando, ten paciencia bro</h1>;
    }
    return (
        <div>
            <h1>
                {contact.nombre} {contact.apellidos}
            </h1>
            <p>{contact.correo}</p>
            <p>{contact.telefono}</p>
            <p>{contact.fecha_nacimiento}</p>
        </div>
    );
}
