import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent, waitFor, } from "@testing-library/react";

import PreguntaModal from "../components/modal/PreguntaModal.jsx";

vi.mock("../services/preguntaService.js", () => ({
  crearPreguntaRequest: vi.fn(),
  actualizarPreguntaRequest: vi.fn(),
}));

vi.mock("../services/materiaService.js", () => ({
  obtenerMateriasRequest: vi.fn(),
}));

vi.mock("../services/unidadService.js", () => ({
  obtenerUnidadesPorMateriaRequest: vi.fn(),
}));

vi.mock("../services/temaService.js", () => ({
  obtenerTemasPorUnidadRequest: vi.fn(),
}));

import {
  crearPreguntaRequest,
  actualizarPreguntaRequest,
} from "../services/preguntaService.js";

import {
  obtenerMateriasRequest,
} from "../services/materiaService.js";

import {
  obtenerUnidadesPorMateriaRequest,
} from "../services/unidadService.js";

import {
  obtenerTemasPorUnidadRequest,
} from "../services/temaService.js";

const materiasMock = [
  {
    _id: "materia1",
    nombre: "Matemáticas",
  },
];

const unidadesMock = [
  {
    _id: "unidad1",
    nombre: "Álgebra",
  },
];

const temasMock = [
  {
    _id: "tema1",
    nombre: "Ecuaciones",
  },
];

describe("PreguntaModal", () => {
  const onCloseMock = vi.fn();
  const recargarPreguntasMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // El componente espera arrays directamente
    obtenerMateriasRequest.mockResolvedValue(
      materiasMock
    );

    obtenerUnidadesPorMateriaRequest.mockResolvedValue(
      unidadesMock
    );

    obtenerTemasPorUnidadRequest.mockResolvedValue(
      temasMock
    );

    recargarPreguntasMock.mockResolvedValue();
  });

  it("debe cargar las materias al iniciar", async () => {
    render(
      <PreguntaModal
        onClose={onCloseMock}
        recargarPreguntas={recargarPreguntasMock}
      />
    );

    expect(
      await screen.findByText("Matemáticas")
    ).toBeInTheDocument();

    expect(
      obtenerMateriasRequest
    ).toHaveBeenCalledTimes(1);
  });

it("debe cambiar a respuesta corta", async () => {
  render(
    <PreguntaModal
      onClose={onCloseMock}
      recargarPreguntas={recargarPreguntasMock}
    />
  );

  await screen.findByText("Matemáticas");

  const tipoPreguntaSelect =
    document.querySelector(
      'select[name="tipoPregunta"]'
    );

  fireEvent.change(tipoPreguntaSelect, {
    target: {
      value: "respuesta_corta",
    },
  });

  expect(
    screen.getByPlaceholderText(
      "Ingrese la respuesta esperada"
    )
  ).toBeInTheDocument();
});

