let numPlantas = document.getElementById("numPlantas").value; /* Obtiene el valor del elemento HTML con el id "numPlantas"*/
let plantas = Array.from({ length: 6 }, (_, i) => ({
  // Crea un array de objetos, cada uno representando una planta
  id: "planta" + (i + 1), // El id de la planta es una cadena que concatena "planta" con el índice de la planta en el array (más uno)
  tamaño: 0, // El tamaño inicial de la planta es 0
}));

document
  .getElementById("iniciar")
  .addEventListener("click", iniciarCrecimiento); ///Agrega un oyente de eventos al elemento con el id "iniciar"
document.getElementById("replantar").addEventListener("click", replantar); // Agrega un oyente de eventos al elemento con el id "replantar"

function iniciarCrecimiento() {
  document.getElementById("iniciar").classList.add("oculto"); // Oculta el botón "iniciar"
  document.getElementById("replantar").classList.remove("oculto"); // Muestra el botón "replantar"

  numPlantas = document.getElementById("numPlantas").value; // Obtiene el número de plantas a crecer desde el input "numPlantas"
  let plantasSeleccionadas = plantas.slice(0, numPlantas); // Selecciona las plantas a crecer

  let alturaInvernadero = document.getElementById("invernadero").offsetHeight; // Obtiene la altura del invernadero

  plantasSeleccionadas.forEach((planta) => {
    // Para cada planta seleccionada
    let alturaInicial = document.getElementById(planta.id).offsetHeight; // Obtiene la altura inicial de la planta
    let crecimiento = setInterval(() => {
      // Inicia un intervalo
      let alturaPlanta =
        alturaInicial + (planta.tamaño / 100) * alturaInvernadero; // Calcula la altura de la planta
      if (alturaPlanta < alturaInvernadero) {
        // Si la planta no ha alcanzado la altura máxima del invernadero
        planta.tamaño += Math.floor(Math.random() * 20) + 1; // Aumenta el tamaño de la planta
        document.getElementById(planta.id).style.height = `${alturaPlanta}px`; // Actualiza la altura de la planta en el HTML
      }
      actualizarTarjetas(); // Actualiza las tarjetas de las plantas
    }, 1000); // El intervalo se ejecuta cada segundo

    setTimeout(() => {
      // Después de 6 segundos
      clearInterval(crecimiento); // Detiene el intervalo
    }, 6000);
  });
}

function actualizarTarjetas() {
  let cardContainer = document.getElementById("cardContainer"); // Obtiene el contenedor de las tarjetas
  cardContainer.innerHTML = ""; // Limpia el contenedor de las tarjetas

  let plantasSeleccionadas = plantas.slice(0, numPlantas); // Selecciona las plantas a mostrar

  plantasSeleccionadas
    .sort((a, b) => b.tamaño - a.tamaño)
    .forEach((planta) => {
      // Para cada planta seleccionada, ordenadas por tamaño
      let card = document.createElement("div"); // Crea una nueva tarjeta
      card.className = "card"; // Asigna la clase "card" a la tarjeta
      card.innerHTML = `<img src="/sources/img/${planta.id}.png" alt="${planta.id}"> 
                      <div>
                        <p>${planta.tamaño}</p> 
                        <p>cm</p> 
                      </div>`;
      cardContainer.appendChild(card); // Agrega la tarjeta al contenedor
    });

  cardContainer.style.visibility = "visible"; // Hace visible el contenedor de las tarjetas
}

function replantar() {
  document.getElementById("replantar").classList.add("oculto"); // Oculta el botón "replantar"
  document.getElementById("iniciar").classList.remove("oculto"); // Muestra el botón "iniciar"

  // Elimina las tarjetas de las plantas
  var cardContainer = document.getElementById("cardContainer");
  cardContainer.style.visibility = "hidden"; // Oculta el contenedor de las tarjetas
  cardContainer.innerHTML = ""; // Limpia el contenedor de las tarjetas

  plantas.forEach((planta) => {
    // Para cada planta
    planta.tamaño = 0; // Restablece el tamaño de la planta a 0
    document.getElementById(planta.id).style.height = "auto"; // Restablece la altura de la planta en el HTML a su valor por defecto
  });
}

// var sound = new Audio(); // Crea un nuevo objeto Audio
// sound.src = "/sources/sound/sonido.mp3"; // Asigna la fuente del sonido al archivo "sonido.mp3"
