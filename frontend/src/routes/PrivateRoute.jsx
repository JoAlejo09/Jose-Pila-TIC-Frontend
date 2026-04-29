import {Navigate} from "react-router-dom";

const PrivateRoute = ({chilren}) =>{
    const token = localStorage.getItem("token");
    return token ? chilren : <Navigate to="/" />;
}
export default PrivateRoute;
