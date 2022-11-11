// Canvas global variables
var cv = document.getElementById("cv");
var ctx = cv.getContext("2d");

cv.style.border = "solid black 3px";

var ALTURA = 600;
var LARGURA = 600;

cv.width = LARGURA;
cv.height = ALTURA;

// global variables of the elements
var obstacle = document.getElementById("obstacleImage");
var obstacleHeight = 99;

var selectedAnimal = document.getElementById('personagens');
var chosenCharacter = document.getElementById('characterImage');
var personagem = '';

var selectedDificuldade = document.getElementById('dificuldade');
var dificuldade = '';

var jewel = document.getElementById('jewelImage');
var jewelAppeared = false;

var startButton = document.getElementById('startButton');
startButton.disabled = true;

var personagemSelecionado = false;  // Verifica se o jogador selecionou um personagem
var dificuldadeSelecionada = false; // Verifica se o jogador selecionou uma dificuldade

selectedAnimal.onchange = function() {
  personagem = selectedAnimal.options[selectedAnimal.selectedIndex].text;
  if (personagem != "Escolha o seu personagem...") {
    personagemSelecionado = true;
    chosenCharacter.src = selectedAnimal.value;
  } else personagemSelecionado = false;

  if (dificuldadeSelecionada == true && personagemSelecionado == true) {
    startButton.disabled = false;
  } else {
    startButton.disabled = true;
  }
}

selectedDificuldade.onchange = function() {
  dificuldade = selectedDificuldade.options[selectedDificuldade.selectedIndex].text;
  if (dificuldade != "Escolha a dificuldade...") dificuldadeSelecionada = true;
  else dificuldadeSelecionada = false;

  if (dificuldadeSelecionada == true && personagemSelecionado == true) {
    startButton.disabled = false;
  } else {
    startButton.disabled = true;
  }
}

var gameOver = false;  // verifica se o jogo acabou ou não
var gameStarted = false; // verifica se o jogo começou ou não
var colision = false;  // verifica se houve colisão com obstáculo

var dicaText = document.getElementById("dicaText");

var vida_fragmento_text = document.getElementById("counters");
// var numLife = document.getElementById("numVidas");
var numFragmentos = document.getElementById("numFragmentos");

var velocidadeDificuldades = [200, 400, 600];  // easy: 200ms, normal: 400ms and expert: 600ms
var intervalAnimals = [80, 30, 40]; // used in setInterval. Each animal has its own interval (Wolf: 80ms, Kitty: 30ms and Mavis: 40ms)

var timer_obstacle, timer_animal;
var velocidade;
var xInitialPosition_obstacle = 601;


// Functions

/*************************************

MENU 

*************************************/

// Loads the menu
function menu() {
  /*
  IDEIA:
  Desenhar o menu no canvas.
  */

  // big green rect
  cv.style.backgroundColor = "#383C5C";  // purple

  // title
  ctx.font = "100px Comic Sans MS";
  ctx.fillStyle = "#FCE6E3";  // purple



  ctx.fillText("Wolf Run", (cv.width / 2) - 225, 350);

  // small rect
  ctx.fillStyle = "rgba(255, 255, 255, 0.10)";
  ctx.fillRect(0, 400, 600, cv.height);

  // content small rect
  // 1 - Text
  var text1 = "Antes de começar, escolha um personagem e"
  var text2 = "uma dificuldade";

  var xText1 = 70; // fixo em 70
  var yText1 = 350 + 100; // default: 210

  ctx.fillStyle = "black";
  ctx.font = "23px Arial";
  ctx.fillText(text1, xText1, yText1);
  ctx.fillText(text2, xText1 + 150, yText1 + 30);

  // 2 - authors
  var text3 = "Authors:"
  var author1 = "Alex Nicolas";
  var author2 = "Luiza Bretas";

  ctx.fillStyle = "#A988AD";
  ctx.font = "20px Arial";

  ctx.fillText(text3, xText1 + 190, yText1 + 70);
  ctx.fillText(author1, xText1 + 170, yText1 + 100);
  ctx.fillText(author2, xText1 + 170, yText1 + 130);

  ctx.fill();

  startButton.onclick = game;
}


