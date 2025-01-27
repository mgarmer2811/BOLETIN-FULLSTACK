"use client";

import { useState, useEffect } from "react";

export default function HabitList() {
    const [habits, setHabits] = useState([]);
    const [newHabit, setNewHabit] = useState({
        nombre: "",
        descripcion: "",
        fecha: new Date().toISOString().split("T")[0],
    });

    useEffect(() => {
        fetchHabits();
    }, []);

    async function fetchHabits() {
        const today = new Date().toISOString().split("T")[0];
        const response = await fetch("/api/habit");
        const data = await response.json();
        const filteredData = data.filter((habit) => habit.fecha === today);
        setHabits(filteredData);
    }

    async function handleCompletedChange(habit) {
        await fetch("/api/habit", {
            method: "PATCH",
            headers: { "Content-Type": "application-json" },
            body: JSON.stringify({
                id: habit.id,
                completed: !habit.completado,
            }),
        });
        fetchHabits();
    }

    async function handleDelete(idDelete) {
        const response = await fetch("/api/habit", {
            method: "DELETE",
            headers: { "Content-Type": "application-js" },
            body: JSON.stringify({ id: idDelete }),
        });

        fetchHabits();
    }

    async function handleAddHabit(e) {
        e.preventDefault();
        const today = new Date().toISOString().split("T")[0];
        if (newHabit.fecha < today) {
            alert("La fecha no puede estar en el pasado.");
            return;
        }

        await fetch("/api/habit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                habit: {
                    nombre: newHabit.nombre,
                    descripcion: newHabit.descripcion,
                    completado: newHabit.completado,
                    fecha: newHabit.fecha,
                },
            }),
        });
        fetchHabits();
        setNewHabit({
            nombre: "",
            descripcion: "",
            fecha: today,
        });
    }

    return (
        <div>
            <h1>Hábitos de Hoy</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Completado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {habits.map((habit) => (
                        <tr key={habit.id}>
                            <td>{habit.nombre}</td>
                            <td>{habit.descripcion}</td>
                            <td>
                                {!habit.completado && (
                                    <button
                                        onClick={() =>
                                            handleCompletedChange(habit)
                                        }
                                    >
                                        Marcar como completado
                                    </button>
                                )}
                                {habit.completado && <span>✔️</span>}
                            </td>
                            <td>
                                {habit.completado && (
                                    <button
                                        onClick={() => handleDelete(habit.id)}
                                    >
                                        Eliminar
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <br />
            <h2>Añadir Nuevo Hábito</h2>
            <form onSubmit={handleAddHabit}>
                <label>
                    Nombre:
                    <input
                        type="text"
                        value={newHabit.nombre}
                        onChange={(e) =>
                            setNewHabit({ ...newHabit, nombre: e.target.value })
                        }
                        required
                    />
                </label>
                <br />
                <label>
                    Descripción:
                    <input
                        type="text"
                        value={newHabit.descripcion}
                        onChange={(e) =>
                            setNewHabit({
                                ...newHabit,
                                descripcion: e.target.value,
                            })
                        }
                    />
                </label>
                <br />
                <label>
                    Fecha:
                    <input
                        type="date"
                        value={newHabit.fecha}
                        onChange={(e) =>
                            setNewHabit({ ...newHabit, fecha: e.target.value })
                        }
                        required
                    />
                </label>
                <br />
                <button type="submit">Añadir Hábito</button>
            </form>
        </div>
    );
}
