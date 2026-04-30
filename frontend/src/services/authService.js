import axios from "../api/axios"

const registerUserRequest = async (data) =>{

    const res = await axios.post("/user/registrar",data);
    return res.data;
}
const loginUserRequest = async(data)=>
{
    const res = await axios.post("/user/login",data);
    return res.data
}
const recuperarPasswordRequest = async(email)=>{
    const res = await axios.post("/user/recuperar",{email});
    return res.data
}
const validarTokenRequest = async(token)=>{
    const res = await axios.get(`/user/recuperar/${token}`);
    return res.data;
}
const nuevoPasswordRequest = async(token,data)=>{
    const res = await axios.post(`/user/recuperar/${token}`,data);
    return res.data;
}

export {registerUserRequest, loginUserRequest, recuperarPasswordRequest,
        validarTokenRequest, nuevoPasswordRequest}