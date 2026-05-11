import { Link }
from "react-router-dom";

import {

  GraduationCap

} from "lucide-react";

const Navbar = () => {

    return (

        <nav className="
        fixed
        top-0
        left-0
        w-full
        bg-white/90
        backdrop-blur-md
        border-b
        border-gray-200
        z-50
        ">

            <div className="
            max-w-7xl
            mx-auto
            flex
            justify-between
            items-center
            px-6
            py-4
            ">

                {/* LOGO */}
                <div className="
                flex
                items-center
                gap-3
                ">

                    <div className="
                    bg-blue-600
                    p-2
                    rounded-xl
                    text-white
                    ">

                        <GraduationCap
                          size={24}
                        />

                    </div>

                    <h1 className="
                    text-2xl
                    font-bold
                    text-slate-800
                    ">

                        RefAcademy

                    </h1>

                </div>

                {/* LINKS */}
                <div className="
                flex
                items-center
                gap-4
                ">

                    <Link

                        to="/login"

                        className="
                        text-slate-600
                        hover:text-blue-600
                        font-medium
                        transition
                        "

                    >

                        Iniciar sesión

                    </Link>

                    <Link

                        to="/registro"

                        className="
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        px-5
                        py-2.5
                        rounded-xl
                        font-medium
                        shadow-md
                        hover:shadow-lg
                        transition-all
                        "

                    >

                        Registrarse

                    </Link>

                </div>

            </div>

        </nav>

    );

};

export default Navbar;