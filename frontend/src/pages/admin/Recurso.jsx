import { useEffect, useMemo, useState } from "react";

import {
    BookOpen,
    FileText,
    Video
} from "lucide-react";

import Input from "../../components/ui/Input.jsx";

import ModalRecurso from "../../components/modal/RecursoModal.jsx";

import {
    cambiarEstadoRecursoRequest,
    obtenerRecursosRequest
} from "../../services/recursoService.js";

const Recursos = ()=>{

    const [recursos, setRecursos] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const [buscar, setBuscar] = useState("");

    const [modal, setModal] = useState(false);

    const [modoModal, setModoModal] = useState("crear");

    const [recursoSeleccionado, setRecursoSeleccionado]= useState(null);


    // CARGAR
    const cargarRecursos = async()=>{

        try {

            setLoading(true);

            const data =
                await obtenerRecursosRequest();

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

    },[]);


    // FILTRAR
    const recursosFiltrados = useMemo(()=>{

        return recursos.filter((recurso)=>

            recurso.titulo
                .toLowerCase()
                .includes(
                    buscar.toLowerCase()
                )

        );

    },[recursos, buscar]);


    // CAMBIAR ESTADO
    const handleEstado = async(id)=>{

        try {

            await cambiarEstadoRecursoRequest(id);

            cargarRecursos();

        } catch (error) {

            console.log(error);

        }

    };


    // EDITAR
    const handleEditar = (recurso)=>{

        setRecursoSeleccionado(recurso);

        setModoModal("editar");

        setModal(true);

    };


    // ICONOS
    const obtenerIcono = (tipo)=>{

        if(tipo === "pdf"){

            return <FileText size={28}/>;

        }

        if(tipo === "youtube"){

            return <Video size={28}/>;

        }

        return <BookOpen size={28}/>;

    };


    // LOADING
    if(loading){

        return(

            <div className="p-6">

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

            <div className="p-6">

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

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

                <div>

                    <h1 className="text-4xl font-bold text-gray-800">
                        Gestión de Recursos
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Administra los recursos académicos del sistema.
                    </p>

                </div>


                <div className="flex gap-3">

                    <Input
                        type="text"
                        placeholder="Buscar recurso..."
                        value={buscar}
                        onChange={(e)=>
                            setBuscar(
                                e.target.value
                            )
                        }
                        className="
                            w-64 border border-gray-300
                            rounded-xl px-4 py-3
                            outline-none
                            focus:ring-2 focus:ring-green-500
                        "
                    />

                    <button
                        onClick={()=>{

                            setModoModal("crear");

                            setRecursoSeleccionado(null);

                            setModal(true);

                        }}
                        className="
                            bg-green-600 hover:bg-green-700
                            text-white px-5 py-3
                            rounded-xl transition
                        "
                    >
                        + Nuevo
                    </button>

                </div>

            </div>


            {/* EMPTY */}
            {
                recursosFiltrados.length === 0
                &&
                <div className="bg-white rounded-2xl shadow-sm p-10 text-center">

                    <h2 className="text-2xl font-semibold text-gray-700">
                        No hay recursos registrados
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Crea un nuevo recurso académico.
                    </p>

                </div>
            }


            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {
                    recursosFiltrados.map((recurso)=>(

                        <div
                            key={recurso._id}
                            className="
                                bg-white rounded-2xl
                                shadow-sm border border-gray-100
                                p-6 hover:shadow-xl
                                hover:-translate-y-1
                                transition-all duration-300
                            "
                        >

                            {/* ICONO */}
                            <div className="
                                w-16 h-16 rounded-2xl
                                bg-green-100 text-green-600
                                flex items-center justify-center
                                mb-5
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
                                text-gray-800 mb-2
                            ">
                                {recurso.titulo}
                            </h2>


                            {/* DESCRIPCION */}
                            <p className="
                                text-gray-500
                                mb-5 line-clamp-3
                            ">

                                {
                                    recurso.descripcion ||
                                    "Sin descripción"
                                }

                            </p>


                            {/* INFO */}
                            <div className="space-y-2 mb-5 text-sm">

                                <p>
                                    <span className="font-semibold">
                                        Tema:
                                    </span>
                                    {" "}
                                    {recurso.tema?.nombre}
                                </p>

                                <p>
                                    <span className="font-semibold">
                                        Materia:
                                    </span>
                                    {" "}
                                    {
                                        recurso.tema
                                            ?.unidad
                                            ?.materia
                                            ?.nombre
                                    }
                                </p>

                            </div>


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

                                <span
                                    className={`
                                        text-xs px-3 py-1 rounded-full text-white
                                        ${
                                            recurso.estado
                                            ? "bg-green-500"
                                            : "bg-gray-400"
                                        }
                                    `}
                                >
                                    {
                                        recurso.estado
                                        ? "Activo"
                                        : "Inactivo"
                                    }
                                </span>

                            </div>


                            {/* BOTONES */}
                            <div className="flex gap-3">

                                <button
                                    onClick={()=>
                                        handleEditar(recurso)
                                    }
                                    className="
                                        flex-1 bg-blue-500
                                        hover:bg-blue-600
                                        text-white py-2
                                        rounded-xl transition
                                    "
                                >
                                    Editar
                                </button>

                                <button
                                    onClick={()=>
                                        handleEstado(
                                            recurso._id
                                        )
                                    }
                                    className={`
                                        flex-1 text-white py-2
                                        rounded-xl transition
                                        ${
                                            recurso.estado
                                            ? "bg-red-500 hover:bg-red-600"
                                            : "bg-green-500 hover:bg-green-600"
                                        }
                                    `}
                                >
                                    {
                                        recurso.estado
                                        ? "Desactivar"
                                        : "Activar"
                                    }
                                </button>

                            </div>

                        </div>

                    ))
                }

            </div>


            {/* MODAL */}
            {
                modal &&
                <ModalRecurso
                    onClose={()=>
                        setModal(false)
                    }
                    onRecursoCreado={
                        cargarRecursos
                    }
                    modo={modoModal}
                    recursoSeleccionado={
                        recursoSeleccionado
                    }
                />
            }

        </div>

    );

};

export default Recursos;