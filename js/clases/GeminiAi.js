import { alertError } from "../funciones/alerts.js";

export class GeminiAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
  }

  // Mostrar ventana de carga
  mostrarCargando() {
    const loadingOverlay = document.createElement("div");
    loadingOverlay.id = "loading-overlay";
    loadingOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
    `;

    const loadingSpinner = document.createElement("div");
    loadingSpinner.style.cssText = `
      width: 50px;
      height: 50px;
      border: 5px solid #ccc;
      border-top: 5px solid #007bff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    `;

    loadingOverlay.appendChild(loadingSpinner);
    document.body.appendChild(loadingOverlay);

    // Agregar animación CSS
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Ocultar ventana de carga
  ocultarCargando() {
    const loadingOverlay = document.getElementById("loading-overlay");
    if (loadingOverlay) {
      document.body.removeChild(loadingOverlay);
    }
  }

  // Método para llamar a la API de Gemini
  async llamarGemini(prompt) {
    const url = `${this.baseUrl}?key=${this.apiKey}`;

    try {
      this.mostrarCargando(); // Mostrar ventana de carga

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      const textoGenerado = data.candidates[0].content.parts[0].text;

      console.log(textoGenerado);
      return textoGenerado;
    } catch (error) {
      console.error("Error al llamar a la API de Gemini:", error);
      throw error;
    } finally {
      this.ocultarCargando(); // Ocultar ventana de carga al terminar
    }
  }

  // Método genérico para transformar JSON a HTML dinámicamente
  transformarJSONaHTML(data) {
    let html = `<h2>${data.titulo || "Informe Financiero"}</h2>`;

    // Loop through each property of the data object to generate HTML
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        html += `<h3>${key}</h3><ul>`;
        data[key].forEach((item) => {
          html += `<li>${
            typeof item === "object" ? this.transformarJSONaHTML(item) : item
          }</li>`;
        });
        html += `</ul>`;
      } else if (typeof data[key] === "object") {
        html += `<h3>${key}</h3>${this.transformarJSONaHTML(data[key])}`;
      } else {
        html += `<p><strong>${key}:</strong> ${data[key]}</p>`;
      }
    });

    return html;
  }

  // Método para mostrar el contenido en un modal
  mostrarResultadoIA(htmlContenido) {
    const modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modal-overlay");

    const modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");

    const closeButton = document.createElement("button");
    closeButton.classList.add("close-button");
    closeButton.innerHTML = "&times;";
    closeButton.addEventListener("click", () => {
      document.body.removeChild(modalOverlay);
    });

    const contenidoIA = document.createElement("div");
    contenidoIA.classList.add("contenido-ia");
    contenidoIA.innerHTML = htmlContenido;

    modalContainer.appendChild(closeButton);
    modalContainer.appendChild(contenidoIA);
    modalOverlay.appendChild(modalContainer);
    document.body.appendChild(modalOverlay);
  }

  // Método principal para generar el informe y mostrar el modal
  async generarInformeFinanciero(prompt) {
    try {
      const contenidoGenerado = await this.llamarGemini(prompt);

      // Eliminar posibles bloques de código del contenido generado
      const contenidoLimpio = contenidoGenerado
        .replace(/```json|```/g, "")
        .trim();

      // Suponiendo que el contenido devuelto es JSON, transformarlo en HTML
      let jsonResponse;
      try {
        jsonResponse = JSON.parse(contenidoLimpio);
        const htmlContenido = this.transformarJSONaHTML(jsonResponse);
        this.mostrarResultadoIA(htmlContenido);
      } catch (error) {
        console.error("Error al parsear JSON:", error);
        alertError("Hubo un error al procesar la respuesta del servidor.");
      }
    } catch (error) {
      console.error("Error al generar el informe:", error);
      alertError(
        "Hubo un error al generar el informe. Por favor, intenta nuevamente."
      );
    }
  }
}
