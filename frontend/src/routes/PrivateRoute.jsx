import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children }) => {

    const token =
        localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/login" />;
    }
    try {
        const decoded =
            jwtDecode(token);
        const currentTime =Date.now() / 1000;
        if (decoded.exp < currentTime) {
            localStorage.clear();
            return <Navigate to="/login" />;
        }
        return children;

    } catch (error) {
        console.log(error);
        localStorage.clear();
        return <Navigate to="/login" />;
    }

};
export default PrivateRoute;