import axios from "../api/axios.js";

const obtenerMiProgresoRequest = async()=>{
    const res = await axios.get("/progreso/mi-progreso");
    return res.data;
}
export {obtenerMiProgresoRequest}