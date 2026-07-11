import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";

import { Menu, ChevronDown, LayoutDashboard, User, LogOut, GraduationCap} from "lucide-react";

const PrivateNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const { auth, logout } = useAuth();
  const usuario = auth?.user;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className=" h-20 bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">

      <div className=" max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        <div className=" flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className=" p-2 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <Menu size={22} />
          </button>

          {/* LOGO */}
          <div
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3 cursor-pointer "
          >
            <div className=" bg-blue-600 p-2 rounded-xl text-white">
              <GraduationCap size={24} />
            </div>

            <h1
              className="text-2xl font-bold text-slate-800"
            >
              RefAcademy
            </h1>
          </div>
        </div>

        {/* USUARIO */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className=" flex items-center gap-3 bg-slate-50 hover:bg-slate-100 border
                      border-slate-200 px-3 py-2 rounded-xl transition"
          >
            <img
              src={usuario?.fotoPerfil}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover border"
            />

            <div className=" hidden md:flex flex-col items-start ">
              <span className="text-sm font-semibold">{usuario?.nombre}</span>

              <span className="text-xs text-gray-500 capitalize">
                {usuario?.rol}
              </span>
            </div>

            <ChevronDown size={18} />
          </button>

          {/* DROPDOWN */}
          {open && (
            <div
              className=" absolute right-0 mt-3 w-64 bg-white rounded-xl border
                        border-gray-200 shadow-lg overflow-hidden z-50"
            >
              <div className="px-5 py-4 border-b flex items-center gap-3">
                <img
                  src={usuario?.fotoPerfil}
                  alt="avatar"
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <p className="font-semibold">
                    {usuario?.nombre} {usuario?.apellido}
                  </p>
                  <p className="text-sm text-gray-500">{usuario?.email}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  navigate("/dashboard");
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </button>

              <button
                onClick={() => {
                  navigate("/mi-perfil");
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition "
              >
                <User size={18} />
                Mi Perfil
              </button>

              <button
                onClick={handleLogout}
                className=" w-full flex items-center gap-3 px-5 py-3
                          text-red-500 hover:bg-red-50 transition"
              >
                <LogOut size={18} />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default PrivateNavbar;
