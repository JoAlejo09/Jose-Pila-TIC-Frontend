import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Login from "../pages/login.jsx";
import Landing from "../pages/public/Landing.jsx";

const AppRouter = ()=>{
    return(
        <BrowserRouter>
         <Routes>
            {/*Paginas Publicas */}
            <Route path="/" element={<Landing/>}/>
         </Routes>
        </BrowserRouter>
    )

}
export default AppRouter;   