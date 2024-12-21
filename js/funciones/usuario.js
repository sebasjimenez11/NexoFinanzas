import { User } from "../clases/User.js";
import { alertOk, alertError, alertConfirm } from "./alerts.js";
import {
  getStorages,
  setStorages,
  getAllStorages,
  removeStorages,
} from "./storages.js";
import { createForm } from "./formulario.js";
import { App } from "../clases/App.js";
import { createHorizontalMenu, createSidebarMenu } from "./menus.js";
import { mostrarDashboard } from "./dasboard.js";
// const continerForm = document.getElementById("contenedor-login-register");
const containerApp = document.getElementById("container-app");
const app = new App();
export function registroUser(data) {
  const users = getStorages("usuarios") || {};
  const user = new User();

  // Crear una nueva instancia de User

  // Asignar los valores del formulario al usuario
  user.Nombre = data.nombre;
  user.Apellido = data.apellido;
  user.Email = data.correo;
  user.Contrasena = data.password;

  // Obtener la información del usuario
  const userInfo = user.getUserInfo(); // Este devuelve un objeto con el userId como clave

  // Guardar el usuario en el objeto de usuarios
  users[user.Id] = userInfo[user.Id];

  // Actualizar el almacenamiento con el objeto de usuarios
  setStorages("usuarios", users);

  // Mostrar mensaje de éxito
  alertOk("Registro Exitoso", "Usuario registrado correctamente.");
  salirFormulario();
}

export function iniciarSesion(data) {
  const users = getStorages("usuarios") || {};

  // Iterar sobre las entradas [id, datos] del objeto `users`
  const userEntry = Object.entries(users).find(
    ([id, user]) =>
      user.email === data.correo && user.contrasena === data.password
  );

  if (userEntry) {
    const [id, user] = userEntry; // Extraer id y datos del usuario
    alertOk("Login Exitoso", "Bienvenido al Sistema.");
    setStorages("idUser", id); // Guardar el id del usuario
    mostrarDashboard();
    setTimeout(() => {
      alertInfo(
        "Sesión Expirada",
        "Su sesión ha expirado. Por favor inicie sesión nuevamente."
      );
      removeStorages("idUser");
      containerApp.innerHTML = "";
      containerApp.appendChild(createHorizontalMenu());
    }, 300000);
  } else {
    alertError(
      "Error de Login",
      "Correo electrónico o contraseña incorrectos."
    );
  }
}

export function mostrarRegistro() {
  containerApp.innerHTML = "";
  const formConfig = {
    title: "Registro",
    fields: [
      {
        type: "text",
        name: "nombre",
        placeholder: "Nombre",
        label: "Nombre",
        required: true,
      },
      {
        type: "text",
        name: "apellido",
        placeholder: "Apellido",
        label: "Apellido",
        required: true,
      },
      {
        type: "email",
        name: "correo",
        placeholder: "Correo",
        label: "Correo",
        required: true,
      },
      {
        type: "password",
        name: "password",
        placeholder: "Contraseña",
        label: "Contraseña",
        required: true,
      },
    ],
    submitText: "Registro",
  };

  const form = createForm(formConfig, (data) => registroUser(data));

  const div = app.mostrarRegistroLogin(form);
  containerApp.appendChild(div);
}

export function mostrarInicioSesion() {
  containerApp.innerHTML = "";
  const formConfig = {
    title: "Inicio de Sesión",
    fields: [
      {
        type: "email",
        name: "correo",
        placeholder: "Correo",
        label: "Correo",
        required: true,
      },
      {
        type: "password",
        name: "password",
        placeholder: "Contraseña",
        label: "Contraseña",
        required: true,
      },
    ],
    submitText: "Iniciar de Sesión",
  };

  const form = createForm(formConfig, (data) => iniciarSesion(data));
  const div = app.mostrarRegistroLogin(form);

  containerApp.appendChild(div);
}

export function CerrarSesion() {
  alertConfirm("Cerrar Sesión", "¿Estás seguro de cerrar sesión?", () => {
    removeStorages("idUser");
    alertOk("Cierre de Sesión", "Sesión cerrada correctamente.");
    salirFormulario();
  });
}

export function salirFormulario() {
  containerApp.innerHTML = "";
  containerApp.appendChild(createHorizontalMenu());
  containerApp.appendChild(app.mostrarInicio());
}
