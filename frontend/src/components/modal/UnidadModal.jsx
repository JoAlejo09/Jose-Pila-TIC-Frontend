import { useEffect, useState } from "react";
import { crearUnidadRequest, actualizarUnidadRequest } from "../../services/unidadService.js";

import {obtenerMateriasRequest} from "../../services/materiaService.js"

const UnidadModal = ({ onClose, onUnidadCreada,modo="crear",unidadSeleccionada})=>{
    const [form, setForm] =useState({
        nombre:"",
        descripcion:"",
        materia:"",
        nivelAcademico:"1ro BGU",
        orden:1
    });

    const[materias, setMaterias] = useState([]);
    const[error, setError] = useState("");
    const[loading, setLoading] = useState(false);

    //Para cargar materias disponibles
    const cargarMaterias = async()=>{
        try {
            const data = await obtenerMateriasRequest();
            setMaterias(data.filter((m)=>m.estado));
        } catch (error) {
            console.log(error);            
        }
    }
    useEffect(()=>{
        cargarMaterias();
    },[]);

    //Seleccionar si se va a crear o editar una Unidad
    useEffect(()=>{
        if(modo === "editar" && unidadSeleccionada){
            setForm({
                nombre:unidadSeleccionada.nombre || "",
                descripcion:unidadSeleccionada.descripcion || "",
                materia: unidadSeleccionada.materia?._id || "",
                nivelAcademico: unidadSeleccionada.nivelAcademico || "1ro BGU",
                orden: unidadSeleccionada.orden || 1
            })
        }
    },[modo, unidadSeleccionada]);

    //Cambio de los formularios
    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError("");
        try {
            setLoading(true);
            if(!form.nombre || !form.materia){
                return setError("Completa los campos obligatorios")
            }            
            if(modo === "crear"){
                await crearUnidadRequest(form)
            }else{
                await actualizarUnidadRequest(
                    unidadSeleccionada._id,
                    form
                )
            }
            onUnidadCreada();
            onClose();
            setLoading(false);
            
        } catch (error) {
            console.log(error);
            setError(error.response.data?.msg || "Error al guardar unidad")            
        }
    };

    return(
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6">
                <h2 className="text-2xl font-bold mb-6">

                    { modo === "crear"
                        ? "Nueva Unidad"
                        : "Editar Unidad"
                    }
                </h2>

                { error &&
                    (
                        <p className="text-red-500 mb-4">
                            {error}
                        </p>
                    )
                }

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <div>
                        <label className="block mb-1 font-medium">
                            Nombre
                        </label>

                        <input
                            type="text"
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-3"
                        />

                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Materia
                        </label>

                        <select
                            name="materia"
                            value={form.materia}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-3"
                        >

                            <option value="">
                                Seleccione
                            </option>

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

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-medium">
                                Nivel
                            </label>

                            <select
                                name="nivelAcademico"
                                value={form.nivelAcademico}
                                onChange={handleChange}
                                className="w-full border rounded-xl p-3"
                            >

                                <option>
                                    1ro BGU
                                </option>

                                <option>
                                    2do BGU
                                </option>

                                <option>
                                    3ro BGU
                                </option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">
                                Orden
                            </label>

                            <input
                                type="number"
                                name="orden"
                                min="1"
                                value={form.orden}
                                onChange={handleChange}
                                className="w-full border rounded-xl p-3"
                            />

                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">
                            Descripción
                        </label>

                        <textarea
                            name="descripcion"
                            rows={4}
                            value={form.descripcion}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-3 resize-none"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-xl"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl"
                        >

                            {
                                loading
                                ? "Guardando..."
                                : modo === "crear"
                                    ? "Crear"
                                    : "Actualizar"
                            }

                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default UnidadModal