/*************************************

OBSTACLE

*************************************/

// controls the moviment/loop of the obstacles
function moveObstacle() {
  /*
  IDEIA:
  Começar com posição x = 601 e ir andando para frente até x = -obstacle.width; 
  Quando chegar em x = -obstacle.width, retornar para x = 601 e assim por diante até a pessoa perder ou ganhar.
  */

  var loop = true;
  var dx = +2;
  var xPosition;

  while (loop == true) {
    ctx.clearRect(0, 0, cv.width, cv.height);
    xPosition = xInitialPosition_obstacle - dx;
    if (xPosition == -obstacle.width) {
      xPosition = xInitial_obstacle;
    }
    obstacle.onload = function() {
      ctx.drawImage(obstacle, xPosition, cv.height - obstacleHeight);
    }

    jewelRandomHeightPosition(xPosition);

    if (gameOver == true) {
      loop = false;
    }
  }
}


/*************************************

CHARACTER 

*************************************/

// shows chosenCharacter
function showChosenCharacter() {

  if (personagem == 'Wolf') {
    chosenCharacter.width = "120%";
    chosenCharacter.height = "120%";
  } else if (personagem == 'Mavis') {
    chosenCharacter.width = "50%";
    chosenCharacter.height = "50%";
  }

  chosenCharacter.onload = () => {
    ctx.drawImage(chosenCharacter, 0, cv.height - chosenCharacter.height);
  }
}

// function to make the character walk
function characterWalk() {
  /*
  IDEIA:
  Criar uma animação de cada personagem com setInterval, de modo que cada um vai ter o seu tempo de animação.
    Wolf: 80ms,
    Mavis: 40 ms,
    Kitty: 30 ms.
  */
}

// function to make the character jump
function characterJump() {
  /*
  IDEIA:
  Mexer com as coordenadas x e y do personagem para que se tenha a sensação de pulo.
  A ideia também é fazer com que seja possível dar mais de um pulo, ou seja, permitir o pulo duplo, triplo etc.
  */
}

function colision2obstacle() {
  /*
  IDEIA:
  Implementar a colisão do personagem com o obstáculo.
  */
}

function pickUpJewel() {
  /*
  IDEIA:
  Implementar a captura da jóia/colisão com a jóia.
  */
}


/*************************************

JEWEL 

*************************************/

// get random position of the jewel
function jewelRandomHeightPosition(xObstacle) {
  /*
  IDEIA:
  Tornar a aparição do fragmento/jóia randômica e em posições verticais diferentes.
  */
  var randomHeight = Math.floor(Math.random() * 200) + 5;
  var randomAppearence = Math.floor(Math.random() * 2);
  var jewelNewHeight;

  if (randomAppearence == 1) {
    jewelAppeared = true;
    jewelNewHeight = 470 - randomHeight;
    jewel.onload = function() {
      ctx.drawImage(jewel, xObstacle + 25, jewelNewHeight);
    }
  }
}


/*************************************

GAME

*************************************/

// function that controls the game and its loops
function game() {
  ctx.clearRect(0, 0, cv.width, cv.height);  // clears all the elements in menu or any screen before
  cv.style.backgroundColor = '';  // changes the background color

  startButton.style.display = 'none';
  selectedDificuldade.style.display = 'none';
  selectedAnimal.style.display = "none";

  vida_fragmento_text.style.display = '';

  dicaText.style.display = "block";

  // background image
  cv.style.backgroundImage = "url('Imagens/Background/background4_final.jpg')";  // sets background image

  if (dificuldade == 'Fácil') {
    velocidade = velocidadeDificuldades[0];
  } else if (dificuldade == 'Normal') {
    velocidade = velocidadeDificuldades[1];
  } else if (velocidade == 'Expert') {
    velocidade = velocidadeDificuldades[2];
  }
  console.log(dificuldade);

  if (gameOver == false) {
    // obstacle
    timer_obstacle = setInterval(moveObstacle, velocidade);

    // character

    // colision
    // if (colision == true) {
    //   gameOver = true;
    // }
  }
}

// restarts the game
function restartGame() { }


/*************************************

MAIN

*************************************/

// Main function
function main() {
  menu();
}

main();