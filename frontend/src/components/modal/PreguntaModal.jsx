import { useEffect, useState } from "react";
import { crearPreguntaRequest, actualizarPreguntaRequest } from "../../services/preguntaService.js";
import { obtenerMateriasRequest } from "../../services/materiaService.js";
import { obtenerTemasPorMateriaNivelRequest } from "../../services/temaService.js";

const PreguntaModal = ({ onClose, recargarPreguntas, preguntaEditar = null })=>{
    const [materias,setMaterias] = useState([]);
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
        tema:"",
        recursoApoyo:{
            tipo:"",
            url:"",
            contenido:""
        }
    });

    //cARGA DE PREGUNTA PARA EDITAR
    useEffect(()=>{
        if(preguntaEditar){
            setForm({
                enunciado: preguntaEditar.enunciado || "",
                nivelAcademico: preguntaEditar.nivelAcademico || "",
                tipoPregunta: preguntaEditar.tipoPregunta || "opcion_multiple",
                opciones:
                    preguntaEditar.opciones?.length > 0
                    ? preguntaEditar.opciones.map(
                        (opcion)=>
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
    
    //Obtener materias
    useEffect(()=>{
        const obtenerMaterias = async()=>{
            try {
                const data = await obtenerMateriasRequest();
                setMaterias(data);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerMaterias();
    },[]);

    useEffect(()=>{
        const obtenerTemas = async()=>{
            if(!form.materia){
                setTemas([]);
                return;
            }
            try {
                const data = await obtenerTemasPorMateriaNivelRequest(form.materia, form.nivelAcademico);
                setTemas(data);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerTemas();
    },[form.materia]);

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    };

    const handleOpcionChange = (index,valor)=>{
        const nuevasOpciones = [...form.opciones];
        nuevasOpciones[index] = valor;
        setForm({
            ...form,
            opciones:nuevasOpciones
        });
    };

    const handleRecursoChange = (e)=>{
        setForm({
            ...form,
            recursoApoyo:{
                ...form.recursoApoyo,
                [e.target.name]:e.target.value
            }
        });
    };

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
        } finally{
            setLoading(false);
        }
    };

    return(
        <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

            <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl max-h-[95vh] overflow-y-auto">

                <div className=" flex justify-between items-center border-b border-gray-200 p-6">
                    <h2 className=" text-2xl font-bold text-gray-800 ">
                        {
                            preguntaEditar
                            ? "Editar Pregunta"
                            : "Nueva Pregunta"
                        }
                    </h2>
                    <button
                        onClick={onClose}
                        className=" text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ×
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-6"
                >
                    <div>
                        <label className=" block mb-2 font-medium">
                            Enunciado
                        </label>
                        <textarea
                            name="enunciado"
                            value={form.enunciado}
                            onChange={handleChange}
                            required
                            className=" w-full border border-gray-300 rounded-xl p-4 min-h-[120px]"/>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Nivel académico
                        </label>
                        <select
                            name="nivelAcademico"
                            value={form.nivelAcademico}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-xl p-3">
                            <option value="">Seleccione un nivel</option>
                            <option value="1ro BGU">1ro BGU</option>
                            <option value="2do BGU">2do BGU</option>
                            <option value="3ro BGU">3ro BGU</option>
                        </select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 font-medium">
                                Materia
                            </label>
                            <select
                                name="materia"
                                value={form.materia}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-xl p-3">
                                <option value="">Seleccione una materia</option>
                                {
                                    materias.map((materia)=>(
                                        <option
                                            key={materia._id}
                                            value={materia._id}
                                        >
                                            {materia.nombre}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                Tema
                            </label>
                            <select
                                name="tema"
                                value={form.tema}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-xl p-3">

                                <option value="">Seleccione un tema</option>
                                {temas.map((tema)=>(
                                        <option
                                            key={tema._id}
                                            value={tema._id}>
                                            {tema.nombre}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Tipo de pregunta
                        </label>
                        <select
                            name="tipoPregunta"
                            value={form.tipoPregunta}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl p-3">

                            <option value="opcion_multiple">Opción múltiple</option>
                            <option value="verdadero_falso">Verdadero/Falso</option>
                            <option value="respuesta_corta">Respuesta corta</option>
                        </select>
                    </div>

                    {
                        (
                            form.tipoPregunta === "opcion_multiple"
                            ||
                            form.tipoPregunta === "verdadero_falso"
                        )
                        &&
                        <div>
                            <label className="block mb-4 font-medium">
                                Opciones
                            </label>
                            <div className="space-y-3">
                                {
                                    (
                                        form.tipoPregunta === "verdadero_falso"
                                        ? ["Verdadero","Falso"]
                                        : form.opciones
                                    ).map((opcion,index)=>(

                                        <input
                                            key={index}
                                            type="text"
                                            value={opcion}
                                            disabled={
                                                form.tipoPregunta ===
                                                "verdadero_falso"
                                            }
                                            onChange={(e)=>
                                                handleOpcionChange(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            placeholder={`Opción ${index + 1}`}
                                            className="
                                                w-full
                                                border border-gray-300
                                                rounded-xl
                                                p-3
                                            "
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    }
                    <div>
                        <label className="block mb-2 font-medium">
                            Respuesta correcta
                        </label>

                        <input
                            type="text"
                            name="respuestaCorrecta"
                            value={form.respuestaCorrecta}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-xlp-3"/>
                    </div>

                    <div>
                        <label className=" block mb-2 font-medium">
                            Nivel de dificultad
                        </label>

                        <select
                            name="nivelDificultad"
                            value={form.nivelDificultad}
                            onChange={handleChange}
                            className=" w-full border border-gray-300 rounded-xl p-3">
                            <option value="facil">Fácil</option>
                            <option value="medio">Medio</option>
                            <option value="dificil">Difícil</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Explicación
                        </label>

                        <textarea
                            name="explicacion"
                            value={form.explicacion}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl p-4 min-h-[120px]"/>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 font-medium">
                                Tipo de recurso
                            </label>
                            <select
                                name="tipo"
                                value={form.recursoApoyo.tipo}
                                onChange={handleRecursoChange}
                                className="w-full border border-gray-300 rounded-xl p-3">

                                <option value="">Sin recurso</option>
                                <option value="imagen"> Imagen </option>
                                <option value="video">Video</option>
                                <option value="pdf">PDF</option>
                                <option value="formula">Fórmula</option>
                                <option value="enlace">Enlace</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2 font-medium">
                                URL recurso
                            </label>
                            <input
                                type="text"
                                name="url"
                                value={form.recursoApoyo.url}
                                onChange={handleRecursoChange}
                                className="w-full border border-gray-300 rounded-xl p-3"/>
                        </div>
                    </div>

                    {
                        form.recursoApoyo.tipo === "formula"
                        &&
                        <div>
                            <label className="
                                block mb-2 font-medium
                            ">
                                Fórmula matemática
                            </label>
                            <textarea
                                name="contenido"
                                value={form.recursoApoyo.contenido}
                                onChange={handleRecursoChange}
                                placeholder="\frac{a}{b}"
                                className="w-full border border-gray-300 rounded-xl p-4"/>
                        </div>
                    }


                    {/* BOTONES */}
                    <div className="
                        flex justify-end gap-4 pt-4
                    ">

                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                px-6 py-3
                                rounded-xl
                                border border-gray-300
                                hover:bg-gray-100
                            "
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">
                            {
                                loading
                                ? "Guardando..."
                                : preguntaEditar
                                    ? "Actualizar"
                                    : "Crear"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PreguntaModal;