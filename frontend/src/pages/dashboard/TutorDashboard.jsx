import {
  Users,
  CalendarDays,
  BookOpen,
  ClipboardList,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const TutorDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      titulo: "Tutorías",
      descripcion: "Gestiona las tutorías asignadas y su estado.",
      icon: CalendarDays,
      color: "bg-blue-500",
      ruta: "/dashboard/tutor/tutorias",
    },
    {
      titulo: "Estudiantes",
      descripcion: "Consulta los estudiantes vinculados a tus tutorías.",
      icon: Users,
      color: "bg-green-500",
      ruta: "#",
    },
    {
      titulo: "Recursos Académicos",
      descripcion: "Accede a los contenidos utilizados en las tutorías.",
      icon: BookOpen,
      color: "bg-purple-500",
      ruta: "/dashboard/tutor/materias",
    },
    {
      titulo: "Seguimiento",
      descripcion: "Revisa el progreso académico de los estudiantes.",
      icon: ClipboardList,
      color: "bg-orange-500",
      ruta: "#",
    },
  ];

  const estadisticas = [
    {
      titulo: "Tutorías realizadas",
      valor: "15",
    },
    {
      titulo: "Tutorías pendientes",
      valor: "4",
    },
    {
      titulo: "Estudiantes atendidos",
      valor: "10",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard Tutor
        </h1>

        <p className="text-slate-500 mt-2">
          Gestiona tus tutorías y realiza seguimiento académico a los estudiantes.
        </p>
      </div>

      {/* Bienvenida */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          Panel de gestión académica
        </h2>

        <p className="text-slate-600">
          Desde este espacio puedes administrar tutorías, consultar
          estudiantes asignados y dar seguimiento al proceso de refuerzo académico.
        </p>
      </div>

      {/* Accesos rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.titulo}
              onClick={() =>
                card.ruta !== "#" && navigate(card.ruta)
              }
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

      {/* Información inferior */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Estadísticas */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h3 className="font-semibold text-lg mb-4">
            Resumen de actividad
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

        {/* Próximas tutorías */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h3 className="font-semibold text-lg mb-4">
            Próximas tutorías
          </h3>

          <p className="text-slate-500">
            No existen tutorías programadas actualmente.
          </p>
        </div>

        {/* Seguimiento */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h3 className="font-semibold text-lg mb-4">
            Seguimiento académico
          </h3>

          <p className="text-slate-600">
            Revisa periódicamente el desempeño de los estudiantes
            para identificar necesidades de apoyo académico.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;