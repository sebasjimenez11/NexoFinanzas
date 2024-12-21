import { alertError } from "../funciones/alerts.js";
import { getStorages, setStorages } from "../funciones/storages.js";

export class User {
  // Mejor utilizar PascalCase para las clases

  #nombre;
  #contrasena;
  #apellido;
  #email;
  #Id;

  nuevoId () {
    let conunter = getStorages("counter-user") ? parseInt(getStorages("counter-user")) : 1;
    this.#Id = conunter; // Asigna un ID único a cada instancia y luego incrementa el contador
    setStorages("counter-user", ++conunter);
  }

  get Id() {
    return this.#Id;
  }

  // Getter y Setter para el nombre
  set Nombre(nombre) {
    this.#nombre = nombre;
  }

  get Nombre() {
    return this.#nombre;
  }

  // Getter y Setter para la contraseña con validación
  set Contrasena(contrasena) {
    // Validación de la contraseña: mínimo 8 caracteres y al menos un caracter especial
    if (
      contrasena.length >= 8 &&
      /^[a-zA-Z0-9!@#$%^&*]{8,}$/.test(contrasena)
    ) {
      this.#contrasena = contrasena;
    } else {
      alertError(
        "Contraseña incorrecta",
        "La contraseña debe tener al menos 8 caracteres y un caracter especial."
      );
      return;
    }
  }

  get Contrasena() {
    return this.#contrasena;
  }

  // Getter y Setter para el apellido
  set Apellido(apellido) {
    this.#apellido = apellido;
  }

  get Apellido() {
    return this.#apellido;
  }

  // Getter y Setter para el email con validación
  set Email(email) {
    // Validación básica del email: debe contener @ y .com
    if (email.includes("@") && email.includes(".com")) {
      this.#email = email;
    } else {
      alertError(
        "Email incorrecto",
        "El email debe contener un @ y un dominio.com."
      );
    }
  }

  get Email() {
    return this.#email;
  }

  // Método para obtener toda la información del usuario
  getUserInfo() {
    return {
      [this.Id]: {
        nombre: this.Nombre,
        apellido: this.Apellido,
        email: this.Email,
        contrasena: this.Contrasena,
      },
    };
  }
}
