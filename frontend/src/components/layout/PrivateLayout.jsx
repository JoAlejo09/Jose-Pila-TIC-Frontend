import { Outlet } from "react-router-dom";
import { useState } from "react";

import PrivateNavbar from "../navbar/private/PrivateNavbar.jsx";
import Sidebar from "../navbar/private/Sidebar.jsx";

const PrivateLayout = () =>{
    const [sidebarOpen, setSidebarOpen]= useState(true);

    return (
    <div className="h-screen flex flex-col">
      <PrivateNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} />
        <main className="flex-1 min-w-0 p-6 bg-gray-50 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
    )
} 
export default PrivateLayout;   