import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

const Landing = () => {
  return (
    <div className="bg-gray-50">
      <section className="text-center py-28 px-6">
  <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
    Mejora tu rendimiento académico una nueva forma de refuerzo académico
  </h1>

  <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
    Evalúa tus conocimientos, recibe contenido personalizado y accede a tutorías especializadas para reforzar tu aprendizaje.
  </p>

  <div className="flex flex-col sm:flex-row justify-center gap-4">
    <Link to="/login">
      <Button>Iniciar sesión</Button>
    </Link>

    <Link to="/registro">
      <button className="px-6 py-2 border border-gray-400 rounded-lg hover:bg-gray-100 transition">
        Registrarse
      </button>
    </Link>
  </div>
</section>
      {/* FEATURES */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-12">
          ¿Cómo funciona?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          <div className="p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">
              Evaluación
            </h3>
            <p className="text-gray-600">
              Analizamos tu nivel en diferentes temas académicos.
            </p>
          </div>

          <div className="p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">
              Recomendación
            </h3>
            <p className="text-gray-600">
              Recibe contenido adaptado a tus necesidades.
            </p>
          </div>

          <div className="p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">
              Tutorías
            </h3>
            <p className="text-gray-600">
              Accede a apoyo con tutores especializados.
            </p>
          </div>

        </div>
      </section>

      <section className="py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Empieza a mejorar hoy
        </h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/login">
            <Button>Comenzar ahora</Button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white text-center py-6 mt-10">
        <p>© 2026 EduRefuerzo - Todos los derechos reservados</p>
      </footer>

    </div>
  );
};

export default Landing;