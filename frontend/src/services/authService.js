import axios from "../api/axios"

const registerUserRequest = async (data) =>{

    const res = await axios.post("/auth/registrar",data);
    return res.data;
}
const loginUserRequest = async(data)=>
{
    const res = await axios.post("/auth/login",data);
    return res.data
}
const recuperarPasswordRequest = async(email)=>{
    const res = await axios.post("/auth/recuperar",{email});
    return res.data
}
const validarTokenRequest = async(token)=>{
    const res = await axios.get(`/auth/recuperar/${token}`);
    return res.data;
}
const nuevoPasswordRequest = async(token,data)=>{
    const res = await axios.post(`/auth/recuperar/${token}`,data);
    return res.data;
}
const reenviarConfirmacionRequest = async(email)=>{
    const res = await axios.post("/auth/reenviar-confirmacion",{email});
    return res.data;
}
const cambiarPasswordRequest = async (data) => {
    const res = await axios.patch("/auth/cambiar-password", data);
    return res.data;
};

export {registerUserRequest, loginUserRequest, recuperarPasswordRequest,
        validarTokenRequest, nuevoPasswordRequest, reenviarConfirmacionRequest,
        cambiarPasswordRequest}