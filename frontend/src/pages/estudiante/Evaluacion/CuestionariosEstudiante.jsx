import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { obtenerCuestionariosDisponiblesRequest, verificarAccesoCuestionarioRequest} from "../../../services/cuestionarioService.js";

const CuestionariosEstudiantes =()=>{

    const [cuestionarios, setCuestionarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [busqueda, setBusqueda] = useState("");
    const [materiaFiltro, setMateriaFiltro] = useState("todas");
    const [tipoFiltro, setTipoFiltro] = useState("todos");

    const navigate = useNavigate();

    //Para obtener los cuestionarios
    useEffect(()=>{
        const obtenerCuestionarios = async()=>{
            try {
                const data = await obtenerCuestionariosDisponiblesRequest();
                setCuestionarios(data);
            } catch (error) {
                console.log(error)                
            } finally{
                setLoading(false);
            }
        }
        obtenerCuestionarios();
    },[]);
    const materias = useMemo(()=>{
        const listarMaterias = cuestionarios.map(
            (cuestionario)=> cuestionario.materia?.nombre
        );
        return ["todas", ...new Set(listarMaterias.filter(Boolean))];
    },[cuestionarios])

    const tipos = useMemo(() => {
        const listaTipos = cuestionarios.map(
          (cuestionario) => cuestionario.tipoEvaluacion
        );

        return ["todos", ...new Set(listaTipos.filter(Boolean))];
    }, [cuestionarios]);

    const cuestionariosFiltrados = useMemo(() => {
        return cuestionarios.filter((cuestionario) => {
            const titulo = cuestionario.titulo?.toLowerCase() || "";
            const descripcion = cuestionario.descripcion?.toLowerCase() || "";
            const materia = cuestionario.materia?.nombre || "";
            const tipo = cuestionario.tipoEvaluacion || "";
            const coincideBusqueda = titulo.includes(busqueda.toLowerCase()) ||
                descripcion.includes(busqueda.toLowerCase());
            const coincideMateria = materiaFiltro === "todas" || materia === materiaFiltro; 
            const coincideTipo = tipoFiltro === "todos" || tipo === tipoFiltro;
        return coincideBusqueda && coincideMateria && coincideTipo;
        });
    }, [cuestionarios, busqueda, materiaFiltro, tipoFiltro]);

    const iniciarCuestionario = async(id)=>{
        try{
            const data = await verificarAccesoCuestionarioRequest(id);
            if(!data.puedeResolver){
                alert(data.msg);
                return;
            }
            navigate(`/dashboard/estudiante/cuestionarios/${id}`);
        } catch(error){
            alert(error?.response?.data?.msg || "No se pudo acceder al cuestionario");
        }
    };

    if(loading){
        return(
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="bg-white rounded-2xl shadow-sm p-9 text-center">
                    <p className="text-lg text-gray-600">
                        Cargando cuestionarios....
                    </p>
                </div>
            </div>
        )
    }
    return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800">
          Evaluaciones Disponibles
        </h1>
        <p className="text-gray-500 mt-2">
          Resuelve las evaluaciones acorde a tu tema y fortalece tus conocimientos.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={materiaFiltro}
            onChange={(e) => setMateriaFiltro(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {materias.map((materia, index) => (
              <option key={index} value={materia}>
                {materia === "todas" ? "Todas las materias" : materia}
              </option>
            ))}
          </select>

          <select
            value={tipoFiltro}
            onChange={(e) => setTipoFiltro(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {tipos.map((tipo, index) => (
              <option key={index} value={tipo}>
                {tipo === "todos" ? "Todos los tipos" : tipo}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          {cuestionariosFiltrados.length} cuestionarios encontrados
        </div>
      </div>

      {cuestionariosFiltrados.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            No existen cuestionarios disponibles
          </h2>
          <p className="text-gray-500 mt-2">
            Intenta nuevamente más tarde
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {cuestionariosFiltrados.map((cuestionario) => (
            <div
              key={cuestionario._id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-sm hover:translate-y-1 transition-all duration-300 p-6"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {cuestionario.titulo}
              </h2>

              <p className="text-gray-600 leading-relaxed min-h-[70px]">
                {cuestionario.descripcion || "Sin descripcion disponible"}
              </p>

              <div className="flex flex-wrap gap-2 mt-5">
                <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                  {cuestionario.nivelAcademico}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                  {cuestionario.cantidadPreguntas} preguntas
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-700">
                  {cuestionario.tiempoLimite} min
                </span>
              </div>

              <div className="mt-6 space-y-3 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span className="font-medium">Materia</span>
                  <span>{cuestionario.materia?.nombre || "No definida"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Tema</span>
                  <span>{cuestionario.tema?.nombre || "General"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Tipo</span>
                  <span className="capitalize">{cuestionario.tipoEvaluacion}</span>
                </div>
              </div>

              <button
                onClick={() => iniciarCuestionario(cuestionario._id)}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-all duration-300"
              >
                Resolver
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default CuestionariosEstudiantes;