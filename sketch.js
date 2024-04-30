// variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 18;
let raio = diametro / 2;

// velocidade da bolinha
let velocidadeXBolinha = 7;
let velocidadeYBolinha = 7;

// variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 100;

// variaveis da raquete do oponente

let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

// placar do jogo

let meusPontos = 0;
let pontosDoOponente = 0;

// Chance de errar do oponente

let chanceDeErrar = 0;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background("black");

  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBordas();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaocomRaquete()
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaqueteBiblioteca(xRaquete, yRaquete);
  verificaColisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  bolinhaPressa();

}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBordas() {
  if (xBolinha > width - raio || xBolinha < raio) {
    velocidadeXBolinha *= -1;
  }

  if (yBolinha > height - raio || yBolinha < raio) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 7;
  }

  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 7;
  }
}

function verificaColisaocomRaquete() {
  if (
    xBolinha < xRaquete + raqueteComprimento + raio &&
    yBolinha > yRaquete - raio &&
    yBolinha < yRaquete + raqueteAltura + raio
  ) {
    velocidadeXBolinha *= -1;
  }
}

function verificaColisaoRaqueteBiblioteca(x, y) {
  colidiu = collideRectCircle(
    x,
    y,
    raqueteComprimento,
    raqueteAltura,
    xBolinha,
    yBolinha,
    raio
  );

  if (colidiu) {
    velocidadeXBolinha *= -1;
  }
}

function movimentaRaqueteOponente() {
  velocidadeYOponente =
    yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  
  calculaChanceDeErrar();
}

function incluiPlacar(){
  stroke("white")
  fill("DarkOrange");
  rect(128, 10, 45, 25);
  rect(428, 10, 45, 25);
  
  fill("white");
  textAlign(CENTER);
  textSize(20);
  text(meusPontos, 150, 30);
  text(pontosDoOponente, 450, 30);

}
  
function marcaPonto () {
  if (xBolinha < 10) {
    pontosDoOponente += 1;
  }
  
  if (xBolinha > 590) {
    meusPontos += 1;
  }
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }

}

function bolinhaPressa() {
  if(xBolinha - raio < 0) {
    xBolinha = 30
  }
  if(xBolinha + raio > width) {
    xBolinha = width - 30
  }
}