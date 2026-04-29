import {Outlet} from "react-router-dom";

const DashboardLayout = () =>{
    return(
        <div className="flex h-screen">
        {/*Barra Lateral */}
         <aside className="w-64 bg-gray-800 text-white p-4">
            <h2 className="text-xl font-bold">Sistema</h2>
            <nav className="mt-4 flex flex-col gap-2">
                 <a href="/dashboard">Inicio</a>
          <a href="/dashboard/perfil">Perfil</a>
            </nav>
         </aside>
         <main className="flex-1 p-6 bg-gray-100">
            <Outlet />
         </main>
        </div>

    )
}
export default DashboardLayout; 