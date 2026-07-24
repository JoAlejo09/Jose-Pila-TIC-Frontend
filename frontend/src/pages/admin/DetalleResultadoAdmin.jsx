import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import { obtenerResultadoAdminPorIdRequest} from "../../services/resultadoService.js";

const DetalleResultadoAdmin = ()=>{

    const { id } = useParams();
    const navigate = useNavigate();

    const [resultado,setResultado] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const obtenerResultado = async()=>{
            console.log("ID:", id);
            try {
                const data = await obtenerResultadoAdminPorIdRequest(id);
                console.log("DATA:", data);
                setResultado(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        obtenerResultado();
    },[id]);
    const renderizarLatex = (texto) => {
      if (!texto) return "";
        return texto
            .replace(/\\\((.*?)\\\)/g, "$$$1$$")
            .replace(/\\\[(.*?)\\\]/gs, "$$$$\n$1\n$$$$");
    };
    
    if(loading){
        return(
            <div className=" min-h-screen bg-gray-50 p-6">
                <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                    <p className="text-lg text-gray-600">
                        Cargando resultado...
                    </p>
                </div>
            </div>
        );
    }

    if(!resultado){
        return(

            <div className="p-6">
                Resultado no encontrado
            </div>
        );
    }
    return(
        <div className=" min-h-screen bg-gray-50 p-6">

            <div className=" max-w-6xl mx-auto">

                <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
                    <div className="flex justify-between items-start flex-wrap gap-4">
                        <div>
                            <h1 className=" text-4xl font-bold text-gray-800">
                                {
                                    resultado.cuestionario?.titulo
                                }
                            </h1>
                            <p className="text-gray-500 mt-2">
                                {
                                    resultado.cuestionario
                                    ?.materia?.nombre
                                }
                            </p>
                        </div>

                        <span className={`px-5 py-3 rounded-2xl text-sm font-semibold
                                        ${resultado.aprobado
                                          ? "bg-green-100 text-green-700"
                                          : "bg-red-100 text-red-700"
                                        }
                                        `}
                        >
                            { resultado.aprobado
                                ? "APROBADO"
                                : "REPROBADO"
                            }
                        </span>
                    </div>
                </div>

                <div className=" grid md:grid-cols-5 gap-5 mb-8">
                    <div className="bg-blue-100 rounded-2xl p-6 text-center">
                        <h2 className="text-4xl font-bold text-blue-700">
                            {resultado.puntaje}/10
                        </h2>

                        <p className="text-blue-700 mt-2">
                            Puntaje
                        </p>
                    </div>

                    <div className="bg-green-100 rounded-2xl p-6 text-center">
                        <h2 className="text-4xl font-bold text-green-700">
                            {resultado.correctas}
                        </h2>

                        <p className="text-green-700 mt-2">
                            Correctas
                        </p>
                    </div>

                    <div className="bg-red-100 rounded-2xl p-6 text-center">
                        <h2 className=" text-4xl font-bold text-red-700">
                            {resultado.incorrectas}
                        </h2>

                        <p className="text-red-700 mt-2">
                            Incorrectas
                        </p>
                    </div>

                    <div className="bg-gray-200 rounded-2xl p-6 text-center">
                        <h2 className="text-4xl font-bold text-gray-700 ">
                            {resultado.sinResponder}
                        </h2>
                        <p className=" text-gray-700 mt-2 ">
                            Sin responder
                        </p>
                    </div>

                    <div className=" bg-orange-100 rounded-2xl p-6 text-center">
                        <h2 className="text-4xl font-bold text-orange-700">
                            {
                                Math.floor(resultado.tiempoEmpleado / 60)
                            }min
                        </h2>

                        <p className="text-orange-700 mt-2">
                            Tiempo
                        </p>
                    </div>
                </div>

                <div className="space-y-6 ">
                    {
                        resultado.respuestas?.map(
                            (respuesta,index)=>(
                                <div
                                    key={respuesta._id}
                                    className={` bg-white rounded-2xl shadow-sm p-8 border-l-8
                                        ${ respuesta.esCorrecta
                                            ? "border-green-500"
                                            : "border-red-500"
                                        }
                                    `}
                                >
                                    <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
                                        <h2 className=" text-2xl font-bold text-gray-800 ">
                                            Pregunta {index + 1}
                                        </h2>

                                        <span className={` px-4 py-2 rounded-xl text-sm font-medium
                                            ${ respuesta.esCorrecta
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }
                                        `}>
                                            { respuesta.esCorrecta
                                                ? "Correcta"
                                                : "Incorrecta"
                                            }
                                        </span>
                                    </div>

                                    <div className=" space-y-4">
                                        <div>
                                            <p className=" font-semibold text-gray-700">
                                                Tu respuesta
                                            </p>

                                            <div className="mt-2 bg-gray-100 rounded-xl p-4">
                                                {
                                                respuesta.respuestaUsuario ? (
                                                    <ReactMarkdown
                                                    remarkPlugins={[remarkMath]}
                                                    rehypePlugins={[rehypeKatex]}
                                                    >
                                                        {renderizarLatex(respuesta.respuestaUsuario)}
                                                    </ReactMarkdown>
                                                    )
                                                    : "Sin responder"
                                                }
                                            </div>
                                        </div>

                                        <div>
                                            <p className=" font-semibold text-gray-700">
                                                Respuesta correcta
                                            </p>
                                            <div className="mt-2 bg-green-50 border border-green-200 rounded-xl p-4 text-green-700">
                                                <ReactMarkdown
                                                remarkPlugins={[remarkMath]}
                                                rehypePlugins={[rehypeKatex]}
                                                >
                                                    {renderizarLatex(respuesta.respuestaCorrecta)}
                                                </ReactMarkdown>
                                            </div>
                                        </div>

                                        { respuesta.explicacion &&
                                            <div>
                                                <p className=" font-semibold text-gray-700 ">
                                                    Explicación
                                                </p>
                                                <div className="mt-2 bg-blue-50 border border-blue-200 rounded-xl p-4 text-gray-700 leading-relaxed">
                                                    <ReactMarkdown
                                                    remarkPlugins={[remarkMath]}
                                                    rehypePlugins={[rehypeKatex]}
                                                    >
                                                        {renderizarLatex(respuesta.explicacion)}
                                                    </ReactMarkdown>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>

                <div className=" mt-10 flex justify-end">
                    <button
                        onClick={()=>navigate("/dashboard/admin/resultados")
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-all"
                    >
                        Volver
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetalleResultadoAdmin;