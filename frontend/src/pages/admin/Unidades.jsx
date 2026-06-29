import { useEffect, useState } from "react";

import { obtenerUnidadesRequest,cambiarEstadoUnidadRequest } from "../../services/unidadService.js";

import UnidadModal from "../../components/modal/UnidadModal.jsx";

const Unidades = () => {

    const [unidades, setUnidades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [buscar, setBuscar] = useState("");
    const [modal, setModal] = useState(false);
    const [modoModal, setModoModal] = useState("crear");
    const [unidadSeleccionada, setUnidadSeleccionada] = useState(null);

    //Carga de los datos de las unidades para mostrar en la tabla
    const cargarUnidades = async() => {
        try {
            setLoading(true);
            const data = await obtenerUnidadesRequest();
            setUnidades(data);
        } catch (error) {
            console.log(error);
            setError( "Error al cargar las unidades" );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarUnidades();
    }, []);

    const unidadesFiltradas = unidades.filter((unidad) =>
        unidad.nombre
            .toLowerCase()
            .includes(
                buscar.toLowerCase()
            )
    );

    const handleEstado = async(id) => {
        try {
            await cambiarEstadoUnidadRequest(id);
            cargarUnidades();
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditar = (unidad) => {
        setUnidadSeleccionada(unidad);
        setModoModal("editar");
        setModal(true);
    };

    if(loading){
        return(
            <p className="text-center mt-10">
                Cargando unidades...
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
        <div className="space-y-6">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Gestión de Unidades
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Administra las unidades académicas
                        por materia y nivel.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-3">
                    <input
                        type="text"
                        placeholder="Buscar unidad..."
                        value={buscar}
                        onChange={(e)=>
                            setBuscar(e.target.value)
                        }
                        className="
                            border border-gray-300
                            rounded-xl px-4 py-3
                            w-full md:w-72
                            outline-none
                            focus:ring-2
                            focus:ring-blue-500
                        "
                    />

                    <button
                        onClick={() => {
                            setModoModal("crear");
                            setUnidadSeleccionada(null);
                            setModal(true);
                        }}
                        className=" bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-medium transition"
                    >

                        + Nueva Unidad
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr className="text-gray-700">
                                <th className="p-4 text-left"> Nombre </th>
                                <th className="p-4 text-left"> Materia </th>
                                <th className="p-4 text-center"> Nivel </th>
                                <th className="p-4 text-center"> Orden </th>
                                <th className="p-4 text-center"> Estado </th>
                                <th className="p-4 text-center"> Acciones</th>
                            </tr>

                        </thead>

                        <tbody>
                            { unidadesFiltradas.length > 0
                                ? (
                                    unidadesFiltradas.map((unidad)=>(
                                        <tr
                                            key={unidad._id}
                                            className="
                                                border-t
                                                hover:bg-gray-50
                                                transition
                                            "
                                        >
                                            <td className="p-4 font-medium text-gray-800">
                                                {unidad.nombre}
                                            </td>

                                            <td className="p-4 text-gray-600">
                                                { unidad.materia?.nombre }
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                                    { unidad.nivelAcademico }
                                                </span>
                                            </td>

                                            <td className="p-4 text-center text-gray-700">
                                                {unidad.orden}
                                            </td>

                                            <td className="p-4 text-center">
                                                <span className={` px-3 py-1 rounded-full text-sm text-white
                                                    ${
                                                        unidad.estado
                                                        ? "bg-green-500"
                                                        : "bg-gray-400"
                                                    }
                                                `}>

                                                    { unidad.estado
                                                        ? "Activa"
                                                        : "Inactiva"
                                                    }
                                                </span>
                                            </td>

                                            <td className="p-4">
                                                <div className="flex justify-center gap-2">
                                                    <button
                                                        onClick={()=> handleEditar(unidad)}
                                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        onClick={()=>handleEstado(unidad._id)}
                                                        className={`px-4 py-2 rounded-lg text-sm text-white
                                                            ${
                                                                unidad.estado
                                                                ? "bg-red-500 hover:bg-red-600"
                                                                : "bg-green-500 hover:bg-green-600"
                                                            }
                                                        `}
                                                    >
                                                        { unidad.estado
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
                                            colSpan="6"
                                            className=" text-center p-8 text-gray-500"
                                        >
                                            No hay unidades registradas
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {
                modal &&
                (
                    <UnidadModal
                        onClose={() => setModal(false)}
                        onUnidadCreada={ cargarUnidades }
                        modo={modoModal}
                        unidadSeleccionada={
                            unidadSeleccionada
                        }
                    />
                )
            }
        </div>
    );
};

export default Unidades;