import axios from "../api/axios.js";

const completarPerfilEstudianteRequest = async(data)=>{
    const res = await axios.post("/estudiante/completar-perfil", data );
    return res.data;
};

const obtenerPerfilEstudianteRequest = async()=>{
    const res = await axios.get("/estudiante/perfil");
    return res.data;
};

const actualizarPerfilEstudianteRequest = async(data)=>{
    const res = await axios.put( "/estudiante/perfil", data );
    return res.data;
};

const obtenerMateriasEstudianteRequest = async()=>{
    const res = await axios.get("/estudiante/materias");
    return res.data;
};

const obtenerTemasPorMateriaRequest = async(materiaId)=>{
    const res = await axios.get(`/estudiante/temas/${materiaId}`);
    return res.data;
};

const obtenerRecursosPorTemaRequest = async(temaId)=>{
    const res = await axios.get(`/estudiante/recursos/${temaId}`);
    return res.data;
};

const obtenerResultadosEstudianteRequest = async()=>{
    const res = await axios.get("/estudiante/resultados");
    return res.data;
};

const obtenerResultadoEstudianteIDRequest = async(id)=>{
    const res = await axios.get(`/estudiante/resultados/${id}`);
    return res.data;
};

export { completarPerfilEstudianteRequest, obtenerPerfilEstudianteRequest, actualizarPerfilEstudianteRequest,
        obtenerMateriasEstudianteRequest, obtenerTemasPorMateriaRequest, obtenerRecursosPorTemaRequest,
        obtenerResultadosEstudianteRequest,obtenerResultadoEstudianteIDRequest
};