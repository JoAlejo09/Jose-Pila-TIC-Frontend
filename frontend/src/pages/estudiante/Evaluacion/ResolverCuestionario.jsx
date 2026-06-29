import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerCuestionarioPorIdRequest, resolverCuestionarioRequest} from "../../../services/cuestionarioService.js";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const ResolverCuestionario = ()=>{

    const { id } = useParams();
    const navigate = useNavigate();

    const [cuestionario,setCuestionario] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState ("")
    const [preguntaActual,setPreguntaActual] = useState(0);
    const [respuestas,setRespuestas] = useState({});
    const [enviando,setEnviando] = useState(false);
    const [resultado,setResultado] = useState(null);
    const [mostrarConfirmacion,setMostrarConfirmacion] = useState(false);
    const [tiempoRestante,setTiempoRestante] = useState(0);
    const [inicioTiempo,setInicioTiempo] = useState(null);

    // Obtener cuestionario
    useEffect(()=>{

        const obtenerCuestionario = async()=>{

            try {

                const data = await obtenerCuestionarioPorIdRequest(id);

                setCuestionario(data);
                setTiempoRestante( data.tiempoLimite * 60);
                setInicioTiempo(Date.now());

            } catch (error) {
                console.log(error);
                setError(
                    error.response?.data?.msg
                    ||
                    "Error al cargar evaluación"
                );
            } finally {
                setLoading(false);
            }
        };
        obtenerCuestionario();
    },[id]);

    // Temporizador
    useEffect(()=>{
        if(!cuestionario || resultado){
            return;
        }

        const intervalo = setInterval(()=>{
            setTiempoRestante((prev)=>{
                if(prev <= 1){
                    clearInterval(intervalo);
                    finalizarCuestionario(true);
                    return 0;
                }
                return prev - 1;
            });
        },1000);

        return ()=> clearInterval(intervalo);
    },[cuestionario,resultado]);

    // Evitar salir de la pagina
    useEffect(()=>{
        const handleBeforeUnload = (e)=>{
            e.preventDefault();
            e.returnValue = "";
        };

        window.addEventListener(
            "beforeunload",
            handleBeforeUnload
        );

        return ()=>{
            window.removeEventListener(
                "beforeunload",
                handleBeforeUnload
            );
        };

    },[]);

    // Formato tiempo
    const formatearTiempo = (segundos)=>{
        const min = Math.floor(segundos / 60);
        const seg = segundos % 60;

        return `${min
            .toString()
            .padStart(2,"0")
        }:${seg
            .toString()
            .padStart(2,"0")
        }`;

    };
    //Para formatear formulas y expresiones matematicas
    const renderizarLatex = (texto) => {
    if (!texto) return "";

    return texto
        .replace(/\\\((.*?)\\\)/g, "$$$1$$")
        .replace(/\\\[(.*?)\\\]/gs, "$$$$\n$1\n$$$$");
};

    // Pregunta actual
    const pregunta = cuestionario?.preguntas[preguntaActual];
    
    // Preguntas respondidas
    const respondidas = Object.keys(respuestas).length;

    // Guardar respuesta
    const handleRespuesta = (valor)=>{
        setRespuestas((prev)=>({
            ...prev,
            [pregunta._id]:valor

        }));

    };

    // Finalizar cuestionario
    const finalizarCuestionario = async(
        automatico = false
    )=>{
        if(!inicioTiempo){
            return;
        }   
        if(enviando){
            return;
        }

        if(!automatico){
            const preguntasSinResponder = cuestionario.preguntas.filter(
                (pregunta)=>{
                    const respuesta = respuestas[pregunta._id];
                    return(
                        respuesta === undefined ||
                        respuesta === null ||
                        respuesta.toString().trim() === ""
                    );
                }
            );

            if(preguntasSinResponder.length > 0){
                const confirmar = window.confirm(
                    `Aún existen ${preguntasSinResponder.length} preguntas sin responder. ¿Desea finalizar igualmente?`
                );
                if(!confirmar){
                    return;
                }
            }
        }

        try {
            setEnviando(true);

            const respuestasFormateadas = Object.entries(respuestas).map(
                ([pregunta,respuestaUsuario])=>({
                    pregunta,
                    respuestaUsuario
                })
            );

            const tiempoEmpleado = Math.floor(
                ( Date.now() - inicioTiempo ) / 1000
            );

            const data = await resolverCuestionarioRequest(
                cuestionario._id,
                {
                    respuestas: respuestasFormateadas,
                    tiempoEmpleado
                }
            );

            setResultado(data.resultado);
            if(automatico){
                alert("Tiempo finalizado. Evaluación enviada automáticamente." );
            }

        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.msg
                ||
                "Error al enviar evaluación"
            );

        } finally {
            setEnviando(false);
            setMostrarConfirmacion(false);

        }

    };
    //Para errores
    if(error){
        return(
            <div className= "p-6">
                <div className = "bg-red-100 text-red-700 p-4 rounded-xl">
                {error}
                </div>
            </div>
        );
    }

    // Carga de la evaluacion
    if(loading){
        return(
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                    <p className="text-lg text-gray-600">
                        Cargando evaluación...
                    </p>
                </div>
            </div>
        );
    }
    // Validar cuestionario
    if(!cuestionario){
        return(
            <div className="p-6">
                Evaluación no encontrada
            </div>

        );
    }

    // Resultado final
    if(resultado){
        return(
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-8">
                        Resultado Final
                    </h1>

                    <div className="grid md:grid-cols-4 gap-5">
                        <div className="bg-green-100 rounded-2xl p-6 text-center">
                            <h2 className="text-4xl font-bold text-green-700">
                                {resultado.correctas}
                            </h2>
                            <p className="mt-2 text-green-700">
                                Correctas
                            </p>
                        </div>

                        <div className="bg-red-100 rounded-2xl p-6 text-center">
                            <h2 className="text-4xl font-bold text-red-700">
                                {resultado.incorrectas}
                            </h2>
                            <p className="mt-2 text-red-700">
                                Incorrectas
                            </p>
                        </div>

                        <div className="bg-gray-200 rounded-2xl p-6 text-center">
                            <h2 className="text-4xl font-bold text-gray-700">
                                {resultado.sinResponder}
                            </h2>
                            <p className="mt-2 text-gray-700">
                                Sin responder
                            </p>
                        </div>

                        <div className="bg-blue-100 rounded-2xl p-6 text-center">
                            <h2 className="text-4xl font-bold text-blue-700">
                                {resultado.puntaje}%
                            </h2>
                            <p className="mt-2 text-blue-700">
                                Puntaje
                            </p>
                        </div>
                    </div>
                    <div className="mt-10 flex flex-wrap gap-4">

    <button
        onClick={()=>
            navigate(`/dashboard/estudiante/resultados/${resultado._id}`)
        }
        className=" bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all"
    >
        Ver detalle
    </button>

    <button
        onClick={()=>
            navigate("/dashboard/estudiante/cuestionarios")
        }
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl transition-all"
    >
        Volver
    </button>
</div>
                </div>
            </div>
        );
    }

    return(
        <div className="min-h-screen bg-gray-50 p-6">
            {/* HEADER */}
            <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
                <div className="flex justify-between items-center flex-wrap gap-4">

                    <div>

                        <h1 className="text-3xl font-bold text-gray-800">
                            {cuestionario.titulo}
                        </h1>

                        <p className="text-gray-600 mt-3">
                            {cuestionario.descripcion}
                        </p>

                    </div>

                    <div
                        className={`px-6 py-4 rounded-2xl text-2xl font-bold
                            ${ tiempoRestante <= 60
                                ? "bg-red-100 text-red-700"
                                : "bg-orange-100 text-orange-700"
                            }
                        `}
                    >
                        {formatearTiempo(tiempoRestante)}
                    </div>
                </div>
            </div>

            {/* PROGRESO */}

            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold">
                        Pregunta {preguntaActual + 1}
                    </h2>

                    <span className="text-sm text-gray-500">
                        {respondidas}
                        {" "}de{" "}
                        {cuestionario.preguntas.length}
                        {" "}respondidas

                    </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className=" bg-blue-600 h-3 rounded-full transition-all"
                        style={{
                            width: `${
                                ( respondidas / cuestionario.preguntas.length) * 100
                            }%`
                        }}
                    />
                </div>
            </div>

            {/* NAVEGACION */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                <div className="flex flex-wrap gap-3">
                    { cuestionario.preguntas.map(
                         (pregunta,index)=>(
                                <button
                                    key={pregunta._id}
                                    onClick={()=> setPreguntaActual(index) }

                                    className={`w-12 h-12 rounded-xl font-semibold transition-all
                                        ${
                                            preguntaActual === index
                                            ? "bg-blue-600 text-white"
                                            : respuestas[pregunta._id]

                                            ? "bg-green-100 text-green-700 border border-green-300"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }
                                    `}
                                >
                                    {index + 1}
                                </button>

                            )
                        )
                    }
                </div>
            </div>

            {/* PREGUNTA */}
            { pregunta &&

                <div className="bg-white rounded-2xl shadow-sm p-8">

                    <h2 className=" text-2xl font-semibold text-gray-800 leading-relaxed ">
                        <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}>
                            {renderizarLatex(pregunta.enunciado)}                        
                        </ReactMarkdown>
                    </h2> 


                    {/* RECURSO APOYO */}
                    {
                        pregunta.recursoApoyo
                        &&
                        pregunta.recursoApoyo.tipo
                        &&

                        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5">
                            <h3 className="text-lg font-semibold text-amber-800 mb-4">
                                Recurso de apoyo
                            </h3>

                            {
                                pregunta.recursoApoyo.tipo === "formula"
                                &&
                                <div className="bg-white border rounded-xl p-5 text-center">
                                    <p className="text-2xl font-mono text-gray-800">
                                        {pregunta.recursoApoyo.contenido}
                                    </p>

                                </div>
                            }

                            {
                                pregunta.recursoApoyo.tipo === "imagen"
                                &&

                                <img
                                    src={pregunta.recursoApoyo.url}
                                    alt="Recurso apoyo"
                                    className=" rounded-xl max-h-[400px] object-contain mx-auto"
                                />
                            }

                            { pregunta.recursoApoyo.tipo === "video" &&
                                <div className="aspect-video rounded-xl overflow-hidden">
                                    <iframe
                                        src={pregunta.recursoApoyo.url}
                                        title="Video apoyo"
                                        className="w-full h-full" allowFullScreen
                                    />
                                </div>
                            }

                            { pregunta.recursoApoyo.tipo === "pdf" &&
                                <a
                                    href={pregunta.recursoApoyo.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className=" inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl " >
                                    Abrir PDF
                                </a>
                            }
                            {
                                pregunta.recursoApoyo.tipo === "enlace"
                                &&
                                <a
                                    href={pregunta.recursoApoyo.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className=" inline-flex items-center gap-2 bg-blue-600
                                              hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
                                >
                                    Abrir enlace
                                </a>
                            }
                        </div>
                    }

                    {/* RESPUESTAS */}
                    <div className="mt-8 space-y-4">
                        {
                            pregunta.tipoPregunta === "opcion_multiple"
                            &&

                            pregunta.opciones.map(
                                (opcion,index)=>(

                                    <button
                                        key={index}
                                        onClick={()=> handleRespuesta(opcion.texto) }

                                        className={`w-full text-left border rounded-xl p-4 transition-all
                                            ${
                                                respuestas[pregunta._id] === opcion.texto
                                                ? "border-blue-600 bg-blue-50"
                                                : "border-gray-200 hover:border-blue-400"
                                            }
                                        `}
                                    >
                                        <ReactMarkdown
                                            remarkPlugins={[remarkMath]}
                                            rehypePlugins={[rehypeKatex]}>  
                                                 {renderizarLatex(opcion.texto)}                       
                                        </ReactMarkdown>                                       
                                    </button>
                                )
                            )
                        }

                        {
                            pregunta.tipoPregunta === "verdadero_falso"
                            &&

                            ["Verdadero","Falso"].map(
                                (valor,index)=>(

                                    <button
                                        key={index}
                                        onClick={()=> handleRespuesta(valor) }
                                        className={` w-full text-left border rounded-xl p-4 transition-all
                                            ${
                                                respuestas[pregunta._id]
                                                === valor
                                                ? "border-green-600 bg-green-50"
                                                : "border-gray-200 hover:border-green-400"
                                            }
                                        `}
                                    >
                                        {valor}
                                    </button>

                                )
                            )
                        }

                        {
                            pregunta.tipoPregunta === "respuesta_corta"
                            &&

                            <textarea
                                value={ respuestas[pregunta._id] || "" }
                                onChange={(e)=> handleRespuesta(e.target.value) }
                                placeholder="Escribe tu respuesta aquí..."
                                className=" w-full border border-gray-300 rounded-xl p-4 min-h-[140px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 "
                            />
                        }

                    </div>

                    {/* BOTONES */}

                    <div className="flex justify-between mt-10">

                        <button

                            disabled={preguntaActual === 0}

                            onClick={()=>
                                setPreguntaActual(
                                    preguntaActual - 1
                                )
                            }

                            className=" px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                        >
                            Anterior
                        </button>

                        <div className="flex gap-3">

                            {
                                preguntaActual < cuestionario.preguntas.length - 1
                                &&
                                <button
                                    onClick={()=>
                                        setPreguntaActual(
                                            preguntaActual + 1
                                        )
                                    }
                                    className=" px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    Siguiente
                                </button>
                            }
                            {
                                preguntaActual === cuestionario.preguntas.length - 1
                                &&
                                <button
                                    onClick={()=>
                                    setMostrarConfirmacion(true)
                                    }

                                    className=" px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white"
                                >
                                    Finalizar Evaluación
                                </button>
                            }
                        </div>
                    </div>
                </div>
            }

            { mostrarConfirmacion &&
                <div className=" fixed inset-0 bg-black/40 flex justify-center items-center z-50 " >
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Finalizar evaluación
                        </h2>

                        <p className="text-gray-600">
                            ¿Está seguro de finalizar la evaluación?
                        </p>

                        <div className="flex justify-end gap-3 mt-8">

                            <button
                                onClick={()=>
                                    setMostrarConfirmacion(false)
                                }
                                className=" px-5 py-3 rounded-xl bg-gray-200
                                "
                            >
                                Cancelar
                            </button>

                            <button
                                disabled={enviando}
                                onClick={()=>
                                    finalizarCuestionario()
                                }
                                className=" px-5 py-3 rounded-xl bg-green-600 text-white "
                            >
                                {
                                    enviando
                                    ? "Enviando..."
                                    : "Finalizar"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default ResolverCuestionario;