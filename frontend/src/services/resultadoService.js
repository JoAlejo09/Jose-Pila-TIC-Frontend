import axios from "../api/axios.js";

const obtenerResultadosEstudianteRequest = async()=>{
    const res = await axios.get("/resultado/mis-resultados");
    return res.data;
}
const obtenerResultadoPorIdRequest = async(id)=>{
    const res = await axios.get(`/resultado/${id}`);
    return res.data;
}
const obtenerResultadosAdminRequest = async(filtros = {})=>{
    const res = await axios.get("/resultado/admin",
        {params:filtros}
    );
    return res.data;
}
const obtenerResultadoAdminPorIdRequest = async(id)=>{
    const res = await axios.get(`/resultado/admin/${id}`);
    return res.data;
}
const eliminarResultadoAdminRequest = async(id)=>{
    const res = await axios.delete(`/resultado/admin/${id}`);
    return res.data
}
const obtenerUltimosResultadosRequest = async()=>{
    const res = await axios.get("/resultado/ultimos-resultados");
    return res.data
}
export { obtenerResultadosEstudianteRequest, obtenerResultadoPorIdRequest,
         obtenerResultadosAdminRequest, obtenerResultadoAdminPorIdRequest,
         eliminarResultadoAdminRequest, obtenerUltimosResultadosRequest
}
