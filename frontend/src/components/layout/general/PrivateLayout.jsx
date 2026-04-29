import { Outlet } from "react-router-dom";
import PrivateNavbar from "../PrivateNavbar.jsx";

const PrivateLayout = () =>{
    return(
        <div className="min-h-screen bg-background flex flex-col">
            {/*NAVBAR PRIVADO */}
            <PrivateNavbar/>
            <main className="flex-1 p-6 bg-gray-50">
                <Outlet/>
            </main>

        </div>
    )
} 
export default PrivateLayout;   