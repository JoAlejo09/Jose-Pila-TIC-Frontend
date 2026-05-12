import axios from "../api/axios.js";

const obtenerMateriasEstudianteRequest = async()=>{
    const res = await axios.get( "/estudiante/materias" );
    return res.data;
};

const obtenerTemasPorMateriaRequest = async(materiaId)=>{
    const res = await axios.get( `/estudiante/temas/${materiaId}` );
    return res.data;
};

const obtenerRecursosPorTemaRequest = async(temaId)=>{
    const res = await axios.get( `/estudiante/recursos/${temaId}` );
    return res.data;
};

export {
    obtenerMateriasEstudianteRequest,
    obtenerTemasPorMateriaRequest,
    obtenerRecursosPorTemaRequest
};