// Declaro Array de objetos que contienen cada una de las imagenes con las que voy a hacer las cartas
const cardsArray = [{
  'name': 'Blondie',
  'img': 'img/blondie.png',
},
{
  'name': 'Joan',
  'img': 'img/joan.png',
},
{
  'name': 'bikiniKill',
  'img': 'img/bikiniKill.png',
},
{
  'name': 'Gwen',
  'img': 'img/gwen.png',
},
{
  'name': 'Patti',
  'img': 'img/patti.png',
},
{
  'name': 'Jannis',
  'img': 'img/jannis.png',
},
{
  'name': 'Celeste',
  'img': 'img/celeste.png',
},
{
  'name': 'Amy',
  'img': 'img/amy.png',
},
{
  'name': 'nikki',
  'img': 'img/nikki.png',
},
{
  'name': 'Donnas',
  'img': 'img/donnas.png',
},
{
  'name': 'stevie',
  'img': 'img/stevie.png',
},
{
  'name': 'courtney',
  'img': 'img/courtney.png',
},
];

//Declaro la variable game trayendo el elemento game del html y creo el elemtno grid que es donde voy a guardar mis cartas
//traigo el elemento Body para poder ponerle la clase win cuando se termine el juego
const game = document.getElementById('game');
const grid = document.createElement('section');
const body = document.getElementById('body')

//Seteo atributos del grid y agrego el elemento creado para que sea visible en el html
grid.setAttribute('class', 'grid');
game.appendChild(grid);

//Variable que contiene el puntaje e imprimo el valor seteado en 0
const scoreBoard = document.querySelector('.score');
let score = 0;
scoreBoard.textContent = score;

//variable que contiene la cantidad de intentos e imprimo el valor
const playScore = document.querySelector('.tries');
let tries = 0;
playScore.textContent = tries;
let juega = 0;

//variables que serviran para hacer las comparaciones y para el juego en si
let firstGuess = '';
let secondGuess = '';
let delay = 1200;
let matched = 0;

let previousTarget = null;

let count = 0;

let gameGrid = cardsArray.concat(cardsArray);

//funcion para realizar el match

function match() {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
    matched++

    if (matched % 2 == 0) {
      score = matched / 2
    }


    scoreBoard.textContent = score;

    if (matched === 24) {
      
      body.classList.remove('body');
      grid.classList.add('win');
    }

  })
}

// Funcion para contar los intentos

function intento(){
    tries++;
    playScore.textContent = tries;
  };


// Aramr el grid con todas las cartas y posicionarlas de manera azarosa en cada uno de los juegos

gameGrid.sort(() => 0.5 - Math.random());
gameGrid.forEach((item, index) => {
//Crear el elemento carta con un frente y un back
  card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = item.name;
  card.dataset.id = index;

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${item.img})`;

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);

// //Utilizando la variable carta crear un evento en el que se ejecute la funcion intento para contar la cantidad de intentos 
//   card.addEventListener("click", intento);

});


grid.addEventListener('click', function (event) {

  let clicked = event.target;
  if (clicked.nodeName === 'SECTION' || (previousTarget && clicked.parentNode.dataset.id === previousTarget.parentNode.dataset.id)) { return; }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add('selected');

    } else {
      secondGuess = clicked.parentNode.dataset.name;

      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess !== '' && secondGuess !== '') {
      if (firstGuess === secondGuess) {
        intento();
        setTimeout(match, delay);
        setTimeout(resetGuesses, delay);
      } else {
        intento();
        setTimeout(resetGuesses, delay);
      }
    }
  } 
  previousTarget = clicked;
});

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

