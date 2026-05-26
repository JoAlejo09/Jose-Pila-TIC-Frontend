import axios from "../api/axios.js";

const crearTutoriaRequest = async(data)=>{
    const res = await axios.post("/tutoria",data);
    return res.data;
}

const obtenerMisTutoriasRequest = async()=>{
    const res = await axios.get("/tutoria/mis-tutorias");
    return res.data;
}

const cancelarTutoriaRequest = async(id)=>{
    const res = await axios.put(`/tutoria/cancelar/${id}`);
    return res.data;
}

const calificarTutoriaRequest = async(id,data)=>{
    const res = await axios.put(`/tutoria/calificar/${id}`, data);
    return res.data;
}

const obtenerTutoriasPendientesRequest = async()=>{
    const res = await axios.get("/tutoria/pendientes");
    return res.data;
}

const aceptarTutoriaRequest = async(id)=>{
    const res = await axios.put(`/tutoria/aceptar/${id}`);
    return res.data;
}

const liberarTutoriaRequest = async(id)=>{
    const res = await axios.put(`/tutoria/liberar/${id}`)
    return res.data;
}

const obtenerTutoriasTutorRequest = async()=>{
    const res = await axios.get("/tutoria/mis-tutorias-tutor");
    return res.data;
}

const finalizarTutoriaRequest = async(id)=>{
    const res = await axios.put(`/tutoria/finalizar/${id}`);
    return res.data;
}

const obtenerTodasTutoriasRequest = async()=>{
    const res = await axios.get("/tutoria/admin/todas");
    return res.data;
}

const cancelarTutoriaAdminRequest = async(id)=>{
    const res = await axios.put(`/tutoria/admin/cancelar/${id}`);
    return res.data;
}
const editarTutoriaRequest = async(id,data)=>{
    const res = await axios.put(`/tutoria/editar/${id}`,data);
    return res.data;
}

export {crearTutoriaRequest, obtenerMisTutoriasRequest, cancelarTutoriaRequest,
        calificarTutoriaRequest, obtenerTutoriasPendientesRequest, aceptarTutoriaRequest,
        liberarTutoriaRequest, obtenerTutoriasTutorRequest, finalizarTutoriaRequest,
        obtenerTodasTutoriasRequest, cancelarTutoriaAdminRequest, editarTutoriaRequest
}