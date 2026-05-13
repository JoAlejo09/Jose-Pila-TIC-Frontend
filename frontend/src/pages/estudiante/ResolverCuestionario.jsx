import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import {
    obtenerCuestionarioPorIdRequest,
    resolverCuestionarioRequest
} from "../../services/cuestionarioService";

const ResolverCuestionario = ()=>{

    const {id} = useParams();

    const [cuestionario,setCuestionario] = useState(null);

    const [loading,setLoading] = useState(true);

    const [preguntaActual,setPreguntaActual] = useState(0);

    const [respuestas,setRespuestas] = useState({});

    const [enviando,setEnviando] = useState(false);

    const [resultado,setResultado] = useState(null);



    useEffect(()=>{

        const obtenerCuestionario = async()=>{

            try {

                const data =
                    await obtenerCuestionarioPorIdRequest(id);

                setCuestionario(data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        obtenerCuestionario();

    },[id]);



    // =========================
    // GUARDAR RESPUESTA
    // =========================

    const handleRespuesta = (valor)=>{

        setRespuestas({

            ...respuestas,

            [pregunta._id]:valor

        });

    };



    // =========================
    // FINALIZAR CUESTIONARIO
    // =========================

    const finalizarCuestionario = async()=>{

        const preguntasSinResponder =
            cuestionario.preguntas.filter(
                pregunta => !respuestas[pregunta._id]
            );

        if(preguntasSinResponder.length > 0){

            const confirmar = window.confirm(
                `Aún existen ${preguntasSinResponder.length} preguntas sin responder. ¿Desea finalizar igualmente?`
            );

            if(!confirmar){
                return;
            }

        }

        try {

            setEnviando(true);

            const data =
                await resolverCuestionarioRequest(
                    cuestionario._id,
                    {
                        respuestas
                    }
                );

            setResultado(data);

        } catch (error) {

            console.log(error);

            alert("Error al enviar cuestionario");

        } finally {

            setEnviando(false);

        }

    };



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
                        Cargando cuestionario...
                    </p>

                </div>

            </div>

        );

    }



    // =========================
    // VALIDACION
    // =========================

    if(!cuestionario){

        return(

            <div className="p-6">
                Cuestionario no encontrado
            </div>

        );

    }



    // =========================
    // RESULTADO FINAL
    // =========================

    if(resultado){

        return(

            <div className="
                min-h-screen
                bg-gray-50
                p-6
            ">

                <div className="
                    max-w-5xl
                    mx-auto
                    bg-white
                    rounded-2xl
                    shadow-sm
                    p-8
                ">

                    <h1 className="
                        text-4xl
                        font-bold
                        text-gray-800
                        mb-4
                    ">
                        Resultado de Evaluación
                    </h1>



                    <div className="
                        grid
                        md:grid-cols-4
                        gap-4
                        mt-8
                    ">

                        <div className="
                            bg-green-100
                            rounded-xl
                            p-5
                            text-center
                        ">
                            <h2 className="text-3xl font-bold text-green-700">
                                {resultado.resultado.correctas}
                            </h2>

                            <p className="text-green-700">
                                Correctas
                            </p>
                        </div>



                        <div className="
                            bg-red-100
                            rounded-xl
                            p-5
                            text-center
                        ">
                            <h2 className="text-3xl font-bold text-red-700">
                                {resultado.resultado.incorrectas}
                            </h2>

                            <p className="text-red-700">
                                Incorrectas
                            </p>
                        </div>



                        <div className="
                            bg-gray-200
                            rounded-xl
                            p-5
                            text-center
                        ">
                            <h2 className="text-3xl font-bold text-gray-700">
                                {resultado.resultado.sinResponder}
                            </h2>

                            <p className="text-gray-700">
                                Sin responder
                            </p>
                        </div>



                        <div className="
                            bg-blue-100
                            rounded-xl
                            p-5
                            text-center
                        ">
                            <h2 className="text-3xl font-bold text-blue-700">
                                {resultado.resultado.puntaje}%
                            </h2>

                            <p className="text-blue-700">
                                Puntaje
                            </p>
                        </div>

                    </div>



                    {
                        resultado.revision?.length > 0

                        &&

                        <div className="mt-10">

                            <h2 className="
                                text-2xl
                                font-bold
                                mb-6
                            ">
                                Revisión de respuestas
                            </h2>

                            <div className="space-y-5">

                                {
                                    resultado.revision.map((item,index)=>(

                                        <div
                                            key={index}

                                            className={`
                                                border
                                                rounded-2xl
                                                p-5

                                                ${
                                                    item.esCorrecta
                                                    ?
                                                    "border-green-300 bg-green-50"
                                                    :
                                                    "border-red-300 bg-red-50"
                                                }
                                            `}
                                        >

                                            <h3 className="
                                                font-semibold
                                                text-lg
                                                mb-3
                                            ">
                                                Pregunta {index + 1}
                                            </h3>

                                            <p>
                                                <strong>
                                                    Tu respuesta:
                                                </strong>{" "}

                                                {
                                                    item.respuestaUsuario
                                                    || "Sin responder"
                                                }
                                            </p>

                                            <p className="mt-2">
                                                <strong>
                                                    Respuesta correcta:
                                                </strong>{" "}

                                                {item.respuestaCorrecta}
                                            </p>



                                            {
                                                item.explicacion

                                                &&

                                                <div className="mt-3">

                                                    <p className="font-medium">
                                                        Explicación:
                                                    </p>

                                                    <p className="text-gray-700">
                                                        {item.explicacion}
                                                    </p>

                                                </div>
                                            }

                                        </div>

                                    ))
                                }

                            </div>

                        </div>
                    }

                </div>

            </div>

        );

    }



    // =========================
    // PREGUNTA ACTUAL
    // =========================

    const pregunta =
        cuestionario.preguntas[preguntaActual];



    return(

        <div className="
            min-h-screen
            bg-gray-50
            p-6
        ">

            {/* ========================= */}
            {/* HEADER */}
            {/* ========================= */}

            <div className="
                bg-white
                rounded-2xl
                shadow-sm
                p-8
                mb-6
            ">

                <h1 className="
                    text-3xl
                    font-bold
                    text-gray-800
                ">
                    {cuestionario.titulo}
                </h1>

                <p className="
                    text-gray-600
                    mt-3
                ">
                    {cuestionario.descripcion}
                </p>


                <div className="
                    flex
                    flex-wrap
                    gap-3
                    mt-5
                ">

                    <span className="
                        px-4
                        py-2
                        rounded-full
                        bg-blue-100
                        text-blue-700
                        text-sm
                    ">
                        {cuestionario.nivel}
                    </span>

                    <span className="
                        px-4
                        py-2
                        rounded-full
                        bg-green-100
                        text-green-700
                        text-sm
                    ">
                        {cuestionario.cantidadPreguntas} preguntas
                    </span>

                    <span className="
                        px-4
                        py-2
                        rounded-full
                        bg-orange-100
                        text-orange-700
                        text-sm
                    ">
                        {cuestionario.tiempoLimite} min
                    </span>

                </div>

            </div>



            {/* ========================= */}
            {/* PROGRESO */}
            {/* ========================= */}

            <div className="
                bg-white
                rounded-2xl
                shadow-sm
                p-6
                mb-6
            ">

                <div className="
                    flex
                    justify-between
                    items-center
                    mb-3
                ">

                    <h2 className="
                        text-lg
                        font-semibold
                    ">
                        Pregunta {preguntaActual + 1}
                    </h2>

                    <span className="
                        text-sm
                        text-gray-500
                    ">
                        {
                            preguntaActual + 1
                        } / {
                            cuestionario.preguntas.length
                        }
                    </span>

                </div>


                <div className="
                    w-full
                    bg-gray-200
                    rounded-full
                    h-3
                ">

                    <div
                        className="
                            bg-blue-600
                            h-3
                            rounded-full
                            transition-all
                        "

                        style={{
                            width:`
                                ${
                                    (
                                        (preguntaActual + 1)
                                        /
                                        cuestionario.preguntas.length
                                    ) * 100
                                }%
                            `
                        }}
                    />

                </div>

            </div>



            {/* ========================= */}
            {/* NAVEGACION RAPIDA */}
            {/* ========================= */}

            <div className="
                bg-white
                rounded-2xl
                shadow-sm
                p-6
                mb-6
            ">

                <h2 className="
                    text-lg
                    font-semibold
                    text-gray-800
                    mb-4
                ">
                    Navegación de preguntas
                </h2>


                <div className="
                    flex
                    flex-wrap
                    gap-3
                ">

                    {
                        cuestionario.preguntas.map((pregunta,index)=>(

                            <button
                                key={pregunta._id}

                                onClick={()=>
                                    setPreguntaActual(index)
                                }

                                className={`
                                    w-12
                                    h-12
                                    rounded-xl
                                    font-semibold
                                    transition-all

                                    ${
                                        preguntaActual === index

                                        ?

                                        "bg-blue-600 text-white"

                                        :

                                        respuestas[pregunta._id]

                                        ?

                                        "bg-green-100 text-green-700 border border-green-300"

                                        :

                                        "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }
                                `}
                            >

                                {index + 1}

                            </button>

                        ))
                    }

                </div>

            </div>



            {/* ========================= */}
            {/* PREGUNTA */}
            {/* ========================= */}

            <div className="
                bg-white
                rounded-2xl
                shadow-sm
                p-8
            ">

                <h2 className="
                    text-2xl
                    font-semibold
                    text-gray-800
                    leading-relaxed
                ">
                    {pregunta.enunciado}
                </h2>



                {
                    pregunta.recursoApoyo?.url

                    &&

                    <div className="mt-6">

                        <img
                            src={pregunta.recursoApoyo.url}
                            alt="Recurso apoyo"
                            className="
                                rounded-xl
                                max-h-[400px]
                                object-contain
                            "
                        />

                    </div>
                }



                <div className="
                    mt-8
                    space-y-4
                ">

                    {
                        pregunta.tipoPregunta === "opcion_multiple"

                        &&

                        pregunta.opciones?.map((opcion,index)=>(

                            <button
                                key={index}

                                onClick={()=>
                                    handleRespuesta(opcion)
                                }

                                className={`
                                    w-full
                                    text-left
                                    border
                                    rounded-xl
                                    p-4
                                    transition-all

                                    ${
                                        respuestas[pregunta._id]
                                        === opcion

                                        ?

                                        "border-blue-600 bg-blue-50"

                                        :

                                        "border-gray-200 hover:border-blue-400"
                                    }
                                `}
                            >

                                {opcion}

                            </button>

                        ))
                    }



                    {
                        pregunta.tipoPregunta === "verdadero_falso"

                        &&

                        ["Verdadero","Falso"].map((valor,index)=>(

                            <button
                                key={index}

                                onClick={()=>
                                    handleRespuesta(valor)
                                }

                                className={`
                                    w-full
                                    text-left
                                    border
                                    rounded-xl
                                    p-4
                                    transition-all

                                    ${
                                        respuestas[pregunta._id]
                                        === valor

                                        ?

                                        "border-green-600 bg-green-50"

                                        :

                                        "border-gray-200 hover:border-green-400"
                                    }
                                `}
                            >

                                {valor}

                            </button>

                        ))
                    }



                    {
                        pregunta.tipoPregunta === "respuesta_corta"

                        &&

                        <textarea

                            value={
                                respuestas[pregunta._id] || ""
                            }

                            onChange={(e)=>
                                handleRespuesta(e.target.value)
                            }

                            placeholder="
                                Escribe tu respuesta aquí...
                            "

                            className="
                                w-full
                                border
                                border-gray-300
                                rounded-xl
                                p-4
                                min-h-[140px]
                                resize-none
                                focus:outline-none
                                focus:ring-2
                                focus:ring-blue-500
                            "
                        />

                    }

                </div>



                {/* ========================= */}
                {/* NAVEGACION */}
                {/* ========================= */}

                <div className="
                    flex
                    justify-between
                    mt-10
                ">

                    <button

                        disabled={preguntaActual === 0}

                        onClick={()=>
                            setPreguntaActual(
                                preguntaActual - 1
                            )
                        }

                        className="
                            px-6
                            py-3
                            rounded-xl
                            bg-gray-200
                            hover:bg-gray-300
                            disabled:opacity-50
                        "
                    >
                        Anterior
                    </button>



                    <div className="flex gap-3">

                        <button

                            disabled={
                                preguntaActual
                                ===
                                cuestionario.preguntas.length - 1
                            }

                            onClick={()=>
                                setPreguntaActual(
                                    preguntaActual + 1
                                )
                            }

                            className="
                                px-6
                                py-3
                                rounded-xl
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                            "
                        >
                            Siguiente
                        </button>



                        {
                            preguntaActual
                            ===
                            cuestionario.preguntas.length - 1

                            &&

                            <button

                                onClick={finalizarCuestionario}

                                disabled={enviando}

                                className="
                                    px-6
                                    py-3
                                    rounded-xl
                                    bg-green-600
                                    hover:bg-green-700
                                    text-white
                                "
                            >
                                {
                                    enviando
                                    ?
                                    "Enviando..."
                                    :
                                    "Finalizar Evaluación"
                                }
                            </button>
                        }

                    </div>

                </div>

            </div>

        </div>

    );

};

export default ResolverCuestionario;