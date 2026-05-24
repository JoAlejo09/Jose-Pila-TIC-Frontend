import { useEffect, useState } from "react";

import {
    ArrowLeft,
    BookOpen,
    ChevronRight,
    FileText,
    PlayCircle
} from "lucide-react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    obtenerRecursosPorTemaRequest
} from "../../../services/estudianteService.js";

const RecursosEstudiante = ()=>{

    const navigate = useNavigate();

    const { temaId } = useParams();

    const [recursos,setRecursos] = useState([]);

    const [loading,setLoading] = useState(true);

    const [error,setError] = useState(null);


    // CARGAR
    const cargarRecursos = async()=>{

        try {

            setLoading(true);

            const data =
                await obtenerRecursosPorTemaRequest(
                    temaId
                );

            setRecursos(data);

        } catch (error) {

            console.log(error);

            setError(
                "Error al cargar recursos"
            );

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

            return (
                <FileText
                    size={30}
                    className="text-red-500"
                />
            );

        }

        if(tipo === "youtube"){

            return (
                <PlayCircle
                    size={30}
                    className="text-red-600"
                />
            );

        }

        return (

            <BookOpen
                size={30}
                className="text-blue-500"
            />

        );

    };


    // LOADING
    if(loading){

        return(

            <div className="min-h-screen bg-gray-50 p-6">

                <div className="bg-white rounded-2xl shadow-sm p-10 text-center">

                    <p className="text-lg text-gray-600">
                        Cargando recursos...
                    </p>

                </div>

            </div>

        );

    }


    // ERROR
    if(error){

        return(

            <div className="min-h-screen bg-gray-50 p-6">

                <div className="bg-white rounded-2xl shadow-sm p-10 text-center">

                    <p className="text-lg text-red-500">
                        {error}
                    </p>

                </div>

            </div>

        );

    }


    return(

        <div className="min-h-screen bg-gray-50 p-6">


            {/* BOTON REGRESAR */}
            <button
                onClick={()=>
                    navigate(-1)
                }
                className="
                    flex items-center gap-2
                    text-gray-600 hover:text-gray-900
                    mb-6 transition
                "
            >

                <ArrowLeft size={20}/>

                Volver a temas

            </button>


            {/* HEADER */}
            <div className="mb-8">

                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    Recursos Académicos
                </h1>

                <p className="text-gray-500">
                    Selecciona un recurso para visualizar su contenido.
                </p>

            </div>


            {/* EMPTY */}
            {
                recursos.length === 0
                &&
                <div className="bg-white rounded-2xl shadow-sm p-10 text-center">

                    <h2 className="text-2xl font-semibold text-gray-700">
                        No hay recursos disponibles
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Este tema aún no contiene recursos académicos.
                    </p>

                </div>
            }


            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {
                    recursos.map((recurso)=>(

                        <div
                            key={recurso._id}
                            onClick={()=>
                                navigate(
                                    `/dashboard/estudiante/recurso/${recurso._id}`
                                )
                            }
                            className="
                                bg-white rounded-2xl
                                shadow-sm border border-gray-100
                                p-6 cursor-pointer
                                hover:shadow-xl
                                hover:-translate-y-1
                                transition-all duration-300
                            "
                        >


                            {/* ICONO */}
                            <div className="
                                w-16 h-16 rounded-2xl
                                bg-slate-100
                                flex items-center
                                justify-center mb-5
                            ">

                                {
                                    obtenerIcono(
                                        recurso.tipo
                                    )
                                }

                            </div>


                            {/* TITULO */}
                            <h2 className="
                                text-2xl font-bold
                                text-gray-800 mb-3
                            ">

                                {recurso.titulo}

                            </h2>


                            {/* DESCRIPCION */}
                            <p className="
                                text-gray-500
                                leading-relaxed mb-5
                                line-clamp-3
                            ">

                                {
                                    recurso.descripcion ||
                                    "Recurso educativo disponible."
                                }

                            </p>


                            {/* BADGES */}
                            <div className="flex flex-wrap gap-2 mb-5">

                                <span className="
                                    bg-blue-100 text-blue-700
                                    text-xs px-3 py-1
                                    rounded-full capitalize
                                ">
                                    {recurso.tipo}
                                </span>

                                <span className="
                                    bg-purple-100 text-purple-700
                                    text-xs px-3 py-1
                                    rounded-full capitalize
                                ">
                                    {
                                        recurso.nivelDificultad
                                    }
                                </span>

                            </div>


                            {/* FOOTER */}
                            <div className="
                                flex items-center
                                justify-between
                                pt-2
                            ">

                                <span className="
                                    text-sm text-gray-500
                                ">
                                    Ver recurso
                                </span>

                                <ChevronRight
                                    className="text-gray-400"
                                />

                            </div>

                        </div>

                    ))
                }

            </div>

        </div>

    );

};

export default RecursosEstudiante;