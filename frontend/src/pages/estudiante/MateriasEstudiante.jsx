import { useEffect, useMemo, useState } from "react";
import { BookOpen, Search, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
    obtenerMateriasEstudianteRequest,
    agregarMateriaFavoritaRequest,
    quitarMateriaFavoritaRequest
} from "../../services/estudianteService.js";

const MateriasEstudiante = () => {

    const navigate = useNavigate();

    const [materias, setMaterias] = useState({
        favoritas: [],
        otras: []
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [busqueda, setBusqueda] = useState("");

    // CARGAR MATERIAS
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

    // AGREGAR / QUITAR FAVORITOS
    const toggleFavoritos = async (materiaId, esFavorita) => {

        try {

            if (esFavorita) {

                await quitarMateriaFavoritaRequest(materiaId);

            } else {

                await agregarMateriaFavoritaRequest(materiaId);

            }

            setMaterias((prev) => {

                // UNIR TODAS
                const todas = [
                    ...prev.favoritas,
                    ...prev.otras
                ];

                // ACTUALIZAR FAVORITO
                const actualizadas = todas.map((materia) => {

                    if (materia._id === materiaId) {

                        return {
                            ...materia,
                            esFavorita: !esFavorita
                        };

                    }

                    return materia;
                });

                // REORDENAR
                return {
                    favoritas: actualizadas.filter(
                        (m) => m.esFavorita
                    ),
                    otras: actualizadas.filter(
                        (m) => !m.esFavorita
                    )
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
                .includes(busqueda.toLowerCase())
        );

    }, [materias, busqueda]);

    // LOADING
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                    <p className="text-lg text-gray-600">
                        Cargando materias...
                    </p>
                </div>
            </div>
        );
    }

    // ERROR
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                    <p className="text-red-500 text-lg">
                        {error}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            {/* HEADER */}
            <div className="mb-8">

                <h1 className="text-4xl font-bold text-gray-800">
                    Materias Académicas
                </h1>

                <p className="text-gray-500 mt-2">
                    Explora las materias disponibles según tu nivel académico.
                </p>

            </div>

            {/* BUSCADOR */}
            <div className="bg-white rounded-2xl shadow-sm p-5 mb-8">

                <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3">

                    <Search
                        size={20}
                        className="text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Buscar materia..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="w-full outline-none bg-transparent"
                    />

                </div>

            </div>

            {/* SIN RESULTADOS */}
            {
                materiasFiltradas.length === 0 &&
                (
                    <div className="bg-white rounded-2xl shadow-sm p-10 text-center">

                        <h2 className="text-2xl font-semibold text-gray-700">
                            No se encontraron materias
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Intenta buscar otra materia.
                        </p>

                    </div>
                )
            }

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {
                    materiasFiltradas.map((materia) => (

                        <div
                            key={materia._id}
                            className="
                                bg-white rounded-2xl shadow-sm border border-gray-100 p-6
                                hover:shadow-xl hover:-translate-y-1
                                transition-all duration-300 relative
                            "
                        >

                            {/* FAVORITO */}
                            <button
                                onClick={(e) => {

                                    e.stopPropagation();

                                    toggleFavoritos(
                                        materia._id,
                                        materia.esFavorita
                                    );

                                }}
                                className="absolute top-5 right-5"
                            >

                                <Star
                                    size={22}
                                    className={
                                        materia.esFavorita
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                    }
                                />

                            </button>

                            {/* CARD */}
                            <div
                                onClick={() =>
                                    navigate(
                                        `/dashboard/estudiante/temas/${materia._id}`
                                    )
                                }
                                className="cursor-pointer"
                            >

                                <div className="
                                    w-16 h-16 rounded-2xl
                                    bg-blue-100 flex items-center
                                    justify-center text-blue-600 mb-5
                                ">

                                    <BookOpen size={32} />

                                </div>

                                <h2 className="text-2xl font-bold text-gray-800 mb-3">

                                    {materia.nombre}

                                </h2>

                                <p className="text-gray-500 leading-relaxed">

                                    {
                                        materia.descripcion ||
                                        "Materia académica disponible."
                                    }

                                </p>

                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    );
};

export default MateriasEstudiante;