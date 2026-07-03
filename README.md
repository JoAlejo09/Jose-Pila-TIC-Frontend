# Sistema Web de Refuerzo Académico Personalizado - Frontend

Frontend desarrollado con React y Vite para el **Sistema Web de Refuerzo Académico Personalizado y Tutorías basadas en el seguimiento del desempeño de estudiantes de Bachillerato en Quito**.

El sistema proporciona una interfaz moderna e intuitiva que permite la interacción entre estudiantes, tutores y administradores mediante una arquitectura basada en componentes y comunicación con una API REST.

---
<img width="1300" height="627" alt="image" src="https://github.com/user-attachments/assets/5d0f60cc-4b25-460d-b1de-9581b14c64ae" />


# Características

- Inicio de sesión y autenticación mediante JWT.
- Registro de nuevos usuarios.
- Confirmación de cuentas por correo electrónico.
- Recuperación de contraseña.
- Paneles personalizados según el rol del usuario.
- Gestión de materias, unidades y temas.
- Visualización de recursos académicos.
- Resolución de evaluaciones en línea.
- Consulta de resultados académicos.
- Seguimiento del progreso del estudiante.
- Recomendaciones personalizadas de recursos.
- Solicitud y gestión de tutorías.
- Diseño responsive para diferentes resoluciones de pantalla.

---

# Tecnologías utilizadas

- React
- Vite
- JavaScript (ES Modules)
- React Router DOM
- Axios
- Zustand
- React Hook Form
- Tailwind CSS
- React Toastify
- Lucide React
- KaTeX

---

# Requisitos previos

Antes de ejecutar el proyecto asegúrese de tener instalado:

- Node.js 20 o superior
- npm
- Git

Además, el backend debe encontrarse en ejecución para que la aplicación pueda consumir los servicios REST.

---

# Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/JoAlejo09/Jose-Pila-TIC-Frontend.git
```

## 2. Acceder al proyecto

```bash
cd frontend-refacademy
```

## 3. Instalar dependencias

```bash
npm install
```

## 4. Configurar variables de entorno

Crear un archivo llamado `.env` en la raíz del proyecto.

```env
VITE_API_LOCALHOST=http://localhost:4000/api

VITE_API_URL=https://tic-backend-refacademy.onrender.com
```

> En desarrollo se utiliza `VITE_API_LOCALHOST`.

> En producción se utiliza `VITE_API_URL`.

---

# Ejecutar el proyecto

Modo desarrollo

```bash
npm run dev
```

La aplicación estará disponible en

```
http://localhost:5173
```

---

# Compilar para producción

```bash
npm run build
```

---

# Visualizar compilación

```bash
npm run preview
```

---

# Estructura del proyecto

```
src
│
├── assets
├── components
├── context
├── hooks
├── layouts
├── pages
├── routes
├── services
├── store
├── utils
├── App.jsx
└── main.jsx
```

---

# Roles implementados

El sistema dispone de tres tipos de usuarios:

### Administrador

- Gestión de usuarios
- Gestión de materias
- Gestión de unidades
- Gestión de temas
- Gestión de recursos
- Gestión de evaluaciones
- Gestión de preguntas
- Administración del sistema

### Tutor

- Gestión del perfil
- Administración de tutorías
- Seguimiento de estudiantes

### Estudiante

- Acceso a recursos académicos
- Resolución de evaluaciones
- Consulta de resultados
- Seguimiento del progreso académico
- Recepción de recomendaciones
- Solicitud de tutorías

---

# Arquitectura

El frontend sigue una arquitectura basada en componentes reutilizables utilizando React y consume los servicios proporcionados por una API REST desarrollada con Node.js y Express.

La comunicación entre cliente y servidor se realiza mediante Axios utilizando autenticación basada en JSON Web Tokens (JWT).

---

# Scripts disponibles

Instalar dependencias

```bash
npm install
```

Servidor de desarrollo

```bash
npm run dev
```

Compilar proyecto

```bash
npm run build
```

Vista previa de producción

```bash
npm run preview
```

---

# Backend relacionado

Este frontend requiere el backend del proyecto para funcionar correctamente.

Backend:https://github.com/JoAlejo09/Jose-Pila-TIC-Backend.git

```
https://github.com/
```

---

# Autor

**José Alejandro Pila Vizuete**

Tecnólogo Superior en Desarrollo de Software

Escuela Politécnica Nacional

---

# Licencia

Este proyecto fue desarrollado con fines académicos como Trabajo de Integración Curricular de la Escuela Politécnica Nacional.
