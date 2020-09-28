const width = 10;
const height = 10;

const cellCount = width * height;

const grid = document.querySelector('.grid');

const cells = [];

const pared = [0, 1, 3, 4, 5, 6, 8, 9, 55, 56];

for (let index = 0; index < cellCount; index = index + 1) {
  const cell = document.createElement('div');
  cell.innerText = index;
  grid.appendChild(cell);
  cells.push(cell);
}
// console.log(cells[0], cells[5]);

pared.forEach((element) => {
  cells[element].classList.add('laberinto');
});

let pacmanPosition = 89;

const canImove = (position) => {
  if (pared.includes(position)) {
    return false;
  } else {
    return true;
  }
};

const addPacman = (index) => cells[index].classList.add('pacman');
const removePacman = (index) => cells[index].classList.remove('pacman');

const handleKeyPress = (event) => {
  const { key } = event;

  const x = pacmanPosition % 10;
  const y = Math.floor(pacmanPosition / 10);

  // 3 - Mover a Pikachu de un cuadro al otro dependiendo la orientación y la dirección
  //  3.1  ¿Cómo puedo saber en que coordenas Pikachu se encuentra?

  console.log({
    canImove: canImove(pacmanPosition),
  });

  removePacman(pacmanPosition);

  switch (key) {
    case 'ArrowUp':
      if (y > 0) {
        const newPosition = pacmanPosition - width;
        if (canImove(newPosition)) {
          pacmanPosition = newPosition;
        }
      }
      break;
    case 'ArrowRight':
      if (x < width - 1) {
        const newPosition = pacmanPosition + 1;
        if (canImove(newPosition)) {
          pacmanPosition = newPosition;
        }
      }
      break;
    case 'ArrowDown':
      if (y < width - 1) {
        const newPosition = pacmanPosition + width;
        if (canImove(newPosition)) {
          pacmanPosition = newPosition;
        }
      }
      break;
    case 'ArrowLeft':
      if (x > 0) {
        const newPosition = pacmanPosition - 1;
        if (canImove(newPosition)) {
          pacmanPosition = newPosition;
        }

        // pacmanPosition--;
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
