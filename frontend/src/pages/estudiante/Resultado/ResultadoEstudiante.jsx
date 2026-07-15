import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerResultadosEstudianteRequest } from "../../../services/resultadoService.js"; 

const ResultadoEstudiante = () =>{
    const navigate = useNavigate();
    const [resultados, setResultados] = useState([]);
    const [loading, setLoading]= useState(true);
    const [busqueda, setBusqueda] = useState("");
    const [materiaFiltro, setMateriaFiltro]= useState("todas");

    //Obtener resultados del estudiante
    useEffect(()=>{
        const obtenerResultados = async()=>{
            try {
                const data = await obtenerResultadosEstudianteRequest();
                setResultados(data);                
            } catch (error) {
                console.log(error)                
            }finally{
                setLoading(false);
            }
        }
        obtenerResultados();
    },[]);

    //Obtener materias de evaluaciones dadas
    const materias = useMemo(()=>{
        const listaMaterias  = resultados.map((resultado)=>
            resultado.cuestionario?.materia?.nombre);

        return["todas",
                ...new Set(listaMaterias.filter(Boolean))
        ];
    },[resultados]);

    const resultadosFiltrados = resultados.filter((resultado)=>{
        const titulo = resultado.cuestionario?.titulo?.toLowerCase() || "";
        const materia = resultado.cuestionario?.materia?.nombre || "";

        const coincideBusqueda = titulo.includes(busqueda.toLowerCase());

        const coincideMateria = materiaFiltro === "todas" || materia === materiaFiltro;
        return(coincideBusqueda && coincideMateria)
    });

    if(loading){
        return(
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                    <p className="text-lg text-gray-600">
                        Cargando resultados....
                    </p>
                </div>
            </div>
        )
    }
    return(
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800">
                    Mis Resultados
                </h1>
                <p className="text-gray-500 mt-2">
                    Revisa tus evaluaciones dadas
                </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
                <div className="grid md:grid-cols-2 gap-4">
                    <input type="text"
                            placeholder="Buscar evaluacion...."
                            value={busqueda}
                            onChange={(e)=> setBusqueda(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 
                                       focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    <select value={materiaFiltro}
                            onChange={(e)=>setMateriaFiltro(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3
                                       focus:outline-none focus:ring-2 focus:ring-blue-500">
                        {
                            materias.map((materia, index)=>(
                                <option
                                    key={index}
                                    value={materia}>
                                        {materia === "todas"
                                        ? "Todas las materias"
                                        : materia}
                                    </option>
                            ))
                        }
                    </select>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                    {resultadosFiltrados.length} resultados encontrados
                </div>
            </div>
            {resultadosFiltrados.length === 0 
             ? <div
                className="bg-white rounded-2xl shadow-sm p-10 text-center">
                    <h2 className="text-2xl font-semibold text-gray-700">
                        No existen resultados.
                    </h2>
                    <p className="text-gray-500 mt-2">No se encontraron coincidencias</p>
               </div>
             :<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {
                    resultadosFiltrados.map((resultado)=>(
                        <div
                         key={resultado._id}
                         className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 
                                    hover:shadow-xl hover:translate-y-1 transition-all"
                        >
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {
                                            resultado.cuestionario?.titulo
                                        }
                                    </h2>
                                    <p className="text-gray-500 mt-1">
                                        {resultado.cuestionario?.materia?.nombre}
                                    </p>
                                </div>
                                <span className={`px-4 py-2 rounded-full text-sm font-medium
                                                ${resultado.aprobado
                                                 ? "bg-green-100 text-green-700" 
                                                 : "bg-red-100 text-red-700"
                                                }`}
                                >
                                    {resultado.aprobado
                                        ? "Aprobado": "Reprobado"}
                                </span>
                            </div>
                            <div className="mt-8 text-center">
                                <h3 className={`text-6xl font-bold
                                               ${resultado.aprobado
                                                ? "text-green-600": "text-red-600"
                                               }`}
                                >
                                    {resultado.puntaje}/10
                                </h3>
                                <p className="text-gray-500 mt-2">
                                    Puntaje obtenido
                                </p>
                            </div>
                            <div className="mt-8 space-y-3 text-sm text-gray-700">
                                <div className="flex justify-between">
                                    <span className="font-medium"> Correctas</span>
                                    <span>{resultado.correctas}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Incorrectas</span>
                                    <span>{resultado.incorrectas}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Sin responder
                                    </span>
                                    <span>{resultado.sinResponder}</span>
                                </div>
                            </div>
                            <button
                             onClick={()=> navigate(`/dashboard/estudiante/resultados/${resultado._id}`)}
                             className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-all"
                            >
                                Ver detalle
                            </button>
                        </div>
                    ))
                }
             </div>
            }
        </div>
    );
};
export default ResultadoEstudiante;