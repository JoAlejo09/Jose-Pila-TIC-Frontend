import axios from "../api/axios.js";

const obtenerUnidadesRequest = async()=>{
    const res= await axios.get("/unidad")
    return res.data
}

const obtenerUnidadesPorMateriaRequest = async(materiaId)=>{
    const res = await axios.get(`/unidad/matria/${materiaId}`)
    return res.data;
}
const obtenerUnidadIdRequest = async(id)=>{
    const res= await axios.get(`/unidad/${id}`);
    return res.data;
}

const crearUnidadRequest = async(data)=>{
    const res = await axios.post("/unidad", data);
    return res.data;
}

const actualizarUnidadRequest = async(id,data)=>{
    const res = await axios.put(`/unidad/${id}`, data);
    return res.data
}

const cambiarEstadoUnidadRequest = async(id)=>{
    const res = await axios.patch(`/unidad/estado/${id}`);
    return res.data
}
export {obtenerUnidadesRequest, obtenerUnidadIdRequest, crearUnidadRequest, actualizarUnidadRequest,
        cambiarEstadoUnidadRequest,obtenerUnidadesPorMateriaRequest
}