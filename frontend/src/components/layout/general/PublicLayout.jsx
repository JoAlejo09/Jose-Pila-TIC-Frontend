import { Outlet } from "react-router-dom";
import Navbar from "../Navbar.jsx";

const PublicLayout = () =>{
    return(
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="px-4 md:px-8">
                <Outlet/>
            </main>
        </div>
    )
}
export default PublicLayout;