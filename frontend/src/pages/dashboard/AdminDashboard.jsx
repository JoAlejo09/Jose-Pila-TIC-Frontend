import {

  Users,

  BarChart3,

  UserCheck,

  ShieldCheck

} from "lucide-react";

const AdminDashboard = () => {

    const cards = [

        {

            title:"Usuarios",

            value:"54",

            icon: Users

        },

        {

            title:"Reportes",

            value:"12",

            icon: BarChart3

        },

        {

            title:"Tutores",

            value:"8",

            icon: UserCheck

        },

        {

            title:"Administradores",

            value:"2",

            icon: ShieldCheck

        }

    ];

    return (

        <div className="
        p-6
        bg-slate-100
        min-h-screen
        ">

            <h1 className="
            text-3xl
            font-bold
            text-slate-800
            mb-2
            ">

                Dashboard Administrador

            </h1>

            <p className="
            text-slate-500
            mb-8
            ">

                Gestión general del sistema.

            </p>

            <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-6
            ">

                {cards.map((card)=>{

                    const Icon =
                      card.icon;

                    return (

                        <div
                            key={card.title}
                            className="
                            bg-white
                            p-6
                            rounded-2xl
                            shadow-sm
                            border
                            hover:shadow-lg
                            transition
                            "
                        >

                            <div className="
                            flex
                            justify-between
                            items-center
                            ">

                                <div>

                                    <p className="
                                    text-slate-500
                                    text-sm
                                    ">

                                        {card.title}

                                    </p>

                                    <h2 className="
                                    text-3xl
                                    font-bold
                                    mt-2
                                    ">
                                        {card.value}
                                    </h2>
                                </div>
                                <div className="
                                bg-blue-100
                                text-blue-600
                                p-4
                                rounded-2xl
                                ">
                                    <Icon size={28}/>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default AdminDashboard;