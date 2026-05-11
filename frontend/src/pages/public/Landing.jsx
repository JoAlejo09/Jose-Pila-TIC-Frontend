import { Link } from "react-router-dom";
import { GraduationCap, Brain, BookOpen, Users, ArrowRight} from "lucide-react";
import Button from "../../components/ui/Button";

const Landing = () => {

  return (
    <div className="bg-slate-50 overflow-hidden">

      <section className="relative min-h-screen flex items-center justify-center px-6">

        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-100"></div>

        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl"></div>

        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center z-10">

          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <GraduationCap size={18} />
              Plataforma educativa inteligente
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight mb-6">
              Refuerzo académico
              {" "}
              <span className="text-blue-600">
                personalizado
              </span>
              {" "}
              para potenciar tu aprendizaje
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
              Evalúa tus conocimientos, recibe recomendaciones
              inteligentes y accede a tutorías especializadas
              adaptadas a tu rendimiento académico.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/registro">
                <Button
                  className="px-8 py-3 text-lg flex items-center gap-2">
                  Comenzar ahora
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/login">
                <button className="px-8 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 transition font-medium">
                  Iniciar sesión
                </button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-200">

              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-bold text-xl text-slate-800">
                    Rendimiento académico
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Seguimiento personalizado
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                  <Brain size={28} />
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Matemáticas</span>
                    <span>85%</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[85%] rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Lenguaje</span>
                    <span>72%</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[72%] rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Ciencias</span>
                    <span>91%</span>
                  </div>
                  <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[91%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto mb-16 ">
            Un sistema diseñado para fortalecer el aprendizaje
            mediante análisis académico personalizado.
          </p>
          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-slate-50 p-8 rounded-3xl border hover:shadow-xl transition-all duration-300">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain size={30} />
              </div>
              <h3 className="text-xl font-bold mb-4">
                Evaluación inteligente
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Analizamos el desempeño
                académico para identificar
                fortalezas y debilidades.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border hover:shadow-xl transition-all duration-300">
              <div className="bg-indigo-100 text-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookOpen size={30} />
              </div>
              <h3 className="text-xl font-bold mb-4">
                Recursos personalizados
              </h3>
              <p className="text-slate-600 leading-relaxed
              ">
                Contenido adaptado a las
                necesidades académicas
                específicas del estudiante.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border hover:shadow-xl transition-all duration-300
            ">
              <div className="bg-emerald-100 text-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users size={30} />
              </div>
              <h3 className="text-xl font-bold mb-4">
                Tutorías especializadas
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Accede a apoyo académico
                con tutores especializados
                por áreas de conocimiento.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">
          Empieza a mejorar tu rendimiento hoy
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-blue-100 mb-8">
          Únete a una plataforma diseñada para potenciar el aprendizaje
          mediante tecnología educativa inteligente.
        </p>
        <Link to="/registro">
          <button className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl">
            Crear cuenta gratuita
          </button>
        </Link>
      </section>

      <footer className="bg-slate-950 text-slate-400 py-10 text-center">
        <h3 className="text-white text-2xl font-bold mb-3">
          RefAcademy
        </h3>
        <p>
          © 2026 RefAcademy.
          Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
};

export default Landing;