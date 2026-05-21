import { BookOpen, ClipboardCheck, TrendingUp, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EstudianteDashboard = ()=>{

    const navigate = useNavigate();

    const cards = [
        {
            titulo:"Recursos Académicos",
            descripcion:"Explora materias, temas y recursos educativos.",
            icon: BookOpen,
            color:"bg-blue-500",
            ruta:"/dashboard/estudiante/materias"
        },
        {
            titulo:"Evaluaciones",
            descripcion: "Realiza evaluaciones y mide tu desempeño.",
            icon: ClipboardCheck,
            color:"bg-green-500",
            ruta:"/dashboard/estudiante/cuestionarios"
        },
        {
            titulo:"Mi Progreso",
            descripcion: "Visualiza tu avance académico.",
            icon: TrendingUp,
            color:"bg-purple-500",
            ruta:"#"
        },
        {
            titulo:"Recomendaciones",
            descripcion: "Recibe recomendaciones personalizadas.",
            icon: Lightbulb,
            color:"bg-yellow-500",
            ruta:"#"
        }
    ];
    return(
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    Dashboard Estudiante
                </h1>
                <p className="text-slate-500">
                    Bienvenido al sistema de refuerzo académico.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {cards.map((card,index)=>{
                    const Icon = card.icon;
                    return(
                        <div
                            key={index}
                            onClick={()=>
                                card.ruta !== "#" &&
                                navigate(card.ruta)
                            }
                            className=" bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border">
                            {/* ICON */}
                            <div
                                className={`w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4
                                ${card.color}`}>
                                <Icon size={28}/>
                            </div>
                            {/* CONTENT */}
                            <h2 className="text-xl font-semibold mb-2">
                                {card.titulo}
                            </h2>
                            <p className="text-slate-500 text-sm">
                                {card.descripcion}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EstudianteDashboard;