import { useEffect, useState } from "react";

import {
    obtenerCuestionariosRequest,
    eliminarCuestionarioRequest
} from "../../services/cuestionarioService.js";

import CuestionarioModal from "../../components/modal/CuestionarioModal.jsx";

const Cuestionarios = ()=>{

    const [cuestionarios,setCuestionarios] =
        useState([]);

    const [loading,setLoading] =
        useState(true);

    const [abrirModal,setAbrirModal] =
        useState(false);

    const [
        cuestionarioEditar,
        setCuestionarioEditar
    ] = useState(null);

    // =========================================
    // CARGAR CUESTIONARIOS
    // =========================================

    const cargarCuestionarios = async()=>{

        try {

            const data =
                await obtenerCuestionariosRequest();

            setCuestionarios(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    useEffect(()=>{

        cargarCuestionarios();

    },[]);

    // =========================================
    // CAMBIAR ESTADO
    // =========================================

    const cambiarEstado = async(id)=>{

        try {

            await eliminarCuestionarioRequest(id);

            cargarCuestionarios();

        } catch (error) {

            console.log(error);

        }
    };

    // =========================================
    // LOADING
    // =========================================

    if(loading){

        return(

            <div className="min-h-screen bg-gray-50 p-6">

                <div className="bg-white rounded-2xl shadow-sm p-8 text-center">

                    <p className="text-lg text-gray-600">
                        Cargando cuestionarios...
                    </p>

                </div>

            </div>

        );
    }

    return(

        <div className="min-h-screen bg-gray-50 p-6">

            {/* HEADER */}

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h1 className="text-4xl font-bold text-gray-800">
                        Gestión de Cuestionarios
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Administra cuestionarios académicos
                    </p>

                </div>

                <button
                    onClick={()=>{
                        setCuestionarioEditar(null);
                        setAbrirModal(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition-all"
                >
                    + Nuevo Cuestionario
                </button>

            </div>

            {/* TABLA */}

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden overflow-x-auto">

                <table className="w-full min-w-[1200px]">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">
                                Título
                            </th>

                            <th className="p-4 text-left">
                                Materia
                            </th>

                            <th className="p-4 text-left">
                                Tema
                            </th>

                            <th className="p-4 text-left">
                                Nivel Académico
                            </th>

                            <th className="p-4 text-left">
                                Tipo Evaluación
                            </th>

                            <th className="p-4 text-left">
                                Tipo Cuestionario
                            </th>

                            <th className="p-4 text-left">
                                Modo
                            </th>

                            <th className="p-4 text-left">
                                Nivel
                            </th>

                            <th className="p-4 text-left">
                                Preguntas
                            </th>

                            <th className="p-4 text-left">
                                Tiempo
                            </th>

                            <th className="p-4 text-left">
                                Estado
                            </th>

                            <th className="p-4 text-center">
                                Acciones
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            cuestionarios.length > 0
                            ? cuestionarios.map((cuestionario)=>(

                                <tr
                                    key={cuestionario._id}
                                    className="border-t hover:bg-gray-50"
                                >

                                    <td className="p-4 font-medium text-gray-800">
                                        {
                                            cuestionario.titulo
                                        }
                                    </td>

                                    <td className="p-4">
                                        {
                                            cuestionario.materia?.nombre
                                            || "Sin materia"
                                        }
                                    </td>

                                    <td className="p-4">

                                        {
                                            cuestionario.tipoEvaluacion
                                            === "tema"
                                                ? cuestionario.tema?.nombre
                                                : "General"
                                        }

                                    </td>

                                    <td className="p-4">
                                        {
                                            cuestionario.nivelAcademico
                                        }
                                    </td>

                                    <td className="p-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium
                                            ${
                                                cuestionario.tipoEvaluacion
                                                === "tema"
                                                ? "bg-purple-100 text-purple-700"
                                                : "bg-blue-100 text-blue-700"
                                            }`}
                                        >

                                            {
                                                cuestionario.tipoEvaluacion
                                                === "tema"
                                                    ? "Por Tema"
                                                    : "General"
                                            }

                                        </span>

                                    </td>

                                    <td className="p-4 capitalize">
                                        {
                                            cuestionario.tipoCuestionario
                                        }
                                    </td>

                                    <td className="p-4 capitalize">
                                        {
                                            cuestionario.modoGeneracion
                                        }
                                    </td>

                                    <td className="p-4 capitalize">
                                        {
                                            cuestionario.nivel
                                        }
                                    </td>

                                    <td className="p-4 text-center">
                                        {
                                            cuestionario.cantidadPreguntas
                                        }
                                    </td>

                                    <td className="p-4">
                                        {
                                            cuestionario.tiempoLimite
                                        } min
                                    </td>

                                    <td className="p-4">

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm
                                            ${
                                                cuestionario.estado
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                            }`}
                                        >

                                            {
                                                cuestionario.estado
                                                ? "Activo"
                                                : "Inactivo"
                                            }

                                        </span>

                                    </td>

                                    <td className="p-4 text-center">

                                        <div className="flex justify-center gap-3">

                                            <button
                                                onClick={()=>{
                                                    setCuestionarioEditar(
                                                        cuestionario
                                                    );

                                                    setAbrirModal(true);
                                                }}
                                                className="px-4 py-2 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                                            >
                                                Editar
                                            </button>

                                            <button
                                                onClick={()=>
                                                    cambiarEstado(
                                                        cuestionario._id
                                                    )
                                                }
                                                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            >

                                                {
                                                    cuestionario.estado
                                                    ? "Desactivar"
                                                    : "Activar"
                                                }

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))
                            :
                            <tr>

                                <td
                                    colSpan="12"
                                    className="p-10 text-center text-gray-500"
                                >

                                    No existen cuestionarios registrados

                                </td>

                            </tr>
                        }

                    </tbody>

                </table>

            </div>

            {/* MODAL */}

            {
                abrirModal
                &&
                <CuestionarioModal

                    onClose={()=>
                        setAbrirModal(false)
                    }

                    recargarCuestionarios={
                        cargarCuestionarios
                    }

                    cuestionarioEditar={
                        cuestionarioEditar
                    }

                />
            }

        </div>
    );
};

export default Cuestionarios;