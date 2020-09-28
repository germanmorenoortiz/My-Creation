const width = 20;
const height = 20;

const cellCount = width * height;

const grid = document.querySelector('.grid');

const cells = [];

const pared = [0, 1, 3, 4, 5, 6, 8, 9];

for (let index = 0; index < cellCount; index = index + 1) {
  const cell = document.createElement('div');
  cell.innerText = index;
  grid.appendChild(cell);
  cells.push(cell);
}
console.log(cells[0], cells[5]);

pared.forEach((element) => {
  cells[element].classList.add('laberinto');
});
