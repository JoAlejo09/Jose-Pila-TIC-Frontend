import { useAuth } from "../../context/useAuth";
import AdminDashboard from "./AdminDashboard";
import EstudianteDashboard from "./EstudianteDashboard";
import TutorDashboard from "./TutorDashboard";

const Dashboard = () => {
    const { auth } = useAuth();
    const rol = auth?.user?.rol;

    if(rol === "admin"){
        return <AdminDashboard/>;
    }
    if(rol === "tutor"){
        return <TutorDashboard/>;
    }
    return <EstudianteDashboard/>;
};

export default Dashboard;