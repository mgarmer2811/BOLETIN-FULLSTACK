"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateContact() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const router = useRouter();

    async function createContact(event) {
        event.preventDefault();
        if (name === "" && surname === "" && phone === "") {
            alert(
                "Alguno de los campos (nombre, apellidos, telefono) esta vacio"
            );
            return;
        }

        const regexPhone = new RegExp("[0-9]{9}");
        if (!regexPhone.test(phone)) {
            alert("El campo del telefono no tiene 9 digitos");
            return;
        }

        const regexEmail = new RegExp("^[^s@]+@[^s@]+\\.[^s@]+$", "i");
        if (!regexEmail.test(email)) {
            alert(
                "El campo del correo electronico no tiene el formato adecuado"
            );
            return;
        }

        const response = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application-json" },
            body: JSON.stringify({
                contact: {
                    nombre: name,
                    apellidos: surname,
                    correo: email,
                    telefono: phone,
                    fecha_nacimiento: birthdate,
                },
            }),
        });
    }

    return (
        <div>
            <h1>Añadir contacto</h1>
            <form onSubmit={createContact}>
                <label>Nombre</label>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    required
                ></input>
                <br />
                <label>Apellidos</label>
                <input
                    type="text"
                    onChange={(e) => setSurname(e.target.value)}
                    required
                ></input>
                <br />
                <label>Correo</label>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <br />
                <label>Telefono</label>
                <input
                    type="text"
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    pattern="[0-9]{9}"
                ></input>
                <br />
                <label>Fecha de nacimiento</label>
                <input
                    type="date"
                    onChange={(e) => setBirthdate(e.target.value)}
                ></input>
                <br />
            </form>
            <div className="button-container">
                <button type="submit" className="add-contact">
                    Añadir contacto
                </button>
                <button
                    onClick={() => router.push("/contact")}
                    className="return"
                >
                    Volver a la agenda
                </button>
            </div>
        </div>
    );
}
