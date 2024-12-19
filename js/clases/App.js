import { salirFormulario } from "../funciones/usuario.js";

export class App {
  mostrarInicio() {
    const div = document.createElement("div");

    div.innerHTML = `
        <div class="banner-principal">
            <div class="text">
                <h1>!Bienvenido¡</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum, optio voluptatem nobis dignissimos incidunt consectetur similique ullam explicabo velit enim, ab deleniti quam cum magni, odit vitae ipsam. Laudantium, quos.</p>
            </div>
            <img src="./images/logo.png" alt="">
        </div>
        `;

    return div;
  }

  mostrarDashboard() {
    const div = document.createElement("div");

    div.innerHTML = `
        <div class="dashboard">
            <div class="card">
                <img src="./images/icono-caja.png" alt="">
                <h2>Caja</h2>
                <p>$0</p>
            </div>
            <div class="card">
                <img src="./images/icono-gasto.png" alt="">
                <h2>Gasto</h2>
                <p>$0</p>
            </div>
            <div class="card">
                <img src="./images/icono-balance.png" alt="">
                <h2>Balance</h2>
                <p>$0</p>
            </div>
        </div>
        `;
    return div;
  }

  mostrarRegistroLogin(form) {
    const contenedor = document.createElement("div");
    const contenedorBtnSalir = document.createElement("div");

    contenedorBtnSalir.classList = "conatainer-btn-salir";

    // Crear botón de salir con icono y texto
    const button = document.createElement("button");
    button.classList = "btn-salir";
    button.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M6.364 11.854a.5.5 0 0 1-.708-.708L9.293 7.5H1.5a.5.5 0 0 1 0-1h7.793L5.657 3.854a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4z"/>
      <path fill-rule="evenodd" d="M13.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"/>
    </svg>
    Salir
  `;

    button.addEventListener("click", () => {
      salirFormulario();
    });

    contenedorBtnSalir.appendChild(button);
    contenedor.id = "contenedor-login-register";
    contenedor.appendChild(form);
    contenedor.appendChild(contenedorBtnSalir);

    return contenedor;
  }
}
