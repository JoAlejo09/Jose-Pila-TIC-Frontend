import { useEffect, useState } from "react";

import { ArrowLeft, Layers } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import { obtenerMateriaPorIdRequest } from "../../services/materiaService";

import { obtenerUnidadesPorMateriaRequest } from "../../services/unidadService";

const UnidadesEstudiante = ()=>{

    const navigate = useNavigate();
 
    const { materiaId } = useParams();
    const [materia,setMateria] = useState(null);
    const [unidades,setUnidades] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState("");
    const cargarDatos = async()=>{

        try {
            setLoading(true);

            const materiaData = await obtenerMateriaPorIdRequest(materiaId);
            const unidadesData = await obtenerUnidadesPorMateriaRequest(materiaId);

            setMateria(materiaData);
            setUnidades(unidadesData);

        } catch (error) {

            console.log(error);
            setError("Error al cargar unidades");

        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        cargarDatos();
    },[]);

    //Ventana mientras carga los datos    
    if(loading){
        return(
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                    <p className="text-lg text-gray-600">
                        Cargando unidades...
                    </p>
                </div>
            </div>
        );
    }

    //Errores
    if(error){
        return(
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                    <p className="text-red-500 text-lg">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    return(
        <div className="min-h-screen bg-gray-50 p-6">

            <div className="flex items-center justify-between mb-8">

                <div>
                    <button
                        onClick={()=> navigate(-1)}
                        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-3"
                    >
                        <ArrowLeft size={18}/>
                        Volver
                    </button>

                    <h1 className="text-4xl font-bold text-gray-800">
                        {materia?.nombre}
                    </h1>

                    <p className="text-gray-500 mt-2">
                        {
                            materia?.descripcion ||
                            "Explora las unidades disponibles."
                        }
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {
                    unidades.map((unidad,index)=>(

                        <div
                            key={unidad._id}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6
                                        hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >

                            {/* ICONO */}
                            <div className=" w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 mb-5">

                                <Layers size={32}/>

                            </div>

                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                Unidad {index + 1}
                            </h2>

                            <h3 className="text-lg font-semibold text-gray-600 mb-4">
                                {unidad.nombre}
                            </h3>

                            <p className="text-gray-500 leading-relaxed mb-5">

                                {
                                    unidad.descripcion ||
                                    "Unidad académica disponible."
                                }
                            </p>
                            <div className="flex flex-wrap gap-2 mb-5">
                                {unidad.temasPreview?.map((tema,i)=>(
                                        <span
                                            key={i}
                                            className=" bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                        >
                                            {tema}
                                        </span>
                                    ))
                                }
                            </div>

                            <div className="flex items-center justify-between mt-auto">
                                <span className=" text-sm text-gray-400">
                                    {unidad.totalTemas} temas
                                </span>

                                <button
                                    onClick={()=> navigate( `/dashboard/estudiante/temas/${unidad._id}`)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                                >
                                    Ver temas
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default UnidadesEstudiante;