// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Botones de contacto
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const buttonText = this.textContent.trim().toLowerCase();

    if (buttonText.includes("quote") || buttonText.includes("trabaja")) {
      window.location.href =
        "mailto:pablotrabajos42@gmail.com?subject=Solicitud de Presupuesto";
    }

    if (buttonText.includes("mensaje") || buttonText.includes("correo")) {
      window.location.href = "mailto:pablotrabajos42@gmail.com";
    }

    if (buttonText.includes("portfolio") || buttonText.includes("ver mi")) {
      const showcaseSection = document.querySelector("#showcase");
      if (showcaseSection) {
        showcaseSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});

// Modo oscuro
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);

  // Cambiar el icono
  const icon = document.querySelector(".theme-switch i");
  if (icon) {
    icon.className = isDarkMode ? "ri-sun-line" : "ri-moon-line";
  }
}

// Inicializar modo oscuro
function initializeDarkMode() {
  const darkMode = localStorage.getItem("darkMode") === "true";
  if (darkMode) {
    document.body.classList.add("dark-mode");
  }

  const icon = document.querySelector(".theme-switch i");
  if (icon) {
    icon.className = darkMode ? "ri-sun-line" : "ri-moon-line";
  }
}

// Animaciones
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Añadir las clases necesarias y observar elementos
document
  .querySelectorAll(
    ".project-card, .skills__stats i, .hero__content, .hero__intro"
  )
  .forEach((element) => {
    element.classList.add("fade-in");
    observer.observe(element);
  });

// Estilos para animaciones
const style = document.createElement("style");
style.textContent = `
    .fade-in {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
  
    .fade-in.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
document.head.appendChild(style);

// Validación del formulario
const form = document.querySelector('.contact-form');
const inputs = form.querySelectorAll('input, textarea');

// Objeto con los mensajes de error personalizados
const errorMessages = {
  name: {
    valueMissing: 'Por favor, ingresa tu nombre',
    patternMismatch: 'El nombre solo debe contener letras y espacios',
    tooShort: 'El nombre debe tener al menos 2 caracteres',
    tooLong: 'El nombre no debe exceder los 50 caracteres'
  },
  email: {
    valueMissing: 'Por favor, ingresa tu correo electrónico',
    typeMismatch: 'Por favor, ingresa un correo electrónico válido',
    patternMismatch: 'Por favor, ingresa un correo electrónico válido'
  },
  subject: {
    valueMissing: 'Por favor, ingresa el asunto',
    tooShort: 'El asunto debe tener al menos 5 caracteres',
    tooLong: 'El asunto no debe exceder los 100 caracteres'
  },
  message: {
    valueMissing: 'Por favor, ingresa tu mensaje',
    tooShort: 'El mensaje debe tener al menos 20 caracteres',
    tooLong: 'El mensaje no debe exceder los 500 caracteres'
  }
};

// Función para mostrar errores
const showError = (input, errors) => {
  const formGroup = input.closest('.form-group');
  const errorDisplay = formGroup.querySelector('.error-message');
  const errorMessages = [];

  for (const error in errors) {
    if (errors[error]) {
      errorMessages.push(error);
    }
  }

  if (errorMessages.length > 0) {
    formGroup.classList.add('error');
    errorDisplay.textContent = errorMessages[0];
    input.setAttribute('aria-invalid', 'true');
  } else {
    formGroup.classList.remove('error');
    errorDisplay.textContent = '';
    input.setAttribute('aria-invalid', 'false');
  }
};

// Validar un campo individual
const validateField = (input) => {
  const name = input.name;
  const validity = input.validity;

  const errors = {
    [errorMessages[name].valueMissing]: validity.valueMissing,
    [errorMessages[name].typeMismatch]: validity.typeMismatch,
    [errorMessages[name].patternMismatch]: validity.patternMismatch,
    [errorMessages[name].tooShort]: validity.tooShort,
    [errorMessages[name].tooLong]: validity.tooLong
  };

  showError(input, errors);
  return validity.valid;
};

// Evento para validar campos mientras se escriben
inputs.forEach(input => {
  input.addEventListener('input', () => {
    validateField(input);
  });

  input.addEventListener('blur', () => {
    validateField(input);
  });
});

// Manejo del envío del formulario
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  let isValid = true;

  // Validar todos los campos
  inputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });

  if (isValid) {
    // Aquí puedes agregar la lógica para enviar el formulario
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      // Simulamos el envío del formulario
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mostrar mensaje de éxito
      alert('¡Mensaje enviado con éxito!');
      form.reset();
      
      // Limpiar los mensajes de error
      inputs.forEach(input => {
        const formGroup = input.closest('.form-group');
        const errorDisplay = formGroup.querySelector('.error-message');
        formGroup.classList.remove('error');
        errorDisplay.textContent = '';
        input.setAttribute('aria-invalid', 'false');
      });
    } catch (error) {
      alert('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');
    }
  }
});

// Inicializar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", initializeDarkMode);