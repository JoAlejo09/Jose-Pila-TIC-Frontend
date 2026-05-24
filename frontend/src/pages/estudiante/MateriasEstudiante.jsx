import { useEffect, useMemo, useState } from "react";
import { BookOpen, Search, Star } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { obtenerMateriasEstudianteRequest, agregarMateriaFavoritaRequest, quitarMateriaFavoritaRequest } from "../../services/estudianteService.js";

import {verificarDiagnosticoMateriaRequest }from "../../services/cuestionarioService.js";
const MateriasEstudiante = () => {
    const navigate = useNavigate();

    const [materias, setMaterias] = useState({
        favoritas: [],
        otras: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [busqueda, setBusqueda] = useState("");

    //Carga de las materias disponibles
    const cargarMaterias = async () => {
        try {
            setLoading(true);
            const data = await obtenerMateriasEstudianteRequest();
            setMaterias({
                favoritas: data.favoritas || [],
                otras: data.otras || []
            });
        } catch (error) {
            console.log(error);
            setError("Error al cargar materias");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarMaterias();
    }, []);

    //Para añadir favoritos
    const toggleFavoritos = async (
        materiaId,
        esFavorita
    ) => {
        try {
            if (esFavorita) {
                await quitarMateriaFavoritaRequest(
                    materiaId
                );
            } else {
                await agregarMateriaFavoritaRequest(
                    materiaId
                );
            }

            setMaterias((prev) => {
                const todas = [
                    ...prev.favoritas,
                    ...prev.otras
                ];
                const actualizadas = todas.map(
                    (materia) => {
                        if ( materia._id === materiaId ) {
                            return {
                                ...materia,
                                esFavorita:
                                    !esFavorita
                            };
                        }
                        return materia;
                    }
                );

                return {
                    favoritas: actualizadas.filter( (m) => m.esFavorita ),
                    otras: actualizadas.filter( (m) => !m.esFavorita )
                };
            });
        } catch (error) {
            console.log(error);
        }
    };

    // BUSQUEDA
    const materiasFiltradas = useMemo(() => {

        const todas = [
            ...(materias.favoritas || []),
            ...(materias.otras || [])
        ];

        return todas.filter((materia) =>
            materia.nombre
                .toLowerCase()
                .includes(
                    busqueda.toLowerCase()
                )
        );

    }, [materias, busqueda]);

    const handleAccesoMateria = async(materiaId)=>{

    try {
        const data = await verificarDiagnosticoMateriaRequest( materiaId );
        if(data.tieneDiagnostico){
            navigate( `/dashboard/estudiante/unidades/${materiaId}`);
        } else{
            navigate(
                `/dashboard/estudiante/cuestionario/${data.cuestionarioId}`
            );
        }
    } catch (error) {
        console.log(error);
    }
};
    // Mientras carga los datos
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
                    <p className="text-lg text-gray-600">
                        Cargando materias...
                    </p>
                </div>
            </div>
        );
    }
    //Cuando hay error
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
                    <p className="text-lg text-red-500">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <div className="mb-8">
                <h1 className=" text-4xl font-bold text-gray-800">
                    Materias Académicas
                </h1>
                <p className="text-gray-500 mt-2">
                    Explora las materias
                    disponibles según tu
                    nivel académico.
                </p>

            </div>

            <div className=" bg-white rounded-2xl shadow-sm p-5 mb-8 ">
                <div className=" flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 ">
                    <Search
                        size={20}
                        className="text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Buscar materia..."
                        value={busqueda}
                        onChange={(e) =>
                            setBusqueda(
                                e.target.value
                            )
                        }
                        className=" w-full outline-none bg-transparent"
                    />
                </div>
            </div>

            { materiasFiltradas.length === 0 &&
                (
                    <div className=" bg-white rounded-2xl shadow-sm p-10 text-center ">
                        <h2 className=" text-2xl font-semibold text-gray-700 ">
                            No se encontraron materias
                        </h2>
                        <p className=" text-gray-500 mt-2 ">
                            Intenta buscar otra materia.
                        </p>
                    </div>
                )
            }

            <div className="space-y-10">
                { materiasFiltradas.filter(
                        (m) => m.esFavorita
                    ).length > 0 && (

                        <div>
                            <div className=" flex items-center gap-2 mb-5 ">
                                <Star
                                    size={22}
                                    className=" fill-yellow-400 text-yellow-400 "
                                />

                                <h2 className=" text-2xl font-bold text-gray-800">
                                    Materias Favoritas
                                </h2>
                            </div>

                            <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                                { materiasFiltradas .filter(
                                    (m) => m.esFavorita
                                    )
                                    .map((materia) => (
                                        <div
                                            key={ materia._id }
                                            className=" bg-white border border-yellow-200 rounded-2xl p-5 shadow-sm hover:shadow-xl
                                                        hover:-translate-y-1 transition-all duration-300 relative"
                                        >
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleFavoritos(
                                                                materia._id,
                                                                materia.esFavorita
                                                            );
                                                        }}
                                                        className=" absolute top-4 right-4"
                                                    >
                                                        <Star
                                                            size={22}
                                                            className=" fill-yellow-400 text-yellow-400"
                                                        />
                                                    </button>

                                                    <div
                                                        onClick={() => handleAccesoMateria(materia._id)
                                                        }
                                                        className=" cursor-pointer "
                                                    >

                                                        <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 flex
                                                                        items-center justify-center mb-4"
                                                        >
                                                            <BookOpen size={28} />
                                                        </div>

                                                        <h2 className=" text-xl font-bold text-gray-800 mb-2">
                                                            { materia.nombre }
                                                        </h2>

                                                        <p className=" text-sm text-gray-500 mb-4 line-clamp-2 ">
                                                            {
                                                                materia.descripcion ||
                                                                "Materia académica disponible."
                                                            }
                                                        </p>

                                                        <div className=" flex flex-wrap gap-2 ">

                                                            <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                                                                { materia.nivelAcademico }
                                                            </span>

                                                            <span className=" bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                                                                {
                                                                    materia.totalUnidades || 0
                                                                } unidades
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )
                                }
                            </div>
                        </div>
                    )
                }

                <div>
                    <h2 className=" text-2xl font-bold text-gray-800 mb-5">
                        Todas las Materias
                    </h2>

                    <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {
                            materiasFiltradas.filter(
                                (m) => !m.esFavorita
                            )
                            .map( (materia) => (
                                <div
                                    key={ materia._id }
                                    className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-xl
                                                hover:-translate-y-1 transition-all duration-300 relative"
                                >

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavoritos(
                                                materia._id,
                                                materia.esFavorita
                                            );

                                        }}
                                        className=" absolute top-4 right-4"
                                    >
                                        <Star
                                            size={22}
                                            className="text-gray-300 hover:text-yellow-400"
                                        />
                                    </button>

                                    <div
                                        onClick={() => handleAccesoMateria(materia._id)}
                                        className=" cursor-pointer"
                                    >
                                        <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-600 
                                                        flex items-center justify-center mb-4
                                        ">
                                            <BookOpen size={28} />

                                            </div>

                                            <h2 className=" text-xl font-bold text-gray-800 mb-2">
                                                    { materia.nombre }
                                            </h2>

                                            <p className=" text-sm text-gray-500 mb-4 line-clamp-2">
                                                    {
                                                        materia.descripcion ||
                                                        "Materia académica disponible."
                                                    }
                                            </p>

                                            <div className=" flex flex-wrap gap-2">
                                                    <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                                                        { materia.nivelAcademico}
                                                    </span>

                                                    <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                                                        {
                                                            materia.totalUnidades || 0
                                                        } unidades
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MateriasEstudiante;