import { alertError } from "../funciones/alerts";

export class User {  // Mejor utilizar PascalCase para las clases
    static counterUser = 0;  // Asegúrate de inicializar el contador

    #nombre;
    #contrasena;
    #apellido;
    #email;
    Id;  // Declarar el Id que se usará para cada instancia

    constructor() {
        this.Id = User.counterUser++;  // Asigna un ID único a cada instancia y luego incrementa el contador
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
        if (contrasena.length >= 8 && /^[a-zA-Z0-9!@#$%^&*]{8,}$/.test(contrasena)) {
            this.#contrasena = contrasena;
        } else {
            alertError("Contraseña incorrecta", 'La contraseña debe tener al menos 8 caracteres y un caracter especial.');
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
            alertError("Email incorrecto", 'El email debe contener un @ y un dominio.com.');
        }
    }

    get Email() {
        return this.#email;
    }

    // Método para obtener toda la información del usuario
    getUserInfo() {
        return {
            id : this.Id, // Devuelve el id único generado
            nombre: this.Nombre,
            apellido: this.Apellido,
            email: this.Email,
            contrasena : this.Contrasena
        };
    }
}
