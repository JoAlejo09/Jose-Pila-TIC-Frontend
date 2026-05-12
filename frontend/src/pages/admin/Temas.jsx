import { useEffect, useState } from "react";
import Input from "../../components/ui/Input.jsx";
import ModalTema from "../../components/modal/TemaModal.jsx";

import{obtenerTemasRequest, cambiarEstadoTemaRequest } from "../../services/temaService.js";

const Temas =()=>{
    const [temas, setTemas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [buscar, setBuscar] = useState("");
    const [modal, setModal] = useState(false);
    const [modoModal, setModoModal] = useState("crear");
    const [temaSeleccionado, setTemaSeleccionado] = useState(null);

    const cargarTemas = async()=>{
        try {
            setLoading(true);
            const data = await obtenerTemasRequest();
            setTemas(data);
        } catch (error) {
            console.log(error);
            setError("Error al cargar temas")
        }finally{
            setLoading(false);
        }
    };
    useEffect(()=>{
        cargarTemas();
    },[]);
    const temasFiltrados = temas.filter((tema)=>
        tema.nombre.toLowerCase().includes(buscar.toLowerCase()
        )
    );
    const handleEstado = async(id)=>{
        try {
            await cambiarEstadoTemaRequest(id);
            cargarTemas();            
        } catch (error) {
            console.log(error);
        }
    }
    const handleEditar = (tema)=>{
        setTemaSeleccionado(tema);
        setModoModal("editar");
        setModal(true);
    };
    if(loading){
        return(
            <p className="text-center mt-10">
                Cargando temas....
            </p>
        );
    }
    if(error){
        return(
            <p className="text-center mt-10 text-red-500">
                {error}
            </p>
        );
    }
    return(
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">
                    Gestión de temas
                </h1>
                <div className="flex gap-2">
                    <Input
                        type="text"
                        placeholder="Buscar tema..."
                        value={buscar}
                        onChange={(e)=> setBuscar(e.target.value)
                        }
                        className="p-2 border rounded w-64"/>
                    <button
                        onClick={()=>{
                            setModoModal("crear");
                            setTemaSeleccionado(null);
                            setModal(true);
                        }}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                            + Nuevo   
                        </button>
                </div>
            </div>
            {/*Tabla */}
            <table className="w-full bg-white shadow rounded">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-3">Tema</th>
                        <th>Materia</th>
                        <th>Nivel</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>                
                <tbody>
                    {temasFiltrados.length>0 ?(
                        temasFiltrados.map((tema)=>(
                            <tr
                            key={tema._id}
                            className="border-t text-center">
                                <td className="p-3">{tema.nombre}</td>
                                <td>{tema.materia?.nombre}</td>
                                <td>{tema.nivelAcademico}</td>
                                <td>
                                    <span
                                    className={`px-2 py-1 rounded text-white text-sm ${
                                        tema.estado
                                        ? "bg-green-500"
                                        : "bg-gray-400"
                                    }`}>
                                        {tema.estado
                                            ? "Activo"
                                            : "Inactivo"}
                                    </span>
                                </td>
                                <td className="flex justify-center gap-2 p-2">
                                    <button
                                    onClick={()=> handleEditar(tema)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                        Editar
                                    </button>
                                    <button
                                    onClick={()=> handleEstado(tema._id)}
                                    className={`px-3 py-1 rounded text-white ${
                                        tema.estado
                                        ? "bg-red-500 hover:bg-red-600 "
                                        : "bg-green-500 hover:bg-green-600"
                                    }`}>
                                        {tema.estado
                                        ?"Desactivar"
                                        :"Activar"}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ):(
                        <tr>
                            <td
                            colSpan="5"
                            className="text-center p-4">
                                No hay temas registrados
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/*Modal */}
            {modal && (
                <ModalTema
                onClose = {()=>setModal(false)}
                onTemaCreado = {cargarTemas}
                modo={modoModal}
                temaSeleccionado={temaSeleccionado}
                />
            )}
        </div>
    )
}
export default Temas;