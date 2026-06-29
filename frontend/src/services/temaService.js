import axios from "../api/axios.js";

const obtenerTemasRequest = async()=>{
    const res = await axios.get("/tema");
    return res.data;
}
const obtenerTemaRequest = async(id)=>{
    const res = await axios.get(`/tema/${id}`);
    return res.data;
}
const crearTemaRequest = async(data) =>{
    const res = await axios.post("/tema", data);
    return res.data
}
const actualizarTemaRequest = async(id, data)=>{
    const res = await axios.put(`/tema/${id}`, data);
    return res.data
}
const cambiarEstadoTemaRequest = async(id)=>{
    const res = await axios.patch(`/tema/estado/${id}`);
    return res.data
}
const obtenerTemasPorUnidadRequest = async(unidadId, params={})=>{
    const res = await axios.get(`/tema/unidad/${unidadId}`, {params});
    return res.data
}

export { obtenerTemasRequest, obtenerTemaRequest, crearTemaRequest,
         actualizarTemaRequest, cambiarEstadoTemaRequest, obtenerTemasPorUnidadRequest};