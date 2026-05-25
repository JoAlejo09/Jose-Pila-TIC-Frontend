import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login.jsx";
import Registro from "../pages/auth/Registro.jsx";
import Landing from "../pages/public/Landing.jsx";
import VerificarCuenta from "../pages/auth/VerificarCuenta.jsx";
import RecuperarPassword from "../pages/auth/RecuperarPassword.jsx";
import ResetPassword from "../pages/auth/ResetPassword.jsx";
import CambiarPassword from "../pages/auth/CambiarPassword.jsx";

import Dashboard from "../pages/dashboard/Dashboard.jsx";

import Usuarios from "../pages/admin/Usuarios.jsx";
import Materias from "../pages/admin/Materias.jsx";
import Unidades from "../pages/admin/Unidades.jsx";
import Temas from "../pages/admin/Temas.jsx";
import Recursos from "../pages/admin/Recurso.jsx";
import Preguntas from "../pages/admin/Preguntas.jsx";
import Cuestionarios from "../pages/admin/Cuestionario.jsx";
import ReportesEvaluaciones from "../pages/admin/ReportesEvaluaciones.jsx"

import MiPerfil from "../pages/perfil/MiPerfil.jsx";
import CompletarPerfil from "../pages/perfil/CompletarPerfil.jsx";

import MateriasEstudiante from "../pages/estudiante/MateriasEstudiante.jsx";
import UnidadesEstudiante from "../pages/estudiante/UnidadesEstudiante.jsx";
import TemasEstudiante from "../pages/estudiante/TemaEstudiante.jsx";
import RecursosEstudiante from "../pages/estudiante/Recursos/RecursosEstudiante.jsx";
import DetalleRecursoEstudiante from "../pages/estudiante/Recursos/DetalleRecursoEstudiante.jsx";

import CuestionariosEstudiante from "../pages/estudiante/Evaluacion/CuestionariosEstudiante.jsx";
import ResolverCuestionario from "../pages/estudiante/Evaluacion/ResolverCuestionario.jsx";

import ResultadoEstudiante from "../pages/estudiante/Resultado/ResultadoEstudiante.jsx";
import DetalleResultado from "../pages/estudiante/Resultado/DetalleResultado.jsx";
import DetalleResultadoAdmin from "../pages/admin/DetalleResultadoAdmin.jsx";

import MiProgreso from "../pages/estudiante/Progreso/MiProgreso.jsx";

import PublicLayout from "../components/layout/PublicLayout.jsx";
import PrivateLayout from "../components/layout/PrivateLayout.jsx";

import PrivateRoute from "./PrivateRoute.jsx";
import RolRoute from "./RolRoute.jsx";


const AppRouter = ()=>{

    return(

        <BrowserRouter>

            <Routes>
                {/* PUBLICAS */}

                <Route element={<PublicLayout/>}>

                    <Route path="/" element={<Landing/>} />
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/registro" element={<Registro/>}/>
                    <Route path="/confirmar/:token" element={<VerificarCuenta/>}/>
                    <Route path="/recuperar-password" element={<RecuperarPassword/>}/>
                    <Route path="/reset-password/:token" element={<ResetPassword/>} />
                </Route>

                {/* PRIVADAS */}
                <Route
                    element={
                        <PrivateRoute>
                            <PrivateLayout/>
                        </PrivateRoute>
                    }
                >
                    {/* GENERALES */}
                    <Route path="/dashboard" element={<Dashboard/>} />
                    <Route path="/mi-perfil" element={<MiPerfil/>} />
                    <Route path="/completar-perfil" element={<CompletarPerfil/>} />
                    <Route path="/cambiar-password" element={<CambiarPassword/>} />

                    {/* ADMIN */}
                    <Route
                        element={
                            <RolRoute
                                rolesPermitidos={["admin"]}
                            />
                        }
                    >
                        <Route path="dashboard/admin/usuarios" element={<Usuarios/>}/>
                        <Route path="dashboard/admin/materias" element={<Materias/>}/>
                        <Route path="dashboard/admin/unidades" element={<Unidades/>}/>
                        <Route path="dashboard/admin/temas" element={<Temas/>}/>
                        <Route path="dashboard/admin/recursos" element={<Recursos/>} />
                        <Route path="dashboard/admin/preguntas" element={<Preguntas/>}/>
                        <Route path="dashboard/admin/cuestionarios" element={<Cuestionarios/>}/>
                        <Route path="dashboard/admin/resultados" element={<ReportesEvaluaciones/>} />
                        <Route path="admin/resultados/:id" element={<DetalleResultadoAdmin/>} />
                    </Route>

                    {/* ================================= */}
                    {/* ESTUDIANTE */}
                    {/* ================================= */}

                    <Route
                        element={
                            <RolRoute
                                rolesPermitidos={["estudiante"]}
                            />
                    }>
                        {/* MATERIAS */}
                        <Route path="dashboard/estudiante/materias" element={<MateriasEstudiante/>}/>
                        <Route path="dashboard/estudiante/temas/:unidadId" element={<TemasEstudiante/>} />
                        {/* UNIDADES*/}
                        <Route path="dashboard/estudiante/unidades/:materiaId" element={<UnidadesEstudiante/>}/>
                        {/* RECURSOS */}
                        <Route path="dashboard/estudiante/recursos/:temaId" element={<RecursosEstudiante/>} />
                        <Route path="dashboard/estudiante/recurso/:id" element={<DetalleRecursoEstudiante/>} />
                        {/* CUESTIONARIOS */}
                        <Route path="dashboard/estudiante/cuestionarios" element={<CuestionariosEstudiante/>}/>
                        <Route path="dashboard/estudiante/cuestionarios/:id" element={<ResolverCuestionario/>} />
                        {/* RESULTADOS */}
                        <Route path="dashboard/estudiante/resultados" element={<ResultadoEstudiante/>} />
                        <Route path="dashboard/estudiante/resultados/:id" element={<DetalleResultado/>} />
                        {/*PROGRESO Y RECOMENDACIONES */}
                        <Route path="/dashboard/estudiante/progreso" element={<MiProgreso/>}/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;