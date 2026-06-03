import {
  BookOpen,
  ClipboardCheck,
  TrendingUp,
  Lightbulb,
  CalendarDays,
  Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const EstudianteDashboard = () => {
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario")) || {};

  const cards = [
    {
      titulo: "Recursos Académicos",
      descripcion: "Explora materias, temas y recursos educativos.",
      icon: BookOpen,
      color: "bg-blue-500",
      ruta: "/dashboard/estudiante/materias",
    },
    {
      titulo: "Evaluaciones",
      descripcion: "Realiza evaluaciones y mide tu desempeño.",
      icon: ClipboardCheck,
      color: "bg-green-500",
      ruta: "/dashboard/estudiante/cuestionarios",
    },
    {
      titulo: "Resultados",
      descripcion: "Consulta tus resultados y rendimiento académico.",
      icon: TrendingUp,
      color: "bg-purple-500",
      ruta: "/dashboard/estudiante/resultados",
    },
    {
      titulo: "Recomendaciones",
      descripcion: "Accede a recursos recomendados según tu desempeño.",
      icon: Lightbulb,
      color: "bg-yellow-500",
      ruta: "/dashboard/estudiante/recomendaciones",
    },
  ];

  const estadisticas = [
    {
      titulo: "Evaluaciones realizadas",
      valor: "12",
    },
    {
      titulo: "Tutorías agendadas",
      valor: "4",
    },
    {
      titulo: "Recursos consultados",
      valor: "28",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard Estudiante
        </h1>

        <p className="text-slate-500 mt-2">
          Bienvenido {usuario.nombre || "Estudiante"}.
        </p>
      </div>

      {/* Bienvenida */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          Continúa fortaleciendo tu aprendizaje
        </h2>

        <p className="text-slate-600">
          Desde este espacio puedes acceder a recursos académicos,
          realizar evaluaciones, revisar tus resultados,
          recibir contenido personalizado y solicitar tutorías.
        </p>
      </div>

      {/* Accesos principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.titulo}
              onClick={() => navigate(card.ruta)}
              className="
                bg-white
                rounded-2xl
                shadow-sm
                border
                p-6
                cursor-pointer
                hover:shadow-lg
                transition-all
                duration-300
              "
            >
              <div
                className={`
                  w-14 h-14
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  text-white
                  mb-4
                  ${card.color}
                `}
              >
                <Icon size={28} />
              </div>

              <h2 className="text-lg font-semibold mb-2">
                {card.titulo}
              </h2>

              <p className="text-slate-500 text-sm">
                {card.descripcion}
              </p>
            </div>
          );
        })}
      </div>

      {/* Sección inferior */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Estadísticas */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h3 className="font-semibold text-lg mb-4">
            Mi actividad
          </h3>

          <div className="space-y-4">
            {estadisticas.map((item) => (
              <div
                key={item.titulo}
                className="flex justify-between"
              >
                <span className="text-slate-600">
                  {item.titulo}
                </span>

                <span className="font-bold">
                  {item.valor}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tutorías */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays size={20} />
            <h3 className="font-semibold text-lg">
              Próximas tutorías
            </h3>
          </div>

          <p className="text-slate-500">
            No tienes tutorías programadas actualmente.
          </p>
        </div>

        {/* Rendimiento */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award size={20} />
            <h3 className="font-semibold text-lg">
              Rendimiento general
            </h3>
          </div>

          <p className="text-slate-600">
            Mantén un seguimiento constante de tus evaluaciones
            para identificar fortalezas y áreas de mejora.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EstudianteDashboard;