import axios from "../api/axios.js";

const obtenerMateriasRequest = async(params={})=>{
    const res = await axios.get("/materia",{
        params
    });
    return res.data
}
const obtenerMateriaRequest = async(id)=>{
    const res = await axios.get(`/materia/${id}`)
    return res.data;
}
const crearMateriaRequest = async(data)=>{
    const res = await axios.post("/materia", data);
    return res.data;
}
const actualizarMateriaRequest = async (id,data)=>{
    const res = await axios.put(`/materia/${id}`,data)
    return res.data;
}
const cambiarEstadoMateriaRequest = async(id)=>{
    const res = await axios.patch(`/materia/estado/${id}`);
    return res.data;
}

export {obtenerMateriasRequest, obtenerMateriaRequest, crearMateriaRequest,
        actualizarMateriaRequest, cambiarEstadoMateriaRequest
}