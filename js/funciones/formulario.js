// Función para crear un input genérico
function createInput(type, name, placeholder, labelText, value, required) {
  const inputContainer = document.createElement("div");

  // Crear etiqueta
  const label = document.createElement("label");
  label.className = "form-label";
  label.setAttribute("for", name);
  label.innerText = labelText;

  // Crear input
  const input = document.createElement("input");
  input.type = type;
  input.name = name;
  input.id = name;
  input.placeholder = placeholder;
  input.className = "form-input";
  input.value = value ?? '';
  if (required) {
    input.required = true; // Hace que el campo sea requerido
  }

  // Armar el contenedor
  inputContainer.appendChild(label);
  inputContainer.appendChild(input);

  return inputContainer;
}

// Función para crear un select genérico
function createSelect(name, options, labelText, value, required) {
  const selectContainer = document.createElement("div");

  // Crear etiqueta
  const label = document.createElement("label");
  label.className = "form-label";
  label.setAttribute("for", name);
  label.innerText = labelText;

  // Crear select
  const select = document.createElement("select");
  select.name = name;
  select.id = name;
  select.className = "form-select";
  if (required) {
    select.required = true; // Hace que el select sea requerido
  }

  // Crear opciones
  options.forEach((optionText) => {
    const option = document.createElement("option");
    option.value = optionText.toLowerCase();
    option.innerText = optionText;

    // Selecciona la opción si coincide con el valor inicial
    if (value && option.value === value.toLowerCase()) {
      option.selected = true;
    }

    select.appendChild(option);
  });

  // Armar el contenedor
  selectContainer.appendChild(label);
  selectContainer.appendChild(select);

  return selectContainer;
}

// Función para crear un botón genérico
function createButton(text, callback) {
  const button = document.createElement("button");
  button.type = "button";
  button.innerText = text;
  button.className = "form-button";

  // Callback al hacer clic
  button.addEventListener("click", callback);

  return button;
}

// Función principal para generar el formulario
export function createForm(params, submitCallback) {
  const form = document.createElement("form");
  form.className = "form-container";

  // Crear título del formulario si existe
  if (params.title) {
    const title = document.createElement("h2");
    title.className = "form-title";
    title.innerText = params.title;
    form.appendChild(title);
  }

  // Crear los campos dinámicamente
  params.fields.forEach((field) => {
    let element;

    switch (field.type) {
      case "select":
        element = createSelect(
          field.name,
          field.options,
          field.label,
          field.value ?? '', // Valor inicial
          field.required ?? false // Campo requerido
        );
        break;
      case "button":
        element = createButton(field.label, field.callback);
        break;
      default: // 'text', 'email', 'password', etc.
        element = createInput(
          field.type,
          field.name,
          field.placeholder,
          field.label,
          field.value ?? '', // Valor inicial
          field.required ?? false // Campo requerido
        );
        break;
    }

    form.appendChild(element);
  });

  // Botón de envío si existe
  if (params.submitText) {
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.innerText = params.submitText;
    submitButton.className = "form-button";

    form.appendChild(submitButton);
  }

  // Evitar comportamiento predeterminado y ejecutar el callback
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (submitCallback) {
      const formData = new FormData(form); // Crea FormData a partir del formulario
      const data = Object.fromEntries(formData.entries()); // Convierte FormData a objeto

      submitCallback(data); // Llama al callback y le pasa el objeto
    }
  });

  return form;
}
