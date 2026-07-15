import { useEffect, useMemo, useState } from "react";
import { BookMarked, Search, ArrowLeft, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { obtenerTemasPorUnidadRequest, agregarTemaFavoritoRequest, quitarTemaFavoritoRequest} from "../../services/estudianteService.js";

const TemasEstudiante = ()=>{
    const navigate = useNavigate();
    const { unidadId } = useParams();

    const [temas, setTemas] = useState({
        favoritos: [],
        otros: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [busqueda, setBusqueda] = useState("");


    // CARGAR TEMAS
    const cargarTemas = async()=>{
        try {
            setLoading(true);
            const data = await obtenerTemasPorUnidadRequest(unidadId);
            setTemas({
                favoritos: data.favoritos || [],
                otros: data.otros || []
            });
        } catch (error) {
            console.log(error);
            
            setError( error.response?.data?.msg || "Error al cargar temas");
        } finally {
            setLoading(false);
        }

    };

    useEffect(()=>{
        cargarTemas();
    },[unidadId]);


    // FAVORITOS
    const toggleFavorito = async( temaId, esFavorito)=>{
        try {
            if(esFavorito){
                await quitarTemaFavoritoRequest(temaId);
            }else{
                await agregarTemaFavoritoRequest(temaId);
            }
            await cargarTemas();
        } catch (error) {
            console.log(error);
        }
    };


    // FILTRAR TEMAS
    const temasFiltrados = useMemo(()=>{
        const todosTemas = [
            ...(temas.favoritos || []),
            ...(temas.otros || [])
        ];

        return todosTemas.filter((tema)=>
            tema.nombre
                .toLowerCase()
                .includes(
                    busqueda.toLowerCase()
                )
        );
    },[temas, busqueda]);


    // LOADING
    if(loading){
        return(
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                    <p className="text-lg text-gray-600">
                        Cargando temas...
                    </p>
                </div>
            </div>
        );
    }


    // ERROR
    if(error){
        return(
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                    <p className="text-lg text-red-500">
                        {error}
                    </p>
                </div>
            </div>
        );
    }


    return(
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <button onClick={()=> navigate(-1)}
                    className=" flex items-center gap-2 bg-white border border-gray-200
                             hover:bg-gray-100 px-4 py-2 rounded-xl transition-all duration-200 shadow-sm
                             "
                    >
                        <ArrowLeft size={18}/>
                        <span className="font-medium">
                            Volver
                        </span>
                    </button>
                </div>
                <h1 className="text-4xl font-bold text-gray-800">
                    Temas Académicos
                </h1>
                <p className="text-gray-500 mt-2">
                    Explora los temas disponibles para tu nivel académico
                </p>
            </div>


            {/* BUSCADOR */}
            <div className="bg-white rounded-2xl shadow-sm p-5 mb-8">

                <div className=" flex items-center gap-3 border 
                                border-gray-200 rounded-xl px-4 py-3"
                >

                    <Search
                        size={20}
                        className="text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Buscar tema..."
                        value={busqueda}
                        onChange={(e)=>
                            setBusqueda(
                                e.target.value
                            )
                        }
                        className=" w-full outline-none bg-transparent"
                    />
                </div>
            </div>

            {
                temasFiltrados.length === 0
                &&
                <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
                    <h2 className="text-2xl font-semibold text-gray-700">
                        No se encontraron temas
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Intenta buscar otro tema
                    </p>

                </div>
            }

            {/* GRID */}
            <div className=" grid grid-cols-1 md:grid-cols-2
                            xl:grid-cols-3 gap-6"
            >

                {
                    temasFiltrados.map((tema)=>(
                        <div
                            key={tema._id}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6
                                        hover:shadow-xl hover:-translate-y-1 transition-all 
                                        duration-300 relative
                            "
                        >
                            {/* FAVORITO */}
                            <button
                                onClick={(e)=>{
                                    e.stopPropagation();
                                    toggleFavorito(
                                        tema._id,
                                        tema.esFavorito
                                    );

                                }}
                                className=" absolute top-5 right-5 ">

                                <Star
                                    size={22}
                                    className={
                                        tema.esFavorito
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }
                                />
                            </button>

                            {/* CARD */}
                            <div
                                onClick={()=>
                                    navigate( `/dashboard/estudiante/recursos/${tema._id}`)
                                }
                                className="cursor-pointer"
                            >
                                {/* ICONO */}
                                <div className="w-16 h-16 rounded-2xl bg-green-100 flex
                                                items-center justify-center text-green-600 mb-5
                                ">
                                    <BookMarked size={32}/>
                                </div>


                                {/* TITULO */}
                                <h2 className=" text-2xl font-bold text-gray-800 mb-3">
                                    {tema.nombre}
                                </h2>


                                {/* DESCRIPCION */}
                                <p className="text-gray-500 leading-relaxed mb-4">
                                    {
                                        tema.descripcion ||
                                        "Tema académico disponible"
                                    }
                                </p>

                                {/* NIVEL */}
                                <span className=" inline-block bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full ">
                                    {tema.nivelAcademico}
                                </span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default TemasEstudiante;