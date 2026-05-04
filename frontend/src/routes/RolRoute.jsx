import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth.js";

const RolRoute = ({rolesPermitidos}) =>{
    const {auth} = useAuth();
    const rol = auth?.user?.rol;

    if(!auth?.token){
        return <Navigate to="/login"/> 
    }
    if (!rolesPermitidos.includes(rol)){
        return <Navigate to="/dashboard"/>
    }
    return <Outlet/>
}
export default RolRoute;