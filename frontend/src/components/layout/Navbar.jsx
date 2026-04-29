import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-sm">
      
      {/* LOGO */}
      <h1 className="text-xl font-bold text-primary">
        EduRefuerzo
      </h1>

      {/* BOTONES */}
      <div className="flex gap-4">
        <Link to="/login" className="text-gray-600 hover:text-primary">
          Iniciar sesión
        </Link>

        <Link
          to="/registro"
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          Registrarse
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;