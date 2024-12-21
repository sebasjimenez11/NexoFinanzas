import { App } from "../clases/App.js";
import { createSidebarMenu } from "./menus.js";

const contenedorAPP = document.getElementById("container-app");

// Función para limpiar y recrear el dashboard
function limpiarYCrearDashboard() {
  const app = new App();
  // Buscar si existe un dashboard previo y eliminarlo
  const dashboardExistente = document.querySelector(".dashboard-content");
  if (dashboardExistente) {
    contenedorAPP.removeChild(dashboardExistente);
  }

  // Crear un nuevo dashboard y devolverlo
  const nuevoDashboard = document.createElement("div");
  nuevoDashboard.classList.add("dashboard-content");
  return nuevoDashboard;
}

function mostrarDashboard() {
  const app = new App();
  const dashboard = limpiarYCrearDashboard();
  contenedorAPP.innerHTML = "";
  contenedorAPP.appendChild(createSidebarMenu());
  dashboard.appendChild(app.mostrarDashboard());
  contenedorAPP.appendChild(dashboard);
  app.mostrarGraficos();
}

function mostrarEgresos() {
  const app = new App();
  const dashboard = limpiarYCrearDashboard();
  contenedorAPP.innerHTML = "";
  contenedorAPP.appendChild(createSidebarMenu());
  dashboard.appendChild(app.mostrarTablaEgresos());
  contenedorAPP.appendChild(dashboard);
  app.actualizarTablaEgresos();

  document
    .getElementById("btn-agregar-egreso")
    .addEventListener("click", () => {
      app.mostrarRegistroEgresos();
    });
}

function mostrarIngresos() {
  const app = new App();
  const dashboard = limpiarYCrearDashboard();
  contenedorAPP.innerHTML = "";
  contenedorAPP.appendChild(createSidebarMenu());
  dashboard.appendChild(app.mostrarTablaIngresos());
  contenedorAPP.appendChild(dashboard);
  app.actualizarTablaIngresos();

  document
    .getElementById("btn-agregar-ingreso")
    .addEventListener("click", () => {
      app.mostrarRegistroIngresos();
    });
}

function mostrarMetas() {
  const app = new App();
  const dashboard = limpiarYCrearDashboard();
  contenedorAPP.innerHTML = "";
  contenedorAPP.appendChild(createSidebarMenu());
  dashboard.appendChild(app.mostrarMetas());
  contenedorAPP.appendChild(dashboard);
}

export { mostrarDashboard, mostrarEgresos, mostrarIngresos, mostrarMetas };
