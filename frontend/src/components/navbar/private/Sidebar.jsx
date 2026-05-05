import {useAuth} from "../../../context/useAuth.js";
import { useState } from "react";
import menuPorRol from "../../../config/menuConfig.js"
import { Link } from "react-router-dom";

const Sidebar = ({isOpen}) =>{
    const {auth} = useAuth();
    const rol = auth?.user?.rol;
    
    const menu = menuPorRol[rol] || [];
    const [openMenu, setOpenMenu] = useState({});

    const toggleMenu = (label) =>{
        setOpenMenu((prev)=>({
            ...prev,
            [label]: !prev[label],
        }));
    };

    return (
   <aside
      className={`
        bg-gray-900 text-white p-4 transition-all duration-300
        ${isOpen ? "w-64" : "w-0"}
      `}
    >
      <div className={`${!isOpen && "hidden"}`}>

      {menu.map((item) => (
        <div key={item.label} className="mb-2">

          {/* ITEM SIN SUBMENÚ */}
          {!item.children && (
            <Link to={item.path}>
              <p className="hover:text-gray-300">{item.label}</p>
            </Link>
          )}

          {item.children && (
            <>
              <button
                onClick={() => toggleMenu(item.label)}
                className="w-full text-left hover:text-gray-300"
              >
                {item.label}
              </button>

              {openMenu[item.label] && (
                <div className="ml-4 mt-2 flex flex-col gap-1">
                  {item.children.map((sub) => (
                    <Link key={sub.path} to={sub.path}>
                      <p className="text-sm hover:text-gray-400">
                        {sub.label}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      ))}
      </div>
    </aside>
    )
}
export default Sidebar