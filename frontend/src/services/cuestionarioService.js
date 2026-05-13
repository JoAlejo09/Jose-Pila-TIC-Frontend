import axios from "../api/axios.js";

const obtenerCuestionariosDisponiblesRequest = async()=>{
    const res = await axios.get("/cuestionario/disponibles");
    return res.data;
};
const obtenerCuestionarioPorIdRequest = async(id)=>{
    const res = await axios.get(`/cuestionario/${id}`);
    return res.data;
};
const resolverCuestionarioRequest = async(id,data)=>{

    const res = await axios.post(`/cuestionario/resolver/${id}`,data);
    return res.data;
};
const obtenerResultadosRequest = async()=>{

    const res = await axios.get("/cuestionario/resultados/mis-resultados");
    return res.data;
};
const obtenerResultadoPorIdRequest = async(id)=>{
    const res = await axios.get(`/cuestionario/resultados/${id}`);
    return res.data;
};

export {
    obtenerCuestionariosDisponiblesRequest,
    obtenerCuestionarioPorIdRequest,
    resolverCuestionarioRequest,
    obtenerResultadosRequest,
    obtenerResultadoPorIdRequest
};