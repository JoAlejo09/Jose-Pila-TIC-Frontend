import {useAuth} from "../../../context/useAuth.js";
import {menuPorRol} from "../../../config/menuConfig.js"
import { Link } from "react-router-dom";

const Sidebar = () =>{
    const {auth} = useAuth();
    const rol = auth?.user?.rol;
    
    const menu = menuPorRol[rol] || [];

    return (
        <div className="w-64 h-screen bg-gray-900 text-white p-4">
            <h2 className="text-x1 mbr-6">Panel</h2>
             {menu.map((item, index) => (
                <Link key={index} to={item.path}>
                    <p className="mb-2 hover:text-gray-300">
                        {item.label}
                    </p>
                </Link>
            ))}
        </div>
    )
}
export default Sidebar