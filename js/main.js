import { GeminiAPI } from "./clases/GeminiAi.js";
import {
  alertConfirm,
  alertError,
  alertInfo,
  alertOk,
  alertWarning,
} from "./funciones/alerts.js";
import { createHorizontalMenu, createSidebarMenu } from "./funciones/menus.js";
import { getStorages, removeStorages } from "./funciones/storages.js";
import { App } from "./clases/App.js";
import { mostrarDashboard } from "./funciones/dasboard.js";

const containerApp = document.getElementById("container-app");

const app = new App();

document.addEventListener("DOMContentLoaded", () => {
  if (getStorages("idUser")) {
    mostrarDashboard();
  } else {
    containerApp.innerHTML = "";
    containerApp.appendChild(createHorizontalMenu());
    containerApp.appendChild(app.mostrarInicio());
  }
});

