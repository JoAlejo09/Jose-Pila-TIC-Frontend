import { useEffect, useState } from "react";

import {
    crearPreguntaRequest,
    actualizarPreguntaRequest
} from "../../services/preguntaService.js";

import {
    obtenerMateriasRequest
} from "../../services/materiaService.js";

import {
    obtenerUnidadesPorMateriaRequest
} from "../../services/unidadService.js";

import {
    obtenerTemasPorUnidadRequest
} from "../../services/temaService.js";

const PreguntaModal = ({
    onClose,
    recargarPreguntas,
    preguntaEditar = null
})=>{

    const [materias,setMaterias] = useState([]);
    const [unidades,setUnidades] = useState([]);
    const [temas,setTemas] = useState([]);

    const [loading,setLoading] = useState(false);

    const [form,setForm] = useState({
        enunciado:"",
        nivelAcademico:"1ro BGU",
        tipoPregunta:"opcion_multiple",
        opciones:["","","",""],
        respuestaCorrecta:"",
        explicacion:"",
        nivelDificultad:"facil",

        materia:"",
        unidad:"",
        tema:"",

        recursoApoyo:{
            tipo:"",
            url:"",
            contenido:""
        }
    });

    // EDITAR
    useEffect(()=>{

        if(preguntaEditar){

            setForm({
                enunciado:
                    preguntaEditar.enunciado || "",

                nivelAcademico:
                    preguntaEditar.nivelAcademico || "1ro BGU",

                tipoPregunta:
                    preguntaEditar.tipoPregunta || "opcion_multiple",

                opciones:
                    preguntaEditar.opciones?.length > 0
                    ? preguntaEditar.opciones.map((opcion)=>
                        typeof opcion === "string"
                        ? opcion
                        : opcion.texto
                    )
                    : ["","","",""],

                respuestaCorrecta:
                    preguntaEditar.respuestaCorrecta || "",

                explicacion:
                    preguntaEditar.explicacion || "",

                nivelDificultad:
                    preguntaEditar.nivelDificultad || "facil",

                materia:
                    preguntaEditar.materia?._id || "",

                unidad:
                    preguntaEditar.unidad?._id || "",

                tema:
                    preguntaEditar.tema?._id || "",

                recursoApoyo:
                    preguntaEditar.recursoApoyo || {
                        tipo:"",
                        url:"",
                        contenido:""
                    }
            });

        }

    },[preguntaEditar]);

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

    // OBTENER UNIDADES
    useEffect(()=>{

        const obtenerUnidades = async()=>{

            if(!form.materia){

                setUnidades([]);
                return;

            }

            try {

                const data =
                    await obtenerUnidadesPorMateriaRequest(
                        form.materia
                    );

                setUnidades(data);

            } catch (error) {

                console.log(error);

            }

        };

        obtenerUnidades();

    },[form.materia]);

    // OBTENER TEMAS
    useEffect(()=>{

        const obtenerTemas = async()=>{

            if(!form.unidad){

                setTemas([]);
                return;

            }

            try {

                const data =
                    await obtenerTemasPorUnidadRequest(
                        form.unidad
                    );

                setTemas(data);

            } catch (error) {

                console.log(error);

            }

        };

        obtenerTemas();

    },[form.unidad]);

    // HANDLE CHANGE
    const handleChange = (e)=>{

        const { name, value } = e.target;

        setForm((prev)=>({

            ...prev,

            [name]:value,

            ...(name === "materia" && {
                unidad:"",
                tema:""
            }),

            ...(name === "unidad" && {
                tema:""
            })

        }));

    };

    // OPCIONES
    const handleOpcionChange = (index,valor)=>{

        const nuevasOpciones = [...form.opciones];

        nuevasOpciones[index] = valor;

        setForm({
            ...form,
            opciones:nuevasOpciones
        });

    };

    // RECURSO
    const handleRecursoChange = (e)=>{

        setForm({
            ...form,
            recursoApoyo:{
                ...form.recursoApoyo,
                [e.target.name]:e.target.value
            }
        });

    };

    // SUBMIT
    const handleSubmit = async(e)=>{

        e.preventDefault();

        setLoading(true);

        try {

            const payload = {

                ...form,

                opciones:
                    form.tipoPregunta === "respuesta_corta"
                    ? []
                    : form.opciones
                        .filter(
                            (opcion)=>
                                opcion.trim() !== ""
                        )
                        .map((texto)=>({ texto }))

            };

            if(preguntaEditar){

                await actualizarPreguntaRequest(
                    preguntaEditar._id,
                    payload
                );

            }else{

                await crearPreguntaRequest(payload);

            }

            await recargarPreguntas();

            onClose();

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    return(

        <div className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/50 backdrop-blur-sm
            p-4
        ">

            <div className="
                bg-white w-full max-w-4xl
                rounded-2xl shadow-2xl
                max-h-[95vh] overflow-y-auto
            ">

                {/* HEADER */}
                <div className="
                    flex justify-between items-center
                    border-b border-gray-200
                    p-6
                ">

                    <h2 className="
                        text-2xl font-bold text-gray-800
                    ">

                        {
                            preguntaEditar
                            ? "Editar Pregunta"
                            : "Nueva Pregunta"
                        }

                    </h2>

                    <button
                        onClick={onClose}
                        className="
                            text-gray-500
                            hover:text-gray-700
                            text-2xl
                        "
                    >
                        ×
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-6"
                >

                    {/* ENUNCIADO */}
                    <div>

                        <label className="block mb-2 font-medium">
                            Enunciado
                        </label>

                        <textarea
                            name="enunciado"
                            value={form.enunciado}
                            onChange={handleChange}
                            required
                            className="
                                w-full border border-gray-300
                                rounded-xl p-4
                                min-h-[120px]
                            "
                        />

                    </div>

                    {/* NIVEL */}
                    <div>

                        <label className="block mb-2 font-medium">
                            Nivel académico
                        </label>

                        <select
                            name="nivelAcademico"
                            value={form.nivelAcademico}
                            onChange={handleChange}
                            required
                            className="
                                w-full border border-gray-300
                                rounded-xl p-3
                            "
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

                    {/* MATERIA / UNIDAD / TEMA */}
                    <div className="grid md:grid-cols-3 gap-4">

                        {/* MATERIA */}
                        <div>

                            <label className="block mb-2 font-medium">
                                Materia
                            </label>

                            <select
                                name="materia"
                                value={form.materia}
                                onChange={handleChange}
                                required
                                className="
                                    w-full border border-gray-300
                                    rounded-xl p-3
                                "
                            >

                                <option value="">
                                    Seleccione una materia
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

                        {/* UNIDAD */}
                        <div>

                            <label className="block mb-2 font-medium">
                                Unidad
                            </label>

                            <select
                                name="unidad"
                                value={form.unidad}
                                onChange={handleChange}
                                required
                                className="
                                    w-full border border-gray-300
                                    rounded-xl p-3
                                "
                            >

                                <option value="">
                                    Seleccione una unidad
                                </option>

                                {unidades.map((unidad)=>(

                                    <option
                                        key={unidad._id}
                                        value={unidad._id}
                                    >
                                        {unidad.nombre}
                                    </option>

                                ))}

                            </select>

                        </div>

                        {/* TEMA */}
                        <div>

                            <label className="block mb-2 font-medium">
                                Tema
                            </label>

                            <select
                                name="tema"
                                value={form.tema}
                                onChange={handleChange}
                                required
                                className="
                                    w-full border border-gray-300
                                    rounded-xl p-3
                                "
                            >

                                <option value="">
                                    Seleccione un tema
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

                    </div>

                    {/* TIPO */}
                    <div>

                        <label className="block mb-2 font-medium">
                            Tipo de pregunta
                        </label>

                        <select
                            name="tipoPregunta"
                            value={form.tipoPregunta}
                            onChange={handleChange}
                            className="
                                w-full border border-gray-300
                                rounded-xl p-3
                            "
                        >

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

                    </div>

                </form>

            </div>

        </div>

    );

};

export default PreguntaModal;