import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Login from "../pages/login.jsx";
import Registro from "../pages/auth/Registro.jsx";
import Landing from "../pages/public/Landing.jsx";
import PublicLayout from "../components/layout/general/PublicLayout.jsx";
import PrivateLayout from "../components/layout/general/PrivateLayout.jsx";
import PrivateRoute from "./PrivateRoute.jsx";

const AppRouter = ()=>{
    return(
        <BrowserRouter>
         <Routes>
            {/*Paginas Publicas */}
            <Route element={<PublicLayout/>}>
            <Route path="/" element={<Landing/>}/>
            <Route path="/registro" element={<Registro/>}/>
            </Route>
            {/*Paginas Privadas */}
            <Route
                element={
                    <PrivateRoute>
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