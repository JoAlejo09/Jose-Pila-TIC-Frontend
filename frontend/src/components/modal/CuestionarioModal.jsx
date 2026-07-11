import { useEffect, useState } from "react";
import { crearCuestionarioRequest, actualizarCuestionarioRequest } from "../../services/cuestionarioService.js";
import { obtenerMateriasRequest } from "../../services/materiaService.js";
import { obtenerUnidadesPorMateriaRequest } from "../../services/unidadService.js";
import { obtenerPreguntasRequest } from "../../services/preguntaService.js";

import PasoInformacion from "../cuestionario/Informacion.jsx";
import PasoConfiguracion from "../cuestionario/Configuracion.jsx";
import PasoPreguntas from "../cuestionario/Preguntas.jsx";

const CuestionarioModal = ({ onClose, recargarCuestionarios, cuestionarioEditar = null })=>{

    const modoEdicion = !!cuestionarioEditar;

    const [paso,setPaso] = useState(1);
    const [materias,setMaterias] = useState([]);
    const [unidades,setUnidades] = useState([]);

    const [preguntasDisponibles, setPreguntasDisponibles ] = useState([]);
    const [loading,setLoading] = useState(false);
    const [form,setForm] = useState({
        titulo:"",
        descripcion:"",
        instrucciones:"",
        materia:"",
        unidad:"",
        nivelAcademico:"1ro BGU",
        tipoEvaluacion:"diagnostico",
        alcanceEvaluacion:"unidad",
        modoGeneracion:"manual",
        preguntas:[],
        cantidadPreguntas:1,
        tiempoLimite:30,
        nivel:"medio",
        aleatorio:false,
        mostrarRevision:true,
        mostrarRespuestasCorrectas:true,
        permitirReintento:false
    });

    // Para editar
    useEffect(()=>{
        if(cuestionarioEditar){
            setForm({
                titulo: cuestionarioEditar.titulo || "",
                descripcion: cuestionarioEditar.descripcion || "",
                instrucciones: cuestionarioEditar.instrucciones || "",
                materia: cuestionarioEditar.materia?._id || "",
                unidad: cuestionarioEditar.unidad?._id || "",
                nivelAcademico: cuestionarioEditar.nivelAcademico || "1ro BGU",
                tipoEvaluacion: cuestionarioEditar.tipoEvaluacion || "diagnostico",
                alcanceEvaluacion: cuestionarioEditar.alcanceEvaluacion || "unidad",
                modoGeneracion: cuestionarioEditar.modoGeneracion || "manual",
                preguntas: cuestionarioEditar.preguntas?.map(
                    (pregunta)=>
                        pregunta._id || pregunta
                ) || [],
                cantidadPreguntas: cuestionarioEditar.cantidadPreguntas || 1,
                tiempoLimite: cuestionarioEditar.tiempoLimite || 30,
                nivel: cuestionarioEditar.nivel || "medio",
                aleatorio: cuestionarioEditar.aleatorio || false,
                mostrarRevision: cuestionarioEditar.mostrarRevision ?? true,
                mostrarRespuestasCorrectas: cuestionarioEditar.mostrarRespuestasCorrectas ?? true,
                permitirReintento: cuestionarioEditar.permitirReintento || false
            });
        }

    },[cuestionarioEditar]);

    // Para materias
    useEffect(()=>{
        const cargarMaterias = async()=>{
            try {
                const data = await obtenerMateriasRequest();
                setMaterias(data);
            } catch (error) {
                console.log(error);
            }
        };
        cargarMaterias();
    },[]);

    // Para unidades
    useEffect(()=>{
        const cargarUnidades = async()=>{
            if(!form.materia){
                setUnidades([]);
                return;
            }
            try {
                const data = await obtenerUnidadesPorMateriaRequest(
                    form.materia
                );
                setUnidades(data);
            } catch (error) {
                console.log(error);
            }
        };
        cargarUnidades();
    },[form.materia]);

    // Para Preguntas
    useEffect(()=>{
        const cargarPreguntas = async()=>{
            try {
                const data = await obtenerPreguntasRequest();
                setPreguntasDisponibles(data);
            } catch (error) {
                console.log(error);
            }
        };
        cargarPreguntas();
    },[]);
 
    // AUTO CANTIDAD
    useEffect(()=>{
        if(form.modoGeneracion === "manual"){
            setForm((prev)=>({
                ...prev,
                cantidadPreguntas: prev.preguntas.length
            }));
        }
    },[ form.preguntas, form.modoGeneracion ]);

    // filtrar preguntas solo para materia, nivel y unidad seleccionada (si aplica)
    const preguntasFiltradas = preguntasDisponibles.filter((pregunta)=>{
            const coincideMateria = pregunta.materia?._id?.toString()
                ===
                form.materia?.toString();
            const coincideNivel = pregunta.nivelAcademico
                ===
                form.nivelAcademico;
            if( form.alcanceEvaluacion === "unidad" ){
                const coincideUnidad = pregunta.unidad?._id?.toString()
                    ===
                    form.unidad?.toString();
                return(
                    coincideMateria &&
                    coincideNivel &&
                    coincideUnidad
                );
            }
            return(
                coincideMateria &&
                coincideNivel
            );
        });

    // Cambios de formulario

    const handleChange = (e)=>{
        const { name, value, type, checked } = e.target;
        const valor = type === "checkbox"
            ? checked
            : value;
        setForm((prev)=>({
            ...prev,
            [name]:valor,
            ...(name === "alcanceEvaluacion" &&
            valor === "materia"
                ? {
                    unidad:"",
                    preguntas:[]
                }
                : {}),

            ...(name === "materia"
                ? {
                    unidad:"",
                    preguntas:[]
                }
                : {}),

            ...(name === "unidad"
                ? {
                    preguntas:[]
                }
                : {}),

            ...(name === "nivelAcademico"
                ? {
                    preguntas:[]
                }
                : {})
        }));
    };

    const handlePregunta = (id)=>{
        const existe = form.preguntas.includes(id);
        if(existe){
            setForm((prev)=>({
                ...prev,

                preguntas:
                    prev.preguntas.filter(
                        (pregunta)=>
                            pregunta !== id
                    )
            }));

        } else{

            setForm((prev)=>({
                ...prev,
                preguntas:[
                    ...prev.preguntas,
                    id
                ]
            }));
        }
    };

    const validarPaso = ()=>{
        if(paso === 1){

            if(
                !form.titulo ||
                !form.tipoEvaluacion
            ){
                alert(
                    "Completa la información básica"
                );

                return false;
            }
        }
        if(paso === 2){
            if(
                !form.materia ||
                !form.nivelAcademico
            ){
                alert(
                    "Completa la configuración"
                );

                return false;
            }

            if(
                form.alcanceEvaluacion === "unidad"
                &&
                !form.unidad
            ){
                alert(
                    "Debes seleccionar una unidad"
                );

                return false;
            }
        }
        return true;
    };

    // NAVEGACION
    const siguientePaso = ()=>{
        console.log("Antes", paso)
        const valido = validarPaso();
        if(valido){
            setPaso((prev)=> {
                console.log("CAMBIANDO A:", prev + 1);
                return prev + 1;
            }
        );
        }
    };

    const pasoAnterior = ()=>{
        setPaso((prev)=> prev - 1);
    };

    const handleSubmit = async(e)=>{    
        e.preventDefault();
        if( form.modoGeneracion === "manual"
            &&
            form.preguntas.length === 0
        ){
            alert( "Debes seleccionar preguntas" );
            return;
        }

        if( form.modoGeneracion === "dinamico"
            &&
            form.cantidadPreguntas <= 0
        ){
            alert( "Cantidad inválida" );
            return;
        }
        setLoading(true);
        try {
            if(modoEdicion){
                const payload = {
                    titulo:form.titulo,
                    descripcion:form.descripcion,
                    instrucciones:form.instrucciones,
                    tiempoLimite:form.tiempoLimite,
                    nivel:form.nivel,
                    aleatorio:form.aleatorio,
                    mostrarRevision: form.mostrarRevision,
                    mostrarRespuestasCorrectas: form.mostrarRespuestasCorrectas,
                    permitirReintento: form.permitirReintento
                };

                await actualizarCuestionarioRequest(
                    cuestionarioEditar._id,
                    payload
                );

            } else{
                const payload = {
                    ...form,
                    cantidadPreguntas:
                        form.modoGeneracion === "manual"
                        ? form.preguntas.length
                        : Number(
                            form.cantidadPreguntas
                        ),
                    unidad:
                        form.alcanceEvaluacion === "unidad"
                        ? form.unidad
                        : null
                };
                await crearCuestionarioRequest(
                    payload
                );
            }
            await recargarCuestionarios();
            onClose();
        } catch (error) {
            console.log(error);
            alert( error.response?.data?.msg
                ||
                "Error al guardar");
        } finally {
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

                <form
                    onSubmit={(e)=>{handleSubmit(e);}}
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
                            unidades={unidades}
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
                                        onClick={(e)=>{
                                            e.preventDefault();
                                            e.stopPropagation();
                                            console.log("CLICK SIGUIENTE")
                                            siguientePaso();
                                        }}
                                        className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        Siguiente
                                    </button>
                                ) : (
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