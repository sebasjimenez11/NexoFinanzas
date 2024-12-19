// Función para almacenar un valor en localStorage con una clave específica.
// Convierte el valor en una cadena JSON antes de almacenarlo.
const setStorages = (key, value) => localStorage.setItem(key, JSON.stringify(value));

// Función para obtener un valor de localStorage a partir de una clave específica.
// Si el valor existe, lo convierte de vuelta a su formato original usando JSON.parse.
// Si no existe, retorna null.
const getStorages = (key) => localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;

// Función para eliminar un valor de localStorage basado en su clave.
// Elimina el ítem correspondiente a la clave especificada.
const removeStorages = (key) => localStorage.removeItem(key);

// Función para borrar todo el contenido almacenado en localStorage.
// Elimina todos los elementos guardados en localStorage.
const clearStorages = () => localStorage.clear();

// Función para obtener todos los elementos de localStorage como un objeto.
// Itera sobre las claves de localStorage y crea un objeto con las claves y sus valores.
const getAllStorages = () => {
  const storages = {};
  for (let key in localStorage) 
    if (localStorage.hasOwnProperty(key)) 
      storages[key] = JSON.parse(localStorage.getItem(key)); 
  return storages;
};

export { setStorages, getStorages, removeStorages, clearStorages, getAllStorages };