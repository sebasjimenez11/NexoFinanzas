export class Finanzas {
    #IdUser;
    #metas = {};
    #ingresos = {};
    #egresos = {};
    totalIngresos = 0;
    totalEgresos = 0;
    totalBalance = 0;
  
    constructor(idUser) {
      this.#IdUser = idUser;
      this.loadData();  // Cargar datos si existen en el storage
    }
  
    // Método para cargar los datos desde localStorage
    loadData() {
      const storedData = getStorages(`finanzas-${this.#IdUser}`);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        this.#ingresos = parsedData.#ingresos || {};
        this.#egresos = parsedData.#egresos || {};
        this.#metas = parsedData.#metas || {};
        this.totalIngresos = parsedData.totalIngresos || 0;
        this.totalEgresos = parsedData.totalEgresos || 0;
        this.totalBalance = parsedData.totalBalance || 0;
      } else {
        // Si no existe el usuario en el localStorage, inicializamos con valores predeterminados
        this.#ingresos[this.#IdUser] = [];
        this.#egresos[this.#IdUser] = [];
        this.#metas[this.#IdUser] = [];
        this.totalIngresos = 0;
        this.totalEgresos = 0;
        this.totalBalance = 0;
      }
    }
  
    // Método para guardar los datos en localStorage
    saveData() {
      const dataToSave = {
        ingresos: this.#ingresos,
        egresos: this.#egresos,
        metas: this.#metas,
        totalIngresos: this.totalIngresos,
        totalEgresos: this.totalEgresos,
        totalBalance: this.totalBalance,
      };
      setStorages(`finanzas-${this.#IdUser}`, dataToSave);
    }
  
    // Registrar un ingreso
    setIngreso(descripcion, monto, categoria) {
      if (isNaN(monto) || monto <= 0) {
        alertError('Monto Invalido.', 'Ingrese un Monto numérico mayor que cero.');
        return;
      }
      this.#ingresos[this.#IdUser] = this.#ingresos[this.#IdUser] || [];
      this.#ingresos[this.#IdUser].push({ descripcion, monto, categoria });
      this.totalIngresos += monto;
      this.actualizarBalance();
      this.saveData();  // Guardar después de actualizar
    }
  
    // Registrar un egreso
    setEgreso(descripcion, monto, categoria) {
      if (isNaN(monto) || monto <= 0) {
        alertError('Monto Invalido.', 'Ingrese un Monto numérico mayor que cero.');
        return;
      }
      this.#egresos[this.#IdUser] = this.#egresos[this.#IdUser] || [];
      this.#egresos[this.#IdUser].push({ descripcion, monto, categoria });
      this.totalEgresos += monto;
      this.actualizarBalance();
      this.saveData();  // Guardar después de actualizar
    }
  
    // Actualizar el balance total (ingresos - egresos)
    actualizarBalance() {
      this.totalBalance = this.totalIngresos - this.totalEgresos;
    }
  
    // Obtener los ingresos registrados
    getIngresos() {
      return this.#ingresos[this.#IdUser] || [];
    }
  
    // Obtener los egresos registrados
    getEgresos() {
      return this.#egresos[this.#IdUser] || [];
    }
  
    // Generar un reporte con los datos actuales
    generarReporte() {
      return {
        ingresos: this.totalIngresos,
        egresos: this.totalEgresos,
        balance: this.totalBalance,
        metasCumplidas: this.#metas[this.#IdUser]?.filter(meta => meta.cumplida),
        metasEmproceso: this.#metas[this.#IdUser]?.filter(meta => meta.fechaLimite),
      };
    }
  
    // Guardar y obtener todos los datos de finanzas
    obtenerDatos() {
      return {
        [this.#IdUser]: {
          ingresos: this.#ingresos[this.#IdUser] || [],
          egresos: this.#egresos[this.#IdUser] || [],
          metas: this.#metas[this.#IdUser] || [],
          totalIngresos: this.totalIngresos,
          totalEgresos: this.totalEgresos,
          totalBalance: this.totalBalance,
        }
      };
    }
  
    // Método estático para crear una nueva instancia desde localStorage
    static cargarFinanzas(idUser) {
      const instance = new Finanzas(idUser);
      instance.loadData();  // Carga los datos del localStorage si existen
      return instance;
    }
  }
  