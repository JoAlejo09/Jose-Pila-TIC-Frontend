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
const actualizarFotoPerfilRequest = async(archivo)=>{
    const formData = new FormData();
    formData.append("imagen", archivo);
    const res = await axios.patch("/profile/foto", formData,
        {headers:{"Content-Type":"multipart/form-data"}}
    );
    return res.data;
}

export { obtenerPerfilRequest, actualizarPerfilRequest, actualizarFotoPerfilRequest};