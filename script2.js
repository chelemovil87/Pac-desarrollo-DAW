let numPlantas = document.getElementById("numPlantas").value;
let plantas = Array.from({length: 6}, (_, i) => ({ id: "planta" + (i + 1), tamaño: 0 }));

document.getElementById("iniciar").addEventListener("click", iniciarCrecimiento);
document.getElementById("replantar").addEventListener("click", replantar);

function iniciarCrecimiento() {
    document.getElementById("iniciar").classList.add("oculto");
    document.getElementById("replantar").classList.remove("oculto");

    numPlantas = document.getElementById("numPlantas").value;
    let plantasSeleccionadas = plantas.slice(0, numPlantas);

    let alturaInvernadero = document.getElementById('invernadero').offsetHeight;

    plantasSeleccionadas.forEach(planta => {
        let alturaInicial = document.getElementById(planta.id).offsetHeight; 
        let crecimiento = setInterval(() => {
            let alturaPlanta = alturaInicial + (planta.tamaño / 100) * alturaInvernadero; 
            if (alturaPlanta < alturaInvernadero) {
                planta.tamaño += Math.floor(Math.random() * 20) + 1;
                document.getElementById(planta.id).style.height = `${alturaPlanta}px`;
            }
            actualizarTarjetas();
        }, 1000);

        setTimeout(() => {
            clearInterval(crecimiento);
        }, 6000);
    });
}

function actualizarTarjetas() {
    let cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';

    let plantasSeleccionadas = plantas.slice(0, numPlantas);

    plantasSeleccionadas.sort((a, b) => b.tamaño - a.tamaño).forEach(planta => {
        let card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<img src="/sources/img/${planta.id}.png" alt="${planta.id}">
                          <div>
                            <p>${planta.tamaño}</p>
                            <p>cm</p>
                          </div>`;
        cardContainer.appendChild(card);
    });

    cardContainer.style.visibility = 'visible';
}
function replantar() {
document.getElementById("replantar").classList.add("oculto");
document.getElementById("iniciar").classList.remove("oculto");

// Eliminar tarjetas de plantas
var cardContainer = document.getElementById('cardContainer');
    cardContainer.style.visibility = 'hidden';
    cardContainer.innerHTML = '';

plantas.forEach(planta => {
    planta.tamaño = 0;
       document.getElementById(planta.id).style.height = "auto"; 
    });
}

var sound = new Audio();
sound.src = "/sources/sound/sonido.mp3";