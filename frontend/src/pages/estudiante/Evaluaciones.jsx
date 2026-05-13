import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    obtenerCuestionariosDisponiblesRequest
} from "../../services/cuestionarioService";

const Evaluaciones = ()=>{

    const [cuestionarios,setCuestionarios] = useState([]);
    const [loading,setLoading] = useState(true);

    const navigate = useNavigate();


    useEffect(()=>{

        const obtenerCuestionarios = async()=>{

            try {

                const data =
                    await obtenerCuestionariosDisponiblesRequest();

                setCuestionarios(data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        obtenerCuestionarios();

    },[]);



    // =========================
    // LOADING
    // =========================

    if(loading){

        return(

            <div className="
                min-h-screen
                bg-gray-50
                p-6
            ">

                <div className="
                    bg-white
                    rounded-2xl
                    shadow-sm
                    p-8
                    text-center
                ">

                    <p className="
                        text-lg
                        text-gray-600
                    ">
                        Cargando evaluaciones...
                    </p>

                </div>

            </div>

        );

    }



    return(

        <div className="
            min-h-screen
            bg-gray-50
            p-6
        ">

            {/* ========================= */}
            {/* HEADER */}
            {/* ========================= */}

            <div className="mb-8">

                <h1 className="
                    text-4xl
                    font-bold
                    text-gray-800
                ">
                    Evaluaciones Disponibles
                </h1>

                <p className="
                    text-gray-500
                    mt-2
                ">
                    Resuelve cuestionarios y fortalece tus conocimientos académicos.
                </p>

            </div>



            {/* ========================= */}
            {/* EMPTY STATE */}
            {/* ========================= */}

            {
                cuestionarios.length === 0

                ? (

                    <div className="
                        bg-white
                        rounded-2xl
                        shadow-sm
                        p-10
                        text-center
                    ">

                        <h2 className="
                            text-2xl
                            font-semibold
                            text-gray-700
                        ">
                            No existen evaluaciones disponibles
                        </h2>

                        <p className="
                            text-gray-500
                            mt-2
                        ">
                            Intenta nuevamente más tarde.
                        </p>

                    </div>

                )

                : (

                    <div className="
                        grid
                        md:grid-cols-2
                        xl:grid-cols-3
                        gap-6
                    ">

                        {
                            cuestionarios.map((cuestionario)=>(

                                <div
                                    key={cuestionario._id}

                                    className="
                                        bg-white
                                        rounded-2xl
                                        border
                                        border-gray-100
                                        shadow-sm
                                        hover:shadow-xl
                                        hover:-translate-y-1
                                        transition-all
                                        duration-300
                                        p-6
                                    "
                                >

                                    {/* TITULO */}

                                    <h2 className="
                                        text-2xl
                                        font-bold
                                        text-gray-800
                                        mb-3
                                    ">
                                        {cuestionario.titulo}
                                    </h2>



                                    {/* DESCRIPCION */}

                                    <p className="
                                        text-gray-600
                                        leading-relaxed
                                        min-h-[70px]
                                    ">
                                        {cuestionario.descripcion}
                                    </p>



                                    {/* BADGES */}

                                    <div className="
                                        flex
                                        flex-wrap
                                        gap-2
                                        mt-5
                                    ">

                                        <span className="
                                            px-3
                                            py-1
                                            rounded-full
                                            text-sm
                                            bg-blue-100
                                            text-blue-700
                                        ">
                                            {cuestionario.nivel}
                                        </span>

                                        <span className="
                                            px-3
                                            py-1
                                            rounded-full
                                            text-sm
                                            bg-green-100
                                            text-green-700
                                        ">
                                            {cuestionario.cantidadPreguntas} preguntas
                                        </span>

                                        <span className="
                                            px-3
                                            py-1
                                            rounded-full
                                            text-sm
                                            bg-orange-100
                                            text-orange-700
                                        ">
                                            {cuestionario.tiempoLimite} min
                                        </span>

                                    </div>



                                    {/* INFORMACION */}

                                    <div className="
                                        mt-6
                                        space-y-3
                                        text-sm
                                        text-gray-700
                                    ">

                                        <div className="
                                            flex
                                            justify-between
                                        ">

                                            <span className="font-medium">
                                                Materia
                                            </span>

                                            <span>
                                                {cuestionario.materia?.nombre}
                                            </span>

                                        </div>


                                        <div className="
                                            flex
                                            justify-between
                                        ">

                                            <span className="font-medium">
                                                Tema
                                            </span>

                                            <span>
                                                {
                                                    cuestionario.tema?.nombre
                                                    || "General"
                                                }
                                            </span>

                                        </div>

                                    </div>



                                    {/* BOTON */}

                                    <button

                                        onClick={()=>
                                            navigate(
                                                `/dashboard/estudiante/evaluaciones/${cuestionario._id}`
                                            )
                                        }

                                        className="
                                            mt-6
                                            w-full
                                            bg-blue-600
                                            hover:bg-blue-700
                                            text-white
                                            py-3
                                            rounded-xl
                                            font-medium
                                            transition-all
                                            duration-300
                                        "
                                    >
                                        Resolver Evaluación
                                    </button>

                                </div>

                            ))
                        }

                    </div>

                )
            }

        </div>

    );

};

export default Evaluaciones;