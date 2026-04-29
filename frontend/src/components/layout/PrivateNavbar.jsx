import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivateNavbar = () =>{
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    //cerrar sesion
    const handleLogout = () =>{
        localStorage.removeItem("token");
        navigate("/");
    }  
    return(
        <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
            <h1 onClick={()=> navigate("/dashboard")}
                className="text-x1 font-bold text-primary cursor-ponter">
                RefAcademy
            </h1>
            <div className="relative">
                <button onClick={() =>setOpen(!open)}
                    className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                        Usuario
                </button>
                {open && (
          <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg overflow-hidden">

            <button
              onClick={() => navigate("/dashboard")}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Dashboard
            </button>

            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Cerrar sesión
            </button>

          </div>
        )}
            </div>
        </nav>


    )
}
export default PrivateNavbar;   