import { useEffect, useMemo, useState } from "react";
import { GraduationCap, CalendarDays, Clock3, User, BookOpen } from "lucide-react";

import Input from "../../components/ui/Input.jsx";
import { obtenerTodasTutoriasRequest, cancelarTutoriaAdminRequest } from "../../services/tutoriaService.js";

const GestionTutorias = () => {

    const [tutorias, setTutorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [buscar, setBuscar] = useState("");
    const [filtro, setFiltro] = useState("todas");

    const cargarTutorias = async () => {
        try {
            setLoading(true);
            const data = await obtenerTodasTutoriasRequest();
            setTutorias(data);
        } catch (error) {
            console.log(error);
            setError(
                error.response?.data?.msg ||
                "Error al cargar tutorías"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarTutorias();
    }, []);

    const cancelarTutoria = async (id) => {
        const confirmar = window.confirm(
            "¿Desea cancelar esta tutoría?"
        );
        if (!confirmar) return;
        try {
            await cancelarTutoriaAdminRequest(id);
            cargarTutorias();
        } catch (error) {
            console.log(error);
            alert(
                error.response?.data?.msg ||
                "Error al cancelar tutoría"
            );
        }
    };

    // FILTRAR
    const tutoriasFiltradas = useMemo(() => {
        return tutorias.filter((tutoria) => {
            const coincideBusqueda = tutoria.materia
                .toLowerCase()
                .includes(
                    buscar.toLowerCase()
                )
            || tutoria.tema
                .toLowerCase()
                .includes(
                    buscar.toLowerCase()
                );

            const coincideFiltro = filtro === "todas"
                ||
                tutoria.estado === filtro;

            return (
                coincideBusqueda &&
                coincideFiltro
            );
        });

    }, [tutorias, buscar, filtro]);

    if (loading) {

        return (
            <div className="p-6">
                <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
                    <p className="text-lg text-gray-600">
                        Cargando tutorías...
                    </p>
                </div>
            </div>
        );
    }

    // ERROR
    if (error) {
        return (
            <div className="p-6">
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

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">
                        Gestión de Tutorías
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Administra las tutorías registradas en el sistema.
                    </p>

                </div>

                <div className="flex gap-3">

                    <Input
                        type="text"
                        placeholder="Buscar tutoría..."
                        value={buscar}
                        onChange={(e) => setBuscar(
                            e.target.value
                        )
                        }
                        className=" w-64 border border-gray-300 rounded-xl px-4 py-3
                                    outline-none focus:ring-2 focus:ring-green-500
                        "
                    />

                    <select
                        value={filtro}
                        onChange={(e) =>
                            setFiltro(
                                e.target.value
                            )
                        }
                        className=" border border-gray-300 rounded-xl px-4 py-3
                                    outline-none focus:ring-2 focus:ring-green-500 "
                    >

                        <option value="todas"> Todas </option>
                        <option value="pendiente"> Pendientes </option>
                        <option value="aceptada"> Aceptadas </option>
                        <option value="realizada"> Realizadas</option>
                        <option value="cancelada"> Canceladas </option>
                    </select>
                </div>
            </div>

            {
                tutoriasFiltradas.length === 0 &&
                (
                    <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
                        <h2 className="text-2xl font-semibold text-gray-700">
                            No existen tutorías registradas
                        </h2>

                        <p className="text-gray-500 mt-2">
                            No se encontraron resultados.
                        </p>
                    </div>
                )
            }

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {
                    tutoriasFiltradas.map((tutoria) => (
                        <div
                            key={tutoria._id}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100
                                         p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300
                            "
                        >
                            <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-600
                                            flex items-center justify-center mb-5
                            ">
                                <GraduationCap size={30} />
                            </div>

                            <h2 className=" text-2xl font-bold text-gray-800 mb-1">
                                {tutoria.materia}
                            </h2>

                            <p className="text-gray-500 mb-5">
                                {tutoria.tema}
                            </p>

                            <div className="space-y-3 text-sm mb-5">
                                <div className="flex items-center gap-2">
                                    <User size={16} />
                                    <span>
                                        <strong>
                                            Estudiante:
                                        </strong>
                                        {" "}
                                        {
                                            tutoria.estudiante?.nombre
                                        }
                                        {" "}
                                        {
                                            tutoria.estudiante?.apellido
                                        }
                                    </span>
                                </div>
                                {
                                    tutoria.tutor && (
                                        <div className="flex items-center gap-2">
                                            <BookOpen size={16} />
                                            <span>
                                                <strong>
                                                    Tutor:
                                                </strong>
                                                {" "}
                                                {
                                                    tutoria.tutor?.nombre
                                                }
                                                {" "}
                                                {
                                                    tutoria.tutor?.apellido
                                                }
                                            </span>
                                        </div>
                                    )
                                }

                                <div className="flex items-center gap-2">
                                    <CalendarDays size={16} />
                                    <span>
                                        <strong>
                                            Fecha:
                                        </strong>
                                        {" "}
                                        {
                                            new Date(
                                                tutoria.fecha
                                            ).toLocaleString()
                                        }
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Clock3 size={16} />
                                    <span>
                                        <strong>
                                            Duración:
                                        </strong>
                                        {" "}
                                        {tutoria.duracion} hora(s)
                                    </span>
                                </div>

                                <p>
                                    <strong>
                                        Modalidad:
                                    </strong>
                                    {" "}
                                    {tutoria.modalidad}
                                </p>
                            </div>

                            {
                                tutoria.descripcion && (
                                    <div className="mb-5">
                                        <p className="font-semibold mb-1">
                                            Descripción:
                                        </p>

                                        <p className="text-gray-500 line-clamp-3">
                                            {
                                                tutoria.descripcion
                                            }
                                        </p>
                                    </div>
                                )
                            }

                            {
                                tutoria.observacionTutor && (
                                    <div className="bg-blue-50 border border-blue-200 
                                                      rounded-xl p-4 mb-5">

                                        <p className="font-semibold text-blue-700 mb-1">
                                            Observación del Tutor
                                        </p>

                                        <p className="text-gray-700">
                                            {
                                                tutoria.observacionTutor
                                            }
                                        </p>
                                    </div>
                                )
                            }

                            {
                                tutoria.calificacion && (
                                    <div className="bg-yellow-50 border border-yellow-200
                                                      rounded-xl p-4 mb-5
                                    ">
                                        <p className="font-semibold text-yellow-700">
                                            ⭐ {tutoria.calificacion}/5
                                        </p>
                                        {
                                            tutoria.comentarioCalificacion && (
                                                <p className="text-gray-700 mt-2">
                                                    {
                                                        tutoria.comentarioCalificacion
                                                    }
                                                </p>
                                            )
                                        }
                                    </div>
                                )
                            }

                            <div className="flex flex-wrap gap-2 mb-5">
                                <span
                                    className={`text-xs px-3 py-1 rounded-full text-white capitalize
                                        ${
                                            tutoria.estado === "pendiente"
                                            ? "bg-yellow-500"
                                            : tutoria.estado === "aceptada"
                                            ? "bg-blue-600"
                                            : tutoria.estado === "realizada"
                                            ? "bg-green-600"
                                            : "bg-red-600"
                                        }
                                    `}
                                >
                                    {tutoria.estado}
                                </span>
                            </div>

                            {
                                (
                                    tutoria.estado === "pendiente" ||
                                    tutoria.estado === "aceptada"
                                ) && (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() =>
                                                cancelarTutoria(
                                                    tutoria._id
                                                )
                                            }
                                            className="flex-1 bg-red-500 hover:bg-red-600
                                                     text-white py-2 rounded-xl transition
                                            "
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default GestionTutorias;