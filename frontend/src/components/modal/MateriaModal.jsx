import { useEffect, useState } from "react";
import { crearMateriaRequest, actualizarMateriaRequest } from "../../services/materiaService";

import Input from "../ui/Input";

const ModalMateria = ({ onClose, onMateriaCreada, modo = "crear", materiaSeleccionada}) => {
    const [form,setForm] = useState({
        nombre:"",
        descripcion:"",
        nivelAcademico:"1ro BGU",
        estado:true
    });
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    useEffect(()=>{
        if( modo === "editar" && materiaSeleccionada ){
            setForm({
                nombre: materiaSeleccionada.nombre || "",
                descripcion: materiaSeleccionada.descripcion || "",
                nivelAcademico: materiaSeleccionada.nivelAcademico || "1ro BGU",
                estado: materiaSeleccionada.estado ?? true
            });
        }
    },[ modo, materiaSeleccionada]);

    const handleChange = (e)=>{
        const { name, value, type, checked } = e.target;
        setForm((prev)=>({
            ...prev,
            [name]:
                type === "checkbox"
                ? checked
                : value
        }));
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError("");
        setMsg("");
        
        if(!form.nombre.trim()){
            setError( "El nombre de la materia es obligatorio" );
            setTimeout(()=>{
                setError("");
            },3000);
            return;
        }
        if(!form.nivelAcademico){
            setError("Debe seleccionar un nivel academico");
            setTimeout(()=>{
                setError("");
            },3000);
            return; 
        }
        if (form.descripcion.trim().length > 500) {
            setError("La descripción no debe superar 500 caracteres");
            setTimeout(()=>{
                setError("");
            },3000);
            return;
        }
        try {
            setLoading(true);
            const data =
                modo === "crear"
                    ? await crearMateriaRequest(form)
                    : await actualizarMateriaRequest(materiaSeleccionada._id, form);
            
            setMsg(data.msg || (
                modo === "crear"
                    ? "Materia creada correctamente"
                    : "Materia actualizada correctamente"
            ));
            setTimeout(() => {
                onMateriaCreada();
                onClose();
            }, 3000);

        } catch (error) {
            console.log(error);
            setError(error.response?.data?.msg || "Error al guardar materia");
            setTimeout(() => {
                setError("");
            }, 3000);
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">
                        {
                            modo === "crear"
                            ? "Nueva Materia"
                            : "Editar Materia"
                        }

                    </h2>
                    <p className="text-sm text-gray-500 text-center mt-1">
                        Completa la información académica
                    </p>
                </div>
                {
                    error &&
                    <div className="bg-red-100 border border-red-200 text-red-600 text-sm rounded-lg p-3 mb-4">
                        {error}
                    </div>
                }
                {msg && (
                    <div className="bg-green-100 border border-green-200 text-green-700 text-sm rounded-lg p-3 mb-4 ">
                        {msg}                        
                    </div>
                )}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Nombre
                        </label>
                        <Input
                            type="text"
                            name="nombre"
                            placeholder="Ej: Matemática"
                            value={form.nombre}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Nivel académico
                        </label>
                        <select
                            name="nivelAcademico"
                            value={form.nivelAcademico}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
                        >

                            <option value="1ro BGU"> 1ro BGU </option>
                            <option value="2do BGU">2do BGU </option>
                            <option value="3ro BGU"> 3ro BGU </option>
                        </select>

                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Descripción
                        </label>
                        <textarea
                            name="descripcion"
                            placeholder="Descripción de la materia"
                            value={form.descripcion}
                            onChange={handleChange}
                            rows={4}
                            className="w-full border border-gray-300 p-3 rounded-xl outline-none focus:ring-2 focus:ring-green-500 resize-none"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            name="estado"
                            checked={form.estado}
                            onChange={handleChange}
                        />
                        <label className="text-sm font-medium text-gray-700">
                            Materia activa
                        </label>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded-xl bg-gray-400 hover:bg-gray-500 text-white transition"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white transition disabled:opacity-70"
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
    );
};

export default ModalMateria;