// Card data
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

const game = document.getElementById('game');

const grid = document.createElement('section');
grid.setAttribute('class', 'grid');

game.appendChild(grid);


let firstGuess = '';
let secondGuess = '';
let delay = 1200;
function match() {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
  card.classList.add('match');
  })
}
let previousTarget = null;

let gameGrid = cardsArray.concat(cardsArray);
gameGrid.sort(() => 0.5 - Math.random());
gameGrid.forEach(item => {

  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = item.name;

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${item.img})`;
  
  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);

});

let count=0;
grid.addEventListener('click', function (event) {

  let clicked = event.target;
  if (clicked.nodeName === 'SECTION' || clicked === previousTarget) { return; }
  
  if(count<2){
    count++;
    if(count === 1){
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');

    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }
    if (firstGuess !== '' && secondGuess !== '') {
     if(firstGuess === secondGuess){
        setTimeout(match, delay);
        setTimeout(resetGuesses, delay);
      } else {setTimeout(resetGuesses, delay);
      }
    }
   } previousTarget = clicked;
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

