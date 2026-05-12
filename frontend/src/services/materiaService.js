import axios from "../api/axios.js";

const getMateriasRequest = async()=>{
    const res = await axios.get("/materia");
    return res.data
}
const getMateriaRequest = async(id)=>{
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
export {getMateriasRequest, getMateriaRequest, crearMateriaRequest,
        actualizarMateriaRequest, cambiarEstadoMateriaRequest
}