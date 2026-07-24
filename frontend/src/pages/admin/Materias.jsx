import { useEffect, useMemo, useState } from "react";

import { obtenerMateriasRequest, cambiarEstadoMateriaRequest } from "../../services/materiaService";

import Input from "../../components/ui/Input.jsx";
import ModalMateria from "../../components/modal/MateriaModal.jsx";

const Materias = () => {

    const [materias, setMaterias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [msg, setMsg] = useState("");
    const [buscar, setBuscar] = useState("");
    const [filtroNivelAcademico, setFiltroNivelAcademico] = useState("");
    const [modal, setModal] = useState(false);
    const [modoModal, setModoModal] = useState("crear");
    const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);

    // CARGAR MATERIAS
    const cargarMaterias = async () => {
        try {
            setLoading(true);
            const data = await obtenerMateriasRequest();
            setMaterias(data);
        } catch (error) {
            console.log(error);
            setError( error.response?.data?.msg || "Error al cargar las materias" );
            setTimeout(() => {
                setError("");
            }, 3000);
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarMaterias();
    }, []);

    // NIVELES ÚNICOS
    const nivelesAcademicos = useMemo(() => {
        return [
            ...new Set(
                materias.map(
                    (materia) =>
                        materia.nivelAcademico
                )
            )
        ].filter(Boolean);
    }, [materias]);

    // FILTRADO
    const materiasFiltradas = useMemo(() => {
        return materias.filter((materia) => {
            const textoBusqueda = buscar.toLowerCase();
            const coincideBusqueda = materia.nombre
                    ?.toLowerCase()
                    .includes(textoBusqueda)
                ||
                materia.descripcion
                    ?.toLowerCase()
                    .includes(textoBusqueda)
                ||
                materia.nivelAcademico
                    ?.toLowerCase()
                    .includes(textoBusqueda);
            const coincideNivelAcademico =
                filtroNivelAcademico === ""
                ||
                materia.nivelAcademico === filtroNivelAcademico;
            return (
                coincideBusqueda
                &&
                coincideNivelAcademico
            );
        });
    }, [ materias, buscar, filtroNivelAcademico ]);

    // CAMBIAR ESTADO
    const handleEstado = async (id) => {
        const confirmar = window.confirm(
            "¿Está seguro de cambiar el estado de esta materia?"
        );
    if (!confirmar) return;
        try {
            setMsg("");
            setError("");
            const data = await cambiarEstadoMateriaRequest(id);
            setMsg(data.msg);
            setTimeout(() => {
                setMsg("");
            }, 3000);
            await cargarMaterias();
        } catch (error) {
            console.log(error);
            setError(
                error.response?.data?.msg ||
                "Error al cambiar el estado de la materia"
            );
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    };

    // EDITAR
    const handleEditar = (materia) => {
        setMateriaSeleccionada(materia);
        setModoModal("editar");
        setModal(true);
    };

    // LOADING
    if (loading) {
        return (
            <p className="text-center mt-10">
                Cargando materias...
            </p>
        );
    }

    // ERROR
    if (error) {
        return (
            <p className="text-center mt-10 text-red-500">
                {error}
            </p>
        );
    }

    return (
        <div className=" bg-white p-6 rounded-2xl shadow-sm">

            <div className=" flex flex-col md:flex-row md:items-center 
                             md:justify-between gap-4 mb-6
            ">
                <div>
                    <h1 className=" text-3xl font-bold text-gray-800">
                        Gestión de Materias
                    </h1>
                    {msg && (
                       <div className="bg-green-100 border border-green-200 text-green-700 text-sm rounded-lg p-3 mb-4 ">
                        {msg}
                        </div>
                    )}
                    {error && (
                        <div className="bg-red-100 border border-red-200 text-red-600 text-sm rounded-lg p-3 mb-4">
                            {error}
                        </div>
                    )}
                    <p className=" text-gray-500 mt-1">
                        Administra las materias académicas.
                    </p>

                </div>

                <button
                    onClick={() => {
                        setModoModal("crear");
                        setMateriaSeleccionada(null);
                        setModal(true);
                    }}
                    className=" bg-green-600 hover:bg-green-700
                                text-white px-5 py-3 rounded-xl transition
                    ">
                    + Nueva
                </button>
            </div>

            <div className=" flex flex-col lg:flex-row gap-4 mb-6">
                {/* BUSCADOR */}
                <Input
                    type="text"
                    placeholder="Buscar materia..."
                    value={buscar}
                    onChange={(e) =>
                        setBuscar(e.target.value)
                    }
                    className=" flex-1 border border-gray-300 rounded-xl p-3 "/>

                {/* FILTRO NIVEL */}
                <select
                    value={filtroNivelAcademico}
                    onChange={(e) =>
                        setFiltroNivelAcademico(
                            e.target.value
                        )
                    }
                    className=" border border-gray-300 rounded-xl px-4 py-3 bg-white"
                >

                    <option value=""> Todos los cursos</option>
                    {
                        nivelesAcademicos.map(
                            (nivel) => (
                                <option
                                    key={nivel}
                                    value={nivel}
                                >
                                    {nivel}
                                </option>
                            )
                        )
                    }
                </select>
            </div>

            {/* TABLA */}
            <div className="overflow-x-auto">
                <table className=" w-full bg-white rounded-2xl overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr className="text-gray-700">
                            <th className="p-4 text-left font-semibold">
                                Nombre
                            </th>

                            <th className="p-4 text-left font-semibold">
                                Descripción
                            </th>

                            <th className=" p-4 text-left font-semibold">
                                Año Escolar
                            </th>

                            <th className=" p-4 text-center font-semibold">
                                Estado
                            </th>

                            <th className=" p-4 text-center font-semibold">
                                Acciones
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            materiasFiltradas.length > 0
                                ? (
                                    materiasFiltradas.map((materia) => (
                                        <tr
                                            key={materia._id}
                                            className="border-t hover:bg-gray-50 transition"
                                        >
                                            {/* NOMBRE */}
                                            <td className=" p-4 font-medium text-gray-800">
                                                {materia.nombre}
                                            </td>

                                            {/* DESCRIPCION */}
                                            <td className="p-4 text-gray-600">
                                                {
                                                    materia.descripcion ||
                                                    "-"
                                                }
                                            </td>

                                            {/* NIVEL ACADÉMICO */}
                                            <td className="p-4">
                                                <span className="px-3 py-1 rounded-full
                                                        text-xs bg-blue-100 text-blue-700
                                                ">
                                                    {
                                                        materia.nivelAcademico ||
                                                        "No asignado"
                                                    }
                                                </span>

                                            </td>

                                            {/* ESTADO */}
                                            <td className="p-4 text-center">

                                                <span className={`px-3 py-1 rounded-full text-white text-sm
                                                    ${
                                                        materia.estado
                                                            ? "bg-green-500"
                                                            : "bg-gray-400"
                                                    }
                                                `}>
                                                    {
                                                        materia.estado
                                                            ? "Activa"
                                                            : "Inactiva"
                                                    }
                                                </span>
                                            </td>

                                            {/* ACCIONES */}
                                            <td className="p-4">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleEditar(materia)
                                                        }
                                                        className=" bg-blue-500 hover:bg-blue-600 text-white
                                                                px-4 py-2rounded-lg transition
                                                        "
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleEstado(
                                                                materia._id
                                                            )
                                                        }
                                                        className={`px-4 py-2 rounded-lg text-white transition
                                                            ${
                                                                materia.estado
                                                                    ? "bg-red-500 hover:bg-red-600"
                                                                    : "bg-green-500 hover:bg-green-600"
                                                            }
                                                        `}
                                                    >
                                                        {
                                                            materia.estado
                                                                ? "Desactivar"
                                                                : "Activar"
                                                        }
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )
                                : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className=" text-center p-8text-gray-500"
                                        >
                                            {buscar ||filtroNivelAcademico
                                                ? "No existen materias que coincidan con los filtros"
                                                : "No hay materias registradas"

                                            }
                                        </td>
                                    </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            {
                modal &&
                (
                    <ModalMateria
                        onClose={() => setModal(false)}
                        onMateriaCreada={cargarMaterias}
                        modo={modoModal}
                        materiaSeleccionada={materiaSeleccionada}
                    />
                )
            }
        </div>
    );
};

export default Materias;