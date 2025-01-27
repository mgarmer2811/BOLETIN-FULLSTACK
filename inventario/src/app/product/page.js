"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ListProduct() {
    const [products, setProducts] = useState([]);
    const [isEditable, setIsEditable] = useState(false);

    async function fetchProducts() {
        const response = await fetch("/api/product");
        const body = await response.json();
        setProducts(body);
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    async function updateStock(idUpdate, newStock) {
        const response = await fetch("/api/product", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: idUpdate,
                stock: newStock,
            }),
        });

        if (response.ok) {
            fetchProducts();
        } else {
            alert("Error al actualizar el stock");
        }
    }

    const toggleEdit = () => {
        setIsEditable((prevState) => !prevState);
    };

    return (
        <div>
            <h1>Lista de productos</h1>
            <table>
                <thead>
                    <tr>
                        <th>NOMBRE</th>
                        <th>PRECIO</th>
                        <th>STOCK</th>
                        <th>ACTUALIZAR STOCK</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr
                            key={product.id}
                            className={
                                product.stock === 0 ? "out-of-stock" : ""
                            }
                        >
                            <td>{product.nombre}</td>
                            <td>{product.precio}</td>
                            <td>{product.stock}</td>
                            <td>
                                <input
                                    type="number"
                                    min="0"
                                    defaultValue={product.stock}
                                    onChange={(e) =>
                                        updateStock(
                                            product.id,
                                            Number(e.target.value)
                                        )
                                    }
                                    required
                                    disabled={!isEditable}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <br />
            <button onClick={toggleEdit}>
                {isEditable ? "Desactivar edición" : "Activar edición"}
            </button>

            <br />
            <br />
            <button>
                <Link href={"/product/create"}>
                    <b>AÑADIR PRODUCTO</b>
                </Link>
            </button>
        </div>
    );
}
