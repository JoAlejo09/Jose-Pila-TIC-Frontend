import axios from "../api/axios.js";

const obtenerMisRecomendacionesRequest = async()=>{
    const res = await axios.get("/recomendacion/mis-recomendaciones");
    return res.data;
}

export {obtenerMisRecomendacionesRequest}