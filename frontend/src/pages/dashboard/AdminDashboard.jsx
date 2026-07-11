import { Users, BarChart3, UserCheck, ShieldCheck, BookOpen, 
         ClipboardList, CalendarDays, ArrowRight } from "lucide-react";

import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario")) || {};

  const cards = [
    {
      title: "Usuarios",
      value: "54",
      icon: Users,
    },
    {
      title: "Reportes",
      value: "12",
      icon: BarChart3,
    },
    {
      title: "Tutores",
      value: "8",
      icon: UserCheck,
    },
    {
      title: "Administradores",
      value: "2",
      icon: ShieldCheck,
    },
  ];

  const accesosRapidos = [
    {
      title: "Usuarios",
      icon: Users,
      ruta: "/dashboard/admin/usuarios",
    },
    {
      title: "Recursos",
      icon: BookOpen,
      ruta: "/dashboard/admin/recursos",
    },
    {
      title: "Evaluaciones",
      icon: ClipboardList,
      ruta: "/dashboard/admin/evaluaciones",
    },
    {
      title: "Tutorías",
      icon: CalendarDays,
      ruta: "/dashboard/admin/tutorias",
    },
  ];

  const actividades = [
    "Nuevo estudiante registrado.",
    "Se agregó un nuevo recurso académico.",
    "Tutoría programada para Matemáticas.",
    "Evaluación completada por un estudiante.",
  ];

  const fechaActual = new Date().toLocaleDateString("es-EC", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Encabezado */}
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Dashboard Administrador
          </h1>

          <p className="text-slate-500 mt-2">
            Gestión general del sistema de refuerzo académico.
          </p>
        </div>

        <div className="bg-white border rounded-xl px-4 py-3 shadow-sm">
          <p className="text-sm text-slate-500">Fecha actual</p>
          <p className="font-medium capitalize">{fechaActual}</p>
        </div>
      </div>

      {/* Bienvenida */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          Bienvenido {usuario.nombre || "Administrador"}
        </h2>

        <p className="text-slate-600">
          Desde este panel puede gestionar usuarios, recursos académicos,
          evaluaciones, tutorías y supervisar el funcionamiento general de la
          plataforma.
        </p>
      </div>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-white p-6 rounded-2xl shadow-sm
                          border hover:shadow-lg transition-all duration-300
              "
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-500 text-sm">{card.title}</p>

                  <h2 className="text-3xl font-bold mt-2 text-slate-800">
                    {card.value}
                  </h2>
                </div>

                <div className="bg-blue-100 text-blue-600 p-4 rounded-2xl">
                  <Icon size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sección inferior */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Accesos rápidos */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-5">
            Accesos rápidos
          </h3>

          <div className="space-y-3">
            {accesosRapidos.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.title}
                  onClick={() => navigate(item.ruta)}
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    p-3
                    rounded-xl
                    border
                    hover:bg-slate-50
                    transition
                  "
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} className="text-blue-600" />
                    <span className="font-medium">{item.title}</span>
                  </div>

                  <ArrowRight size={18} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Actividad reciente */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-5">
            Actividad reciente
          </h3>

          <div className="space-y-4">
            {actividades.map((actividad) => (
              <div
                key={actividad}
                className="border-b last:border-b-0 pb-3 last:pb-0"
              >
                <p className="text-slate-600 text-sm">{actividad}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen */}
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-5">
            Resumen del sistema
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-600">Materias</span>
              <span className="font-semibold">5</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-600">Temas</span>
              <span className="font-semibold">48</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-600">Recursos</span>
              <span className="font-semibold">120</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-600">Evaluaciones</span>
              <span className="font-semibold">35</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-600">Tutorías</span>
              <span className="font-semibold">24</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;