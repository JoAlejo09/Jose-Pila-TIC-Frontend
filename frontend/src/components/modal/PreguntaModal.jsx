import { useEffect, useState } from "react";
import { crearPreguntaRequest, actualizarPreguntaRequest} from "../../services/preguntaService.js";
import { getMateriasRequest } from "../../services/materiaService.js";
import {obtenerTemasPorMateriaRequest} from "../../services/temaService.js";

const PreguntaModal = ({onClose, recargarPreguntas, preguntaEditar=null})=>{

    const [materias,setMaterias] = useState([]);
    const [temas,setTemas] = useState([]);
    const [loading,setLoading] = useState(false);
    const [formData,setFormData] = useState({
        enunciado:"",
        tipoPregunta:"opcion_multiple",
        opciones:["","","",""],
        respuestaCorrecta:"",
        explicacion:"",
        nivelDificultad:"facil",
        materia:"",
        tema:"",
        recursoApoyo: {tipo:"", url:""},
        contenidoFormula:""
    });

    useEffect(()=>{
        if(preguntaEditar){
            setFormData({
                enunciado: preguntaEditar.enunciado || "",
                tipoPregunta: preguntaEditar.tipoPregunta || "opcion_multiple",
                opciones: preguntaEditar.opciones?.length > 0
                    ? preguntaEditar.opciones
                    :["","","",""],
                respuestaCorrecta: preguntaEditar.respuestaCorrecta || "",
                explicacion: preguntaEditar.explicacion || "",
                nivelDificultad: preguntaEditar.nivelDificultad || "facil",
                materia: preguntaEditar.materia?._id || "",
                tema: preguntaEditar.tema?._id || "",
                recursoApoyo: preguntaEditar.recursoApoyo || {
                    tipo: "",
                    url: ""
                },
                contenidoFormula: preguntaEditar.contenidoFormula || ""
            });
        }
    },[preguntaEditar]);

    useEffect(()=>{
        const obtenerMaterias = async()=>{
            try {
                const data = await getMateriasRequest();
                setMaterias(data);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerMaterias();
    },[]);

    useEffect(()=>{
        const obtenerTemas = async()=>{
            if(!formData.materia){
                setTemas([]);
                return;
            }
            try {
                const data = await obtenerTemasPorMateriaRequest(
                    formData.materia);
                setTemas(data);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerTemas();
    },[formData.materia]);


    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };


    const handleOpcionChange = (index,valor)=>{
        const nuevasOpciones = [...formData.opciones];
        nuevasOpciones[index] = valor;
        setFormData({
            ...formData,
            opciones:nuevasOpciones
        });
    };
    const handleRecursoChange = (e)=>{
        setFormData({
            ...formData,
            recursoApoyo:{
                ...formData.recursoApoyo,
                [e.target.name]:e.target.value
            }
        });
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...formData,
                opciones: formData.tipoPregunta === "respuesta_corta"
                ? []
                : formData.opciones.filter((opcion)=> opcion.trim()!=="")
            }
            if(preguntaEditar){
                await actualizarPreguntaRequest(
                    preguntaEditar._id,
                    payload
                )
            }else{
                await crearPreguntaRequest(payload);
            }
            await recargarPreguntas();
            onClose();
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false);
        }
    };
    return(
    <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

        <div className=" bg-white w-full max-w-4xl rounded-2xl shadow-2xl max-h-[95vh] overflow-y-auto">
                <div className=" flex justify-between items-center border-b border-gray-200 p-6">
                    <h2 className=" text-2xl font-bold text-gray-800">
                        { preguntaEditar 
                            ? "Editar Pregunta"
                            : "Nueva Pregunta"
                        }
                    </h2>
                    <button
                        onClick={onClose}
                        className=" text-gray-500 hover:text-gray-700 text-2xl" >
                        ×
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-6"
                >
                    <div>
                        <label className="block mb-2 font-medium ">
                            Enunciado
                        </label>
                        <textarea
                            name="enunciado"
                            value={formData.enunciado}
                            onChange={handleChange}
                            required
                            className=" w-full border border-gray-300 rounded-xl p-4 min-h-[120px]"/>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Tipo de pregunta
                        </label>

                        <select
                            name="tipoPregunta"
                            value={formData.tipoPregunta}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl p-3">

                            <option value="opcion_multiple">Opción múltiple</option>
                            <option value="verdadero_falso"> Verdadero/Falso</option>
                            <option value="respuesta_corta"> Respuesta corta </option>
                        </select>
                    </div>

                    { (formData.tipoPregunta === "opcion_multiple"
                        ||
                       formData.tipoPregunta === "verdadero_falso")
                        &&
                        <div>
                            <label className=" block mb-4 font-medium">
                                Opciones
                            </label>
                            <div className="space-y-3">
                                { ( formData.tipoPregunta === "verdadero_falso" 
                                    ? ["Verdadero","Falso"]
                                    : formData.opciones
                                    ).map((opcion,index)=>(
                                        <input
                                            key={index}
                                            type="text"
                                            value={opcion}
                                            disabled={
                                                formData.tipoPregunta === "verdadero_falso"
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
                        <label className=" block mb-2 font-medium">
                            Respuesta correcta
                        </label>
                        <input
                            type="text"
                            name="respuestaCorrecta"
                            value={formData.respuestaCorrecta}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-xl p-3"/>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Explicación
                        </label>
                        <textarea
                            name="explicacion"
                            value={formData.explicacion}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl p-4 min-h-[120px]"
                        />
                    </div>

                    <div>
                        <label className=" block mb-2 font-medium">
                            Fórmula matemática (LaTeX)
                        </label>
                        <textarea
                            name="contenidoFormula"
                            value={formData.contenidoFormula}
                            onChange={handleChange}
                            placeholder="\frac{a}{b}"
                            className="w-full border border-gray-300 rounded-xl p-4"
                        />

                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 font-medium">
                                Tipo de recurso
                            </label>
                            <select
                                name="tipo"
                                value={formData.recursoApoyo.tipo}
                                onChange={handleRecursoChange}
                                className=" w-full border border-gray-300 rounded-xl p-3 ">

                                <option value="">Sin recurso</option>
                                <option value="imagen">Imagen</option>
                                <option value="video">Video</option>
                                <option value="pdf">PDF</option>
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
                                value={formData.recursoApoyo.url}
                                onChange={handleRecursoChange}
                                className=" w-full border border-gray-300 rounded-xl p-3"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default PreguntaModal;