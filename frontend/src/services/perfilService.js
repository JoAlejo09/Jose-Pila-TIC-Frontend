import axios from "../api/axios";

// OBTENER PERFIL
const obtenerPerfilRequest = async()=>{
    const res =await axios.get("/profile");
    return res.data;
};

const actualizarPerfilRequest = async(data)=>{
    const res = await axios.put("/profile/actualizar", data);
    return res.data;
};

export { obtenerPerfilRequest, actualizarPerfilRequest};