import { useEffect, useState } from "react";

import {
    obtenerTutoriasTutorRequest,
    finalizarTutoriaRequest,
    liberarTutoriaRequest
}
from "../../services/tutoriaService.js";

const TutoriasAsignadas = () => {

    const [tutorias, setTutorias] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    // CARGAR TUTORIAS
    const cargarTutorias = async () => {

        try {

            setLoading(true);

            const data =
                await obtenerTutoriasTutorRequest();

            setTutorias(data);

        } catch (error) {

            console.log(error);

            setError("Error al cargar tutorías");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        cargarTutorias();

    }, []);

    // MARCAR REALIZADA
    const marcarRealizada = async (id) => {

        const confirmar = window.confirm(
            "¿Marcar tutoría como realizada?"
        );

        if (!confirmar) return;

        try {

            await finalizarTutoriaRequest(id);

            cargarTutorias();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.msg ||
                "Error al actualizar tutoría"
            );

        }

    };

    // LIBERAR TUTORIA
    const liberarTutoria = async (id) => {

        const confirmar = window.confirm(
            "¿Desea liberar esta tutoría?"
        );

        if (!confirmar) return;

        try {

            await liberarTutoriaRequest(id);

            cargarTutorias();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.msg ||
                "Error al liberar tutoría"
            );

        }

    };

    if (loading) {

        return (
            <p className="text-center mt-10">
                Cargando tutorías...
            </p>
        );

    }

    return (

        <div className="p-6">

            <div className="mb-6">

                <h1 className="text-3xl font-bold">
                    Mis Tutorías
                </h1>

                <p className="text-gray-500">
                    Tutorías aceptadas y realizadas
                </p>

            </div>

            {
                error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded mb-4">

                        {error}

                    </div>
                )
            }

            {
                tutorias.length === 0 ? (

                    <div className="bg-white shadow rounded-xl p-6 text-center text-gray-500">

                        No tienes tutorías asignadas

                    </div>

                ) : (

                    <div className="grid gap-5">

                        {
                            tutorias.map((tutoria) => (

                                <div
                                    key={tutoria._id}
                                    className="bg-white shadow rounded-xl p-6"
                                >

                                    <div className="flex justify-between items-start gap-4">

                                        <div className="space-y-2 flex-1">

                                            <div className="flex items-center gap-3">

                                                <h2 className="text-xl font-bold">

                                                    {tutoria.materia}

                                                </h2>

                                                <span
                                                    className={`px-3 py-1 rounded-full text-sm text-white
                                                    ${
                                                        tutoria.estado === "aceptada"
                                                        ? "bg-blue-600"
                                                        : "bg-green-600"
                                                    }`}
                                                >

                                                    {tutoria.estado}

                                                </span>

                                            </div>

                                            <p>

                                                <span className="font-semibold">
                                                    Tema:
                                                </span>

                                                {" "}

                                                {tutoria.tema}

                                            </p>

                                            <p>

                                                <span className="font-semibold">
                                                    Estudiante:
                                                </span>

                                                {" "}

                                                {
                                                    tutoria.estudiante?.nombre
                                                }

                                                {" "}

                                                {
                                                    tutoria.estudiante?.apellido
                                                }

                                            </p>

                                            <p>

                                                <span className="font-semibold">
                                                    Modalidad:
                                                </span>

                                                {" "}

                                                {tutoria.modalidad}

                                            </p>

                                            <p>

                                                <span className="font-semibold">
                                                    Fecha:
                                                </span>

                                                {" "}

                                                {
                                                    new Date(
                                                        tutoria.fecha
                                                    ).toLocaleString()
                                                }

                                            </p>

                                            <p>

                                                <span className="font-semibold">
                                                    Duración:
                                                </span>

                                                {" "}

                                                {tutoria.duracion} horas

                                            </p>

                                            {
                                                tutoria.descripcion && (
                                                    <div>

                                                        <p className="font-semibold">
                                                            Descripción:
                                                        </p>

                                                        <p className="text-gray-600">

                                                            {
                                                                tutoria.descripcion
                                                            }

                                                        </p>

                                                    </div>
                                                )
                                            }

                                            {
                                            tutoria.observacionTutor && (
                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                                                <p className="font-semibold">
                                                    Observación del Tutor:
                                                </p>
                                                <p className="text-gray-700">
                                                    {
                                                    tutoria.observacionTutor
                                                    }
                                                </p>
                                                </div>
                                            )
                                            }
                                            {
                                            tutoria.calificacion && (
                                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-3">
                                                <p className="font-semibold">
                                                    Calificación recibida
                                                </p>
                                                <p className="mt-1">
                                                    ⭐ {tutoria.calificacion}/5
                                                </p>
                                                {
                                                tutoria.comentarioCalificacion && (
                                                <p className="text-gray-700 mt-2">
                                                    {
                                                    tutoria.comentarioCalificacion
                                                    }
                                                </p>
                                                )
                                                }
                                            </div>
                                            )
                                            }
                                            {
                                                tutoria.calificacion && (
                                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-3">

                                                        <p>

                                                            <span className="font-semibold">
                                                                Calificación:
                                                            </span>

                                                            {" "}

                                                            ⭐ {tutoria.calificacion}/5

                                                        </p>

                                                        {
                                                            tutoria.comentarioCalificacion && (
                                                                <p className="text-gray-600 mt-1">

                                                                    {
                                                                        tutoria.comentarioCalificacion
                                                                    }

                                                                </p>
                                                            )
                                                        }

                                                    </div>
                                                )
                                            }

                                        </div>

                                        {
                                            tutoria.estado === "aceptada" && (

                                                <div className="flex flex-col gap-2">

                                                    <button
                                                        onClick={() =>
                                                            marcarRealizada(
                                                                tutoria._id
                                                            )
                                                        }
                                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                                                    >

                                                        Marcar Realizada

                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            liberarTutoria(
                                                                tutoria._id
                                                            )
                                                        }
                                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                                    >

                                                        Liberar Tutoría

                                                    </button>

                                                </div>

                                            )
                                        }

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                )
            }

        </div>

    );

};

export default TutoriasAsignadas;