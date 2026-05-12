import { useEffect, useState } from "react";
import { BookMarked } from "lucide-react";
import { useNavigate, useParams} from "react-router-dom";
import { obtenerTemasPorMateriaRequest} from "../../services/estudianteService.js";

const TemasEstudiante = ()=>{

    const navigate = useNavigate();
    const {materiaId} = useParams();
    const [temas,setTemas] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    const cargarTemas = async()=>{
        try {
            setLoading(true);
            const data = await obtenerTemasPorMateriaRequest(materiaId);
            setTemas(data);
        } catch (error) {
            console.log(error);
            setError( "Error al cargar temas");
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        cargarTemas();
    },[materiaId]);

    if(loading){
        return(
            <p className="text-center mt-10">
                Cargando temas...
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

            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    Temas Académicos
                </h1>
                <p className="text-slate-500">
                    Explora los temas disponibles para tu nivel académico.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {temas.map((tema)=>(
                    <div
                        key={tema._id}
                        onClick={()=>
                            navigate(`/dashboard/estudiante/recursos/${tema._id}`)
                        }
                        className="bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border ">

                        <div className="w-14 h-14 rounded-xl bg-green-500 flex items-center justify-center text-white mb-4">
                            <BookMarked size={28}/>
                        </div>

                        <h2 className="text-xl font-semibold mb-2">
                            {tema.nombre}
                        </h2>

                        <p className="text-slate-500 text-sm mb-3">
                            {
                                tema.descripcion ||
                                "Tema académico disponible."
                            }
                        </p>
                        <span className=" inline-block bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full">
                            {tema.nivelAcademico}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TemasEstudiante;