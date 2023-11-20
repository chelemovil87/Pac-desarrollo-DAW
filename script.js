let numPlantas = document.getElementById("numPlantas").value;
let plantas = Array.from({length: 6}, (_, i) => ({ id: "planta" + (i + 1), tamaño: 0 }));

document.getElementById("iniciar").addEventListener("click", iniciarCrecimiento);
document.getElementById("replantar").addEventListener("click", replantar);

function iniciarCrecimiento() {
  document.getElementById("iniciar").classList.add("oculto");
  document.getElementById("replantar").classList.remove("oculto");

  let plantasSeleccionadas = plantas.slice(0, numPlantas);

  // Código para iniciar el crecimiento de las plantas
  plantasSeleccionadas.forEach(planta => {
      let crecimiento = setInterval(() => {
          planta.tamaño += Math.floor(Math.random() * 10) + 1;
          document.getElementById(planta.id).style.bottom = planta.tamaño + "px";

          // Deformar la planta de manera aleatoria
          let factorEscala = Math.random() * 2 + 0.5; // Genera un número aleatorio entre 0.5 y 2.5
          document.getElementById(planta.id).style.transform = `scaleY(${factorEscala})`;

          // Verificar si la planta ha llegado al techo
          if (planta.tamaño >= 350) { // 350 es el tope del invernadero
              clearInterval(crecimiento);
              console.log("La planta " + planta.id + " ha llegado al techo!");
          }
      }, 1000);
  });
}

function replantar() {
  document.getElementById("replantar").classList.add("oculto");
  document.getElementById("iniciar").classList.remove("oculto");

  // Código para replantar las flores
  plantas.forEach(planta => {
      planta.tamaño = 0;
      document.getElementById(planta.id).style.bottom = planta.tamaño + "px";
      document.getElementById(planta.id).style.transform = `scaleY(1)`; // Restablecer la escala a 1
  });
}

let invernadero = document.getElementById('invernadero');
let alturaInvernadero = invernadero.offsetHeight; // Obtiene la altura del div contenedor

function iniciar() {
 // Crecimiento de las plantas
 let tiempoInicio = Date.now();
 for (let i = 0; i < numPlantas; i++) {
   let crecimiento = Math.floor(Math.random() * 10) + 1; // Valor de crecimiento aleatorio entre 1 y 10
   crecimientoPlantas[i] += crecimiento;
   // Si el crecimiento de la planta ha alcanzado la altura del div contenedor, detén el crecimiento
   if (crecimientoPlantas[i] >= alturaInvernadero) {
     crecimientoPlantas[i] = alturaInvernadero;
   }
   document.getElementById(`planta-${i}`).style.height = `${crecimientoPlantas[i]}px`;
   if (crecimientoPlantas[i] >= techo) {
     // Si una planta alcanza el techo, se considera la planta preferida
     let tiempoAlTecho = Date.now() - tiempoInicio;
     plantasAlTecho.push({numero: i + 1, tiempo: tiempoAlTecho});
     if (plantasAlTecho.length == numPlantas) {
       // Si todas las plantas han alcanzado el techo, ordenamos las plantas y mostramos la tabla
       plantasAlTecho.sort((a, b) => a.tiempo - b.tiempo);
       mostrarTabla();
     }
     replantar();
     break;
   }
 }
 document.getElementById('iniciar').style.display = 'none';
 document.getElementById('replantar').style.display = 'block';
}

