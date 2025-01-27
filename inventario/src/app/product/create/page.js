"use client";

import { useState } from "react";
import Link from "next/link";

export default function CreateProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");

    async function createProduct(e) {
        e.preventDefault();

        const response = await fetch("/api/product", {
            method: "POST",
            headers: { "Content-Type": "application-json" },
            body: JSON.stringify({
                product: {
                    nombre: name,
                    descripcion: description,
                    precio: price,
                    stock: stock,
                },
            }),
        });

        if (response.ok) {
            alert("Producto creado con exito!");
        }
    }

    return (
        <div>
            <h1>Añadir producto</h1>
            <form onSubmit={createProduct}>
                <label>Nombre</label>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <br />
                <label>Descripcion</label>
                <input
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <br />
                <label>Precio</label>
                <input
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                    step="0.01"
                    required
                />
                <br />
                <label>Stock</label>
                <input
                    type="number"
                    onChange={(e) => setStock(e.target.value)}
                    min="0"
                    required
                />
                <br />
                <input type="submit" value="Enviar" />
            </form>
            <br />
            <br />
            <button>
                <Link href={"/product"}>
                    <b>VOLVER A INICIO</b>
                </Link>
            </button>
        </div>
    );
}
