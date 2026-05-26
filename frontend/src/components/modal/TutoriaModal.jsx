import { useState } from "react";

import {
    crearTutoriaRequest,
    editarTutoriaRequest
}
from "../../services/tutoriaService.js";

const TutoriaModal = ({
    onClose,
    recargarTutorias,
    modo = "crear",
    tutoria = null
}) => {

    const [form, setForm] = useState({

        materia: tutoria?.materia || "",

        tema: tutoria?.tema || "",

        descripcion: tutoria?.descripcion || "",

        modalidad: tutoria?.modalidad || "videollamada",

        fecha: tutoria?.fecha
            ? new Date(tutoria.fecha)
                .toISOString()
                .slice(0,16)
            : "",

        duracion: tutoria?.duracion || 1

    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [msg, setMsg] = useState("");

    // CAMBIOS FORMULARIO
    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    // CREAR / EDITAR TUTORIA
    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setMsg("");

        try {

            setLoading(true);

            let data;

            if(modo === "editar"){

                data = await editarTutoriaRequest(
                    tutoria._id,
                    form
                );

            }else{

                data = await crearTutoriaRequest(form);

            }

            setMsg(data.msg);

            recargarTutorias();

            // LIMPIAR SOLO EN CREAR
            if(modo === "crear"){

                setForm({

                    materia:"",
                    tema:"",
                    descripcion:"",
                    modalidad:"videollamada",
                    fecha:"",
                    duracion:1

                });

            }

            setTimeout(() => {

                onClose();

            }, 1200);

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.msg ||
                (
                    modo === "editar"
                    ? "Error al editar tutoría"
                    : "Error al solicitar tutoría"
                )
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

            <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-8 relative max-h-[90vh] overflow-y-auto">

                {/* CERRAR */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
                >

                    ✕

                </button>

                {/* TITULO */}
                <h1 className="text-3xl font-bold mb-2">

                    {
                        modo === "editar"
                        ? "Editar Tutoría"
                        : "Solicitar Tutoría"
                    }

                </h1>

                {/* SUBTITULO */}
                <p className="text-gray-500 mb-6">

                    {
                        modo === "editar"
                        ? "Actualice la información de la tutoría."
                        : "Complete la información para solicitar una tutoría personalizada."
                    }

                </p>

                {/* ERROR */}
                {
                    error && (
                        <div className="bg-red-100 text-red-600 p-3 rounded mb-4">

                            {error}

                        </div>
                    )
                }

                {/* MENSAJE */}
                {
                    msg && (
                        <div className="bg-green-100 text-green-600 p-3 rounded mb-4">

                            {msg}

                        </div>
                    )
                }

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* MATERIA */}
                    <div>

                        <label className="block font-semibold mb-1">

                            Materia

                        </label>

                        <input
                            type="text"
                            name="materia"
                            value={form.materia}
                            onChange={handleChange}
                            placeholder="Ejemplo: Matemática"
                            className="w-full border p-3 rounded-lg"
                        />

                    </div>

                    {/* TEMA */}
                    <div>

                        <label className="block font-semibold mb-1">

                            Tema

                        </label>

                        <input
                            type="text"
                            name="tema"
                            value={form.tema}
                            onChange={handleChange}
                            placeholder="Ejemplo: Derivadas"
                            className="w-full border p-3 rounded-lg"
                        />

                    </div>

                    {/* DESCRIPCION */}
                    <div>

                        <label className="block font-semibold mb-1">

                            Descripción

                        </label>

                        <textarea
                            name="descripcion"
                            value={form.descripcion}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Explique las dificultades académicas"
                            className="w-full border p-3 rounded-lg"
                        />

                    </div>

                    {/* MODALIDAD */}
                    <div>

                        <label className="block font-semibold mb-1">

                            Modalidad

                        </label>

                        <select
                            name="modalidad"
                            value={form.modalidad}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                        >

                            <option value="videollamada">

                                Videollamada

                            </option>

                            <option value="ejercicios">

                                Ejercicios

                            </option>

                            <option value="presencial">

                                Presencial

                            </option>

                        </select>

                    </div>

                    {/* FECHA */}
                    <div>

                        <label className="block font-semibold mb-1">

                            Fecha y Hora

                        </label>

                        <input
                            type="datetime-local"
                            name="fecha"
                            value={form.fecha}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                        />

                    </div>

                    {/* DURACION */}
                    <div>

                        <label className="block font-semibold mb-1">

                            Duración (Horas)

                        </label>

                        <input
                            type="number"
                            min="1"
                            max="5"
                            name="duracion"
                            value={form.duracion}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                        />

                    </div>

                    {/* BOTONES */}
                    <div className="flex justify-end gap-3 pt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-100"
                        >

                            Cancelar

                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                        >

                            {
                                loading
                                ? (
                                    modo === "editar"
                                    ? "Guardando..."
                                    : "Solicitando..."
                                )
                                : (
                                    modo === "editar"
                                    ? "Guardar Cambios"
                                    : "Solicitar Tutoría"
                                )
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default TutoriaModal;