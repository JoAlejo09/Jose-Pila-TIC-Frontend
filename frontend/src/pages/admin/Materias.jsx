import {useEffect, useState} from "react";
import { getMateriasRequest, cambiarEstadoMateriaRequest } from "../../services/materiaService";
import Input from "../../components/ui/Input.jsx";
import ModalMateria from "../../components/modal/MateriaModal.jsx"

const Materias = ()=>{
    const [materias, setMaterias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [buscar, setBuscar] = useState("");
    const [modal, setModal] = useState(false);
    const [modoModal, setModoModal] = useState("crear");
    const [materiaSeleccionada, setMateriaSeleccionada]= useState(null);

    const cargarMaterias = async() =>{
        try {
            setLoading(true);
            const data = await getMateriasRequest();
            setMaterias(data);
        } catch (error) {
            console.log(error),
            setError("Error al cargar las materias");
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        cargarMaterias();
    },[]);
    const materiasFiltradas = materias.filter((materia)=>
        materia.nombre
        .toLowerCase()
        .includes(buscar.toLowerCase())
    );

    const handleEstado = async(id) =>{
        try {
            await cambiarEstadoMateriaRequest(id);
            cargarMaterias();
        } catch (error) {
            console.log(error);            
        }
    };
    const handleEditar = (materia)=>{
        setMateriaSeleccionada(materia);
        setModoModal("editar");
        setModal(true);
    };
    if(loading){
        return(
            <p className="text-center mt-10">
                Cargando materias...
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
                    Gestion de Materias
                </h1>
                <div className="flex gap-2">
                    <Input
                        type="text"
                        placeholder="Buscar Materia"
                        value={buscar}
                        onChange={(e)=> setBuscar(e.target.value)}
                        className="p-2 border rounded w-64"/>

                    <button
                        onClick={()=>{
                            setModoModal("crear");
                            setMateriaSeleccionada(null);
                            setModal(true);
                            }}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                            + Nueva                                
                            </button>
                </div>
            </div>
            {/*TABLA */}
            <table className="w-full bg-white shadow rounded">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-3">Nombre</th>
                        <th>Descripcion</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>  
                <tbody>
                    {materiasFiltradas.length>0 ?(
                        materiasFiltradas.map((materia)=>(
                            <tr
                            key={materia._id}
                            className="border-t text-center">
                                <td
                                className="p-3">
                                    {materia.nombre}
                                </td>
                                <td>
                                    {materia.descripcion || "-"}
                                </td>
                                <td>
                                    <span className={`px-2 py-1 rounded text-white text-sm ${
                                        materia.estado
                                        ? "bg-green-500"
                                        : "bg-gray-400"
                                    }`}>
                                        {materia.estado
                                        ? "Activa"
                                        : "Inactiva"}
                                    </span>
                                </td>
                                <td className="flex justify-center gap-2 p-2">
                                    <button
                                    onClick={()=> handleEditar(materia)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Editar</button>
                                    <button
                                    onClick={()=> handleEstado(materia._id)}
                                    className={`px-3 py-1 rounded text-white ${
                                        materia.estado
                                        ? "bg-red-500 hover:bg-re-600"
                                        : "bg-green-500 hover:bg-green-600"
                                    }`}>
                                        {materia.estado
                                            ? "Desactivar"
                                            : "Activar"}
                                    </button>
                                </td>
                            </tr>
                        ))
                    ):(
                        <tr>
                            <td
                            colSpan="4" className="text-center p-4">
                                No hay materias registradas
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/*Modal */}
            {modal && (
                <ModalMateria
                    onClose={()=> setModal(false)}
                    onMateriaCreada={cargarMaterias}
                    modo={modoModal}
                    materiaSeleccionada={materiaSeleccionada}/>
            )}
        </div>
    );

}
export default Materias;