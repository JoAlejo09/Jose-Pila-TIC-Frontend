import axios from "../api/axios.js";
const getUsuariosRequest = async(search="")=>{
    const res = await axios.get(`/user?search=${search}`);
    return res.data;
}
const desactivarUsuarioRequest = async (id) => {
  const res = await axios.patch(`/user/${id}/desactivar`);
  return res.data;
};
const activarUsuarioRequest = async (id) => {
  const res = await axios.patch(`/user/${id}/activar`);
  return res.data;
};
const crearUsuarioRequest = async (data)=>{
  const res = await axios.post("/user", data);
  return res.data;
}
export {getUsuariosRequest, desactivarUsuarioRequest,activarUsuarioRequest,
  crearUsuarioRequest
}
