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
const obtenerTemasPorMateriaRequest = async(materiaId)=>{
    const res = await axios.get(`/tema/materia/${materiaId}`)
    return res.data;
}
const obtenerTemasPorMateriaNivelRequest = async(materiaId,nivelAcademico)=>{
    const res = await axios.get(`/tema/materia/${materiaId}/nivel/${nivelAcademico}`);
    return res.data;
}
export { obtenerTemasRequest, obtenerTemaRequest, crearTemaRequest,
         actualizarTemaRequest, cambiarEstadoTemaRequest, obtenerTemasPorMateriaRequest,
         obtenerTemasPorMateriaNivelRequest};