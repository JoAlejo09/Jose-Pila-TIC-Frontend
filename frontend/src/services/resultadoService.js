import axios from "../api/axios.js";
const obtenerResultadosEstudianteRequest = async()=>{
    const res = await axios.get("/resultado/mis-resultados");
    return res.data;
}
const obtenerResultadoPorIdRequest = async(id)=>{
    const res = await axios.get(`/resultado/${id}`);
    return res.data;
}

export { obtenerResultadosEstudianteRequest, obtenerResultadoPorIdRequest}
