import { Link } from "react-router-dom";

const Navbar = () => 
{
    return(
        <nav className="fixed top-0 left-0 w-full bg-white shadow-sm border-b z-50">
            <div className="max-w-7x1 mx-auto flex justify-between items-center px-6 py-4" >

                <h1 className="text-x1 font-bold text-primary">
                RefAcad
                </h1>
               <div className="flex items-center gap-6">

          <Link
            to="/login"
            className="text-gray-600 hover:text-primary transition"
          >
            Iniciar sesión
          </Link>

          <Link
            to="/registro"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Registrarse
          </Link>
        </div>
            </div>
        </nav>
    )
}

export default Navbar;