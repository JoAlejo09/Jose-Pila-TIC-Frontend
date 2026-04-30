import axios from "axios"

const API = "http://localhost:4000/api"
const registerUserRequest = async (data) =>{

    const res = await axios.post(`${API}/user/registrar`,data);
    return res.data;
}
const loginUserRequest = async(data)=>
{
    const res = await axios.post(`${API}/user/login`,data);
    return res.data
}
const recuperarPasswordRequest = async(email)=>{
    const res = await axios.post(`${API}/user/recuperar`,{email});
    return res.data
}
const validarTokenRequest = async(token)=>{
    const res = await axios.get(`${API}/user/recuperar/${token}`, );
    return res.data;
}
const nuevoPasswordRequest = async(token,data)=>{
    const res = await axios.post(`${API}/user/recuperar/${token}`,{data});
    return res.data;
}



export {registerUserRequest, loginUserRequest, recuperarPasswordRequest,
        validarTokenRequest, nuevoPasswordRequest}