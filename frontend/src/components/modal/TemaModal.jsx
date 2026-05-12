import { useEffect, useState } from "react";
import {crearTemaRequest, actualizarTemaRequest} from "../../services/temaService.js";
import { getMateriasRequest } from "../../services/materiaService.js";

const ModalTema = ({
    onClose,
    onTemaCreado,
    modo = "crear",
    temaSeleccionado
})=>{
    const [materias, setMaterias] = useState([]);
    const [form, setForm] = useState({
        materia:"",
        nombre:"",
        descripcion:"",
        nivelAcademico:"1ro BGU"
    });
    const [error, setError]= useState("");
    useEffect(()=>{
        const cargarMaterias = async()=>{
            try {
                const data = await getMateriasRequest();
                const activas = data.filter((m)=>m.estado);
                setMaterias(activas)
            } catch (error) {
                console.log(error);
            }
        };
        cargarMaterias();
    },[]);
    useEffect(()=>{
        if(modo === "editar"&& temaSeleccionado){
            setForm({
                materia:temaSeleccionado.materia?._id || "",
                nombre: temaSeleccionado.nombre || "",
                descripcion: temaSeleccionado.descripcion || "",
                nivelAcademico: temaSeleccionado.nivelAcademico || "1ro BGU"
            });
        }
    },[modo, temaSeleccionado]);
    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError("");
        try {
            if(!form.materia || !form.nombre || !form.nivelAcademico){
                return setError("Campos Obligatorios");
            }
            if(modo === "crear"){
                await crearTemaRequest(form);
            }else{
                await actualizarTemaRequest(
                    temaSeleccionado._id,
                    form
                );
            }
            onTemaCreado();
            onClose();
        } catch (error) {
            console.log(error);
            setError(error.response?.data?.msg || 
                "Error al guardar tema"
            );
        }
    };
    return(
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {modo === "crear"
                        ? "Crear Tema"
                        : "Editar Tema"}

                </h2>
                {error && (
                    <p className="text-red-500 text-sm mb-4 text-center">
                        {error}
                    </p>
                )}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    {/* MATERIA */}
                    <select
                        name="materia"
                        value={form.materia}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500">
                        <option value="">Seleccione una materia</option>

                        {materias.map((materia)=>(
                            <option
                                key={materia._id}
                                value={materia._id}>
                                {materia.nombre}
                            </option>

                        ))}

                    </select>

                    {/* NOMBRE */}
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre del tema"
                        value={form.nombre}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                    />

                    {/* DESCRIPCION */}
                    <textarea
                        name="descripcion"
                        placeholder="Descripción"
                        value={form.descripcion}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                    />

                    {/* NIVEL */}
                    <select
                        name="nivelAcademico"
                        value={form.nivelAcademico}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500">
                        <option value="1ro BGU">1ro BGU</option>
                        <option value="2do BGU">2do BGU</option>
                        <option value="3ro BGU">3ro BGU</option>
                    </select>
                    {/* BOTONES */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-lg">
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                        >
                            {modo === "crear"
                                ? "Crear"
                                : "Actualizar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default ModalTema