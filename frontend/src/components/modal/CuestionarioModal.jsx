import { useEffect, useState } from "react";

import {
    crearCuestionarioRequest,
    actualizarCuestionarioRequest
} from "../../services/cuestionarioService.js";

import { obtenerMateriasRequest } from "../../services/materiaService.js";
import { obtenerTemasPorMateriaRequest } from "../../services/temaService.js";
import { obtenerPreguntasRequest } from "../../services/preguntaService.js";

const CuestionarioModal = ({
    onClose,
    recargarCuestionarios,
    cuestionarioEditar = null
})=>{

    const modoEdicion = !!cuestionarioEditar;

    const [materias,setMaterias] = useState([]);
    const [temas,setTemas] = useState([]);
    const [preguntasDisponibles,setPreguntasDisponibles] = useState([]);
    const [loading,setLoading] = useState(false);

    const [formData,setFormData] = useState({

        titulo:"",
        descripcion:"",
        instrucciones:"",

        materia:"",
        tema:"",

        nivelAcademico:"1ro BGU",

        tipoEvaluacion:"materia",

        tipoCuestionario:"practica",

        modoGeneracion:"manual",

        preguntas:[],

        cantidadPreguntas:0,

        tiempoLimite:30,

        nivel:"medio",

        aleatorio:false,

        mostrarRevision:true,

        mostrarRespuestasCorrectas:true,

        permitirReintento:false
    });

    // CARGAR DATOS EN EDICION
    useEffect(()=>{

        if(cuestionarioEditar){

            setFormData({

                titulo:
                    cuestionarioEditar.titulo || "",

                descripcion:
                    cuestionarioEditar.descripcion || "",

                instrucciones:
                    cuestionarioEditar.instrucciones || "",

                materia:
                    cuestionarioEditar.materia?._id || "",

                tema:
                    cuestionarioEditar.tema?._id || "",

                nivelAcademico:
                    cuestionarioEditar.nivelAcademico
                    || "1ro BGU",

                tipoEvaluacion:
                    cuestionarioEditar.tipoEvaluacion
                    || "materia",

                tipoCuestionario:
                    cuestionarioEditar.tipoCuestionario
                    || "practica",

                modoGeneracion:
                    cuestionarioEditar.modoGeneracion
                    || "manual",

                preguntas:
                    cuestionarioEditar.preguntas?.map(
                        pregunta => pregunta._id
                    ) || [],

                cantidadPreguntas:
                    cuestionarioEditar.cantidadPreguntas
                    || 0,

                tiempoLimite:
                    cuestionarioEditar.tiempoLimite
                    || 30,

                nivel:
                    cuestionarioEditar.nivel
                    || "medio",

                aleatorio:
                    cuestionarioEditar.aleatorio
                    || false,

                mostrarRevision:
                    cuestionarioEditar.mostrarRevision
                    ?? true,

                mostrarRespuestasCorrectas:
                    cuestionarioEditar.mostrarRespuestasCorrectas
                    ?? true,

                permitirReintento:
                    cuestionarioEditar.permitirReintento
                    || false
            });
        }

    },[cuestionarioEditar]);

    // OBTENER MATERIAS
    useEffect(()=>{

        const obtenerMaterias = async()=>{

            try {

                const data =
                    await obtenerMateriasRequest();

                setMaterias(data);

            } catch (error) {

                console.log(error);

            }
        };

        obtenerMaterias();

    },[]);

    // OBTENER TEMAS SEGUN MATERIA
    useEffect(()=>{

        const obtenerTemas = async()=>{

            if(!formData.materia){

                setTemas([]);

                return;
            }

            try {

                const data =
                    await obtenerTemasPorMateriaRequest(
                        formData.materia
                    );

                setTemas(data);

            } catch (error) {

                console.log(error);

            }
        };

        obtenerTemas();

    },[formData.materia]);

    // OBTENER PREGUNTAS
    useEffect(()=>{

        const obtenerPreguntas = async()=>{

            try {

                const data =
                    await obtenerPreguntasRequest();

                setPreguntasDisponibles(data);

            } catch (error) {

                console.log(error);

            }
        };

        obtenerPreguntas();

    },[]);

    // SINCRONIZAR CANTIDAD DE PREGUNTAS EN MODO MANUAL
    useEffect(()=>{

        if(
            formData.modoGeneracion ===
            "manual"
        ){

            setFormData((prev)=>({

                ...prev,

                cantidadPreguntas:
                    prev.preguntas.length
            }));
        }

    },[
        formData.preguntas,
        formData.modoGeneracion
    ]);

    // FILTRAR PREGUNTAS
    const preguntasFiltradas =
        preguntasDisponibles.filter(
            (pregunta)=>{

                const coincideMateria =
                    pregunta.materia?._id ===
                    formData.materia;

                const coincideNivel =
                    pregunta.nivelAcademico ===
                    formData.nivelAcademico;

                if(
                    formData.tipoEvaluacion ===
                    "tema"
                ){

                    return(

                        coincideMateria
                        &&
                        coincideNivel
                        &&
                        pregunta.tema?._id ===
                        formData.tema
                    );
                }

                return(

                    coincideMateria
                    &&
                    coincideNivel
                );
            }
        );

    // CAMBIOS FORMULARIO
    const handleChange = (e)=>{

        const {
            name,
            value,
            type,
            checked
        } = e.target;

        const valor =
            type === "checkbox"
            ? checked
            : value;

        setFormData((prev)=>({

            ...prev,

            [name]:valor,

            ...(name === "tipoEvaluacion"
                &&
                valor === "materia"
                ? {
                    tema:"",
                    preguntas:[]
                }
                : {}
            ),

            ...(name === "materia"
                ? {
                    tema:"",
                    preguntas:[]
                }
                : {}
            ),

            ...(name === "tema"
                ? {
                    preguntas:[]
                }
                : {}
            ),

            ...(name === "nivelAcademico"
                ? {
                    preguntas:[]
                }
                : {}
            )
        }));
    };

    // SELECCIONAR PREGUNTAS
    const handlePregunta = (id)=>{

        const existe =
            formData.preguntas.includes(id);

        if(existe){

            setFormData({

                ...formData,

                preguntas:
                    formData.preguntas.filter(
                        pregunta => pregunta !== id
                    )
            });

        }else{

            setFormData({

                ...formData,

                preguntas:[
                    ...formData.preguntas,
                    id
                ]
            });
        }
    };

    // GUARDAR
    const handleSubmit = async(e)=>{

        e.preventDefault();

        setLoading(true);

        try {

            if(modoEdicion){

                await actualizarCuestionarioRequest(
                    cuestionarioEditar._id,
                    formData
                );

            }else{

                await crearCuestionarioRequest(
                    formData
                );
            }

            await recargarCuestionarios();

            onClose();

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    return(

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

            <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl max-h-[95vh] overflow-y-auto">

                <div className="flex justify-between items-center border-b border-gray-200 p-6">

                    <h2 className="text-2xl font-bold text-gray-800">

                        {
                            modoEdicion
                            ? "Editar Cuestionario"
                            : "Nuevo Cuestionario"
                        }

                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-500 hover:text-gray-700"
                    >
                        ×
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-6"
                >

                    {/* TITULO */}
                    <div>

                        <label className="block mb-2 font-medium">
                            Título
                        </label>

                        <input
                            type="text"
                            name="titulo"
                            value={formData.titulo}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-xl p-3"
                        />

                    </div>

                    {/* DESCRIPCION */}
                    <div>

                        <label className="block mb-2 font-medium">
                            Descripción
                        </label>

                        <textarea
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl p-4 min-h-[100px]"
                        />

                    </div>

                    {/* MATERIA / TEMA */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>

                            <label className="block mb-2 font-medium">
                                Materia
                            </label>

                            <select
                                name="materia"
                                value={formData.materia}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-xl p-3"
                            >

                                <option value="">
                                    Seleccionar
                                </option>

                                {materias.map((materia)=>(

                                    <option
                                        key={materia._id}
                                        value={materia._id}
                                    >
                                        {materia.nombre}
                                    </option>

                                ))}

                            </select>

                        </div>

                        {
                            formData.tipoEvaluacion ===
                            "tema"
                            &&
                            <div>

                                <label className="block mb-2 font-medium">
                                    Tema
                                </label>

                                <select
                                    name="tema"
                                    value={formData.tema}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded-xl p-3"
                                >

                                    <option value="">
                                        Seleccionar
                                    </option>

                                    {temas.map((tema)=>(

                                        <option
                                            key={tema._id}
                                            value={tema._id}
                                        >
                                            {tema.nombre}
                                        </option>

                                    ))}

                                </select>

                            </div>
                        }

                    </div>

                    {/* CONFIGURACION */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                        <div>

                            <label className="block mb-2 font-medium">
                                Tipo evaluación
                            </label>

                            <select
                                name="tipoEvaluacion"
                                value={formData.tipoEvaluacion}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl p-3"
                            >

                                <option value="materia">
                                    Materia
                                </option>

                                <option value="tema">
                                    Tema
                                </option>

                            </select>

                        </div>

                        <div>

                            <label className="block mb-2 font-medium">
                                Tipo cuestionario
                            </label>

                            <select
                                name="tipoCuestionario"
                                value={formData.tipoCuestionario}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl p-3"
                            >

                                <option value="diagnostico">
                                    Diagnóstico
                                </option>

                                <option value="practica">
                                    Práctica
                                </option>

                                <option value="refuerzo">
                                    Refuerzo
                                </option>

                                <option value="simulador">
                                    Simulador
                                </option>

                            </select>

                        </div>

                        <div>

                            <label className="block mb-2 font-medium">
                                Modo generación
                            </label>

                            <select
                                name="modoGeneracion"
                                value={formData.modoGeneracion}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl p-3"
                            >

                                <option value="manual">
                                    Manual
                                </option>

                                <option value="dinamico">
                                    Dinámico
                                </option>

                            </select>

                        </div>

                        <div>

                            <label className="block mb-2 font-medium">
                                Nivel académico
                            </label>

                            <select
                                name="nivelAcademico"
                                value={formData.nivelAcademico}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl p-3"
                            >

                                <option value="1ro BGU">
                                    1ro BGU
                                </option>

                                <option value="2do BGU">
                                    2do BGU
                                </option>

                                <option value="3ro BGU">
                                    3ro BGU
                                </option>

                            </select>

                        </div>

                    </div>

                    {/* PREGUNTAS */}
                    {
                        formData.modoGeneracion ===
                        "manual"
                        &&
                        <div>

                            <label className="block mb-4 font-medium">
                                Seleccionar preguntas
                            </label>

                            <div className="border border-gray-200 rounded-2xl max-h-[350px] overflow-y-auto divide-y">

                                {
                                    preguntasFiltradas.map((pregunta)=>(

                                        <div
                                            key={pregunta._id}
                                            className="p-4 flex items-start gap-3 hover:bg-gray-50"
                                        >

                                            <input
                                                type="checkbox"
                                                checked={
                                                    formData.preguntas.includes(
                                                        pregunta._id
                                                    )
                                                }
                                                onChange={()=>handlePregunta(
                                                    pregunta._id
                                                )}
                                                className="mt-1"
                                            />

                                            <div>

                                                <p className="font-medium text-gray-800">
                                                    {pregunta.enunciado}
                                                </p>

                                                <p className="text-sm text-gray-500 mt-1">

                                                    {
                                                        pregunta.tema?.nombre
                                                        ||
                                                        pregunta.materia?.nombre
                                                    }

                                                </p>

                                            </div>

                                        </div>

                                    ))
                                }

                            </div>

                        </div>
                    }

                    {/* CONFIG EXTRA */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <div>

                            <label className="block mb-2 font-medium">
                                Cantidad preguntas
                            </label>

                            <input
                                type="number"
                                name="cantidadPreguntas"
                                value={formData.cantidadPreguntas}
                                onChange={handleChange}
                                min="1"
                                disabled={
                                    formData.modoGeneracion ===
                                    "manual"
                                }
                                className="w-full border border-gray-300 rounded-xl p-3"
                            />

                        </div>

                        <div>

                            <label className="block mb-2 font-medium">
                                Tiempo límite (min)
                            </label>

                            <input
                                type="number"
                                name="tiempoLimite"
                                value={formData.tiempoLimite}
                                onChange={handleChange}
                                min="1"
                                className="w-full border border-gray-300 rounded-xl p-3"
                            />

                        </div>

                        <div>

                            <label className="block mb-2 font-medium">
                                Nivel
                            </label>

                            <select
                                name="nivel"
                                value={formData.nivel}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-xl p-3"
                            >

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

                    </div>

                    {/* CHECKBOXES */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <label className="flex items-center gap-3">

                            <input
                                type="checkbox"
                                name="aleatorio"
                                checked={formData.aleatorio}
                                onChange={handleChange}
                            />

                            Orden aleatorio

                        </label>

                        <label className="flex items-center gap-3">

                            <input
                                type="checkbox"
                                name="mostrarRevision"
                                checked={formData.mostrarRevision}
                                onChange={handleChange}
                            />

                            Mostrar revisión

                        </label>

                        <label className="flex items-center gap-3">

                            <input
                                type="checkbox"
                                name="mostrarRespuestasCorrectas"
                                checked={
                                    formData.mostrarRespuestasCorrectas
                                }
                                onChange={handleChange}
                            />

                            Mostrar respuestas correctas

                        </label>

                        <label className="flex items-center gap-3">

                            <input
                                type="checkbox"
                                name="permitirReintento"
                                checked={formData.permitirReintento}
                                onChange={handleChange}
                            />

                            Permitir reintento

                        </label>

                    </div>

                    {/* BOTONES */}
                    <div className="flex justify-end gap-4 pt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300"
                        >

                            Cancelar

                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50"
                        >

                            {
                                loading
                                ? "Guardando..."
                                : modoEdicion
                                    ? "Actualizar"
                                    : "Crear Cuestionario"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default CuestionarioModal;