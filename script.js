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
        let crecimiento = setInterval(() => {
            if (planta.tamaño < alturaInvernadero) {
                planta.tamaño += Math.floor(Math.random() * 1) + 1; /* Reducir la cantidad de crecimiento */
                document.getElementById(planta.id).style.height = planta.tamaño + "%"; /* Cambiar a porcentaje para ajustar al tamaño de las plantas */
            }
            document.getElementById(planta.id).style.transform = `scaleY(1)`;
            actualizarTarjetas();
        }, 1000);

        setTimeout(() => {
            clearInterval(crecimiento);
        }, 3000);
    });
}
}
}
}
}

function actualizarTarjetas() {
    let cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';

    let plantasSeleccionadas = plantas.slice(0, numPlantas);

    plantasSeleccionadas.sort((a, b) => b.tamaño - a.tamaño).forEach(planta => {
        let card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<img src="/sources/img/${planta.id}.png" alt="${planta.id}"><p>${planta.tamaño}</p>`;
        cardContainer.appendChild(card);
    });
}

function replantar() {
    document.getElementById("replantar").classList.add("oculto");
    document.getElementById("iniciar").classList.remove("oculto");

    // Eliminar tarjetas de plantas
    var cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';

    // Código para replantar las flores
    plantas.forEach(planta => {
        planta.tamaño = 0;
        document.getElementById(planta.id).style.bottom = planta.tamaño + "px";
        document.getElementById(planta.id).style.transform = `scaleY(1)`; // Restablecer la escala a 1
    });
}
       mostrarTabla();
     }
     replantar();
     break;
   }
 }
 document.getElementById('iniciar').style.display = 'none';
 document.getElementById('replantar').style.display = 'block';
}

// Sonido de crecimiento al pulsar el boton de
let sound = new Audio();
sound.src = "/sources/sound/sonido.mp3";

document.getElementById('numPlantas').addEventListener('change', function() {
  var numPlantas = this.value;
  var cardContainer = document.getElementById('cardContainer');
  cardContainer.innerHTML = ''; // Limpiar el contenedor de tarjetas

  for (var i = 1; i <= numPlantas; i++) {
      var card = document.createElement('div');
      card.className = 'card';
      var img = document.createElement('img');
      img.src = "/sources/img/planta" + i + ".png";
      card.appendChild(img);
      cardContainer.appendChild(card);
  }
});