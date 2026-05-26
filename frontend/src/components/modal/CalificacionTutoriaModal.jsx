import { useState } from "react";

import {
    calificarTutoriaRequest
}
from "../../services/tutoriaService.js";

const CalificacionTutoriaModal = ({
    tutoria,
    onClose,
    recargarTutorias
}) => {

    const [form, setForm] = useState({
        calificacion:5,
        comentarioCalificacion:""
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [msg, setMsg] = useState("");

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async(e)=>{

        e.preventDefault();

        setError("");

        setMsg("");

        try {

            setLoading(true);

            const data =
                await calificarTutoriaRequest(
                    tutoria._id,
                    form
                );

            setMsg(data.msg);

            recargarTutorias();

            setTimeout(()=>{

                onClose();

            },1200);

        } catch (error) {

            console.log(error);

            setError(
                error.response?.data?.msg ||
                "Error al calificar tutoría"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8 relative">

                {/* CERRAR */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black"
                >

                    ✕

                </button>

                <h2 className="text-2xl font-bold mb-2">

                    Calificar Tutoría

                </h2>

                <p className="text-gray-500 mb-6">

                    Evalúe la calidad de la tutoría recibida

                </p>

                {
                    error && (
                        <div className="bg-red-100 text-red-600 p-3 rounded mb-4">

                            {error}

                        </div>
                    )
                }

                {
                    msg && (
                        <div className="bg-green-100 text-green-600 p-3 rounded mb-4">

                            {msg}

                        </div>
                    )
                }

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* CALIFICACION */}
                    <div>

                        <label className="block font-semibold mb-1">

                            Calificación

                        </label>

                        <select
                            name="calificacion"
                            value={form.calificacion}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg"
                        >

                            <option value="5">
                                ⭐⭐⭐⭐⭐ Excelente
                            </option>

                            <option value="4">
                                ⭐⭐⭐⭐ Muy Buena
                            </option>

                            <option value="3">
                                ⭐⭐⭐ Buena
                            </option>

                            <option value="2">
                                ⭐⭐ Regular
                            </option>

                            <option value="1">
                                ⭐ Mala
                            </option>

                        </select>

                    </div>

                    {/* COMENTARIO */}
                    <div>

                        <label className="block font-semibold mb-1">

                            Comentario

                        </label>

                        <textarea
                            name="comentarioCalificacion"
                            value={form.comentarioCalificacion}
                            onChange={handleChange}
                            rows="4"
                            className="w-full border p-3 rounded-lg"
                            placeholder="Escriba un comentario opcional"
                        />

                    </div>

                    {/* BOTONES */}
                    <div className="flex justify-end gap-3">

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
                                ? "Guardando..."
                                : "Guardar Calificación"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default CalificacionTutoriaModal;