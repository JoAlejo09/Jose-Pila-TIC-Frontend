import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login.jsx";
import Registro from "../pages/auth/Registro.jsx";
import Landing from "../pages/public/Landing.jsx";
import VerificarCuenta from "../pages/auth/VerificarCuenta.jsx";
import RecuperarPassword from "../pages/auth/RecuperarPassword.jsx";
import ResetPassword from "../pages/auth/ResetPassword.jsx";
import CambiarPassword from "../pages/auth/CambiarPassword.jsx";
import CompletarPerfil from "../pages/perfil/CompletarPerfil.jsx";

import Dashboard from "../pages/dashboard/Dashboard.jsx";

import Usuarios from "../pages/admin/Usuarios.jsx";
import Materias from "../pages/admin/Materias.jsx";
import Temas from "../pages/admin/Temas.jsx";
import Recursos from "../pages/admin/Recurso.jsx";
import Preguntas from "../pages/admin/Preguntas.jsx";

import MiPerfil from "../pages/perfil/MiPerfil.jsx";

import MateriasEstudiante from "../pages/estudiante/MateriasEstudiante.jsx";
import TemasEstudiante from "../pages/estudiante/TemaEstudiante.jsx";
import RecursosEstudiante from "../pages/estudiante/RecursosEstudiante.jsx";
import DetalleRecursoEstudiante from "../pages/estudiante/DetalleRecursoEstudiante.jsx";

import Evaluaciones from "../pages/estudiante/Evaluaciones.jsx";
import ResolverCuestionario from "../pages/estudiante/ResolverCuestionario.jsx";

import PublicLayout from "../components/layout/PublicLayout.jsx";
import PrivateLayout from "../components/layout/PrivateLayout.jsx";

import PrivateRoute from "./PrivateRoute.jsx";
import RolRoute from "./RolRoute.jsx";

const AppRouter = () => {

    return (

        <BrowserRouter>

            <Routes>

                {/* RUTAS PUBLICAS */}
                <Route element={<PublicLayout />}>

                    <Route
                        path="/"
                        element={<Landing />}
                    />

                    <Route
                        path="/registro"
                        element={<Registro />}
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/confirmar/:token"
                        element={<VerificarCuenta />}
                    />

                    <Route
                        path="/recuperar-password"
                        element={<RecuperarPassword />}
                    />

                    <Route
                        path="/reset-password/:token"
                        element={<ResetPassword />}
                    />

                </Route>


                {/* RUTAS PRIVADAS */}
                <Route
                    element={
                        <PrivateRoute>
                            <PrivateLayout />
                        </PrivateRoute>
                    }
                >

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/cambiar-password"
                        element={<CambiarPassword />}
                    />

                    <Route
                        path="/completar-perfil"
                        element={<CompletarPerfil />}
                    />

                    <Route
                        path="/mi-perfil"
                        element={<MiPerfil />}
                    />


                    {/* ADMIN */}
                    <Route
                        element={
                            <RolRoute
                                rolesPermitidos={["admin"]}
                            />
                        }
                    >

                        <Route
                            path="/dashboard/admin/usuarios"
                            element={<Usuarios />}
                        />

                        <Route
                            path="/dashboard/admin/materias"
                            element={<Materias />}
                        />

                        <Route
                            path="/dashboard/admin/temas"
                            element={<Temas />}
                        />

                        <Route
                            path="/dashboard/admin/recursos"
                            element={<Recursos />}
                        />

                        <Route
                            path="/dashboard/admin/preguntas"
                            element={<Preguntas />}
                        />

                    </Route>


                    {/* ESTUDIANTE */}
                    <Route
                        element={
                            <RolRoute
                                rolesPermitidos={["estudiante"]}
                            />
                        }
                    >

                        <Route
                            path="/dashboard/estudiante/materias"
                            element={<MateriasEstudiante />}
                        />

                        <Route
                            path="/dashboard/estudiante/temas/:materiaId"
                            element={<TemasEstudiante />}
                        />

                        <Route
                            path="/dashboard/estudiante/recursos/:temaId"
                            element={<RecursosEstudiante />}
                        />

                        <Route
                            path="/dashboard/estudiante/recurso/:id"
                            element={<DetalleRecursoEstudiante />}
                        />

                        <Route path="/dashboard/estudiante/evaluaciones" element={<Evaluaciones />}/>
                        <Route path="/dashboard/estudiante/evaluaciones/:id" element={<ResolverCuestionario />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
export default AppRouter;