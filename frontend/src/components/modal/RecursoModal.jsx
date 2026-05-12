import { useEffect, useState } from "react";
import { crearRecursoRequest, actualizarRecursoRequest } from "../../services/recursoService.js";
import { obtenerTemasRequest } from "../../services/temaService.js";

const ModalRecurso = ({
    onClose,
    onRecursoCreado,
    modo = "crear",
    recursoSeleccionado
})=>{

    const [temas,setTemas] = useState([]);
    const [error,setError] = useState("");
    const [form,setForm] = useState({
        tema:"",
        titulo:"",
        descripcion:"",
        tipo:"pdf",
        url:"",
        contenido:"",
        nivelDificultad:"basico"
    });

    useEffect(()=>{
        const cargarTemas = async()=>{
            try {
                const data = await obtenerTemasRequest();
                const activos = data.filter( (tema)=>tema.estado);
                setTemas(activos);
            } catch (error) {
                console.log(error);
            }
        };
        cargarTemas();
    },[]);

    useEffect(()=>{
        if( modo === "editar" && recursoSeleccionado ){
            setForm({
                tema: recursoSeleccionado.tema?._id || "",
                titulo: recursoSeleccionado.titulo || "",
                descripcion: recursoSeleccionado.descripcion || "",
                tipo: recursoSeleccionado.tipo || "pdf",
                url: recursoSeleccionado.url || "",
                contenido: recursoSeleccionado.contenido || "",
                nivelDificultad: recursoSeleccionado.nivelDificultad || "basico"
            });
        }
    },[modo, recursoSeleccionado]);

    // HANDLE CHANGE
    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    // SUBMIT
    const handleSubmit = async(e)=>{
        e.preventDefault();
        setError("");
        try {
            // VALIDAR
            if(!form.tema || !form.titulo || !form.tipo ){
                return setError( "Campos obligatorios" );
            }
            // PDF / YOUTUBE
            if((form.tipo === "pdf" || form.tipo === "youtube" ) && !form.url){
                return setError("La URL es obligatoria");
            }
            // TEORIA
            if( form.tipo === "teoria" && !form.contenido ){
                return setError( "El contenido es obligatorio");
            }
            if(modo === "crear"){ await crearRecursoRequest(form);
            } else {
                await actualizarRecursoRequest(recursoSeleccionado._id,form);
            }
            onRecursoCreado();
            onClose();
        } catch (error) {
            console.log(error);
            setError( error.response?.data?.msg || "Error al guardar recurso");
        }
    };

    return(

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {modo === "crear"
                        ? "Crear Recurso"
                        : "Editar Recurso"}

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

                    {/* TEMA */}
                    <select
                        name="tema"
                        value={form.tema}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                    >

                        <option value="">
                            Seleccione un tema
                        </option>

                        {temas.map((tema)=>(

                            <option
                                key={tema._id}
                                value={tema._id}
                            >
                                {tema.nombre} - {" "}
                                {tema.nivelAcademico}
                            </option>

                        ))}

                    </select>

                    {/* TITULO */}
                    <input
                        type="text"
                        name="titulo"
                        placeholder="Título"
                        value={form.titulo}
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

                    {/* TIPO */}
                    <select
                        name="tipo"
                        value={form.tipo}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                    >

                        <option value="pdf">
                            PDF
                        </option>

                        <option value="youtube">
                            YouTube
                        </option>

                        <option value="teoria">
                            Teoría
                        </option>

                    </select>

                    {/* URL */}
                    {(form.tipo === "pdf" ||
                    form.tipo === "youtube") && (

                        <input
                            type="text"
                            name="url"
                            placeholder={
                                form.tipo === "pdf"
                                ? "URL PDF"
                                : "URL YouTube"
                            }
                            value={form.url}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                        />

                    )}

                    {/* CONTENIDO */}
                    {form.tipo === "teoria" && (

                        <textarea
                            name="contenido"
                            placeholder="Contenido teórico..."
                            value={form.contenido}
                            onChange={handleChange}
                            rows="8"
                            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                        />

                    )}

                    {/* DIFICULTAD */}
                    <select
                        name="nivelDificultad"
                        value={form.nivelDificultad}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-500"
                    >

                        <option value="basico">
                            Básico
                        </option>

                        <option value="intermedio">
                            Intermedio
                        </option>

                        <option value="avanzado">
                            Avanzado
                        </option>

                    </select>

                    {/* BOTONES */}
                    <div className="flex justify-end gap-3 pt-2">

                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded-lg"
                        >
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

    );

};

export default ModalRecurso;