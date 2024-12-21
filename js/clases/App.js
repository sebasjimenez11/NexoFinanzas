import { salirFormulario } from "../funciones/usuario.js";
import { createForm } from "../funciones/formulario.js";
import { getStorages } from "../funciones/storages.js";
import { Finanzas } from "./Finanzas.js";
import { alertOk, alertConfirm, alertError, alertInfo, alertWarning } from "../funciones/alerts.js";
import { createSidebarMenu } from "../funciones/menus.js";

export class App {
  #IdUser;

  constructor() {
    this.#IdUser = parseInt(getStorages("idUser"));
  }
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

  //mostrar formulario de ingresos
  mostrarRegistroIngresos() {
    console.log("Abriendo modal...");
    const formConfig = {
      title: "Registrar Ingreso",
      fields: [
        {
          type: "text",
          name: "descripcion",
          placeholder: "Descripción",
          label: "Descripción",
        },
        { type: "number", name: "monto", placeholder: "Monto", label: "Monto" },
        {
          type: "select",
          name: "categoria",
          options: [
            "Salario",
            "Freelance",
            "Rentas",
            "Inversiones",
            "Otros ingresos",
          ],
          placeholder: "Categoría",
          label: "Categoría",
        },
      ],
      submitText: "Registrar",
    };

    const form = createForm(formConfig, (data) => {
      const finanzas = new Finanzas(this.#IdUser); // Reemplazar con el ID de usuario correcto
      finanzas.setIngreso(
        data.descripcion,
        parseFloat(data.monto),
        data.categoria
      );
      alertOk(
        "Ingreso Registrado",
        "El ingreso ha sido registrado correctamente."
      );
      document.body.removeChild(modalOverlay); // Eliminar el modal después de registrar
      this.actualizarTablaIngresos(); // Actualizar la tabla de ingresos
    });

    // Crear un overlay para el modal
    const modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modal-overlay");

    // Crear el contenedor del formulario
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");

    // Crear botón de cierre (X)
    const closeButton = document.createElement("button");
    closeButton.classList.add("close-button");
    closeButton.innerHTML = "&times;";
    closeButton.addEventListener("click", () => {
      document.body.removeChild(modalOverlay);
    });

    modalContainer.appendChild(closeButton);
    modalContainer.appendChild(form);

    // Agregar el contenedor del formulario al overlay
    modalOverlay.appendChild(modalContainer);

    // Agregar el overlay al body
    document.body.appendChild(modalOverlay);
  }

  //mostrar formulario de egresos
  mostrarRegistroEgresos() {
    const formConfig = {
      title: "Registrar Egreso",
      fields: [
        {
          type: "text",
          name: "descripcion",
          placeholder: "Descripción",
          label: "Descripción",
        },
        { type: "number", name: "monto", placeholder: "Monto", label: "Monto" },
        {
          type: "select",
          name: "categoria",
          options: [
            "Alquiler/Hipoteca",
            "Servicios",
            "Alimentación",
            "Transporte",
            "Educación",
            "Salud",
            "Entretenimiento",
            "Ropa y accesorios",
            "Otros egresos",
          ],
          placeholder: "Categoría",
          label: "Categoría",
        },
      ],
      submitText: "Registrar",
    };

    const form = createForm(formConfig, (data) => {
      const finanzas = new Finanzas(this.#IdUser); // Reemplazar con el ID de usuario correcto
      finanzas.setEgreso(
        data.descripcion,
        parseFloat(data.monto),
        data.categoria
      );
      alertOk(
        "Egreso Registrado",
        "El egreso ha sido registrado correctamente."
      );
      document.body.removeChild(modalOverlay); // Eliminar el modal después de registrar
      this.actualizarTablaEgresos(); // Actualizar la tabla de egresos
    });

    // Crear un overlay para el modal
    const modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modal-overlay");

    // Crear el contenedor del formulario
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");

    // Crear botón de cierre (X)
    const closeButton = document.createElement("button");
    closeButton.classList.add("close-button");
    closeButton.innerHTML = "&times;";
    closeButton.addEventListener("click", () => {
      document.body.removeChild(modalOverlay);
    });

    modalContainer.appendChild(closeButton);
    modalContainer.appendChild(form);

    // Agregar el contenedor del formulario al overlay
    modalOverlay.appendChild(modalContainer);

    // Agregar el overlay al body
    document.body.appendChild(modalOverlay);
  }

  //mostrar formulario de metas
  mostrarRegistroMetas() {
    const formConfig = {
      title: "Registrar Meta Financiera",
      fields: [
        {
          type: "text",
          name: "descripcion",
          placeholder: "Descripción",
          label: "Descripción",
        },
        {
          type: "date",
          name: "fechaLimite",
          placeholder: "Fecha Límite",
          label: "Fecha Límite",
        },
        {
          type: "select",
          name: "objetivo",
          options: [
            "seleccionar Opción",
            "Ahorro",
            "Viajes",
            "Compra de vivienda",
            "Pago de deudas",
            "Fondo de emergencia",
            "Inversión en negocios",
            "Educación futura",
          ],
          label: "Objetivo",
        },
        {
          type: "select",
          name: "prioridad",
          options: ["Alta", "Baja", "Media"],
          label: "Prioridad",
        },
        { type: "number", name: "valor", placeholder: "Valor", label: "Valor" },
      ],
      submitText: "Registrar",
    };

    const form = createForm(formConfig, (data) => {
      const finanzas = new Finanzas(this.#IdUser); // Reemplazar con el ID de usuario correcto
      finanzas.setMeta(
        data.descripcion,
        data.fechaLimite,
        parseFloat(data.valor)
      );
      alertOk("Meta Registrada", "La meta ha sido registrada correctamente.");
      document.body.removeChild(modalOverlay); // Eliminar el modal después de registrar
      this.mostrarMetas(); // Actualizar la vista de metas
    });

    // Crear un overlay para el modal
    const modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modal-overlay");

    // Crear el contenedor del formulario
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");

    // Crear botón de cierre (X)
    const closeButton = document.createElement("button");
    closeButton.classList.add("close-button");
    closeButton.innerHTML = "&times;";
    closeButton.addEventListener("click", () => {
      document.body.removeChild(modalOverlay);
    });

    modalContainer.appendChild(closeButton);
    modalContainer.appendChild(form);

    // Agregar el contenedor del formulario al overlay
    modalOverlay.appendChild(modalContainer);

    // Agregar el overlay al body
    document.body.appendChild(modalOverlay);
  }

  mostrarMetas() {
    const containerApp = document.getElementById("container-app");
    containerApp.innerHTML = ""; // Limpiar contenido previo
    containerApp.appendChild(createSidebarMenu()); // Asegurar que el menú lateral se mantenga visible

    const metasContainer = document.createElement("div");
    metasContainer.classList.add("metas-container");

    const texto = document.createElement("p");
    texto.textContent = "Añadir nueva meta";

    // Crear botón "+"
    const botonAgregar = document.createElement("button");
    botonAgregar.classList.add("btn-agregar");
    botonAgregar.textContent = "+";

    // Agregar evento click al botón "+"
    botonAgregar.addEventListener("click", () => {
      this.mostrarRegistroMetas();
    });

    metasContainer.appendChild(texto);
    metasContainer.appendChild(botonAgregar);
    containerApp.appendChild(metasContainer);

    this.actualizarMetas(metasContainer); // Llamar a la función para mostrar las metas registradas
  }

  actualizarMetas(metasContainer) {
    const finanzas = new Finanzas(this.#IdUser); // Reemplazar con el ID de usuario correcto
    const metas = finanzas.getMetas();
    const colors = [
      "#FFCDD2",
      "#F8BBD0",
      "#E1BEE7",
      "#D1C4E9",
      "#C5CAE9",
      "#BBDEFB",
      "#B3E5FC",
      "#B2EBF2",
      "#B2DFDB",
      "#C8E6C9",
    ];

    // Limpiar solo las metas del contenedor antes de volver a renderizar
    const existingElements = metasContainer.querySelectorAll(".meta");
    existingElements.forEach((element) => element.remove());

    metas.forEach((meta, index) => {
      const metaDiv = document.createElement("div");
      metaDiv.classList.add("meta");
      metaDiv.style.backgroundColor = colors[index % colors.length]; // Asignar un color diferente

      metaDiv.innerHTML = `
        <h3>${meta.descripcion}</h3>
        <p>Fecha Límite: ${meta.fechaLimite}</p>
        <p>Valor: ${meta.valor}</p>
        <p>Progreso: ${meta.progreso || 0}</p>
        <button class="btn-modificar" data-index="${index}">
          <i class="bi bi-pencil-square"></i>
        </button>
        <button class="btn-eliminar" data-index="${index}">
          <i class="bi bi-trash"></i>
        </button>
      `;

      metaDiv.addEventListener("click", () => {
        metaDiv.classList.toggle("meta-selected");
        this.mostrarFormularioMeta(meta, index);
      });

      metasContainer.appendChild(metaDiv);
    });

    // Agregar eventos a los botones de modificar y eliminar
    metasContainer.querySelectorAll(".btn-modificar").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevenir el evento de selección de meta
        const index = e.currentTarget.getAttribute("data-index");
        this.mostrarFormularioModificarMeta(index);
      });
    });

    metasContainer.querySelectorAll(".btn-eliminar").forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevenir el evento de selección de meta
        const index = e.currentTarget.getAttribute("data-index");
        alertConfirm(
          "Eliminar Meta",
          "¿Estás seguro de eliminar esta meta?",
          () => {
            finanzas.eliminarMeta(index);
            this.actualizarMetas(metasContainer);
          }
        );
      });
    });
  }

  mostrarFormularioMeta(meta, index) {
    const formConfig = {
      title: `Añadir a Meta: ${meta.descripcion}`,
      fields: [
        { type: "number", name: "monto", placeholder: "Monto", label: "Monto" },
      ],
      submitText: "Añadir",
    };

    const form = createForm(formConfig, (data) => {
      const finanzas = new Finanzas(this.#IdUser); // Reemplazar con el ID de usuario correcto
      finanzas.addToMeta(index, parseFloat(data.monto));
      alertOk(
        "Progreso Actualizado",
        "El progreso de la meta ha sido actualizado correctamente."
      );
      document.body.removeChild(modalOverlay); // Eliminar el modal después de registrar
      this.mostrarMetas(); // Actualizar la vista de metas
    });

    // Crear un overlay para el modal
    const modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modal-overlay");

    // Crear el contenedor del formulario
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");

    // Crear botón de cierre (X)
    const closeButton = document.createElement("button");
    closeButton.classList.add("close-button");
    closeButton.innerHTML = "&times;";
    closeButton.addEventListener("click", () => {
      document.body.removeChild(modalOverlay);
    });

    modalContainer.appendChild(closeButton);
    modalContainer.appendChild(form);

    // Agregar el contenedor del formulario al overlay
    modalOverlay.appendChild(modalContainer);

    // Agregar el overlay al body
    document.body.appendChild(modalOverlay);
  }

  // mostrar tabla registro de ingresos
  mostrarTablaIngresos() {
    const tablaIngresos = document.createElement("div");
    tablaIngresos.classList.add("tabla-ingresos");

    // Crear contenedor para el título y el botón
    const encabezado = document.createElement("div");
    encabezado.classList.add("tabla-ingresos-encabezado");
    encabezado.innerHTML = `
    <h2 class="tabla-ingresos-titulo">Ingresos del Balance</h2>
  `;

    // Crear botón "+"
    const botonAgregar = document.createElement("button");
    botonAgregar.classList.add("btn-agregar");
    botonAgregar.id = "btn-agregar-ingreso";
    botonAgregar.textContent = "+";

    encabezado.appendChild(botonAgregar);
    tablaIngresos.appendChild(encabezado);

    // Crear tabla
    tablaIngresos.innerHTML += `
    <table>
      <thead>
        <tr>
          <th>Descripción</th>
          <th>Monto</th>
          <th>Categoría</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody id="tabla-ingresos-body">
        <!-- Aquí se agregarán las filas de ingresos -->
      </tbody>
    </table>
  `;

    return tablaIngresos;
  }

  actualizarTablaIngresos() {
    const finanzas = new Finanzas(this.#IdUser); // Reemplazar con el ID de usuario correcto
    const ingresos = finanzas.getIngresos();
    const tbody = document.getElementById("tabla-ingresos-body");
    tbody.innerHTML = ""; // Limpiar contenido previo

    ingresos.forEach((ingreso, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${ingreso.descripcion}</td>
        <td>${ingreso.monto}</td>
        <td>${ingreso.categoria}</td>
        <td>
          <button class="btn-modificar" data-index="${index}">
            <i class="bi bi-pencil-square"></i>
          </button>
          <button class="btn-eliminar" data-index="${index}">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Agregar eventos a los botones de modificar y eliminar
    tbody.querySelectorAll(".btn-modificar").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.currentTarget.getAttribute("data-index");
        this.mostrarFormularioModificarIngreso(index);
      });
    });

    tbody.querySelectorAll(".btn-eliminar").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.currentTarget.getAttribute("data-index");
        alertConfirm(
          "Eliminar Ingreso",
          "¿Estás seguro de eliminar este ingreso?",
          () => {
            finanzas.eliminarIngreso(index);
            this.actualizarTablaIngresos();
          }
        );
      });
    });
  }

