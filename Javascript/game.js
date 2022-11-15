// Canvas global variables
var cv = document.getElementById("cv");
var ctx = cv.getContext("2d");

cv.style.border = "solid black 3px";

var ALTURA = 600;
var LARGURA = 600;

cv.width = LARGURA;
cv.height = ALTURA;

// global variables
var obstacle = document.getElementById("obstacleImage");  // imagem do obstáculo
var obstacleHeight = 99;

var selectedAnimal = document.getElementById('personagens');  // select com as opções de persogame e a opção selecionada
var chosenCharacter = document.getElementById('characterImage');  // imagem do personagem escolhido
var personagem = '';
var counterImage = 1;

var selectedDificuldade = document.getElementById('dificuldade'); // select com as opções de dificuldade e a opção selecionada
var dificuldade = '';

var jewel = document.getElementById('jewelImage');  // imagem do fragmento/jóia
var jewelAppeared = false;  // Verifica se a jóia apareceu ou não para o controle de colisão com a jóia

var startButton = document.getElementById('startButton');  // botão de iniciar
startButton.disabled = true;

var personagemSelecionado = false;  // Verifica se o jogador selecionou um personagem
var dificuldadeSelecionada = false; // Verifica se o jogador selecionou uma dificuldade

// verifica a opção de personagem escolhida e, se não for válida (no caso, "Escolha o seu personagem..."), a variável booleana personagemSelecionado é false. Caso contrário, a variável personagemSelecionado é true. Além disso, caso personagemSelecionado e dificuldadeSelecionada forem true, habilita o botão de start. Caso contrário, ele fica desabilitado.
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

// verifica a opção de dificuldade escolhida e, se não for válida (no caso, "Escolha a dificuldade..."), a variável booleana dificuldadeSelecionada é false. Caso contrário, a variável dificuldadeSelecionada é true. Além disso, caso personagemSelecionado e dificuldadeSelecionada forem true, habilita o botão de start. Caso contrário, ele fica desabilitado.
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
var colisionObstacle = false;  // verifica se houve colisão com obstáculo
var colisionJewel = false; // verifica se houve colisão com a jóia

var dicaText = document.getElementById("dicaText");

var vida_fragmento_text = document.getElementById("counters");
// var numLife = document.getElementById("numVidas");  // Estou pensando em tirar isso
var numFragmentos = document.getElementById("numFragmentos");

var tempoParagrafoText = document.getElementById("tempoParagrafo");  // parágrafo do texto do contador de tempo
var contadorTempo = document.getElementById('contadorTempo').innerText;  // contador que terá seu valor decrementado ao longo do tempo. Além disso, será incrementado quando tiver colisão com uma jóia/um fragmento

var tempoAdicionalText = document.getElementById('tempoAdicionalText');  // texto que será mostrado quando houver colisão com o fragmento
var totaltempoAdicional = document.getElementById('tempoAdicional');  // valor do tempo que será adicionado quando houver colisão com o fragmento

var velocidadeDificuldades = [200, 400, 600];  // easy: 200ms, normal: 400ms and expert: 600ms
var intervalAnimals = [80, 30, 40]; // used in setInterval. Each animal has its own interval (Wolf: 80ms, Kitty: 30ms and Mavis: 40ms)
var tempoLoopDificuldade = [10000, 6000, 4000];  // tempo no qual o jogo rodará de acordo com a dificuldade

var timer_obstacle, timer_characterWalk;
var velocidade_dificuldade_obstacle, intervalCharacterAnimation;
var tempoPorDificuldade = -1;
var xObstacle = 601;

// A partir da escolha da dificuldade, a variável velocidade_dificuldade_obstacle recebe o valor correspondente da velocidade do obstáculo presentes no vetor velocidadeDificuldades
dificuldade = selectedDificuldade.options[selectedDificuldade.selectedIndex].text;
if (dificuldade == 'Fácil') {
  velocidade_dificuldade_obstacle = velocidadeDificuldades[0];
  tempoPorDificuldade = tempoLoopDificuldade[0];
} else if (dificuldade == 'Normal') {
  velocidade_dificuldade_obstacle = velocidadeDificuldades[1];
  tempoPorDificuldade = tempoLoopDificuldade[1];
} else if (dificuldade == 'Expert') {
  velocidade_dificuldade_obstacle = velocidadeDificuldades[2];
  tempoPorDificuldade = tempoLoopDificuldade[2];
}

