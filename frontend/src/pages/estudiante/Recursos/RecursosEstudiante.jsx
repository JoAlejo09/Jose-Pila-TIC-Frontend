import { useEffect, useState } from "react";
import { FileText, BookOpen, PlayCircle, ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { obtenerRecursosPorTemaRequest } from "../../../services/estudianteService.js";

const RecursosEstudiante = ()=>{
    const navigate = useNavigate();
    const { temaId } = useParams();

    const [recursos,setRecursos] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    const cargarRecursos = async()=>{

        try {
            setLoading(true);
            const data = await obtenerRecursosPorTemaRequest(temaId);
            setRecursos(data);

        } catch (error) {
            console.log(error);
            setError( "Error al cargar recursos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        cargarRecursos();
    },[temaId]);

    // ICONOS
    const obtenerIcono = (tipo)=>{
        if(tipo === "pdf"){
            return <FileText className="text-red-500"/>;
        }
        if(tipo === "youtube"){
            return <PlayCircle className="text-red-600"/>;
        }
        return <BookOpen className="text-blue-500"/>;
    };

    if(loading){
        return(
            <p className="text-center mt-10">
                Cargando recursos...
            </p>
        );

    }

    if(error){

        return(
            <p className="text-center mt-10 text-red-500">
                {error}
            </p>
        );

    }

    return(

        <div className="p-6">

            {/* HEADER */}
            <div className="mb-8">

                <h1 className="text-3xl font-bold mb-2">
                    Recursos Académicos
                </h1>

                <p className="text-slate-500">
                    Selecciona un recurso para visualizarlo.
                </p>

            </div>

            {/* LISTA */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {recursos.map((recurso)=>(

                    <div
                        key={recurso._id}
                        onClick={()=>
                            navigate(
                                `/dashboard/estudiante/recurso/${recurso._id}`
                            )
                        }
                        className="
                        bg-white
                        rounded-2xl
                        shadow-md
                        border
                        p-6
                        cursor-pointer
                        hover:shadow-xl
                        transition-all
                        duration-300
                        "
                    >

                        {/* ICONO */}
                        <div className="
                        w-14
                        h-14
                        rounded-xl
                        bg-slate-100
                        flex
                        items-center
                        justify-center
                        mb-4
                        ">
                            {obtenerIcono(recurso.tipo)}
                        </div>

                        {/* TITULO */}
                        <h2 className="text-xl font-bold mb-2">
                            {recurso.titulo}
                        </h2>

                        {/* DESCRIPCION */}
                        <p className="text-slate-500 text-sm mb-4">
                            {
                                recurso.descripcion ||
                                "Recurso educativo disponible."
                            }
                        </p>

                        {/* FOOTER */}
                        <div className="
                        flex
                        items-center
                        justify-between
                        ">

                            <span className="
                            text-xs
                            bg-slate-100
                            text-slate-600
                            px-3
                            py-1
                            rounded-full
                            capitalize
                            ">
                                {recurso.tipo}
                            </span>

                            <ChevronRight
                                className="text-slate-400"
                            />

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default RecursosEstudiante;