import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { obtenerMiProgresoRequest } from "../../../services/progresoService.js";
import { obtenerUltimosResultadosRequest } from "../../../services/resultadoService.js";

const MiProgreso = ()=>{

    const navigate = useNavigate();

    const [progreso,setProgreso] = useState(null);
    const [resultados, setResultados]= useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const obtenerProgreso = async()=>{
            try {
                const dataProgreso = await obtenerMiProgresoRequest();
                const dataResultado = await obtenerUltimosResultadosRequest();
                setProgreso(dataProgreso);
                setResultados(dataResultado);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        obtenerProgreso();
    },[]);

    if(loading){

        return(
            <div className="p-6"> Cargando progreso... </div>
        );
    }

    if(!progreso){

        return(
            <div className="p-6">
                No existe progreso académico
            </div>
        );
    }

    return(

        <div className="min-h-screen bg-gray-50 p-6">

            <div className="bg-white rounded-2xl shadow-sm p-8 mb-6 ">
                <h1 className="text-4xl font-bold text-gray-800 ">
                    Mi progreso académico
                </h1>

                <p className=" text-gray-600 mt-3
                ">
                    Visualiza tu rendimiento,
                    estadísticas y actividad
                    académica.
                </p>

                <div className="mt-4 text-sm text-gray-500">

                    Última actividad:
                    {" "}

                    {
                        progreso.ultimaActividad 
                        ? new Date(
                            progreso.ultimaActividad
                        ).toLocaleString()
                        : "Sin Actividad"
                    }

                </div>

            </div>

            {/* =========================
                MÉTRICAS
            ========================= */}

            <div className="
                grid
                md:grid-cols-5
                gap-5
                mb-8
            ">

                {/* EVALUACIONES */}

                <div
                    onClick={()=>
                        navigate(
                            "/dashboard/estudiante/cuestionarios"
                        )
                    }

                    className="
                        bg-blue-100
                        rounded-2xl
                        p-6
                        cursor-pointer
                        hover:scale-105
                        transition-all
                    "
                >

                    <h2 className="
                        text-4xl
                        font-bold
                        text-blue-700
                    ">
                        {progreso.evaluacionesRendidas}
                    </h2>

                    <p className="
                        mt-2
                        text-blue-700
                    ">
                        Evaluaciones rendidas
                    </p>

                </div>

                {/* APROBADAS */}

                <div
                    onClick={()=>
                        navigate(
                            "/dashboard/estudiante/resultados"
                        )
                    }

                    className="
                        bg-green-100
                        rounded-2xl
                        p-6
                        cursor-pointer
                        hover:scale-105
                        transition-all
                    "
                >

                    <h2 className="
                        text-4xl
                        font-bold
                        text-green-700
                    ">
                        {progreso.evaluacionesAprobadas}
                    </h2>

                    <p className="mt-2
                        text-green-700
                    ">
                        Evaluaciones Aprobadas
                    </p>

                </div>

                {/* PROMEDIO */}

                <div
                    onClick={()=>
                        navigate(
                            "/dashboard/estudiante/resultados"
                        )
                    }

                    className="
                        bg-purple-100
                        rounded-2xl
                        p-6
                        cursor-pointer
                        hover:scale-105
                        transition-all
                    "
                >

                    <h2 className="
                        text-4xl
                        font-bold
                        text-purple-700
                    ">
                        {progreso.promedioGeneral}%
                    </h2>

                    <p className="
                        mt-2
                        text-purple-700
                    ">
                        Promedio
                    </p>

                </div>

                {/* RECURSOS */}

                <div
                    onClick={()=>
                        navigate(
                            "/dashboard/estudiante/materias"
                        )
                    }

                    className="
                        bg-orange-100
                        rounded-2xl
                        p-6
                        cursor-pointer
                        hover:scale-105
                        transition-all
                    "
                >

                    <h2 className="
                        text-4xl
                        font-bold
                        text-orange-700
                    ">

                        {
                            progreso.recursosVistos.videos
                            +
                            progreso.recursosVistos.pdfs
                            +
                            progreso.recursosVistos.teoria
                        }

                    </h2>

                    <p className="
                        mt-2
                        text-orange-700
                    ">
                        Recursos vistos
                    </p>

                </div>

                {/* RECOMENDACIONES */}

                <div
                    onClick={()=>
                        navigate(
                            "/dashboard/estudiante/recomendaciones"
                        )
                    }

                    className="
                        bg-red-100
                        rounded-2xl
                        p-6
                        cursor-pointer
                        hover:scale-105
                        transition-all
                    "
                >

                    <h2 className="
                        text-4xl
                        font-bold
                        text-red-700
                    ">
                        {
                            progreso.temasDebiles.length
                        }
                    </h2>

                    <p className="
                        mt-2
                        text-red-700
                    ">
                        Recomendaciones
                    </p>

                </div>

            </div>

            {/* =========================
                TEMAS
            ========================= */}

            <div className="
                grid
                md:grid-cols-2
                gap-6
                mb-8
            ">

                {/* TEMAS FUERTES */}

                <div className="
                    bg-white
                    rounded-2xl
                    shadow-sm
                    p-6
                ">

                    <h2 className="
                        text-2xl
                        font-bold
                        text-green-700
                        mb-5
                    ">
                        Temas fuertes
                    </h2>

                    <div className="space-y-3">

                        {
                            progreso.temasFuertes.map((tema)=>(
                                <div
                                    key={tema.tema?._id}

                                    className="
                                        bg-green-50
                                        border
                                        border-green-200
                                        rounded-xl
                                        p-4
                                    "
                                >

                                    <h3 className="
                                        font-semibold
                                        text-green-800
                                    ">
                                        {tema.tema?.nombre}
                                    </h3>

                                    <p className="
                                        text-sm
                                        text-green-700
                                        mt-1
                                    ">
                                        Correctas:
                                        {" "}
                                        {tema.correctas}
                                    </p>

                                </div>
                            ))
                        }

                    </div>

                </div>

                {/* TEMAS DÉBILES */}

                <div className="
                    bg-white
                    rounded-2xl
                    shadow-sm
                    p-6
                ">

                    <h2 className="
                        text-2xl
                        font-bold
                        text-red-700
                        mb-5
                    ">
                        Temas débiles
                    </h2>

                    <div className="space-y-3">

                        {
                            progreso.temasDebiles.map((tema)=>(
                                <div
                                    key={tema.tema._id}

                                    className="
                                        bg-red-50
                                        border
                                        border-red-200
                                        rounded-xl
                                        p-4
                                    "
                                >

                                    <h3 className="
                                        font-semibold
                                        text-red-800
                                    ">
                                        {tema.tema.nombre}
                                    </h3>

                                    <p className="
                                        text-sm
                                        text-red-700
                                        mt-1
                                    ">
                                        Incorrectas:
                                        {" "}
                                        {tema.incorrectas}
                                    </p>

                                </div>
                            ))
                        }

                    </div>

                </div>

            </div>
            {/* =========================
            EVALUACIONES
            ========================= */}
            <div className=" bg-white rounded-2xl shadow-sm p-6">
                <div className=" flex justify-between items-center mb-6 ">

                    <h2 className=" text-2xl font-bold text-gray-800 ">
                        Últimas evaluaciones
                    </h2>

                    <button
                    onClick={()=> navigate( "/dashboard/estudiante/resultados")}
                    className=" bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all"
                    >
                        Ver todas
                    </button>
                </div>
            <div className="space-y-4">
            { resultados.length === 0 &&
                (
                <p className="text-gray-500">
                    No existen evaluaciones registradas.
                </p>
                )
            }
            { resultados.map((resultado)=>(
                <div
                    key={resultado._id}
                    className="border rounded-xl p-4 hover:bg-gray-50 transition-all"
                >
                    <div className=" flex justify-between items-center
                    ">
                        <div>
                            <h3 className=" font-semibold text-gray-800">
                                {
                                    resultado.cuestionario?.titulo
                                }
                            </h3>

                            <p className=" text-sm text-gray-500 mt-1">
                                {
                                    resultado.materia?.nombre
                                }
                            </p>

                        </div>
                        <div className="text-right">
                            <p className=" text-lg font-bold text-blue-700">
                                {resultado.porcentaje}%
                            </p>
                            <p className="
                                text-sm
                                text-gray-500
                            ">
                                {
                                    resultado.nivelResultado
                                }
                            </p>
                        </div>

                    </div>
                    <div className=" flex justify-between items-center mt-4 ">
                        <span className="
                            text-sm
                            text-gray-500
                        ">
                            {
                                new Date(
                                    resultado.createdAt
                                ).toLocaleDateString()
                            }
                        </span>

                        <button
                            onClick={()=>
                                navigate(
                                    "/dashboard/estudiante/resultados"
                                )
                            }

                            className="
                                text-blue-600
                                hover:text-blue-800
                                font-medium
                            "
                        >
                            Ver resultado
                        </button>

                    </div>

                </div>
            ))
        }

    </div>

</div>


        </div>
    );
};

export default MiProgreso;