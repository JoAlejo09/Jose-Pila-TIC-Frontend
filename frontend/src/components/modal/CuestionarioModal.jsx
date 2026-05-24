import { useEffect, useState } from "react";
import { crearCuestionarioRequest, actualizarCuestionarioRequest} from "../../services/cuestionarioService.js";
import { obtenerMateriasRequest} from "../../services/materiaService.js";
import { obtenerTemasPorMateriaRequest } from "../../services/temaService.js";

import {obtenerPreguntasRequest}
from "../../services/preguntaService.js";

import PasoInformacion from "../cuestionario/Informacion.jsx";
import PasoConfiguracion from "../cuestionario/Configuracion.jsx";
import PasoPreguntas from "../cuestionario/Preguntas.jsx";

const CuestionarioModal = ({onClose, recargarCuestionarios, cuestionarioEditar = null})=>{

    const modoEdicion = !!cuestionarioEditar;
    const [paso,setPaso] = useState(1);
    const [materias,setMaterias] = useState([]);
    const [temas,setTemas] = useState([]);
    const [preguntasDisponibles,setPreguntasDisponibles] = useState([]);
    const [loading,setLoading] = useState(false);
    const [form,setForm] = useState({
        titulo:"",
        descripcion:"",
        instrucciones:"",
        materia:"",
        tema:"",
        nivelAcademico:"1ro BGU",
        tipoEvaluacion:"diagnostico",
        alcanceEvaluacion:"tema",
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

    //Para la edicion del cuestionario
    useEffect(()=>{
        if(cuestionarioEditar){
            setForm({
                titulo: cuestionarioEditar.titulo || "",
                descripcion: cuestionarioEditar.descripcion || "",
                instrucciones: cuestionarioEditar.instrucciones || "",
                materia: cuestionarioEditar.materia?._id || "",
                tema: cuestionarioEditar.tema?._id || "",
                nivelAcademico: cuestionarioEditar.nivelAcademico || "1ro BGU",
                tipoEvaluacion:cuestionarioEditar.tipoEvaluacion || "diagnostico",
                alcanceEvaluacion: cuestionarioEditar.alcanceEvaluacion || "tema",
                modoGeneracion: cuestionarioEditar.modoGeneracion || "manual",
                preguntas: cuestionarioEditar.preguntas?.map(
                    pregunta => pregunta._id
                ) || [],
                cantidadPreguntas: cuestionarioEditar.cantidadPreguntas || 0,
                tiempoLimite: cuestionarioEditar.tiempoLimite || 30,
                nivel: cuestionarioEditar.nivel || "medio",
                aleatorio: cuestionarioEditar.aleatorio || false,
                mostrarRevision: cuestionarioEditar.mostrarRevision ?? true,
                mostrarRespuestasCorrectas: cuestionarioEditar.mostrarRespuestasCorrectas ?? true,
                permitirReintento: cuestionarioEditar.permitirReintento || false
            });
        }
    },[cuestionarioEditar]);

    //Obtener las materias
    useEffect(()=>{
        const obtenerMaterias = async()=>{
            try {
                const data = await obtenerMateriasRequest();
                setMaterias(data);
            }
            catch(error){
                console.log(error);
            }
        };
        obtenerMaterias();
    },[]);

    //Obtener temas de la materia
    useEffect(()=>{
        const obtenerTemas = async()=>{
            if(!form.materia){
                setTemas([]);
                return;
            }
            try {
                const data = await obtenerTemasPorMateriaRequest(form.materia);
                setTemas(data);
            }
            catch(error){
                console.log(error);
            }
        };
        obtenerTemas();
    },[form.materia]);

    //Obtener preguntas de un tema
    useEffect(()=>{
        const obtenerPreguntas = async()=>{
            try {
                const data = await obtenerPreguntasRequest();
                setPreguntasDisponibles(data);
            }
            catch(error){
                console.log(error);
            }
        };
        obtenerPreguntas();
    },[]);

    useEffect(()=>{

        if(
            form.modoGeneracion === "manual"
        ){

            setForm((prev)=>({
                ...prev,
                cantidadPreguntas: prev.preguntas.length
            }));
        }
    },[ form.preguntas, form.modoGeneracion ]);
    
    //Filtrado de preguntas
    const preguntasFiltradas = preguntasDisponibles.filter(
        (pregunta)=>{
            const coincideMateria = pregunta.materia?._id?.toString() === form.materia?.toString();
            const coincideNivel = pregunta.nivelAcademico === form.nivelAcademico;
            const coincideTema = pregunta.tema?._id?.toString()
            ===
            form.tema?.toString();

            console.log({
            pregunta: pregunta.enunciado,
            coincideMateria,
            coincideTema,
            coincideNivel,
            materiaPregunta: pregunta.materia?._id,
            materiaForm: form.materia,
            temaPregunta: pregunta.tema?._id,
            temaForm: form.tema
        });

            if( form.alcanceEvaluacion === "tema" ){
                return(
                    coincideMateria &&
                    coincideNivel &&
                    coincideTema
                );
            }
            return(
                coincideMateria &&
                coincideNivel
            );
        }
    );
    console.log("PREGUNTAS FILTRADAS:", preguntasFiltradas);

    //Cambios de formulario
    const handleChange = (e)=>{
        const { name, value, type, checked } = e.target;
        const valor = type === "checkbox"
            ? checked
            : value;

        setForm((prev)=>({
            ...prev,
            [name]:valor,
            ...(name === "alcanceEvaluacion"
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

    //Agregar preguntas
    const handlePregunta = (id)=>{
        const existe = form.preguntas.includes(id);

        if(existe){
            setForm({
                ...form,
                preguntas:
                    form.preguntas.filter(
                        pregunta => pregunta !== id
                    )
            });
        } else{
            setForm({
                ...form,
                preguntas:[
                    ...form.preguntas,
                    id
                ]
            });
        }
    };

    //Validacion de pasos
    const validarPaso = ()=>{
        if(paso === 1){
            if( !form.titulo || !form.tipoEvaluacion ){
                alert("Completa la información básica");
                return false;
            }
        }

        if(paso === 2){
            if( !form.materia || !form.nivelAcademico ){
                alert("Completa la configuración");
                return false;
            }

            if( form.alcanceEvaluacion === "tema" && !form.tema
            ){
                alert("Debes seleccionar un tema");
                return false;
            }
        }
        return true;
    };

    //Navegacion entre partes del formulario
    const siguientePaso = ()=>{
        const valido = validarPaso();
        if(valido){
            setPaso((prev)=> prev + 1);
        }
    };

    const pasoAnterior = ()=>{
        setPaso((prev)=> prev - 1);
    };

    //Para guardar
    const handleSubmit = async(e)=>{
    e.preventDefault();

    // VALIDACION FRONTEND

    if(
        form.modoGeneracion === "manual" &&
        form.preguntas.length === 0
    ){
        alert("Debes seleccionar al menos una pregunta");
        return;
    }

    setLoading(true);

    try {

        const payload = {
            ...form,

            cantidadPreguntas:
                form.modoGeneracion === "manual"
                ? form.preguntas.length
                : Number(form.cantidadPreguntas),

            tema:
                form.alcanceEvaluacion === "tema"
                ? form.tema
                : null
        };

        console.log("PAYLOAD FINAL:", payload);

        if(modoEdicion){

            await actualizarCuestionarioRequest(
                cuestionarioEditar._id,
                payload
            );

        }else{

            await crearCuestionarioRequest(payload);

        }

        await recargarCuestionarios();

        onClose();

    }
    catch(error){

        console.log(error);

        alert(
            error.response?.data?.msg ||
            "Error al guardar cuestionario"
        );

    }
    finally{

        setLoading(false);

    }
};

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl max-h-[95vh] overflow-y-auto">

                <div className="flex justify-between items-center border-b border-gray-200 p-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {
                                modoEdicion
                                ? "Editar Evaluación"
                                : "Nueva Evaluación"
                            }
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Paso {paso} de 3
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-500 hover:text-gray-700"
                    >
                        ×
                    </button>
                </div>

                <div className="flex items-center justify-center gap-4 py-6 border-b">
                    {[1,2,3].map((item)=>(
                        <div
                            key={item}
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
                            ${
                                paso >= item
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-600"
                            }`}
                        >
                            {item}
                        </div>
                    ))}
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-6"
                >
                    {
                        paso === 1 &&
                        <PasoInformacion
                            form={form}
                            handleChange={handleChange}
                        />
                    }

                    {
                        paso === 2 &&
                        <PasoConfiguracion
                            form={form}
                            handleChange={handleChange}
                            materias={materias}
                            temas={temas}
                        />
                    }

                    {
                        paso === 3 &&
                        <PasoPreguntas
                            form={form}
                            handleChange={handleChange}
                            preguntasFiltradas={preguntasFiltradas}
                            handlePregunta={handlePregunta}
                        />
                    }

                    <div className="flex justify-between pt-6">

                        <div>

                            {
                                paso > 1 &&
                                <button
                                    type="button"
                                    onClick={pasoAnterior}
                                    className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300"
                                >
                                    Anterior
                                </button>
                            }

                        </div>

                        <div className="flex gap-4">

                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300"
                            >
                                Cancelar
                            </button>

                            {
                                paso < 3
                                ? (
                                    <button
                                        type="button"
                                        onClick={siguientePaso}
                                        className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        Siguiente
                                    </button>
                                )
                                : (
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
                                    >
                                        {
                                            loading
                                            ? "Guardando..."
                                            : modoEdicion
                                                ? "Actualizar"
                                                : "Crear Evaluación"
                                        }
                                    </button>
                                )
                            }

                        </div>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default CuestionarioModal;