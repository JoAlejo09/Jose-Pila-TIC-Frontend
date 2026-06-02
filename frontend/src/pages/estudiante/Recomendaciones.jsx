import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
    obtenerMisRecomendacionesRequest
}
from "../../services/recomendacionService.js";

const Recomendaciones = ()=>{

    const navigate = useNavigate();

    const [recomendaciones,setRecomendaciones] = useState([]);

    const [loading,setLoading] = useState(true);

    useEffect(()=>{

        const obtenerRecomendaciones = async()=>{

            try {

                const data = await obtenerMisRecomendacionesRequest();
                console.log("DATA:", data);
                setRecomendaciones(
                    data || []
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        };

        obtenerRecomendaciones();

    },[]);

    if(loading){

        return(

            <div className="p-6">
                Cargando recomendaciones...
            </div>
        );
    }

    return(

        <div className="min-h-screen bg-gray-50 p-6">

            {/* HEADER */}

            <div className="
                bg-white
                rounded-2xl
                shadow-sm
                p-8
                mb-6
            ">

                <h1 className="
                    text-4xl
                    font-bold
                    text-gray-800
                ">
                    Recomendaciones académicas
                </h1>

                <p className="
                    text-gray-600
                    mt-3
                ">
                    Recursos personalizados
                    según tu desempeño académico.
                </p>

            </div>

            {/* MÉTRICAS */}

            <div className="
                grid
                md:grid-cols-4
                gap-5
                mb-8
            ">

                {/* TEMAS */}

                <div
                    onClick={()=>
                        navigate(
                            "/dashboard/estudiante/progreso"
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
                        {recomendaciones.length}
                    </h2>

                    <p className="
                        mt-2
                        text-red-700
                    ">
                        Temas débiles
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
                        {
                            recomendaciones.reduce(
                                (total,item)=>
                                    total +
                                    item.recursos.length,
                                0
                            )
                        }
                    </h2>

                    <p className="
                        mt-2
                        text-blue-700
                    ">
                        Recursos sugeridos
                    </p>

                </div>

                {/* EVALUACIONES */}

                <div
                    onClick={()=>
                        navigate(
                            "/dashboard/estudiante/cuestionarios"
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
                        {
                            recomendaciones.filter(
                                (item)=>
                                    item.porcentajeDominio < 50
                            ).length
                        }
                    </h2>

                    <p className="
                        mt-2
                        text-green-700
                    ">
                        Prioridad alta
                    </p>

                </div>

                {/* IR A PROGRESO */}

                <div
                    onClick={()=>
                        navigate(
                            "/dashboard/estudiante/progreso"
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
                        text-2xl
                        font-bold
                        text-purple-700
                    ">
                        Ver
                    </h2>

                    <p className="
                        mt-2
                        text-purple-700
                    ">
                        Mi progreso
                    </p>

                </div>

            </div>

            {/* RECOMENDACIONES */}

            <div className="space-y-6">

                {
                    recomendaciones.map((item)=>(

                        <div
                            key={item.tema._id}

                            className="
                                bg-white
                                rounded-2xl
                                shadow-sm
                                p-6
                            "
                        >

                            {/* TEMA */}

                            <div className="
                                flex
                                justify-between
                                items-center
                                mb-5
                            ">

                                <div>

                                    <h2 className="
                                        text-2xl
                                        font-bold
                                        text-gray-800
                                    ">
                                        {item.tema.nombre}
                                    </h2>

                                    <p className="
                                        text-gray-500
                                        mt-1
                                    ">
                                        Dominio:
                                        {" "}
                                        {
                                            item.porcentajeDominio
                                        }%
                                    </p>

                                </div>

                                <button
                                    onClick={()=>
                                        navigate(
                                            "/dashboard/estudiante/materias"
                                        )
                                    }

                                    className="
                                        bg-indigo-600
                                        text-white
                                        px-4
                                        py-2
                                        rounded-xl
                                        hover:bg-indigo-700
                                    "
                                >
                                    Ver temas
                                </button>

                            </div>

                            {/* RECURSOS */}

                            <div className="
                                grid
                                md:grid-cols-3
                                gap-4
                            ">

                                {
                                    item.recursos.map((recurso)=>(

                                        <div
                                            key={recurso._id}

                                            className="
                                                border
                                                rounded-xl
                                                p-4
                                                bg-gray-50
                                            "
                                        >

                                            <h3 className="
                                                font-bold
                                                text-gray-800
                                            ">
                                                {recurso.titulo}
                                            </h3>

                                            <p className="
                                                text-sm
                                                text-gray-600
                                                mt-2
                                            ">
                                                {recurso.tipo}
                                            </p>

                                            <p className="
                                                text-sm
                                                text-gray-500
                                                mt-1
                                            ">
                                                Dificultad:
                                                {" "}
                                                {
                                                    recurso.nivelDificultad
                                                }
                                            </p>

                                            <button
                                                onClick={()=>
                                                    navigate(
                                                        `/dashboard/estudiante/recurso/${recurso._id}`
                                                    )
                                                }

                                                className="
                                                    mt-4
                                                    w-full
                                                    bg-blue-600
                                                    text-white
                                                    py-2
                                                    rounded-xl
                                                    hover:bg-blue-700
                                                "
                                            >
                                                Abrir recurso
                                            </button>

                                        </div>
                                    ))
                                }

                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    );
};

export default Recomendaciones;