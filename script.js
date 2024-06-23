// script.js

// Validar código y girar ruleta
function validarCodigo() {
    const codigo = document.getElementById('codigo').value.toUpperCase();
    const regex = /^PREM100$|^PREM[1-9]\d{2,4}$|^PPREM[1-9]\d{1,4}$/;
    const mensajeError = document.getElementById('mensaje-error');

    if (regex.test(codigo)) {
        mensajeError.textContent = '';
        girarRuleta();
    } else {
        mensajeError.textContent = 'Error ingresa un código válido.';
    }
}

function girarRuleta() {
    const ruleta = document.getElementById('ruleta');
    ruleta.style.display = 'block';

    const premios = [
        { nombre: '10% de descuento', codigo: 'AR10100', probabilidad: 40 },
        { nombre: '5% de descuento', codigo: 'AR5100', probabilidad: 30 },
        { nombre: 'Regalo sorpresa', codigo: 'ARRE100', probabilidad: 27 },
        { nombre: '25% de descuento', codigo: 'AR25100', probabilidad: 3 }
    ];

    const premioSeleccionado = seleccionarPremio(premios);

    setTimeout(() => {
        ruleta.style.display = 'none';
        mostrarCelebracion(premioSeleccionado);
    }, 3000);
}

function seleccionarPremio(premios) {
    const totalProbabilidad = premios.reduce((acc, premio) => acc + premio.probabilidad, 0);
    const random = Math.random() * totalProbabilidad;
    let acumulado = 0;

    for (const premio of premios) {
        acumulado += premio.probabilidad;
        if (random <= acumulado) {
            return premio;
        }
    }
}

function mostrarCelebracion(premio) {
    const celebracion = document.getElementById('celebracion');
    const mensajePremio = document.getElementById('mensaje-premio');
    const codigoCanje = document.getElementById('codigo-canje');
    const fechaValida = new Date();
    fechaValida.setDate(fechaValida.getDate() + 30);

    mensajePremio.textContent = `¡FELICIDADES! Has obtenido ${premio.nombre} en tu próxima compra.`;
    codigoCanje.textContent = generarCodigoCanje(premio.codigo);
    document.getElementById('fecha-valida').textContent = fechaValida.toLocaleDateString();

    celebracion.style.display = 'block';
    generarConfeti();

    setTimeout(() => {
        celebracion.style.display = 'none';
        removerConfeti();
    }, 5000);
}

function generarCodigoCanje(base) {
    const randomNum = Math.floor(Math.random() * 1000000);
    return `${base}${randomNum}`;
}

function generarConfeti() {
    const celebracion = document.getElementById('celebracion');
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 3}s`;
        celebracion.appendChild(confetti);
    }
}

function removerConfeti() {
    const confettiElements = document.querySelectorAll('.confetti');
    confettiElements.forEach(confetti => confetti.remove());
}