mostrarTablaEgresos() {
    const tablaEgresos = document.createElement("div");
    tablaEgresos.classList.add("tabla-ingresos"); // Mismas clases que en la tabla de ingresos

    // Contenedor para el título y el botón
    const encabezado = document.createElement("div");
    encabezado.classList.add("tabla-ingresos-encabezado");
    encabezado.innerHTML = `
    <h2 class="tabla-ingresos-titulo">Ingresos del Balance</h2>
  `;

    // Crear botón "+"
    const botonAgregar = document.createElement("button");
    botonAgregar.classList.add("btn-agregar");
    botonAgregar.id = "btn-agregar-egreso";
    botonAgregar.textContent = "+";

    encabezado.appendChild(botonAgregar);

    // Añadir el header al contenedor principal
    tablaEgresos.appendChild(encabezado);

    // Estructura HTML de la tabla
    tablaEgresos.innerHTML += `
    <table>
      <thead>
        <tr>
          <th>Descripción</th>
          <th>Monto</th>
          <th>Categoría</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody id="tabla-ingresos-body"> 
        <!-- Aquí se llenarán las filas dinámicamente -->
      </tbody>
    </table>
  `;

  return tablaEgresos;
}

actualizarTablaEgresos() {
  const finanzas = new Finanzas(this.#IdUser); // Reemplazar con el ID de usuario correcto
  const egresos = finanzas.getEgresos(); // Obtener los egresos del usuario
  const tbody = document.getElementById("tabla-ingresos-body"); // Usar el mismo ID para el tbody
  tbody.innerHTML = ""; // Limpiar filas previas

  // Iterar por cada egreso y generar filas dinámicamente
  egresos.forEach((egreso, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${egreso.descripcion}</td>
      <td>${egreso.monto}</td>
      <td>${egreso.categoria}</td>
      <td>${egreso.fecha}</td>
      <td>
        <button class="btn-modificar" data-index="${index}">
          <i class="bi bi-pencil-square"></i>
        </button>
        <button class="btn-eliminar" data-index="${index}">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  // Asignar eventos a los botones de modificar y eliminar
  tbody.querySelectorAll(".btn-modificar-ingreso").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.currentTarget.getAttribute("data-index");
      this.mostrarFormularioModificarEgreso(index);
    });
  });
}

  mostrarFormularioModificarIngreso(index) {
    const finanzas = new Finanzas(this.#IdUser); // Reemplazar con el ID de usuario correcto
    const ingreso = finanzas.getIngresos()[parseInt(index)];
    console.log(ingreso);

    const formConfig = {
      title: "Modificar Ingreso",
      fields: [
        {
          type: "text",
          name: "descripcion",
          placeholder: "Descripción",
          label: "Descripción",
          value: ingreso.descripcion,
        },
        {
          type: "number",
          name: "monto",
          placeholder: "Monto",
          label: "Monto",
          value: ingreso.monto,
        },
        {
          type: "text",
          name: "categoria",
          placeholder: "Categoría",
          label: "Categoría",
          value: ingreso.categoria,
        },
      ],
      submitText: "Modificar",
    };

    const form = createForm(formConfig, (data) => {
      finanzas.eliminarIngreso(this.#IdUser);
      finanzas.setIngreso(
        data.descripcion,
        parseFloat(data.monto),
        data.categoria
      );
      alertOk(
        "Ingreso Modificado",
        "El ingreso ha sido modificado correctamente."
      );
      document.body.removeChild(modalOverlay); // Eliminar el modal después de modificar
      this.actualizarTablaIngresos(); // Actualizar la tabla de ingresos
    });

    // Crear un overlay para el modal
    const modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modal-overlay");

    // Crear el contenedor del formulario
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");

    // Crear botón de cierre (X)
    const closeButton = document.createElement("button");
    closeButton.classList.add("close-button");
    closeButton.innerHTML = "&times;";
    closeButton.addEventListener("click", () => {
      document.body.removeChild(modalOverlay);
    });

    modalContainer.appendChild(closeButton);
    modalContainer.appendChild(form);

    // Agregar el contenedor del formulario al overlay
    modalOverlay.appendChild(modalContainer);

    // Agregar el overlay al body
    document.body.appendChild(modalOverlay);
  }

  mostrarFormularioModificarEgreso(index) {
    const finanzas = new Finanzas(this.#IdUser); // Reemplazar con el ID de usuario correcto
    const egreso = finanzas.getEgresos()[index];

    const formConfig = {
      title: "Modificar Egreso",
      fields: [
        {
          type: "text",
          name: "descripcion",
          placeholder: "Descripción",
          label: "Descripción",
          value: egreso.descripcion,
        },
        {
          type: "number",
          name: "monto",
          placeholder: "Monto",
          label: "Monto",
          value: egreso.monto,
        },
        {
          type: "text",
          name: "categoria",
          placeholder: "Categoría",
          label: "Categoría",
          value: egreso.categoria,
        },
      ],
      submitText: "Modificar",
    };

    const form = createForm(formConfig, (data) => {
      finanzas.eliminarEgreso(index);
      finanzas.setEgreso(
        data.descripcion,
        parseFloat(data.monto),
        data.categoria
      );
      alertOk(
        "Egreso Modificado",
        "El egreso ha sido modificado correctamente."
      );
      document.body.removeChild(modalOverlay); // Eliminar el modal después de modificar
      this.actualizarTablaEgresos(); // Actualizar la tabla de egresos
    });

    // Crear un overlay para el modal
    const modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modal-overlay");

    // Crear el contenedor del formulario
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");

    // Crear botón de cierre (X)
    const closeButton = document.createElement("button");
    closeButton.classList.add("close-button");
    closeButton.innerHTML = "&times;";
    closeButton.addEventListener("click", () => {
      document.body.removeChild(modalOverlay);
    });

    modalContainer.appendChild(closeButton);
    modalContainer.appendChild(form);

    // Agregar el contenedor del formulario al overlay
    modalOverlay.appendChild(modalContainer);

    // Agregar el overlay al body
    document.body.appendChild(modalOverlay);
  }

  mostrarFormularioModificarMeta(index) {
    const finanzas = new Finanzas(this.#IdUser); // Reemplazar con el ID de usuario correcto
    const meta = finanzas.getMetas()[index];

    const formConfig = {
      title: "Modificar Meta",
      fields: [
        {
          type: "text",
          name: "descripcion",
          placeholder: "Descripción",
          label: "Descripción",
          value: meta.descripcion,
        },
        {
          type: "date",
          name: "fechaLimite",
          placeholder: "Fecha Límite",
          label: "Fecha Límite",
          value: meta.fechaLimite,
        },
        {
          type: "number",
          name: "valor",
          placeholder: "Valor",
          label: "Valor",
          value: meta.valor,
        },
      ],
      submitText: "Modificar",
    };

    const form = createForm(formConfig, (data) => {
      finanzas.eliminarMeta(index);
      finanzas.setMeta(
        data.descripcion,
        data.fechaLimite,
        parseFloat(data.valor)
      );
      alertOk("Meta Modificada", "La meta ha sido modificada correctamente.");
      document.body.removeChild(modalOverlay); // Eliminar el modal después de modificar
      this.actualizarMetas(document.querySelector(".metas-container")); // Actualizar la vista de metas
    });

    // Crear un overlay para el modal
    const modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modal-overlay");

    // Crear el contenedor del formulario
    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");

    // Crear botón de cierre (X)
    const closeButton = document.createElement("button");
    closeButton.classList.add("close-button");
    closeButton.innerHTML = "&times;";
    closeButton.addEventListener("click", () => {
      document.body.removeChild(modalOverlay);
    });

    modalContainer.appendChild(closeButton);
    modalContainer.appendChild(form);

    // Agregar el contenedor del formulario al overlay
    modalOverlay.appendChild(modalContainer);

    // Agregar el overlay al body
    document.body.appendChild(modalOverlay);
  }
}
