import { useEffect, useMemo, useState } from "react";

import Input from "../../components/ui/Input.jsx";

import ModalTema from "../../components/modal/TemaModal.jsx";

import {
    obtenerTemasRequest,
    cambiarEstadoTemaRequest
}
from "../../services/temaService.js";

const Temas = () => {

    const [temas, setTemas] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const [buscar, setBuscar] = useState("");

    const [filtroMateria, setFiltroMateria] = useState("");

    const [filtroUnidad, setFiltroUnidad] = useState("");

    const [modal, setModal] = useState(false);

    const [modoModal, setModoModal] = useState("crear");

    const [temaSeleccionado, setTemaSeleccionado] = useState(null);

    // CARGAR TEMAS
    const cargarTemas = async () => {

        try {

            setLoading(true);

            const data = await obtenerTemasRequest();

            setTemas(data);

        } catch (error) {

            console.log(error);

            setError("Error al cargar temas");

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        cargarTemas();

    }, []);

    // MATERIAS ÚNICAS
    const materiasUnicas = useMemo(() => {

        const materias = temas.map(
            (tema) => tema.unidad?.materia?.nombre
        );

        return [...new Set(materias.filter(Boolean))];

    }, [temas]);

    // UNIDADES ÚNICAS
    const unidadesUnicas = useMemo(() => {

        const unidades = temas.map(
            (tema) => tema.unidad?.nombre
        );

        return [...new Set(unidades.filter(Boolean))];

    }, [temas]);

    // FILTRO
    const temasFiltrados = useMemo(() => {

        return temas.filter((tema) => {

            const coincideBusqueda =

                tema.nombre
                    .toLowerCase()
                    .includes(
                        buscar.toLowerCase()
                    );

            const coincideMateria =

                filtroMateria === ""
                ||
                tema.unidad?.materia?.nombre === filtroMateria;

            const coincideUnidad =

                filtroUnidad === ""
                ||
                tema.unidad?.nombre === filtroUnidad;

            return (

                coincideBusqueda
                &&
                coincideMateria
                &&
                coincideUnidad
            );

        });

    }, [
        temas,
        buscar,
        filtroMateria,
        filtroUnidad
    ]);

    // CAMBIAR ESTADO
    const handleEstado = async (id) => {

        try {

            await cambiarEstadoTemaRequest(id);

            cargarTemas();

        } catch (error) {

            console.log(error);

        }
    };

    // EDITAR
    const handleEditar = (tema) => {

        setTemaSeleccionado(tema);

        setModoModal("editar");

        setModal(true);

    };

    // LOADING
    if (loading) {

        return (

            <p className="text-center mt-10">
                Cargando temas...
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

        <div className="space-y-6">

            {/* HEADER */}
            <div className="
                flex flex-col md:flex-row
                md:justify-between
                md:items-center
                gap-4
            ">

                <div>

                    <h1 className="
                        text-3xl
                        font-bold
                        text-gray-800
                    ">
                        Gestión de Temas
                    </h1>

                    <p className="
                        text-gray-500
                        mt-1
                    ">
                        Administra los temas académicos del sistema.
                    </p>

                </div>

                <div className="
                    flex flex-wrap
                    gap-3
                ">

                    {/* BUSCADOR */}
                    <Input
                        type="text"
                        placeholder="Buscar tema..."
                        value={buscar}

                        onChange={(e) =>
                            setBuscar(e.target.value)
                        }

                        className="
                            w-64
                            border border-gray-300
                            rounded-lg
                            px-4 py-2
                            focus:ring-2
                            focus:ring-green-500
                            outline-none
                        "
                    />

                    {/* FILTRO MATERIA */}
                    <select
                        value={filtroMateria}

                        onChange={(e) =>
                            setFiltroMateria(
                                e.target.value
                            )
                        }

                        className="
                            border border-gray-300
                            rounded-lg
                            px-4 py-2
                            outline-none
                        "
                    >

                        <option value="">
                            Todas las materias
                        </option>

                        {
                            materiasUnicas.map((materia) => (

                                <option
                                    key={materia}
                                    value={materia}
                                >
                                    {materia}
                                </option>

                            ))
                        }

                    </select>

                    {/* FILTRO UNIDAD */}
                    <select
                        value={filtroUnidad}

                        onChange={(e) =>
                            setFiltroUnidad(
                                e.target.value
                            )
                        }

                        className="
                            border border-gray-300
                            rounded-lg
                            px-4 py-2
                            outline-none
                        "
                    >

                        <option value="">
                            Todas las unidades
                        </option>

                        {
                            unidadesUnicas.map((unidad) => (

                                <option
                                    key={unidad}
                                    value={unidad}
                                >
                                    {unidad}
                                </option>

                            ))
                        }

                    </select>

                    {/* BOTÓN */}
                    <button
                        onClick={() => {

                            setModoModal("crear");

                            setTemaSeleccionado(null);

                            setModal(true);

                        }}

                        className="
                            bg-green-600
                            hover:bg-green-700
                            text-white
                            px-5 py-2
                            rounded-lg
                            transition
                        "
                    >
                        + Nuevo
                    </button>

                </div>

            </div>

            {/* TABLA */}
            <div className="
                bg-white
                rounded-2xl
                shadow-sm
                overflow-hidden
                border border-gray-100
            ">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr className="text-gray-700">

                            <th className="p-4 text-left">
                                Tema
                            </th>

                            <th className="p-4 text-left">
                                Unidad
                            </th>

                            <th className="p-4 text-left">
                                Materia
                            </th>

                            <th className="p-4 text-center">
                                Orden
                            </th>

                            <th className="p-4 text-center">
                                Estado
                            </th>

                            <th className="p-4 text-center">
                                Acciones
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            temasFiltrados.length > 0
                            ? (
                                temasFiltrados.map((tema) => (

                                    <tr
                                        key={tema._id}

                                        className="
                                            border-t
                                            hover:bg-gray-50
                                            transition
                                        "
                                    >

                                        <td className="p-4">

                                            <div>

                                                <p className="
                                                    font-semibold
                                                    text-gray-800
                                                ">
                                                    {tema.nombre}
                                                </p>

                                                <p className="
                                                    text-sm
                                                    text-gray-500
                                                ">
                                                    {
                                                        tema.descripcion
                                                        ||
                                                        "Sin descripción"
                                                    }
                                                </p>

                                            </div>

                                        </td>

                                        <td className="p-4">

                                            {
                                                tema.unidad?.nombre || "-"
                                            }

                                        </td>

                                        <td className="p-4">

                                            {
                                                tema.unidad?.materia?.nombre
                                                || "-"
                                            }

                                        </td>

                                        <td className="
                                            p-4
                                            text-center
                                        ">

                                            {tema.orden}

                                        </td>

                                        <td className="
                                            p-4
                                            text-center
                                        ">

                                            <span
                                                className={`
                                                    px-3 py-1
                                                    rounded-full
                                                    text-sm
                                                    text-white
                                                    ${
                                                        tema.estado
                                                        ? "bg-green-500"
                                                        : "bg-gray-400"
                                                    }
                                                `}
                                            >

                                                {
                                                    tema.estado
                                                    ? "Activo"
                                                    : "Inactivo"
                                                }

                                            </span>

                                        </td>

                                        <td className="p-4">

                                            <div className="
                                                flex
                                                justify-center
                                                gap-2
                                            ">

                                                <button
                                                    onClick={() =>
                                                        handleEditar(tema)
                                                    }

                                                    className="
                                                        bg-blue-500
                                                        hover:bg-blue-600
                                                        text-white
                                                        px-4 py-2
                                                        rounded-lg
                                                        transition
                                                    "
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleEstado(
                                                            tema._id
                                                        )
                                                    }

                                                    className={`
                                                        px-4 py-2
                                                        rounded-lg
                                                        text-white
                                                        transition
                                                        ${
                                                            tema.estado
                                                            ? "bg-red-500 hover:bg-red-600"
                                                            : "bg-green-500 hover:bg-green-600"
                                                        }
                                                    `}
                                                >

                                                    {
                                                        tema.estado
                                                        ? "Desactivar"
                                                        : "Activar"
                                                    }

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))
                            ) : (

                                <tr>

                                    <td
                                        colSpan="6"

                                        className="
                                            text-center
                                            p-8
                                            text-gray-500
                                        "
                                    >
                                        No hay temas registrados
                                    </td>

                                </tr>

                            )
                        }

                    </tbody>

                </table>

            </div>

            {
                modal && (

                    <ModalTema
                        onClose={() =>
                            setModal(false)
                        }

                        onTemaCreado={cargarTemas}

                        modo={modoModal}

                        temaSeleccionado={temaSeleccionado}
                    />

                )
            }

        </div>
    );
};

export default Temas;