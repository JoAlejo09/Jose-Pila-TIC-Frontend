import { useEffect, useState } from "react";
import { crearMateriaRequest, actualizarMateriaRequest } from "../../services/materiaService";
import Input from "../ui/Input";
import Button from "../ui/Button";

const ModalMateria = ({ onClose, onMateriaCreada, modo="crear", materiaSeleccionada}) =>{
    const [form, setForm] = useState({
        nombre:"",
        descripcion:""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(modo === "editar" && materiaSeleccionada){
            setForm({
                nombre: materiaSeleccionada.nombre || "",
                descripcion: materiaSeleccionada.descripcion || ""
            });            
        }
    }, [modo, materiaSeleccionada]);

    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError("");
        try {
            setLoading(true);
            if(!form.nombre.trim()){
                return setError("El nombre de la materia es obligatorio");
            }
            if(modo === "crear"){
                await crearMateriaRequest(form);
            }else{
                await actualizarMateriaRequest(
                    materiaSeleccionada._id,
                    form
                );
            };
            onMateriaCreada();
            onClose();
        } catch (error) {
            console.log(error)
            setError(error.response?.data?.msg || "Error al guardar materia");            
        } finally{
            setLoading(false);
        }
    };
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="b-white w-full max-w-md rounded-xl shadow-xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {modo === "crear"
                    ? "Nueva Materia"
                    : "Editar Materia"}
                </h2>
                {error && (
                    <p className="text-red-500 text-sm mb-4 text-center">
                        {error}
                    </p>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-semibold">
                            Nombre
                        </label>
                        <Input
                            type="text"
                            name="nombre"
                            placeholder="Nombre de la materia"
                            value={form.nombre}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"/>
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Descripcion</label>
                        <textarea
                        name="descripcion"
                        placeholder="Descripcion de la materia"
                        value = {form.descripcion}
                        onChange={handleChange}
                        rows={4}
                        className="w-full border border-gray-300 p-3 rounded-lg outline-nonte focus:ring-2 focus:ring-green-500 resize-none"
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-lg"
                            >Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg">
                                {loading
                                    ? "Guardando"
                                    : modo ==="crear"
                                        ? "Crear"
                                        : "Actualizar" }
                            </button>

                    </div>
                </form>
            </div>
        </div>
    )
}
export default ModalMateria;