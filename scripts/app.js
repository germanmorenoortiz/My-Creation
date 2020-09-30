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
const pared = [
  2,
  8,
  9,
  12,
  14,
  15,
  16,
  28,
  29,
  31,
  32,
  34,
  36,
  41,
  42,
  44,
  45,
  46,
  48,
  58,
  61,
  62,
  64,
  65,
  66,
  68,
  71,
  72,
  84,
  85,
  87,
  89,
  92,
  99,
];
pared.forEach((element) => {
  cells[element].classList.add('laberinto');
});

// Posicion inicial de pacman y ghost
let pacmanPosition = 55;

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
  cells[pacmanPosition].style.transform = '';

  switch (key) {
    case 'ArrowUp':
      if (y > 0) {
        // calculo nueva posicion
        const newPosition = pacmanPosition - width;
        // evaluo si me puedo mover a esa posicion
        if (canImove(newPosition)) {
          // si me puedo mover a esa posicion me muevo
          pacmanPosition = newPosition;
          //girar en su eje pacman.
          cells[pacmanPosition].style.transform = 'rotate(270deg)';
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
          //girar en su eje pacman
          cells[pacmanPosition].style.transform = 'rotate(90deg)';
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
          //girar en su eje pacman
          cells[pacmanPosition].style.transform = 'scaleX(-1)';
        }
      }
      break;
    default:
      console.log('Eso no es una flecha flaco');
      break;
  }

  addPacman(pacmanPosition);
  comerCoco();
};

addPacman(pacmanPosition);

window.addEventListener('keyup', handleKeyPress);

// TODO:
// 1 Imprimir comida en los elementos que no son pared

const comida = [
  0,
  1,
  3,
  4,
  5,
  6,
  7,
  10,
  11,
  13,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  30,
  33,
  37,
  38,
  39,
  40,
  43,
  47,
  49,
  50,
  51,
  52,
  53,
  54,
  56,
  57,
  59,
  60,
  63,
  67,
  69,
  70,
  73,
  74,
  75,
  76,
  77,
  78,
  79,
  80,
  81,
  82,
  83,
  86,
  88,
  90,
  91,
  93,
  94,
  95,
  96,
  97,
  98,
];

comida.forEach((element) => {
  cells[element].classList.add('cocos');
});

// 3 Añadir logica de cuando, como cocos añade puntos al score.

let score = 0;
// 2 Añadir logica de comer comida (remover la comida una vez que pacman ocupe ese posicion)

function comerCoco() {
  if (cells[pacmanPosition].classList.contains('cocos')) {
    cells[pacmanPosition].classList.remove('cocos');
    score = 100 + score;
    console.log(score);
    showScore();
  }
}

// 3.1 Constreñir logica de cuando me muevo a una posicion que tuvo comida, no coma o agregue puntos

// 4 Imprimir en pantalla, en vivo la puntuacion.

// evento: sucede en la linea 227.

// elemento

const resultado = document.querySelector('.pantalla');

// ejecucion
function showScore() {
  resultado.innerHTML = score;
}
// 5 girar pacman en la direccion en que se mueve

/************************ */
// Ghost
/************************ */

// añadir ghost

class Ghost {
  constructor(position) {
    this.position = position;
    this.x = this.position % 10;
    this.y = Math.floor(position / 10);
  }

  render(position) {
    cells[position].classList.add('ghost');
  }

  remove(position) {
    cells[position].classList.remove('ghost');
  }

  refreshCoordinates() {
    this.x = this.position % 10;
    this.y = Math.floor(this.position / 10);
  }

  moveToRight() {
    if (this.x < width - 1) {
      // calculo nueva posicion
      const newPosition = this.position + 1;
      // evaluo si me puedo mover a esa posicion
      if (canImove(newPosition)) {
        // si me puedo mover a esa posicion me muevo
        this.remove(this.position);
        this.position = newPosition;
        this.refreshCoordinates();
        this.render(this.position);
      }
    }
  }

  moveToleft() {
    if (this.x > 0) {
      // calculo nueva posicion
      const newPosition = this.position - 1;
      // evaluo si me puedo mover a esa posicion
      if (canImove(newPosition)) {
        this.remove(this.position);
        this.position = newPosition;
        this.refreshCoordinates();
        this.render(this.position);
      }
    }
  }
}

let ghostPositions = [7, 35, 95];
let ghosts = [];

const renderGhost = (position) => {
  const ghost = new Ghost(position);
  ghost.render(ghost.position);
  ghosts.push(ghost);
};

ghostPositions.forEach(renderGhost);

const fantasma = new Ghost(80);

fantasma.render(fantasma.position);

// const addGhost = (index) => cells[index].classList.add('ghost');
// const removeGhost = (index) => cells[index].classList.remove('ghost');

// addGhost(ghostPosicion);

// const x = ghostPosicion % 10;
// const y = Math.floor(ghostPosicion / 10);
