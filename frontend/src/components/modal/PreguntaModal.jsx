import { useEffect, useState } from "react";
import { crearPreguntaRequest} from "../../services/preguntaService.js";
import { getMateriasRequest } from "../../services/materiaService.js";
import {obtenerTemasPorMateriaRequest} from "../../services/temaService.js";

const PreguntaModal = ({onClose, recargarPreguntas})=>{

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
        tema:""
    });

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
        const nuevasOpciones =
            [...formData.opciones];
        nuevasOpciones[index] = valor;
        setFormData({
            ...formData,
            opciones:nuevasOpciones
        });
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            await crearPreguntaRequest(formData);
            await recargarPreguntas();
            onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl max-h-[95vh] overflow-y-auto">
                <div className="flex justify-between items-center border-b border-gray-200 p-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Nueva Pregunta
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl">
                        ×
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-6"
                >
                    <div>
                        <label className="block mb-2 font-medium">
                            Enunciado
                        </label>
                        <textarea
                            name="enunciado"
                            value={formData.enunciado}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-xl p-4 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500"/>
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

                    {formData.tipoPregunta=== "opcion_multiple"
                        &&
                        <div>
                            <label className="block mb-4 font-medium">
                                Opciones
                            </label>
                            <div className="space-y-3">
                                {formData.opciones.map((opcion,index)=>(
                                        <input
                                            key={index}
                                            type="text"
                                            value={opcion}
                                            onChange={(e)=>
                                                handleOpcionChange(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            placeholder={`Opción ${index + 1}`}
                                            className="w-full border border-gray-300 rounded-xl p-3"/>
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
                            className="w-full border border-gray-300 rounded-xl p-4 min-h-[120px]"/>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">
                            Nivel
                        </label>
                        <select
                            name="nivelDificultad"
                            value={formData.nivelDificultad}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl p-3">

                            <option value="facil">Fácil</option>
                            <option value="medio">Medio</option>
                            <option value="dificil">Difícil</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium">Materia
                        </label>
                        <select
                            name="materia"
                            value={formData.materia}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-xl p-3">
                            <option value="">Seleccionar materia</option>
                            {materias.map((materia)=>(
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
                        <label className=" block mb-2 font-medium">
                            Tema
                        </label>

                        <select
                            name="tema"
                            value={formData.tema}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl p-3">
                            <option value="">General</option>

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
                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50"
                        >
                            { loading
                                ?"Guardando..."
                                : "Guardar Pregunta"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default PreguntaModal;