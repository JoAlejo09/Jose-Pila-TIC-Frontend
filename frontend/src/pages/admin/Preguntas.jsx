import { useEffect, useState } from "react";
import { obtenerPreguntasRequest} from "../../services/preguntaService";

const Preguntas = ()=>{
    const [preguntas,setPreguntas] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const obtenerPreguntas = async()=>{
            try {
                const data = await obtenerPreguntasRequest();
                setPreguntas(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        obtenerPreguntas();
    },[]);
    if(loading){
        return(

            <div className="min-h-screen bg-gray-50 p-6">
                <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                    <p className="text-lg text-gray-600">
                        Cargando preguntas...
                    </p>
                </div>
            </div>
        );
    }

    return(
        <div className="min-h-screen bg-gray-50 p-6">
 
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">
                        Gestión de Preguntas
                    </h1>
                    <p className="text-gray-500   mt-2">
                        Administra preguntas académicas del sistema.
                    </p>
                </div>

                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition-all">
                    Nueva Pregunta
                </button>
            </div>

            {/*TABLA */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-left">Enunciado</th>
                            <th className="p-4 text-left">Materia</th>
                            <th className="p-4 text-left">Tema</th>
                            <th className="p-4 text-left">Tipo</th>
                            <th className="p-4 text-left">Nivel</th>
                            <th className="p-4 text-left">Estado</th>
                            <th className="p-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {preguntas.map((pregunta)=>(
                            <tr
                                key={pregunta._id}
                                className="border-t hover:bg-gray-50">

                                    <td className="p-4">
                                        <p className="line-clamp-2 max-w-[350px]">
                                            {pregunta.enunciado}
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        {pregunta.materia?.nombre}
                                    </td>

                                    <td className="p-4">
                                        {pregunta.tema?.nombre || "General"}
                                    </td>
                                    <td className="p-4">
                                        {pregunta.tipoPregunta}
                                    </td>
                                    <td className="p-4">
                                        {pregunta.nivelDificultad}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-sm
                                            ${pregunta.estado
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }
                                        `}>
                                            {pregunta.estado
                                                ? "Activo"
                                                : "Inactivo"
                                            }
                                        </span>
                                    </td>

                                    <td className="p-4 text-center">
                                        <div className="flex justify-center gap-3">
                                            <button
                                                className="px-4 py-2 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
                                                Editar
                                            </button>
                                            <button
                                                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300">
                                                Estado
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Preguntas;