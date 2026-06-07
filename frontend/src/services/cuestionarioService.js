import axios from "../api/axios.js";


// RUTAS ESTUDIANTE
// Obtener cuestionarios disponibles
const obtenerCuestionariosDisponiblesRequest = async()=>{
    const res = await axios.get( "/cuestionario/disponibles" );
    return res.data;
};

// Obtener cuestionario para resolver
const obtenerCuestionarioPorIdRequest = async(id)=>{
    const res = await axios.get(`/cuestionario/resolver/${id}`);
    return res.data;
};

//Validar si el cuestionario esta disponible para el estudiante
const verificarAccesoCuestionarioRequest = async(id)=>{
    const res = await axios.get(`/cuestionario/${id}/verificar-acceso`);
    return res.data;
} 
// Resolver cuestionario

const resolverCuestionarioRequest = async(id,data)=>{
    const res = await axios.post(`/cuestionario/resolver/${id}`, data );
    return res.data;
};

// RUTAS ADMIN
// Crear cuestionario
const crearCuestionarioRequest = async(data)=>{
    const payload = {
        ...data,

        tema: data.alcanceEvaluacion  === "tema"
            ? data.tema
            : null
    };
    const res = await axios.post( "/cuestionario", payload );
    return res.data;
};

// Obtener todos los cuestionarios
const obtenerCuestionariosRequest = async()=>{

    const res = await axios.get(
        "/cuestionario"
    );

    return res.data;
};

// Obtener cuestionario por ID para admin
const obtenerCuestionarioAdminRequest = async(id)=>{

    const res = await axios.get(
        `/cuestionario/admin/${id}`
    );

    return res.data;
};

// Actualizar cuestionario
const actualizarCuestionarioRequest = async(id,data)=>{

    const res = await axios.put(
        `/cuestionario/${id}`,
        data
    );

    return res.data;
};

// Cambiar estado
const eliminarCuestionarioRequest = async(id)=>{
    const res = await axios.patch(
        `/cuestionario/estado/${id}`
    );

    return res.data;
}; 

const verificarDiagnosticoMateriaRequest = async(materiaId)=>{
    const res = await axios.get(`/cuestionario/diagnostico/verificar/${materiaId}`);
    return res.data;
}



export { obtenerCuestionariosDisponiblesRequest, obtenerCuestionarioPorIdRequest, resolverCuestionarioRequest, crearCuestionarioRequest, 
         obtenerCuestionariosRequest, obtenerCuestionarioAdminRequest, actualizarCuestionarioRequest, eliminarCuestionarioRequest,
         verificarDiagnosticoMateriaRequest, verificarAccesoCuestionarioRequest };