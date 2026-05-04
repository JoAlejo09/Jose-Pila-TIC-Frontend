import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login.jsx";
import Registro from "../pages/auth/Registro.jsx";
import Landing from "../pages/public/Landing.jsx";
import VerificarCuenta from "../pages/auth/VerificarCuenta.jsx";
import PublicLayout from "../components/layout/general/PublicLayout.jsx";
import PrivateLayout from "../components/layout/general/PrivateLayout.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import RecuperarPassword from "../pages/auth/RecuperarPassword.jsx";
import ResetPassword from "../pages/auth/ResetPassword.jsx";


const AppRouter = ()=>{
    return(
        <BrowserRouter>
         <Routes>
            {/*Paginas Publicas */}
            <Route element={<PublicLayout/>}>
            <Route path="/" element={<Landing/>}/>
            <Route path="/registro" element={<Registro/>}/>
            <Route path="/confirmar/:token" element={<VerificarCuenta/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/recuperar-password" element={<RecuperarPassword/>}/>
            <Route path="/reset-password/:token" element={<ResetPassword/>}/>
            </Route>
            {/*Paginas Privadas */}
            <Route element={<PrivateRoute>
                        <PrivateLayout/>
                    </PrivateRoute>
                }
                >
                    <Route path="/dashboard" element={<h1>Perfil</h1>}/>
                </Route>
         </Routes>
        </BrowserRouter>
    )

}
export default AppRouter;   