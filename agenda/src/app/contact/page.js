"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ListContact() {
    const [contacts, setContacts] = useState([]);

    async function fetchContacts() {
        const response = await fetch("/api/contact");
        const body = await response.json();
        setContacts(body);
    }

    useEffect(() => {
        fetchContacts();
    }, []);

    async function deleteContact(idDelete) {
        if (window.confirm("¿Desea eliminar el contacto?")) {
            const response = await fetch("/api/contact", {
                method: "DELETE",
                headers: { "Content-Type": "application-json" },
                body: JSON.stringify({ id: idDelete }),
            });

            fetchContacts();
        }
    }

    return (
        <div>
            <h1>Lista de Contactos</h1>
            {contacts.map((contact) => (
                <p key={contact.id}>
                    <Link href={"/contact/" + contact.id}>
                        {contact.nombre} {contact.apellidos}
                    </Link>
                    <button
                        onClick={() => deleteContact(contact.id)}
                        className="delete"
                    >
                        Eliminar
                    </button>
                </p>
            ))}
            <button id="add-contact">
                <Link href={"/contact/create"}>Agregar contacto</Link>
            </button>
        </div>
    );
}
