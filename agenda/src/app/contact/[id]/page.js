"use client";
import { use } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Contact({ params }) {
    const { id } = use(params);
    const [contact, setContact] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const router = useRouter();

    async function updateContact(event) {
        event.preventDefault();

        const response = await fetch("/api/contact", {
            method: "PUT",
            headers: { "Content-Type": "application-json" },
            body: JSON.stringify({
                id: id,
                update: {
                    nombre: name,
                    apellidos: surname,
                    correo: email,
                    telefono: phone,
                    fecha_nacimiento: birthdate,
                },
            }),
        });
        fetchContact();
        setIsEditing(false);
    }

    async function fetchContact() {
        const url = "/api/contact/contactUser?id=" + id;
        const response = await fetch(url);
        const cont = await response.json();

        setName(cont.nombre);
        setSurname(cont.apellidos);
        setEmail(cont.correo);
        setPhone(cont.telefono);
        setBirthdate(cont.fecha_nacimiento);

        setContact(cont);
    }

    useEffect(() => {
        fetchContact();
    }, []);

    function returnBack() {
        router.push("/contact");
    }

    if (contact && !isEditing) {
        return (
            <div>
                <h1>
                    {contact.nombre} {contact.apellidos}
                </h1>
                <p>{contact.correo}</p>
                <p>{contact.telefono}</p>
                <p>{contact.fecha_nacimiento}</p>
                <button onClick={() => setIsEditing(true)}>Modificar</button>
                <br />
                <br />
                <button onClick={returnBack}>Volver a la agenda</button>
            </div>
        );
    } else if (contact && isEditing) {
        return (
            <div>
                <h1>Editando contacto</h1>
                <form onSubmit={(event) => updateContact(event)}>
                    <label>Nombre</label>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        required
                        value={name}
                    ></input>
                    <br />
                    <label>Apellidos</label>
                    <input
                        type="text"
                        onChange={(e) => setSurname(e.target.value)}
                        required
                        value={surname}
                    ></input>
                    <br />
                    <label>Correo</label>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    ></input>
                    <br />
                    <label>Telefono</label>
                    <input
                        type="text"
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        pattern="[0-9]{9}"
                        value={phone}
                    ></input>
                    <br />
                    <label>Fecha de nacimiento</label>
                    <input
                        type="date"
                        onChange={(e) => setBirthdate(e.target.value)}
                        value={birthdate}
                    ></input>
                    <br />
                    <input type="submit" value="Confirmar"></input>
                </form>
            </div>
        );
    } else {
        return <h1>Cargando, ten paciencia bro</h1>;
    }
}
