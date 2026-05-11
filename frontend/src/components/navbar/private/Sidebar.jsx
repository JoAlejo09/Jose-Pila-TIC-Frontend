import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useAuth } from "../../../context/useAuth.js";
import menuPorRol from "../../../config/menuConfig.js";

const Sidebar = ({ isOpen }) => {
    const { auth } = useAuth();
    const rol = auth?.user?.rol;
    const menu = menuPorRol[rol] || [];
    const location = useLocation();
    const [openMenu, setOpenMenu] = useState({});

    // TOGGLE SUBMENU
    const toggleMenu = (label)=>{
        setOpenMenu((prev)=>({
            ...prev,
            [label]: !prev[label]
        }));
    };
    return (
        <aside
            className={`bg-slate-900 text-white min-h-screen transition-all duration-300 border-r border-slate-800 overflow-hidden
                      ${isOpen ? "w-72" : "w-0"} `}>
            <div className={`h-full flex flex-col
                          ${!isOpen && "hidden"}`}>

                <div className="px-6 py-6 border-b border-slate-800">
                    <h2 className="text-2xl font-bold text-blue-400">
                        RefAcademy
                    </h2>
                    <p className="text-sm text-slate-400 mt-1 capitalize">
                        Panel {rol}
                    </p>
                </div>

                <div className="flex-1 px-3 py-5 space-y-2">
                    {menu.map((item)=>{
                        const Icon = item.icon;
                        if(!item.children){
                            const active = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.label}
                                    to={item.path}
                                >
                                    <div
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer
                                                  ${ active ? "bg-blue-600 text-white shadow-lg": "hover:bg-slate-800 text-slate-300"}
                                        `}
                                    >
                                        <Icon size={20}/>
                                        <span>
                                            {item.label}
                                        </span>
                                    </div>
                                </Link>
                            );
                        }
                        return (
                            <div
                                key={item.label}
                            >
                                <button
                                    onClick={()=>
                                      toggleMenu(
                                        item.label
                                      )
                                    }
                                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-800 transition text-slate-300"
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon size={20}
                                        />
                                        <span>
                                            {item.label}
                                        </span>
                                    </div>
                                    {openMenu[item.label]
                                      ? <ChevronDown size={18}/>
                                      : <ChevronRight size={18}/>
                                    }
                                </button>

                                {/* SUBMENU */}
                                {openMenu[item.label] && (
                                    <div className="ml-5 mt-2 flex flex-col gap-1 border-l border-slate-700 pl-4">
                                        {item.children.map(
                                          (sub)=>{
                                            const activeSub = location.pathname === sub.path;
                                            return (
                                                <Link
                                                    key={sub.path}
                                                    to={sub.path}>
                                                    <div
                                                        className={`px-3 py-2 rounded-lg text-sm transition
                                                        ${activeSub
                                                          ? "bg-blue-500 text-white"
                                                          : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                                        }
                                                        `}
                                                    >
                                                        {sub.label}
                                                    </div>
                                                </Link>
                                           );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;