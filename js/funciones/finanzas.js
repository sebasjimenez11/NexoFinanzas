import { App } from "../clases/App.js";
import { createSidebarMenu } from "./menus.js";

const contenedorAPP = document.getElementById("container-app");
const dashboard = document.createElement("div");
dashboard.classList.add("dashboard-content");

const app = new App();


function mostrarDashboard() {
    contenedorAPP.innerHTML = "";
    contenedorAPP.appendChild(createSidebarMenu());
    const dashboard = document.createElement("div");
    dashboard.classList.add("dashboard-content");
    dashboard.appendChild(app.mostrarDashboard());
    contenedorAPP.appendChild(dashboard);
}

function mostrarEgresos(){
    contenedorAPP.innerHTML = "";
    contenedorAPP.appendChild(createSidebarMenu());

    const header = document.createElement("h2");
    header.innerText = "Egresos";

    
    
}


function mostrarIngresos(){

}

function mostrarMetas() {

}


export { mostrarDashboard, mostrarEgresos, mostrarIngresos, mostrarMetas };