it("debe crear una pregunta correctamente", async () => {
  crearPreguntaRequest.mockResolvedValue({
    success: true,
  });

  render(
    <PreguntaModal
      onClose={onCloseMock}
      recargarPreguntas={recargarPreguntasMock}
    />
  );

  await screen.findByText("Matemáticas");
    // Enunciado
  fireEvent.change(
    document.querySelector(
      'textarea[name="enunciado"]'
    ),
    {
      target: {
        value: "¿Cuánto es 2 + 2?",
      },
    }
  );

  // Materia
  fireEvent.change(
    document.querySelector(
      'select[name="materia"]'
    ),
    {
      target: {
        value: "materia1",
      },
    }
  );

  await waitFor(() => {
    expect(
      obtenerUnidadesPorMateriaRequest
    ).toHaveBeenCalledWith(
      "materia1"
    );
  });

  // Unidad
  fireEvent.change(
    document.querySelector(
      'select[name="unidad"]'
    ),
    {
      target: {
        value: "unidad1",
      },
    }
  );

  await waitFor(() => {
    expect(
      obtenerTemasPorUnidadRequest
    ).toHaveBeenCalledWith(
      "unidad1"
    );
  });

  // Tema
  fireEvent.change(
    document.querySelector(
      'select[name="tema"]'
    ),
    {
      target: {
        value: "tema1",
      },
    }
  );

  // Opciones de respuesta
  fireEvent.change(
    screen.getByPlaceholderText(
      "Opción 1"
    ),
    {
      target: {
        value: "4",
      },
    }
  );

  fireEvent.change(
    screen.getByPlaceholderText(
      "Opción 2"
    ),
    {
      target: {
        value: "5",
      },
    }
  );

  fireEvent.change(
    screen.getByPlaceholderText(
      "Opción 3"
    ),
    {
      target: {
        value: "6",
      },
    }
  );

  fireEvent.change(
    screen.getByPlaceholderText(
      "Opción 4"
    ),
    {
      target: {
        value: "7",
      },
    }
  );

  // Esperar que se actualice el select de respuestas correctas
  await waitFor(() => {
    const opcionesRespuesta =
      document.querySelector(
        'select[name="respuestaCorrecta"]'
      ).options;

    expect(opcionesRespuesta.length)
      .toBeGreaterThan(1);
  });

  // Seleccionar respuesta correcta
  fireEvent.change(
    document.querySelector(
      'select[name="respuestaCorrecta"]'
    ),
    {
      target: {
        value: "4",
      },
    }
  );

  // Guardar
  fireEvent.click(
    screen.getByRole("button", {
      name: /guardar pregunta/i,
    })
  );

  await waitFor(() => {
    expect(
      crearPreguntaRequest
    ).toHaveBeenCalledTimes(1);
  });

  expect(
    recargarPreguntasMock
  ).toHaveBeenCalled();
});

  it("debe cargar datos cuando se edita una pregunta", async () => {
    const preguntaMock = {
      _id: "pregunta1",
      enunciado: "¿Qué es una ecuación?",
      nivelAcademico: "1ro BGU",
      tipoPregunta: "respuesta_corta",
      respuestaCorrecta:
        "Una igualdad matemática",
      explicacion: "Definición básica",
      nivelDificultad: "facil",
      materia: {
        _id: "materia1",
      },
      unidad: {
        _id: "unidad1",
      },
      tema: {
        _id: "tema1",
      },
    };

    render(
      <PreguntaModal
        preguntaEditar={preguntaMock}
        onClose={onCloseMock}
        recargarPreguntas={recargarPreguntasMock}
      />
    );

    expect(
      await screen.findByDisplayValue(
        "¿Qué es una ecuación?"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue(
        "Una igualdad matemática"
      )
    ).toBeInTheDocument();
  });

  it("debe actualizar una pregunta correctamente", async () => {
    actualizarPreguntaRequest.mockResolvedValue({
      success: true,
    });

    const preguntaMock = {
      _id: "pregunta1",
      enunciado: "¿Qué es una ecuación?",
      nivelAcademico: "1ro BGU",
      tipoPregunta: "respuesta_corta",
      respuestaCorrecta:
        "Una igualdad matemática",
      explicacion: "Definición básica",
      nivelDificultad: "facil",
      materia: {
        _id: "materia1",
      },
      unidad: {
        _id: "unidad1",
      },
      tema: {
        _id: "tema1",
      },
    };

    render(
      <PreguntaModal
        preguntaEditar={preguntaMock}
        onClose={onCloseMock}
        recargarPreguntas={recargarPreguntasMock}
      />
    );

    const botonActualizar =
      await screen.findByRole("button", {
        name: /actualizar pregunta/i,
      });

    fireEvent.click(botonActualizar);

    await waitFor(() => {
      expect(
        actualizarPreguntaRequest
      ).toHaveBeenCalledTimes(1);
    });

    expect(
      recargarPreguntasMock
    ).toHaveBeenCalled();
  });
});