import axios from "../api/axios.js";

const obtenerRecursosRequest = async()=>{
    const res = await axios.get("/recurso");
    return res.data;
};

const obtenerRecursoRequest = async(id)=>{
    const res = await axios.get(`/recurso/${id}`);
    return res.data;
};

const crearRecursoRequest = async(data)=>{
    const res = await axios.post( "/recurso", data);
    return res.data;
};

const actualizarRecursoRequest = async(id,data)=>{
    const res = await axios.put( `/recurso/${id}`, data );
    return res.data;
};

const cambiarEstadoRecursoRequest = async(id)=>{
    const res = await axios.patch(`/recurso/estado/${id}`);
    return res.data;
};

export { obtenerRecursosRequest, obtenerRecursoRequest, crearRecursoRequest, actualizarRecursoRequest, cambiarEstadoRecursoRequest};