import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {obtenerMateriasEstudianteRequest} from "../../services/estudianteService.js";

const MateriasEstudiante = ()=>{
    const navigate = useNavigate();
    const [materias,setMaterias] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    const cargarMaterias = async()=>{
        try {
            setLoading(true);
            const data = await obtenerMateriasEstudianteRequest();
            setMaterias(data);
        } catch (error) {
            console.log(error);
            setError( "Error al cargar materias" );
        } finally {
            setLoading(false);
        }
    };
    useEffect(()=>{
        cargarMaterias();
    },[]);

    if(loading){
        return(
            <p className="text-center mt-10">
                Cargando materias...
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
                    Materias Académicas
                </h1>
                <p className="text-slate-500">
                    Selecciona una materia para explorar sus temas.
                </p>
            </div>
            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {materias.map((materia)=>(
                    <div
                        key={materia._id}
                        onClick={()=>
                            navigate(
                                `/dashboard/estudiante/temas/${materia._id}`
                            )
                        }
                        className="bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border">

                        <div className=" w-14 h-14 rounded-xl bg-blue-500 flex items-center justify-center text-white mb-4">
                            <BookOpen size={28}/>
                        </div>

                        <h2 className="text-xl font-semibold mb-2">
                            {materia.nombre}
                        </h2>
                        <p className="text-slate-500 text-sm">
                            {
                                materia.descripcion ||
                                "Materia académica disponible."
                            }
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MateriasEstudiante;