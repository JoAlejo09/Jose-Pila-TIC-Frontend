import { useEffect, useState } from "react";

import {
    ArrowLeft,
    CheckCircle,
    XCircle,
    Clock3
} from "lucide-react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    obtenerResultadoPorIdRequest
} from "../../../services/resultadoService.js";

const DetalleResultado = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [resultado, setResultado] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // OBTENER RESULTADO
    useEffect(() => {

        const obtenerResultado = async () => {

            try {

                setLoading(true);

                const data =
                    await obtenerResultadoPorIdRequest(id);

                setResultado(data);

            } catch (error) {

                console.log(error);

                setError(
                    error?.response?.data?.msg ||
                    "Error al obtener resultado"
                );

            } finally {

                setLoading(false);

            }

        };

        obtenerResultado();

    }, [id]);


    // LOADING
    if (loading) {

        return (

            <div className="min-h-screen bg-gray-50 p-6">

                <div className="
                    bg-white rounded-2xl
                    shadow-sm p-8 text-center
                ">

                    <p className="text-lg text-gray-600">
                        Cargando resultado...
                    </p>

                </div>

            </div>

        );

    }


    // ERROR
    if (error) {

        return (

            <div className="min-h-screen bg-gray-50 p-6">

                <div className="
                    bg-white rounded-2xl
                    shadow-sm p-8 text-center
                ">

                    <p className="text-red-500 text-lg">
                        {error}
                    </p>

                </div>

            </div>

        );

    }


    // NO EXISTE
    if (!resultado) {

        return (

            <div className="p-6">
                Resultado no encontrado
            </div>

        );

    }


    return (

        <div className="min-h-screen bg-gray-50 p-6">

            <div className="max-w-6xl mx-auto">


                {/* BOTON VOLVER */}
                <button
                    onClick={() =>
                        navigate(
                            "/dashboard/estudiante/resultados"
                        )
                    }
                    className="
                        mb-6 flex items-center
                        gap-2 text-gray-600
                        hover:text-blue-600
                        transition-all
                    "
                >

                    <ArrowLeft size={20} />

                    Volver a resultados

                </button>


                {/* HEADER */}
                <div className="
                    bg-white rounded-3xl
                    shadow-sm p-8 mb-8
                ">

                    <div className="
                        flex justify-between
                        items-start flex-wrap
                        gap-4
                    ">

                        <div>

                            <h1 className="
                                text-4xl font-bold
                                text-gray-800
                            ">

                                {
                                    resultado.cuestionario?.titulo
                                }

                            </h1>

                            <p className="
                                text-gray-500 mt-2
                            ">

                                {
                                    resultado.cuestionario
                                        ?.materia?.nombre
                                }

                            </p>


                            {/* TEMA */}
                            <span className="
                                inline-block mt-4
                                bg-slate-100
                                text-slate-700
                                px-4 py-2
                                rounded-xl text-sm
                            ">

                                {
                                    resultado.cuestionario
                                        ?.tema?.nombre
                                        || "Sin tema"
                                }

                            </span>

                        </div>


                        {/* ESTADO */}
                        <span className={`
                            px-5 py-3 rounded-2xl
                            text-sm font-semibold

                            ${
                                resultado.aprobado
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }
                        `}>

                            {
                                resultado.aprobado
                                    ? "APROBADO"
                                    : "REPROBADO"
                            }

                        </span>

                    </div>

                </div>


                {/* ESTADISTICAS */}
                <div className="
                    grid md:grid-cols-5
                    gap-5 mb-8
                ">

                    {/* PORCENTAJE */}
                    <div className="
                        bg-blue-100 rounded-3xl
                        p-6 text-center
                    ">

                        <h2 className="
                            text-4xl font-bold
                            text-blue-700
                        ">

                            {resultado.porcentaje}%

                        </h2>

                        <p className="
                            text-blue-700 mt-2
                        ">
                            Puntaje
                        </p>

                    </div>


                    {/* CORRECTAS */}
                    <div className="
                        bg-green-100 rounded-3xl
                        p-6 text-center
                    ">

                        <h2 className="
                            text-4xl font-bold
                            text-green-700
                        ">

                            {
                                resultado.correctas
                            }

                        </h2>

                        <p className="
                            text-green-700 mt-2
                        ">
                            Correctas
                        </p>

                    </div>


                    {/* INCORRECTAS */}
                    <div className="
                        bg-red-100 rounded-3xl
                        p-6 text-center
                    ">

                        <h2 className="
                            text-4xl font-bold
                            text-red-700
                        ">

                            {
                                resultado.incorrectas
                            }

                        </h2>

                        <p className="
                            text-red-700 mt-2
                        ">
                            Incorrectas
                        </p>

                    </div>


                    {/* SIN RESPONDER */}
                    <div className="
                        bg-gray-200 rounded-3xl
                        p-6 text-center
                    ">

                        <h2 className="
                            text-4xl font-bold
                            text-gray-700
                        ">

                            {
                                resultado.sinResponder
                            }

                        </h2>

                        <p className="
                            text-gray-700 mt-2
                        ">
                            Sin responder
                        </p>

                    </div>


                    {/* TIEMPO */}
                    <div className="
                        bg-orange-100 rounded-3xl
                        p-6 text-center
                    ">

                        <h2 className="
                            text-4xl font-bold
                            text-orange-700
                        ">

                            {
                                Math.floor(
                                    resultado.tiempoEmpleado / 60
                                )
                            } min

                        </h2>

                        <p className="
                            text-orange-700 mt-2
                        ">
                            Tiempo
                        </p>

                    </div>

                </div>


                {/* RESPUESTAS */}
                <div className="space-y-6">

                    {
                        resultado.respuestas?.map(
                            (respuesta, index) => (

                                <div
                                    key={respuesta._id || index}
                                    className={`
                                        bg-white rounded-3xl
                                        shadow-sm p-8
                                        border-l-[10px]
                                        transition-all

                                        ${
                                            respuesta.esCorrecta
                                                ? "border-green-500"
                                                : respuesta.respuestaUsuario
                                                    ? "border-red-500"
                                                    : "border-gray-400"
                                        }
                                    `}
                                >

                                    {/* HEADER */}
                                    <div className="
                                        flex justify-between
                                        items-start flex-wrap
                                        gap-4 mb-6
                                    ">

                                        <div>

                                            <h2 className="
                                                text-2xl font-bold
                                                text-gray-800
                                            ">
                                                Pregunta {index + 1}
                                            </h2>

                                            <p className="
                                                text-gray-600
                                                mt-3 leading-relaxed
                                                text-lg
                                            ">

                                                {
                                                    respuesta.pregunta
                                                        ?.enunciado
                                                }

                                            </p>

                                        </div>


                                        {/* ESTADO */}
                                        <span className={`
                                            px-4 py-2 rounded-xl
                                            text-sm font-semibold
                                            flex items-center gap-2

                                            ${
                                                respuesta.esCorrecta
                                                    ? "bg-green-100 text-green-700"
                                                    : respuesta.respuestaUsuario
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-gray-200 text-gray-700"
                                            }
                                        `}>

                                            {
                                                respuesta.esCorrecta
                                                    ? <CheckCircle size={18} />
                                                    : respuesta.respuestaUsuario
                                                        ? <XCircle size={18} />
                                                        : <Clock3 size={18} />
                                            }

                                            {
                                                respuesta.esCorrecta
                                                    ? "Correcta"
                                                    : respuesta.respuestaUsuario
                                                        ? "Incorrecta"
                                                        : "Sin responder"
                                            }

                                        </span>

                                    </div>


                                    {/* CONTENIDO */}
                                    <div className="space-y-5">


                                        {/* RESPUESTA USUARIO */}
                                        <div>

                                            <p className="
                                                font-semibold
                                                text-gray-700 mb-2
                                            ">
                                                Tu respuesta
                                            </p>

                                            <div className={`
                                                rounded-2xl p-4
                                                border

                                                ${
                                                    respuesta.esCorrecta
                                                        ? "bg-green-50 border-green-200 text-green-700"
                                                        : respuesta.respuestaUsuario
                                                            ? "bg-red-50 border-red-200 text-red-700"
                                                            : "bg-gray-100 border-gray-300 text-gray-500"
                                                }
                                            `}>

                                                {
                                                    respuesta.respuestaUsuario
                                                    || "No respondiste esta pregunta"
                                                }

                                            </div>

                                        </div>


                                        {/* RESPUESTA CORRECTA */}
                                        <div>

                                            <p className="
                                                font-semibold
                                                text-gray-700 mb-2
                                            ">
                                                Respuesta correcta
                                            </p>

                                            <div className="
                                                bg-green-50 border
                                                border-green-200
                                                rounded-2xl p-4
                                                text-green-700
                                            ">

                                                {
                                                    respuesta.pregunta
                                                        ?.respuestaCorrecta
                                                }

                                            </div>

                                        </div>


                                        {/* EXPLICACION */}
                                        {
                                            respuesta.pregunta?.explicacion
                                            &&
                                            <div>

                                                <p className="
                                                    font-semibold
                                                    text-gray-700 mb-2
                                                ">
                                                    Explicación
                                                </p>

                                                <div className="
                                                    bg-blue-50 border
                                                    border-blue-200
                                                    rounded-2xl p-5
                                                    text-gray-700
                                                    leading-relaxed
                                                ">

                                                    {
                                                        respuesta.pregunta
                                                            ?.explicacion
                                                    }

                                                </div>

                                            </div>
                                        }

                                    </div>

                                </div>

                            )
                        )
                    }

                </div>

            </div>

        </div>

    );

};

export default DetalleResultado;