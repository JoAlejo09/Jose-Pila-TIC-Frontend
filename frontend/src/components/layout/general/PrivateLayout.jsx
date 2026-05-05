import { Outlet } from "react-router-dom";

import PrivateNavbar from "../PrivateNavbar.jsx";
import Sidebar from "../private/Sidebar.jsx";

const PrivateLayout = () =>{
    return(
        <div className=" h-screen flex flex-col">
            <PrivateNavbar/>
            <div className="flex flex-1">
                <Sidebar/>
                <main className=" flex-1 p-6 bg-gray-50 overflow-y-auto">
                    <Outlet/>
                </main>
            </div> 

        </div>
    )
} 
export default PrivateLayout;   