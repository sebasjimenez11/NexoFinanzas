import { CerrarSesion, mostrarInicioSesion, mostrarRegistro } from "./usuario.js";
import { App } from "../clases/App.js";
import { getStorages } from "./storages.js";

export function createHorizontalMenu() {
  const menuContainer = document.createElement("nav");
  menuContainer.classList.add("menu-horizontal");

  // Logo
  const logoDiv = document.createElement("div");
  logoDiv.classList.add("logo");

  const logoImg = document.createElement("img");
  logoImg.src = "../../images/logo.png";
  logoImg.alt = "Logo NexoFinanzas";

  const logoText = document.createElement("p");
  logoText.textContent = "NexoFinanzas";

  logoDiv.appendChild(logoImg);
  logoDiv.appendChild(logoText);

  // Lista de botones
  const ul = document.createElement("ul");

  const menuItems = [
    { text: "Registro", onClick: () => mostrarRegistro() },
    {
      text: "Iniciar Sesión",
      onClick: () => mostrarInicioSesion(),
    },
  ];

  menuItems.forEach((item) => {
    const li = document.createElement("li");
    const button = document.createElement("button");

    button.textContent = item.text;
    button.classList.add("btn");

    // Agregar evento onClick
    button.addEventListener("click", item.onClick);

    li.appendChild(button);
    ul.appendChild(li);
  });

  menuContainer.appendChild(logoDiv);
  menuContainer.appendChild(ul);

  return menuContainer
}



// Menú lateral
export function createSidebarMenu() {
  const menuLateral = document.createElement("nav");
  menuLateral.classList.add("menu-lateral");

  // Logo
  const logoDiv = document.createElement("div");
  logoDiv.classList.add("logo");

  const logoImg = document.createElement("img");
  logoImg.src = "../../images/logo.png";
  logoImg.alt = "Logo NexoFinanzas";

  const logoText = document.createElement("p");
  logoText.textContent = "NexoFinanzas";

  logoDiv.appendChild(logoImg);
  logoDiv.appendChild(logoText);

  // Obtener el nombre del usuario
  const userId = getStorages("idUser");
  const users = getStorages("usuarios") || {};
  const userName = users[userId]?.nombre || "Usuario";

  const welcomeText = document.createElement("p");
  welcomeText.textContent = `Bienvenido ${userName}`;
  welcomeText.classList.add("welcome-text");

  logoDiv.appendChild(welcomeText);

  // Lista de opciones
  const ul = document.createElement("ul");
  ul.classList.add("menu-items");

  // Definición de elementos del menú con sus callbacks
  const menuItems = [
    { 
      text: "Resumen", 
      icon: "bi bi-speedometer2", 
      callback: () => console.log("Navegando a Resumen")
    },
    { 
      text: "Registro Ingresos", 
      icon: "bi bi-cash-coin", 
      callback: () => {
        const app = new App();
       app.mostrarTablaIngresos();
      
      }
    },
    { 
      text: "Registro Egresos", 
      icon: "bi bi-credit-card", 
      callback: () => {
        const app = new App();
        app.mostrarTablaEgresos();
      }
    },
    { 
      text: "Metas Financieras", 
      icon: "bi bi-flag", 
      callback: () => {
        const app = new App();
        app.mostrarMetas();
      }
    },
  ];

  menuItems.forEach((item) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";

    const icon = document.createElement("i");
    icon.className = item.icon;

    const text = document.createTextNode(item.text);

    link.appendChild(icon);
    link.appendChild(text);

    // Agregar evento click con el callback
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Prevenir comportamiento por defecto del enlace
      item.callback();    // Ejecutar el callback asociado al elemento
    });

    li.appendChild(link);
    ul.appendChild(li);
  });

  // Botón de "Salir"
  const logoutLink = document.createElement("a");
  logoutLink.href = "#";
  logoutLink.classList.add("logout");

  const logoutIcon = document.createElement("i");
  logoutIcon.className = "bi bi-box-arrow-left";

  const logoutText = document.createTextNode(" Cerrar Sesión");

  logoutLink.appendChild(logoutIcon);
  logoutLink.appendChild(logoutText);

  // Agregar evento click al botón "Cerrar Sesión"
  logoutLink.addEventListener("click", (e) => {
    e.preventDefault();
    CerrarSesion();
    // Aquí puedes agregar la lógica para cerrar sesión
  });

  const logoutLi = document.createElement("li");
  logoutLi.classList.add("logout-container");
  logoutLi.appendChild(logoutLink);

  ul.appendChild(logoutLi);

  // Ensamblar menú lateral
  menuLateral.appendChild(logoDiv);
  menuLateral.appendChild(ul);
  return menuLateral;
}
