export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajeDeError(tipoDeInput, input);
  }
}

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajesDeError = {
  nombre: {
    valueMissing: "Este campo nombre no puede estar vació",
  },

  email: {
    valueMissing: "El campo contraseña no puede estar vació",
    typeMismatch: "El correo no es valido",
  },

  password: {
    valueMissing: "Este campo no puede estar vació",
    patternMismatch:
      "Mínimo ocho caracteres, al menos una letra, un número y un carácter especial",
  },

  nacimiento: {
    valueMissing: "Este campo no puede estar vació",
    customError: "Debes tener al menos 18 años de edad",
  },

  numero:{
    valueMissing: "Este campo no puede estar vació",
    patternMismatch: "El formato requerido es XXXXXXXXXX 10 números"
  }
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input) {
  let mensaje = "";
  tipoDeErrores.forEach((error) => {
    if (input.validity[error]) {
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });
  return mensaje;
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  mayorDeEdad(fechaCliente);

  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad";
  }

  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
  const fechaActual = new Date();
  const diferenciasFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );

  return diferenciasFechas <= fechaActual;
}
