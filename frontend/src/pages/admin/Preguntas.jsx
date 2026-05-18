import { useEffect, useMemo, useState } from "react";

import {
    Search,
    Plus,
    Pencil,
    Power
} from "lucide-react";

import {
    obtenerPreguntasRequest,
    eliminarPreguntaRequest
} from "../../services/preguntaService.js";

import PreguntaModal from "../../components/modal/PreguntaModal.jsx";

const Preguntas = ()=>{

    const [preguntas,setPreguntas] = useState([]);

    const [loading,setLoading] = useState(true);

    const [abrirModal,setAbrirModal] = useState(false);

    const [preguntaEditar,setPreguntaEditar] =
        useState(null);

    const [busqueda,setBusqueda] =
        useState("");

    const [filtroTipo,setFiltroTipo] =
        useState("");

    const [filtroNivel,setFiltroNivel] =
        useState("");


    // CARGAR PREGUNTAS
    const cargarPreguntas = async()=>{

        try {

            const data =
                await obtenerPreguntasRequest();

            setPreguntas(data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };


    useEffect(()=>{

        cargarPreguntas();

    },[]);


    // CAMBIAR ESTADO
    const cambiarEstado = async(id)=>{

        try {

            await eliminarPreguntaRequest(id);

            cargarPreguntas();

        } catch (error) {

            console.log(error);

        }

    };


    // FILTRAR
    const preguntasFiltradas = useMemo(()=>{

        return preguntas.filter((pregunta)=>{

            const coincideBusqueda =
                pregunta.enunciado
                    .toLowerCase()
                    .includes(
                        busqueda.toLowerCase()
                    );

            const coincideTipo =
                filtroTipo === ""
                ||
                pregunta.tipoPregunta === filtroTipo;

            const coincideNivel =
                filtroNivel === ""
                ||
                pregunta.nivelDificultad === filtroNivel;

            return (
                coincideBusqueda
                &&
                coincideTipo
                &&
                coincideNivel
            );

        });

    },[
        preguntas,
        busqueda,
        filtroTipo,
        filtroNivel
    ]);


    if(loading){

        return(

            <div className="min-h-screen bg-gray-50 p-6">

                <div className="bg-white rounded-2xl shadow-sm p-8 text-center">

                    <p className="text-lg text-gray-600">
                        Cargando preguntas...
                    </p>

                </div>

            </div>

        );

    }


    return(

        <div className="min-h-screen bg-gray-50 p-6">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-bold text-gray-800">
                        Gestión de Preguntas
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Administra preguntas académicas del sistema
                    </p>

                </div>

                <button
                    onClick={()=>{
                        setPreguntaEditar(null);
                        setAbrirModal(true);
                    }}
                    className="
                    flex items-center gap-2
                    bg-blue-600 hover:bg-blue-700
                    text-white px-5 py-3
                    rounded-xl font-medium
                    transition-all
                    "
                >

                    <Plus size={20}/>

                    Nueva Pregunta

                </button>

            </div>


            {/* FILTROS */}
            <div className="
            bg-white rounded-2xl shadow-sm
            p-5 mb-6
            flex flex-col lg:flex-row
            gap-4
            ">

                {/* BUSCADOR */}
                <div className="
                flex items-center gap-3
                border border-gray-200
                rounded-xl px-4 py-3
                flex-1
                ">

                    <Search
                        size={20}
                        className="text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Buscar pregunta..."
                        value={busqueda}
                        onChange={(e)=>
                            setBusqueda(e.target.value)
                        }
                        className="
                        w-full outline-none
                        bg-transparent
                        "
                    />

                </div>


                {/* FILTRO TIPO */}
                <select
                    value={filtroTipo}
                    onChange={(e)=>
                        setFiltroTipo(e.target.value)
                    }
                    className="
                    border border-gray-200
                    rounded-xl px-4 py-3
                    "
                >

                    <option value="">
                        Todos los tipos
                    </option>

                    <option value="opcion_multiple">
                        Opción múltiple
                    </option>

                    <option value="verdadero_falso">
                        Verdadero/Falso
                    </option>

                    <option value="respuesta_corta">
                        Respuesta corta
                    </option>

                </select>


                {/* FILTRO NIVEL */}
                <select
                    value={filtroNivel}
                    onChange={(e)=>
                        setFiltroNivel(e.target.value)
                    }
                    className="
                    border border-gray-200
                    rounded-xl px-4 py-3
                    "
                >

                    <option value="">
                        Todos los niveles
                    </option>

                    <option value="facil">
                        Fácil
                    </option>

                    <option value="medio">
                        Medio
                    </option>

                    <option value="dificil">
                        Difícil
                    </option>

                </select>

            </div>


            {/* TABLA */}
            <div className="
            bg-white rounded-2xl
            shadow-sm overflow-hidden
            ">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">
                                Enunciado
                            </th>

                            <th className="p-4 text-left">
                                Materia
                            </th>

                            <th className="p-4 text-left">
                                Tema
                            </th>

                            <th className="p-4 text-left">
                                Tipo
                            </th>

                            <th className="p-4 text-left">
                                Nivel
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
                            preguntasFiltradas.map((pregunta)=>(

                                <tr
                                    key={pregunta._id}
                                    className="
                                    border-t
                                    hover:bg-gray-50
                                    "
                                >

                                    <td className="p-4">

                                        <p className="
                                        line-clamp-2
                                        max-w-[350px]
                                        ">

                                            {pregunta.enunciado}

                                        </p>

                                    </td>

                                    <td className="p-4">

                                        {pregunta.materia?.nombre}

                                    </td>

                                    <td className="p-4">

                                        {
                                            pregunta.tema?.nombre
                                            ||
                                            "General"
                                        }

                                    </td>

                                    <td className="p-4">

                                        <span className="
                                        px-3 py-1
                                        rounded-full text-xs
                                        bg-blue-100 text-blue-700
                                        ">

                                            {pregunta.tipoPregunta}

                                        </span>

                                    </td>

                                    <td className="p-4">

                                        <span className="
                                        px-3 py-1
                                        rounded-full text-xs
                                        bg-yellow-100 text-yellow-700
                                        ">

                                            {pregunta.nivelDificultad}

                                        </span>

                                    </td>

                                    <td className="p-4">

                                        <span className={`
                                        px-3 py-1 rounded-full text-xs
                                        ${
                                            pregunta.estado
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }
                                        `}>

                                            {
                                                pregunta.estado
                                                ? "Activo"
                                                : "Inactivo"
                                            }

                                        </span>

                                    </td>


                                    {/* ACCIONES */}
                                    <td className="p-4">

                                        <div className="
                                        flex justify-center gap-3
                                        ">

                                            <button
                                                onClick={()=>{
                                                    setPreguntaEditar(
                                                        pregunta
                                                    );

                                                    setAbrirModal(true);
                                                }}
                                                className="
                                                p-2 rounded-lg
                                                bg-yellow-100
                                                text-yellow-700
                                                hover:bg-yellow-200
                                                "
                                            >

                                                <Pencil size={18}/>

                                            </button>

                                            <button
                                                onClick={()=>
                                                    cambiarEstado(
                                                        pregunta._id
                                                    )
                                                }
                                                className="
                                                p-2 rounded-lg
                                                bg-gray-200
                                                text-gray-700
                                                hover:bg-gray-300
                                                "
                                            >

                                                <Power size={18}/>

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>


            {/* MODAL */}
            {
                abrirModal
                &&
                <PreguntaModal
                    onClose={()=>
                        setAbrirModal(false)
                    }
                    recargarPreguntas={ cargarPreguntas }
                    preguntaEditar={preguntaEditar}
                />
            }
        </div>
    );
};

export default Preguntas;