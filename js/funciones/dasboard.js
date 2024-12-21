import { App } from "../clases/App.js";
import { createSidebarMenu } from "./menus.js";

const contenedorAPP = document.getElementById("container-app");
const dashboard = document.createElement("div");
dashboard.classList.add("dashboard-content");

const app = new App();

function mostrarDashboard() {
  contenedorAPP.innerHTML = "";
  (dashboard.innerHTML = ""), contenedorAPP.appendChild(createSidebarMenu());
  dashboard.appendChild(app.mostrarDashboard());
  contenedorAPP.appendChild(dashboard);
}

function mostrarEgresos() {
   contenedorAPP.innerHTML = "";
   (dashboard.innerHTML = ""), contenedorAPP.appendChild(createSidebarMenu());
   console.log(app.mostrarTablaIngresos());
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
  contenedorAPP.innerHTML = "";
  (dashboard.innerHTML = ""), contenedorAPP.appendChild(createSidebarMenu());
  console.log(app.mostrarTablaIngresos());
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
  contenedorAPP.innerHTML = "";
  contenedorAPP.appendChild(createSidebarMenu());

  dashboard.appendChild(app.mostrarMetas());
  contenedorAPP.appendChild(dashboard);
}

export { mostrarDashboard, mostrarEgresos, mostrarIngresos, mostrarMetas };
