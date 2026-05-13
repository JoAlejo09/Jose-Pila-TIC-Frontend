import axios from "../api/axios.js";

const obtenerPreguntasRequest = async()=>{
    const res = await axios.get("/pregunta");
    return res.data;
}
const obtenerPreguntaPorIdRequest = async(id)=>{
    const res = await axios.get(`/pregunta/${id}`);
    return res.data;
}
const crearPreguntaRequest = async(data)=>{
    const res = await axios.post("/pregunta",data);
    return res.data;
}
const actualizarPreguntaRequest = async(id,data)=>{
    const res = await axios.put(`/pregunta/${id}`, data);
    return res.data;
}
const cambiarEstadoPreguntaRequest = async(id)=>{
    const res = await axios.patch(`/pregunta/estado/${id}`);
    return res.data;
};
export {obtenerPreguntasRequest, obtenerPreguntaPorIdRequest,
    crearPreguntaRequest,actualizarPreguntaRequest, cambiarEstadoPreguntaRequest
};
