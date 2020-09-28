// Dimensiones
const width = 10;
const height = 10;
const cellCount = width * height;

// Impresion de grilla
const grid = document.querySelector('.grid');
const cells = [];

for (let index = 0; index < cellCount; index = index + 1) {
  const cell = document.createElement('div');
  cell.innerText = index;
  grid.appendChild(cell);
  cells.push(cell);
}

// Impresion de pared por posiciones
const pared = [0, 1, 3, 4, 5, 6, 8, 9, 55, 56];
pared.forEach((element) => {
  cells[element].classList.add('laberinto');
});

// Posicion inicial de pacman
let pacmanPosition = 89;

const canImove = (position) => {
  if (pared.includes(position)) {
    return false;
  } else {
    return true;
  }
};

// Otra forma de escribi canimove usando ternarios
// const canImove = (position) => (pared.includes(position) ? false : true);

const addPacman = (index) => cells[index].classList.add('pacman');
const removePacman = (index) => cells[index].classList.remove('pacman');

const handleKeyPress = (event) => {
  // Letra que estoy oprimiendo
  const { key } = event;

  // Algoritmo para saber posicion en grilla de 10 x 10 (no funciona en otras dimenrsiones)
  const x = pacmanPosition % 10;
  const y = Math.floor(pacmanPosition / 10);

  // Rmueve pacman de la posicion para dar efecto de movimiento
  removePacman(pacmanPosition);

  switch (key) {
    case 'ArrowUp':
      if (y > 0) {
        // calculo nueva posicion
        const newPosition = pacmanPosition - width;
        // evaluo si me puedo mover a esa posicion
        if (canImove(newPosition)) {
          // si me puedo mover a esa posicion me muevo
          pacmanPosition = newPosition;
        }
      }
      break;
    case 'ArrowRight':
      if (x < width - 1) {
        // calculo nueva posicion
        const newPosition = pacmanPosition + 1;
        // evaluo si me puedo mover a esa posicion
        if (canImove(newPosition)) {
          // si me puedo mover a esa posicion me muevo
          pacmanPosition = newPosition;
        }
      }
      break;
    case 'ArrowDown':
      if (y < width - 1) {
        // calculo nueva posicion
        const newPosition = pacmanPosition + width;
        // evaluo si me puedo mover a esa posicion
        if (canImove(newPosition)) {
          // si me puedo mover a esa posicion me muevo
          pacmanPosition = newPosition;
        }
      }
      break;
    case 'ArrowLeft':
      if (x > 0) {
        // calculo nueva posicion
        const newPosition = pacmanPosition - 1;
        // evaluo si me puedo mover a esa posicion
        if (canImove(newPosition)) {
          // si me puedo mover a esa posicion me muevo
          pacmanPosition = newPosition;
        }
      }
      break;
    default:
      console.log('Eso no es una flecha flaco');
      break;
  }

  addPacman(pacmanPosition);
};

addPacman(pacmanPosition);

window.addEventListener('keyup', handleKeyPress);

// TODO:
// 1 Imprimir comida en los elementos que no son pared
// 2 Añadir logica de comer comida (remover la comida una vez que pacman ocupe ese posicion)
// 3 Añadir logica de cuando como comida añade puntos al score.
// 3.1 Constreñir logica de cuando me muevo a una posicion que tuvo comida, no coma o agregue puntos
