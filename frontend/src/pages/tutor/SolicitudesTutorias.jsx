import { useEffect, useState } from "react";

import {
    obtenerTutoriasPendientesRequest,
    aceptarTutoriaRequest
}
from "../../services/tutoriaService.js";

const SolicitudesTutorias = () => {

    const [tutorias, setTutorias] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    // CARGAR TUTORIAS
    const cargarTutorias = async () => {

        try {

            setLoading(true);

            const data =
                await obtenerTutoriasPendientesRequest();

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

    // ACEPTAR TUTORIA
    const aceptarTutoria = async (id) => {

        try {

            await aceptarTutoriaRequest(id);

            cargarTutorias();

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.msg ||
                "Error al aceptar tutoría"
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

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h1 className="text-3xl font-bold">
                        Solicitudes de Tutorías
                    </h1>

                    <p className="text-gray-500">
                        Tutorías pendientes disponibles
                    </p>

                </div>

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

                        No existen tutorías pendientes

                    </div>

                ) : (

                    <div className="grid gap-5">

                        {
                            tutorias.map((tutoria) => (

                                <div
                                    key={tutoria._id}
                                    className="bg-white shadow rounded-xl p-6"
                                >

                                    <div className="flex justify-between items-start">

                                        <div className="space-y-2">

                                            <h2 className="text-xl font-bold">

                                                {tutoria.materia}

                                            </h2>

                                            <p>

                                                <span className="font-semibold">
                                                    Tema:
                                                </span>

                                                {" "}

                                                {tutoria.tema}

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
                                                    <p className="text-gray-600">

                                                        {
                                                            tutoria.descripcion
                                                        }

                                                    </p>
                                                )
                                            }

                                        </div>

                                        <button
                                            onClick={() =>
                                                aceptarTutoria(
                                                    tutoria._id
                                                )
                                            }
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                                        >

                                            Aceptar

                                        </button>

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

export default SolicitudesTutorias;