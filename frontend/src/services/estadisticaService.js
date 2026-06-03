import axios from "../api/axios.js";

const obtenerEstadisticasAdminRequest = async () => {
    const res = await axios.get("/dashboard/estadisticas");
    return res.data;
}

export { obtenerEstadisticasAdminRequest };