// A partir da escolha do personagem, a variável intervalCharacterAnimation recebe o valor correspondente do intervalo da animação presentes no vetor intervalAnimals
if (personagem == "Wolf") {
  intervalCharacterAnimation = intervalAnimals[0];
} else if (personagem == "Mavis") {
  intervalCharacterAnimation = intervalAnimals[2];
}


// Functions

/*************************************

MENU 

*************************************/

// Loads the menu
function menu() {   // OK, it's working
  /*
  IDEIA:
  Desenhar o menu no canvas.
  */

  // big green rect
  cv.style.backgroundColor = "#383C5C";

  // title
  ctx.font = "100px Comic Sans MS";
  ctx.fillStyle = "#FCE6E3";



  ctx.fillText("Wolf Run", (cv.width / 2) - 225, 350);

  // small rect
  ctx.fillStyle = "rgba(255, 255, 255, 0.10)";
  ctx.fillRect(0, 400, 600, cv.height);

  // content small rect
  // 1 - Text
  var text1 = "Antes de começar, escolha um personagem e"
  var text2 = "uma dificuldade";

  var xText1 = 70;
  var yText1 = 350 + 100;

  ctx.fillStyle = "black";
  ctx.font = "23px Arial";
  ctx.fillText(text1, xText1, yText1);
  ctx.fillText(text2, xText1 + 150, yText1 + 30);

  // 2 - Authors
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
function moveObstacle() {  // BugFix
  /*
  IDEIA:
  Começar com posição x = 601 e ir andando para frente até x = -obstacle.width; 
  Quando chegar em x = -obstacle.width, retornar para x = 601 e assim por diante até a pessoa perder ou ganhar.
  */

  var dx = 2;
  const loop = setInterval(() => {
    if (gameOver == false) {
      xObstacle -= dx;
      ctx.clearRect(xObstacle, cv.height - obstacleHeight, obstacle.width, obstacleHeight);
      if (xObstacle == -obstacle.width) {
        xObstacle = 601;
      }
      // obstacle.onload = function() {
      ctx.drawImage(obstacle, xObstacle, cv.height - obstacleHeight);
      // }

      jewelRandomHeightPosition(xObstacle);

      colision2obstacle();
    }
  }, velocidade_dificuldade_obstacle);
}


/*************************************

CHARACTER 

*************************************/

// shows chosenCharacter and its animation
function walkingAnimal(nImages, character) {
  if (counterImage == nImages) {
    counterImage = 1;
  } else {
    counterImage += 1;
  }
  chosenCharacter.src = 'Imagens/Personagens/' + character + '/' + character + counterImage + '.gif';
  chosenCharacter.style.display = 'block';
}

function chosenCharacterWalking() {   // BugFix

  var personagemEscolhido = selectedAnimal.options[selectedAnimal.selectedIndex].id;
  // console.log(personagemEscolhido);

  if (personagemEscolhido == 'wolf') {
    chosenCharacter.width = "120%";
    chosenCharacter.height = "120%";
    walkingAnimal(21, personagemEscolhido);
    chosenCharacter.onload = function() {
      ctx.drawImage(chosenCharacter, 0, cv.height - chosenCharacter.height);
    }
  } else if (personagemEscolhido == 'mavis') {
    chosenCharacter.width = "50%";
    chosenCharacter.height = "50%";
    walkingAnimal(24, personagemEscolhido);
    chosenCharacter.onload = function() {
      ctx.drawImage(chosenCharacter, 0, cv.height - chosenCharacter.height);
    }
  }
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
  const loop = setInterval(() => {
    const posObstacle = obstacle.offsetLeft;
    const posCharacterBottom = chosenCharacter.bottom.replace('px', '');
    const posCharacterLeft = chosenCharacter.left.replace('px', '');
    const lenObstacle = +obstacle.style.width.replace('px', '');
    const lenCharacter = +chosenCharacter.style.width.replace('px', '');

    if (posObstacle <= lenCharacter && posObstacle > 0 && posCharacterBottom < obstacleHeight) {
      gameOver = true;
      chosenCharacter.style.bottom = `${posCharacterBottom}px`;
      chosenCharacter.src = 'Imagens/Derrota/fire2.png';

      obstacle.style.left = `${posObstacle}px`;

      clearInterval(loop);
    } else if (posCharacterLeft >= posCharacterLeft + lenObstacle && posCharacterBottom >= obstacleHeight) {
      tempo -= 1;
      contadorTempo = tempo;
    }
  }, 10);
}

function pickUpJewel() {
  /*
  IDEIA:
  Implementar a colisão com a jóia.
  */
}


/*************************************
 
JEWEL 
 
*************************************/

// get random position of the jewel
function jewelRandomHeightPosition(xObstacle) {
  /*
  IDEIA:
  Tornar a aparição do fragmento/jóia randômica e em posições no eixo y diferentes.
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
  tempoParagrafoText.style.display = '';

  dicaText.style.display = "";

  // background image
  cv.style.backgroundImage = "url('Imagens/Background/background4_final.jpg')";  // sets background image

  ctx.fillStyle = 'black';
  ctx.font = "23px Arial";
  textDificuldadeGame = 'Dificuldade ' + dificuldade
  ctx.fillText(textDificuldadeGame, (cv.width / 2) - (textDificuldadeGame.length + 80), 30);
  ctx.fill();

  gameStarted = true;
  gameOver = false;

  // if (gameStarted == true && gameOver == false) {
  // obstacle
  // timer_obstacle = setInterval(moveObstacle, velocidade_dificuldade_obstacle);

  // character
  timer_animal = setInterval(chosenCharacterWalking, intervalCharacterAnimation);

  // colision
  if (colisionObstacle == true) {
    gameOver = true;
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





//Test Alex







// REQUEST ANIMATION FRAME
/*


var test_image_animal = document.getElementById("testAlex");
var current_image_cnt = 1;
var test_personnagem_escolhida = 'kitty';
var img_path_test = "Imagens/Personagens/";
var max_img_personnagem_escolhida = 14;

var test_global_ID;
var canvas2 = document.getElementById("canvas2");
var ctx2 = canvas2.getContext('2d');
var loaded_personagem_imgs = [];
for (var i = 0; i < max_img_personnagem_escolhida; i++) {
  loaded_personagem_imgs[i] = new Image();
  loaded_personagem_imgs[i].src = img_path_test + test_personnagem_escolhida + "/" + test_personnagem_escolhida + current_image_cnt + ".gif";
}

let start, previousTimeStamp;
let done = false



var canvas2 = document.getElementById("canvas2");
var ctx2 = canvas2.getContext('2d');
var loaded_personagem_imgs = [];
for (var i = 0; i < max_img_personnagem_escolhida; i++) {
  loaded_personagem_imgs[i] = new Image();
  loaded_personagem_imgs[i].src = img_path_test + test_personnagem_escolhida + "/" + test_personnagem_escolhida + current_image_cnt + ".gif";
}

function animationAnimal() {
  ctx2.clearRect(0, 0, 1000, 1000)
  ctx2.save();
  if (!!loaded_personagem_imgs[Math.round(Date.now()) % loaded_personagem_imgs.length]) {
    ctx2.drawImage(loaded_personagem_imgs[Math.round(Date.now()) % loaded_personagem_imgs.length], 100, 100);

  }
  ctx2.restore();
  test_global_ID = requestAnimationFrame(animationAnimal);
}
test_global_ID = requestAnimationFrame(animationAnimal);
*/




/*
function animationAnimal() {
  if (current_image_cnt >= max_img_personnagem_escolhida) {
    current_image_cnt = 1;
  }
  else {
    current_image_cnt += 1;
  }
  //test_image_animal.src = "Imagens/Personagens/kitty/kitty10.gif";
  test_image_animal.src = img_path_test + test_personnagem_escolhida + "/" + test_personnagem_escolhida + current_image_cnt + ".gif";
  test_global_ID = requestAnimationFrame(animationAnimal);
}
test_global_ID = requestAnimationFrame(animationAnimal);*/

//setInterval(animationAnimal, 30);* /
//Fim test alex