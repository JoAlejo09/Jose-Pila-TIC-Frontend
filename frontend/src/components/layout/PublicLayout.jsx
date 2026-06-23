import { Outlet } from "react-router-dom";
import Navbar from "../navbar/public/Navbar.jsx";

const PublicLayout = () =>{
    return(
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-24 px-4 md:px-8">
                <Outlet/>
            </main>
        </div>
    )
}
export default PublicLayout;