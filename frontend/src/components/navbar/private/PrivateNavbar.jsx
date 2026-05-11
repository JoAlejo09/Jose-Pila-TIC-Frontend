import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";

import { Menu,ChevronDown, LayoutDashboard, User, LogOut} from "lucide-react";

const PrivateNavbar = ({ toggleSidebar }) => {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { auth, logout } = useAuth();
  const usuario = auth?.user;
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className=" h-16 bg-white border-b shadow-sm px-6
    flex items-center justify-between sticky top-0 z-40">

      <div className=" flex items-center gap-4">

        {/* BOTON SIDEBAR */}
        <button
          onClick={toggleSidebar}
          className=" p-2 rounded-lg hover:bg-gray-100 transition">
          <Menu size={22} />
        </button>

        {/* LOGO */}
        <h1
          onClick={() =>navigate("/dashboard")}
          className="text-2xl font-bold text-blue-600 cursor-pointer"
        >
          RefAcademy
        </h1>
      </div>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className=" flex items-center gap-3 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl transition">
          {/* AVATAR */}
          <img
            src={usuario?.fotoPerfil}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover border"/>

          {/* INFO */}
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-semibold">
              {usuario?.nombre}
            </span>
            <span className="text-xs text-gray-500 capitalize">
              {usuario?.rol}
            </span>
          </div>
          <ChevronDown size={18}/>
        </button>

        {/* DROPDOWN */}
        {open && (

          <div className="
          absolute
          right-0
          mt-3
          w-64
          bg-white
          rounded-2xl
          shadow-xl
          border
          overflow-hidden
          z-50
          animate-in
          fade-in
          duration-200
          ">

            {/* HEADER */}
            <div className="px-5 py-4 border-b flex items-center gap-3">
              <img
                src={usuario?.fotoPerfil}
                alt="avatar"
                className="
                w-12
                h-12
                rounded-full
                object-cover
                "
              />
              <div>
                <p className="
                font-semibold
                ">
                  {usuario?.nombre}
                  {" "}
                  {usuario?.apellido}
                </p>
                <p className="text-sm text-gray-500">
                  {usuario?.email}
                </p>
              </div>
            </div>

            {/* OPCIONES */}
            <button
              onClick={() => {
                navigate("/dashboard");
                setOpen(false);
              }}
              className=" w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-100 transition"
            >
              <LayoutDashboard
                size={18}
              />
              Dashboard
            </button>

            <button
              onClick={() => {
                navigate("/mi-perfil");
                setOpen(false);
              }}
              className=" w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-100 transition
              "
            >
              <User size={18} />
              Mi Perfil
            </button>
            <button
              onClick={handleLogout}
              className=" w-full flex items-center gap-3 px-5 py-3 hover:bg-red-50 text-red-500 transition
              "
            >
              <LogOut size={18} />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default PrivateNavbar;