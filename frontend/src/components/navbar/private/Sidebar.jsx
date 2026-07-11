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
    const [openMenus, setOpenMenus] = useState({});


    const toggleMenu = (key)=>{
        setOpenMenus((prev)=>({
            ...prev,
            [key]: !prev[key]
        }));

    };

    const renderMenuItems = (
        items,
        level = 0,
        parentKey = ""
    ) => {

        return items.map((item,index)=>{

            const key = `${parentKey}-${item.label}-${index}`;
            const hasChildren = item.children && item.children.length > 0;

            if(!hasChildren){
                const active = location.pathname === item.path;
                return(
                    <Link
                        key={key}
                        to={item.path}
                    >
                        <div
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl 
                                        transition-all duration-200 cursor-pointer ml-${level * 2}
                                ${
                                    active
                                    ? "bg-blue-600 text-white shadow-lg"
                                    : "hover:bg-slate-800 text-slate-300"
                                }
                            `}
                            style={{
                                marginLeft:`${level * 12}px`
                            }}
                        >

                            {
                                item.icon &&
                                <item.icon size={20}/>
                            }
                            <span>
                                {item.label}
                            </span>
                        </div>
                    </Link>
                );
            }

            return(
                <div key={key}>
                    <button
                        onClick={()=>toggleMenu(key)}
                        className=" w-full flex items-center justify-between px-4 py-3
                                    rounded-xl hover:bg-slate-800 transition text-slate-300"
                        style={{ marginLeft:`${level * 12}px`}}
                    >
                        <div className="flex items-center gap-3">
                            {
                                item.icon &&
                                <item.icon size={20}/>
                            }
                            <span>
                                {item.label}
                            </span>
                        </div>

                        {
                            openMenus[key]
                            ? <ChevronDown size={18}/>
                            : <ChevronRight size={18}/>
                        }
                    </button>

                    {
                        openMenus[key] && (

                            <div className="mt-1 space-y-1">
                                {
                                    renderMenuItems(
                                        item.children,
                                        level + 1,
                                        key
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            );
        });
    };

    return (
        <aside
            className={`flex-shrink-0 bg-slate-900 text-white h-full transition-all 
                        duration-300 border-r border-slate-800 overflow-hidden ${isOpen ? "w-72" : "w-0"}
                    `}
        >
            <div
                className={` h-full flex flex-col ${!isOpen && "hidden"} `}
            >

                <div className="px-6 py-6 border-b border-slate-800">

                    <h2 className="text-2xl font-bold text-blue-400">
                        RefAcademy
                    </h2>

                    <p className="text-sm text-slate-400 mt-1 capitalize">
                        Panel {rol}
                    </p>

                </div>

                <div className="flex-1 px-3 py-5 space-y-2 overflow-y-auto">

                    {renderMenuItems(menu)}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;