import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";

const PrivateNavbar = ({ toggleSidebar }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { auth } = useAuth();

  const usuario = auth?.user;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-white shadow">

      {/* BOTÓN SIDEBAR */}
      <button onClick={toggleSidebar} className="text-2xl">
        ☰
      </button>

      {/* LOGO */}
      <h1
        onClick={() => navigate("/dashboard")}
        className="text-xl font-bold text-primary cursor-pointer"
      >
        RefAcademy
      </h1>

      {/* USUARIO */}
      <div className="relative">

        <button
          onClick={() => setOpen(!open)}
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition text-sm"
        >
          {usuario
            ? `${usuario.nombre} (${usuario.rol})`
            : "Usuario"}
        </button>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-lg overflow-hidden z-50">

            {/* INFO USUARIO */}
            <div className="px-4 py-2 border-b text-sm">
              <p className="font-semibold">
                {usuario?.nombre} {usuario?.apellido}
              </p>
              <p className="text-gray-500 text-xs">
                {usuario?.email}
              </p>
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                {usuario?.rol}
              </span>
            </div>

            {/* OPCIONES */}
            <button
              onClick={() => navigate("/dashboard")}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Dashboard
            </button>

            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
            >
              Cerrar sesión
            </button>

          </div>
        )}
      </div>
    </nav>
  );
};

export default PrivateNavbar;