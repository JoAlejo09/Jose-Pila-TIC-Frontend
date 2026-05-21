import { useEffect, useMemo, useState } from "react";
import { useNavigate} from "react-router-dom";
import { obtenerResultadosAdminRequest,
         eliminarResultadoAdminRequest
 } from "../../services/resultadoService.js";

const ReportesEvaluaciones = () => {
    const navigate = useNavigate();
    const [resultados, setResultados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtros, setFiltros] = useState({
        estudiante: "",
        materia: "",
        tema: "",
        nivelAcademico: ""
    });

    // OBTENER RESULTADOS
    const obtenerResultados = async () => {
        try {
            setLoading(true);
            const data = await obtenerResultadosAdminRequest(filtros);
            setResultados(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    // CARGAR AL INICIO
    useEffect(() => {
        obtenerResultados();
    }, []);

    // BUSCAR AUTOMATICAMENTE
    useEffect(() => {
        const delay = setTimeout(() => {
            obtenerResultados();
        }, 400);
        return () => clearTimeout(delay);
    }, [filtros]);

    // HANDLE CHANGE
    const handleChange = (e) => {
        setFiltros({
            ...filtros,
            [e.target.name]: e.target.value
        });
    };

    //Para Eliminar Resultados
    const handleEliminar = async(id)=>{
        const confirmar = window.confirm(
            "Desea eliminar el resultado?"
        );
        if(!confirmar) return;
        try{
            await eliminarResultadoAdminRequest(id);
            obtenerResultados();
        }catch(error){
            console.log(error)
        }
    }
    // MATERIAS UNICAS
    const materiasUnicas = useMemo(() => {
        return [
            ...new Set(
                resultados.map(
                    (resultado) =>
                        resultado.cuestionario?.materia?.nombre
                )
            )
        ].filter(Boolean);
    }, [resultados]);

    // TEMAS UNICOS
    const temasUnicos = useMemo(() => {
        return [
            ...new Set(
                resultados.map(
                    (resultado) =>
                        resultado.cuestionario?.tema?.nombre
                )
            )
        ].filter(Boolean);
    }, [resultados]);

    if (loading) {

        return (
            <div className="p-6">
                <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
                    <p className="text-gray-500 text-lg">
                        Cargando resultados...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 min-h-screen bg-gray-50">

            <div className="mb-8">

                <h1 className="text-4xl font-bold text-gray-800">
                    Resultados Académicos
                </h1>

                <p className="text-gray-500 mt-2">
                    Visualiza quién resolvió las evaluaciones
                </p>

            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

                    <input
                        type="text"
                        name="estudiante"
                        placeholder="Buscar estudiante..."
                        value={filtros.estudiante}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <select
                        name="materia"
                        value={filtros.materia}
                        onChange={handleChange}
                        className=" border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500
                        "
                    >
                        <option value="">
                            Todas las materias
                        </option>

                        { materiasUnicas.map((materia) => (
                                <option
                                    key={materia}
                                    value={materia}
                                >
                                    {materia}
                                </option>
                            ))
                        }
                    </select>

                    <select
                        name="tema"
                        value={filtros.tema}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">
                            Todos los temas
                        </option>

                        { temasUnicos.map((tema) => (
                                <option
                                    key={tema}
                                    value={tema}
                                >
                                    {tema}
                                </option>
                            ))
                        }
                    </select>

                    <select
                        name="nivelAcademico"
                        value={filtros.nivelAcademico}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">
                            Todos los niveles
                        </option>
                        <option value="1ro BGU">
                            1ro BGU
                        </option>
                        <option value="2do BGU">
                            2do BGU
                        </option>
                        <option value="3ro BGU">
                            3ro BGU
                        </option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left p-4 font-semibold text-gray-700">
                                    Estudiante
                                </th>
                                <th className="text-left p-4 font-semibold text-gray-700">
                                    Evaluación
                                </th>
                                <th className="text-left p-4 font-semibold text-gray-700">
                                    Materia
                                </th>
                                <th className="text-left p-4 font-semibold text-gray-700">
                                    Tema
                                </th>
                                <th className="text-left p-4 font-semibold text-gray-700">
                                    Nivel
                                </th>
                                <th className="text-left p-4 font-semibold text-gray-700">
                                    Puntaje
                                </th>
                                <th className="text-left p-4 font-semibold text-gray-700">
                                    Estado
                                </th>
                                <th className="text-left p-4 font-semibold text-gray-700">
                                    Acciones
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            { resultados.length === 0
                                    ? (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="text-center py-10 text-gray-500"
                                            >
                                                No existen resultados
                                            </td>
                                        </tr>
                                    )
                                    : (
                                        resultados.map((resultado) => (
                                            <tr
                                                key={resultado._id}
                                                className="border-t hover:bg-gray-50"
                                            >

                                                {/* ESTUDIANTE */}
                                                <td className="p-4">
                                                    <div>
                                                        <p className="font-semibold text-gray-800">
                                                            {
                                                                resultado.estudiante?.nombre
                                                            } {
                                                                resultado.estudiante?.apellido
                                                            }
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {
                                                                resultado.estudiante?.email
                                                            }
                                                        </p>
                                                    </div>
                                                </td>

                                                <td className="p-4 font-medium text-gray-700">
                                                    {
                                                        resultado.cuestionario?.titulo
                                                    }
                                                </td>

                                                <td className="p-4 text-gray-700">
                                                    {
                                                        resultado.cuestionario?.materia?.nombre
                                                    }
                                                </td>

                                                <td className="p-4 text-gray-700">
                                                    {
                                                        resultado.cuestionario?.tema?.nombre
                                                        || "General"
                                                    }
                                                </td>

                                                <td className="p-4 text-gray-700">
                                                    {
                                                        resultado.cuestionario?.nivelAcademico
                                                    }
                                                </td>

                                                <td className="p-4">
                                                    <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium
                                                    ">
                                                        {resultado.porcentaje}%
                                                    </span>
                                                </td>

                                                <td className="p-4">
                                                    <span
                                                        className={`px-4 py-2 rounded-full text-sm font-medium
                                                            ${
                                                                resultado.aprobado
                                                                    ? "bg-green-100 text-green-700"
                                                                    : "bg-red-100 text-red-700"
                                                            } 
                                                        `}
                                                    >
                                                        {
                                                            resultado.aprobado
                                                                ? "Aprobado"
                                                                : "Reprobado"
                                                        }
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex gap-2">
                                                        <button onClick={()=>
                                                            navigate(`/admin/resultados/${resultado._id}`)
                                                        }
                                                            className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm"
                                                        >
                                                            Ver revisión
                                                        </button>
                                                        <button onClick={()=> handleEliminar(resultado._id)}
                                                               className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm"
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ReportesEvaluaciones;