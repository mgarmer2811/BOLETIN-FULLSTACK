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

    async function createContact(e) {
        e.preventDefault();
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

        const regexEmail = new RegExp(
            "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
        );

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

        if (response.ok) {
            alert("Contacto creado con exito!");
        }
        forceRender();
    }

    /**
     * Hay un bug en el que el formulario se envia 2 veces. Para evitar esto, si el
     * usuario quiere seguir agregando personas lo que hago es forzar un renderizado
     * completo de la pagina. (Me he inventado esta solucion porque no he encontrado
     * nada al respecto)
     */
    function forceRender() {
        window.location.reload();
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
                />
                <br />
                <label>Apellidos</label>
                <input
                    type="text"
                    onChange={(e) => setSurname(e.target.value)}
                    required
                />
                <br />
                <label>Correo</label>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label>Telefono</label>
                <input
                    type="text"
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    pattern="[0-9]{9}"
                />
                <br />
                <label>Fecha de nacimiento</label>
                <input
                    type="date"
                    onChange={(e) => setBirthdate(e.target.value)}
                />
                <br />
                <div className="button-container">
                    <input
                        type="submit"
                        value="Añadir contacto"
                        className="add-contact"
                    />
                    <button
                        onClick={() => router.push("/contact")}
                        className="return"
                    >
                        Volver a la agenda
                    </button>
                </div>
            </form>
        </div>
    );
}
