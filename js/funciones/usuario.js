import { User } from "../clases/User.js";
import { alertOk, alertError } from "./alerts.js";
import { getStorages, setStorages, getAllStorages } from "./storages.js";
import { createForm } from "./formulario.js";
import { App } from "../clases/App.js";
import { createHorizontalMenu } from "./menus.js";
// const continerForm = document.getElementById("contenedor-login-register");
const containerApp = document.getElementById("container-app");
const app = new App();
export function registroUser(data) {
  const users = getStorages("usuarios") || {};

  // Crear una nueva instancia de User
  const user = new User();

  // Asignar los valores del formulario al usuario
  user.Nombre = data.nombre;
  user.Apellido = data.apellido;
  user.Email = data.correo;
  user.Contrasena = data.contrasena;

  // Obtener la información del usuario
  const userInfo = user.getUserInfo(); // Este devuelve un objeto con el userId como clave

  // Agregar el nuevo usuario al objeto de usuarios
  const userId = Object.keys(userInfo)[0]; // Obtener el userId del objeto

  // Guardar el usuario en el objeto de usuarios
  users[userId] = userInfo[userId];

  // Actualizar el almacenamiento con el objeto de usuarios
  setStorages("usuarios", users);

  // Mostrar mensaje de éxito
  alertOk("Registro Exitoso", "Usuario registrado correctamente.");
}

export function iniciarSesion(data) {
  const users = getStorages("usuarios") || {};

  const user = Object.values(users).find(
    (u) => u.email === data.correo && u.contrasena === data.password
  );

  if (user) {
    alertOk("Login Exitoso", "Bienvenido al Sistema.");
    setStorages("idUser", user.id);
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
      { type: "text", name: "nombre", placeholder: "Nombre", label: "Nombre" },
      {
        type: "text",
        name: "apellido",
        placeholder: "Apellido",
        label: "Apellido",
      },
      { type: "email", name: "correo", placeholder: "Correo", label: "Correo" },
      {
        type: "password",
        name: "password",
        placeholder: "Contraseña",
        label: "Contraseña",
      },
    ],
    submitText: "Registro",
  };

  // Crear el formulario y agregarlo al body
  const form = createForm(formConfig, (data) => registroUser(data));

  const div = app.mostrarRegistroLogin(form);
  containerApp.appendChild(div)
  //   continerForm.appendChild(form);
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
      },
      {
        type: "password",
        name: "password",
        placeholder: "Contraseña",
        label: "Contraseña",
      },
    ],
    submitText: "Iniciar de Sesión",
  };

  const form = createForm(formConfig, (data) => iniciarSesion(data));
  const div = app.mostrarRegistroLogin(form);

  containerApp.appendChild(div);
  //   continerForm.appendChild(form);
}
export function salirFormulario(){
    containerApp.innerHTML = "";
    containerApp.appendChild(createHorizontalMenu());
    containerApp.appendChild(app.mostrarInicio());
};

// continerForm.appendChild();
