import { useEffect, useState } from "react";
import Input from "../../components/ui/Input.jsx";
import ModalRecurso from "../../components/modal/RecursoModal.jsx";
import {cambiarEstadoRecursoRequest, obtenerRecursosRequest} from "../../services/recursoService.js";

const Recursos = ()=>{
    const [recursos, setRecursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [buscar, setBuscar] = useState("");
    const [modal, setModal] = useState(false);
    const [modoModal, setModoModal] = useState("crear");
    const [recursoSeleccionado, setRecursoSeleccionado]= useState(null);

    const cargarRecursos = async()=>{
        try {
            setLoading(true);
            const data = await obtenerRecursosRequest();
            setRecursos(data);
        } catch (error) {
            console.log(error);
            setError("Error al cargar recursos");            
        }finally{
            setLoading(false);
        }
    };
    useEffect(()=>{
        cargarRecursos();
    },[]);

    const recursosFiltrados = recursos.filter((recurso)=>
    recurso.titulo.toLowerCase().includes(buscar.toLowerCase()
        )
    );
    const handleEstado = async(id)=>{
        try {
            await cambiarEstadoRecursoRequest(id);
            cargarRecursos();
        } catch (error) {
            console.log(error);
        }
    };
    const handleEditar = (recurso)=>{
        setRecursoSeleccionado(recurso);
        setModoModal("editar");
        setModal(true);
    };
    if(loading){
        return(
            <p className="text-center mt-10">
                Cargando recursos.....
            </p>
        );
    }
    if(error){
        return(
            <p className="text-center mt-10 text-red-500">
                {error}
            </p>
        )
    }
     return(
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">
                    Gestión de Recursos
                </h1>

                <div className="flex gap-2">
                    <Input
                        type="text"
                        placeholder="Buscar recurso..."
                        value={buscar}
                        onChange={(e)=>
                            setBuscar(e.target.value)
                        }
                        className="p-2 border rounded w-64"/>
                    <button
                        onClick={()=>{
                            setModoModal("crear");
                            setRecursoSeleccionado(null);
                            setModal(true);
                        }}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        + Nuevo
                    </button>
                </div>
            </div>

            <table className="w-full bg-white shadow rounded">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-3">Título</th>
                        <th>Tipo</th>
                        <th>Tema</th>
                        <th>Materia</th>
                        <th>Dificultad</th>
                        <th>Estado </th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {recursosFiltrados.length > 0 ? (
                        recursosFiltrados.map((recurso)=>(
                            <tr
                                key={recurso._id}
                                className="border-t text-center">
                                <td className="p-3"> {recurso.titulo} </td>
                                <td className="capitalize">{recurso.tipo}</td>
                                <td>{recurso.tema?.nombre}</td>
                                <td>{recurso.tema
                                            ?.materia
                                            ?.nombre
                                    }
                                </td>
                                <td className="capitalize">
                                    {
                                        recurso.nivelDificultad
                                    }
                                </td>
                                <td>
                                    <span
                                        className={`px-2 py-1 rounded text-white text-sm ${
                                            recurso.estado
                                            ? "bg-green-500"
                                            : "bg-gray-400"
                                        }`}>
                                        {recurso.estado
                                            ? "Activo"
                                            : "Inactivo"}
                                    </span>
                                </td>
                                <td className="flex justify-center gap-2 p-2">
                                    <button
                                        onClick={()=>handleEditar(recurso)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                        Editar
                                    </button>
                                    <button
                                        onClick={()=> handleEstado(recurso._id)}
                                        className={`px-3 py-1 rounded text-white ${
                                            recurso.estado
                                            ? "bg-red-500 hover:bg-red-600"
                                            : "bg-green-500 hover:bg-green-600"
                                        }`}>
                                        {recurso.estado
                                            ? "Desactivar"
                                            : "Activar"}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="7"
                                className="text-center p-4"
                            >
                                No hay recursos registrados
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/* MODAL */}
            {modal && (
                <ModalRecurso
                    onClose={()=>setModal(false)}
                    onRecursoCreado={cargarRecursos}
                    modo={modoModal}
                    recursoSeleccionado={recursoSeleccionado}
                />
            )}
        </div>
    );
}
export default Recursos;