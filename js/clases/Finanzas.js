import { getStorages, setStorages } from "../funciones/storages.js";
import {
  alertError,
  alertConfirm,
  alertOk,
  alertWarning,
  alertInfo,
} from "../funciones/alerts.js";

export class Finanzas {
  #IdUser;
  metas = {}; // Cambiado a pública
  ingresos = {}; // Cambiado a pública
  egresos = {}; // Cambiado a pública
  totalIngresos = 0;
  totalEgresos = 0;
  totalBalance = 0;

  constructor(idUser) {
    this.#IdUser = idUser;
    this.loadData(); // Cargar datos si existen en el storage
  }

  // Método para cargar los datos desde localStorage
  loadData() {
    const storedData = getStorages(`finanzas-${this.#IdUser}`);
    try {
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        this.ingresos = parsedData.ingresos || {};
        this.egresos = parsedData.egresos || {};
        this.metas = parsedData.metas || {};
        this.totalIngresos = parsedData.totalIngresos || 0;
        this.totalEgresos = parsedData.totalEgresos || 0;
        this.totalBalance = parsedData.totalBalance || 0;
      } else {
        // Si no existe el usuario en el localStorage, inicializamos con valores predeterminados
        this.ingresos[this.#IdUser] = [];
        this.egresos[this.#IdUser] = [];
        this.metas[this.#IdUser] = [];
        this.totalIngresos = 0;
        this.totalEgresos = 0;
        this.totalBalance = 0;
      }
    } catch (error) {
      console.error("Error parsing stored data:", error);
      // Inicializar con valores predeterminados en caso de error
      this.ingresos[this.#IdUser] = [];
      this.egresos[this.#IdUser] = [];
      this.metas[this.#IdUser] = [];
      this.totalIngresos = 0;
      this.totalEgresos = 0;
      this.totalBalance = 0;
    }
  }

  // Método para guardar los datos en localStorage
  saveData() {
    const dataToSave = {
      ingresos: this.ingresos,
      egresos: this.egresos,
      metas: this.metas,
      totalIngresos: this.totalIngresos,
      totalEgresos: this.totalEgresos,
      totalBalance: this.totalBalance,
    };
    setStorages(`finanzas-${this.#IdUser}`, JSON.stringify(dataToSave));
  }

  // Registrar un ingreso
  setIngreso(descripcion, monto, categoria, fecha) {
    if (isNaN(monto) || monto <= 0) {
      alertError(
        "Monto Invalido.",
        "Ingrese un Monto numérico mayor que cero."
      );
      return;
    }
    this.ingresos[this.#IdUser] = this.ingresos[this.#IdUser] || [];
    this.ingresos[this.#IdUser].push({ descripcion, monto, categoria, fecha });
    this.totalIngresos += monto;
    this.actualizarBalance();
    this.saveData(); // Guardar después de actualizar
  }

  // Registrar un egreso
  setEgreso(descripcion, monto, categoria, fecha) {
    if (isNaN(monto) || monto <= 0) {
      alertError(
        "Monto Invalido.",
        "Ingrese un Monto numérico mayor que cero."
      );
      return;
    }
    this.egresos[this.#IdUser] = this.egresos[this.#IdUser] || [];
    this.egresos[this.#IdUser].push({ descripcion, monto, categoria, fecha });
    this.totalEgresos += monto;
    this.actualizarBalance();
    this.saveData(); // Guardar después de actualizar
  }

  // Registrar una meta
  setMeta(descripcion, fechaLimite, valor, objetivo) {
    this.metas[this.#IdUser] = this.metas[this.#IdUser] || [];
    this.metas[this.#IdUser].push({
      descripcion,
      fechaLimite,
      valor,
      objetivo,
      progreso: 0,
    });
    this.saveData(); // Guardar después de actualizar
  }

  // Añadir progreso a una meta
  addToMeta(index, monto) {
    this.metas[this.#IdUser][index].progreso += monto;
    this.saveData(); // Guardar después de actualizar
  }

  // Eliminar un ingreso
  eliminarIngreso(index) {
    console.log("ingresos ", this.ingresos[this.#IdUser][0]);

    console.log("total ", this.totalIngresos);
    this.totalIngresos -= this.ingresos[this.#IdUser][0].monto;
    this.ingresos[this.#IdUser].splice(index, 1);
    console.log("ingresos depsues", this.ingresos[this.#IdUser][0]);
    this.actualizarBalance();
    this.saveData(); // Guardar después de actualizar
  }

  // Eliminar un egreso
  eliminarEgreso(index) {
    this.totalEgresos -= this.egresos[this.#IdUser][index].monto;
    this.egresos[this.#IdUser].splice(index, 1);
    this.actualizarBalance();
    this.saveData(); // Guardar después de actualizar
  }

  // Eliminar una meta
  eliminarMeta(index) {
    this.metas[this.#IdUser].splice(index, 1);
    this.saveData(); // Guardar después de actualizar
  }

  // Obtener las metas registradas
  getMetas() {
    return this.metas[this.#IdUser] || [];
  }

  // Actualizar el balance total (ingresos - egresos)
  actualizarBalance() {
    this.totalBalance = this.totalIngresos - this.totalEgresos;
  }

  // Obtener los ingresos registrados
  getIngresos() {
    return this.ingresos[this.#IdUser] || [];
  }

  // Obtener los egresos registrados
  getEgresos() {
    return this.egresos[this.#IdUser] || [];
  }

  // Generar un reporte con los datos actuales
  generarReporte() {
    return {
      ingresos: this.totalIngresos,
      egresos: this.totalEgresos,
      balance: this.totalBalance,
      metasCumplidas: this.metas[this.#IdUser]?.filter((meta) => meta.cumplida),
      metasEnProceso: this.metas[this.#IdUser]?.filter(
        (meta) => meta.fechaLimite
      ),
    };
  }

  // Actualizar una meta existente
  updateMeta(index, descripcion, fechaLimite, valor, progreso) {
    if (!this.metas[this.#IdUser] || !this.metas[this.#IdUser][index]) {
      alertError(
        "Meta no encontrada.",
        "No se pudo actualizar la meta especificada."
      );
      return;
    }

    this.metas[this.#IdUser][index] = {
      descripcion: descripcion || this.metas[this.#IdUser][index].descripcion,
      fechaLimite: fechaLimite || this.metas[this.#IdUser][index].fechaLimite,
      valor: valor || this.metas[this.#IdUser][index].valor,
      progreso: progreso || this.metas[this.#IdUser][index].progreso,
    };

    this.saveData();
  }

  // Actualizar un ingreso existente
  updateIngreso(index, descripcion, monto, categoria, fecha) {
    if (!this.ingresos[this.#IdUser] || !this.ingresos[this.#IdUser][index]) {
      alertError(
        "Ingreso no encontrado.",
        "No se pudo actualizar el ingreso especificado."
      );
      return;
    }

    // Actualizar totales restando el monto anterior y sumando el nuevo
    this.totalIngresos -= this.ingresos[this.#IdUser][index].monto;
    this.totalIngresos += monto || this.ingresos[this.#IdUser][index].monto;

    this.ingresos[this.#IdUser][index] = {
      descripcion:
        descripcion || this.ingresos[this.#IdUser][index].descripcion,
      monto: monto || this.ingresos[this.#IdUser][index].monto,
      categoria: categoria || this.ingresos[this.#IdUser][index].categoria,
      fecha: fecha || this.ingresos[this.#IdUser][index].fecha,
    };

    this.actualizarBalance(); // Actualizar balance
    this.saveData(); // Guardar cambios
  }

  // Actualizar un egreso existente
  updateEgreso(index, descripcion, monto, categoria, fecha) {
    if (!this.egresos[this.#IdUser] || !this.egresos[this.#IdUser][index]) {
      alertError(
        "Egreso no encontrado.",
        "No se pudo actualizar el egreso especificado."
      );
      return;
    }

    // Actualizar totales restando el monto anterior y sumando el nuevo
    this.totalEgresos -= this.egresos[this.#IdUser][index].monto;
    this.totalEgresos += monto || this.egresos[this.#IdUser][index].monto;

    this.egresos[this.#IdUser][index] = {
      descripcion: descripcion || this.egresos[this.#IdUser][index].descripcion,
      monto: monto || this.egresos[this.#IdUser][index].monto,
      categoria: categoria || this.egresos[this.#IdUser][index].categoria,
      fecha: fecha || this.egresos[this.#IdUser][index].fecha,
    };

    this.actualizarBalance(); // Actualizar balance
    this.saveData(); // Guardar cambios
  }

  // Guardar y obtener todos los datos de finanzas
  obtenerDatos() {
    return {
      [this.#IdUser]: {
        ingresos: this.ingresos[this.#IdUser] || [],
        egresos: this.egresos[this.#IdUser] || [],
        metas: this.metas[this.#IdUser] || [],
        totalIngresos: this.totalIngresos,
        totalEgresos: this.totalEgresos,
        totalBalance: this.totalBalance,
      },
    };
  }

  // Generar prompt detallado para análisis financiero con IA
  generarPromptDetalladoIA() {
    const ingresos = this.ingresos[this.#IdUser] || [];
    const egresos = this.egresos[this.#IdUser] || [];
    const metas = this.metas[this.#IdUser] || [];

    const categoriasIngresos = ingresos.reduce((acc, ingreso) => {
      acc[ingreso.categoria] = (acc[ingreso.categoria] || 0) + ingreso.monto;
      return acc;
    }, {});

    const categoriasEgresos = egresos.reduce((acc, egreso) => {
      acc[egreso.categoria] = (acc[egreso.categoria] || 0) + egreso.monto;
      return acc;
    }, {});

    const resumenIngresos = ingresos
      .map(
        (ingreso, index) =>
          `${index + 1}. Descripción: ${ingreso.descripcion}, Monto: ${
            ingreso.monto
          }, Categoría: ${ingreso.categoria}, Fecha: ${ingreso.fecha}`
      )
      .join("\n");
    const resumenEgresos = egresos
      .map(
        (egreso, index) =>
          `${index + 1}. Descripción: ${egreso.descripcion}, Monto: ${
            egreso.monto
          }, Categoría: ${egreso.categoria}, Fecha: ${egreso.fecha}`
      )
      .join("\n");
    const resumenMetas = metas
      .map(
        (meta, index) =>
          `${index + 1}. Descripción: ${meta.descripcion}, Valor: ${
            meta.valor
          }, Fecha Límite: ${meta.fechaLimite}, Progreso: ${meta.progreso} de ${
            meta.valor
          } (${((meta.progreso / meta.valor) * 100).toFixed(2) || 0}%)`
      )
      .join("\n");

    const resumenCategoriasIngresos = Object.entries(categoriasIngresos)
      .map(([categoria, total]) => `- ${categoria}: ${total}`)
      .join("\n");
    const resumenCategoriasEgresos = Object.entries(categoriasEgresos)
      .map(([categoria, total]) => `- ${categoria}: ${total}`)
      .join("\n");

    const prompt = `
Usa los siguientes datos financieros del usuario para generar un informe detallado en formato JSON. Asegúrate de incluir los campos principales que permitan un análisis estructurado.

### Datos Financieros:
{
  "resumenGeneral": {
    "totalIngresos": ${this.totalIngresos},
    "totalEgresos": ${this.totalEgresos},
    "balanceActual": ${this.totalBalance}
  },
  "ingresos": [
    ${ingresos
      .map(
        (ingreso) => `{
        "descripcion": "${ingreso.descripcion}",
        "monto": ${ingreso.monto},
        "categoria": "${ingreso.categoria}",
        "fecha": "${ingreso.fecha}"
      }`
      )
      .join(",")}
  ],
  "egresos": [
    ${egresos
      .map(
        (egreso) => `{
        "descripcion": "${egreso.descripcion}",
        "monto": ${egreso.monto},
        "categoria": "${egreso.categoria}",
        "fecha": "${egreso.fecha}"
      }`
      )
      .join(",")}
  ],
  "metas": [
    ${metas
      .map(
        (meta) => `{
        "descripcion": "${meta.descripcion}",
        "valor": ${meta.valor},
        "fechaLimite": "${meta.fechaLimite}",
        "progreso": ${meta.progreso},
        "porcentajeProgreso": ${
          ((meta.progreso / meta.valor) * 100).toFixed(2) || 0
        }
      }`
      )
      .join(",")}
  ],
  "categorias": {
    "ingresosPorCategoria": {
      ${Object.entries(categoriasIngresos)
        .map(([categoria, total]) => `"${categoria}": ${total}`)
        .join(",")}
    },
    "egresosPorCategoria": {
      ${Object.entries(categoriasEgresos)
        .map(([categoria, total]) => `"${categoria}": ${total}`)
        .join(",")}
    }
  }
}

### Objetivo del Informe:
1. Proporcionar observaciones detalladas sobre patrones de ingresos y egresos.
2. Generar consejos prácticos para optimizar el balance.
3. Evaluar metas y sugerir estrategias para lograrlas.
4. Estructurar el informe para ser utilizado en un sistema que analiza automáticamente los datos.

Por favor, devuelve el análisis en el siguiente formato JSON, incluyendo:
- "observaciones": un resumen de hallazgos importantes.
- "recomendaciones": consejos prácticos para mejorar.
- "estrategias": acciones a corto y largo plazo para optimizar la estabilidad financiera.
    `.trim();

    return prompt;
  }

  // Método estático para crear una nueva instancia desde localStorage
  static cargarFinanzas(idUser) {
    const instance = new Finanzas(idUser);
    instance.loadData(); // Carga los datos del localStorage si existen
    return instance;
  }
}
