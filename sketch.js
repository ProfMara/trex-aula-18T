var soloSprite, soloImagem;
var trex, trexAnimacao, trexColidido;
var solo;
var nuvemImagem;
var o1, o2, o3, o4, o5, o6;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var grupoCacto;
var grupoNuvem;
var gameOverImg;
var gameOver;

function preload() {
    //é assim que carrega a animação
    trexAnimacao = loadAnimation("trex1.png","trex2.png","trex3.png");
    trexColidido = loadAnimation("trex_colidido.png");
    
    //é assim que carrega imagem
    soloImagem = loadImage("solo.png");
    nuvemImagem = loadImage("nuvem.png");
    o1 = loadImage("obs1.png");
    o2 = loadImage("obs2.png");
    o3 = loadImage("obs3.png");
    o4 = loadImage("obs4.png");
    o5 = loadImage("obs5.png");
    o6 = loadImage("obs6.png");
    gameOverImg = loadImage("gameOver.png");

    //é aqui que carrega os sons....
    //carregando os sons....


}


function setup() {
    createCanvas(600, 200);
    //é aqui que cria as sprites
    //solo
    solo = createSprite(300,180,600, 20);
    solo.addImage(soloImagem);
    solo.velocityX = -3;

    //solo invisível
    soloInvisivel = createSprite(300,195,600,20);
    soloInvisivel.visible = false;

    //trex 
    trex = createSprite(50,170,50,50);
    //adiciona a animação dele correndo
    trex.addAnimation("correndo",trexAnimacao);
    //adicionando a animação do trex colidido..
    trex.addAnimation("colidido", trexColidido);
    trex.scale=0.5;

    trex.setCollider("rectangle", 00, 0, 70, 70);
    trex.debug = false;

    //criando a sprite restart...


    //criando a sprite gameOver... 
    gameOver = createSprite(300,100,50,50);
    //adicionar a imagem na sprite
    gameOver.addImage(gameOverImg);
    //definir o tamanho da imagem
    gameOver.scale = 0.5; 
    //deixar a sprite invisível
    gameOver.visible = false;

    //criar os grupos
    grupoCacto = new Group();
    grupoNuvem = new Group();
}


function draw() {
    //pinta o fundo de uma cor
    background("white");
    //checar se gameState é PLAY
    if(gameState == PLAY){
        //é assim que chama as funções
        criarCactos();
        criarNuvens();

        //verifica se a pessoa apertou a tecla espaço
        if(keyDown("space") && trex.isTouching(solo) ){
            //dá velocidade para o trex voar
            trex.velocityY = -10;
        }

        //checa se o solo saiu da tela
        if(solo.x < 0){
            //se sim, ele volta para a metade do jogo 
            solo.x = width/2;
        }

        //checar se o trex está tocando no grupo de cacto
        if(trex.isTouching(grupoCacto)){
            gameState = END;
        }
    }
    
    //checar se gameState é END
    if(gameState == END){

        solo.velocityX = 0;
        gameOver.visible = true;
        grupoNuvem.setVelocityXEach(0);
        grupoCacto.setVelocityXEach(0);
        trex.changeAnimation("colidido");
        grupoCacto.setLifetimeEach(-1);
        grupoNuvem.setLifetimeEach(-1);

    }
    //esse código dá gravidade para o trex cair
    trex.velocityY += 0.8;
    //manda o trex colidir com o solo
    trex.collide(soloInvisivel);
    //desenha as sprites
    drawSprites();
}
//cria a função criarNuvens
function criarNuvens(){
    //determina o que ocorre a cada 90 quadros
    if(frameCount % 90 == 0){
        //cria a sprite da nuvem em uma posição Y aleatória
        var nuvem = createSprite(600,Math.round(random(70,150)),75,20);
        //adiciona a imagem
        nuvem.addImage(nuvemImagem);        
        //define velocidade
        nuvem.velocityX = -3;
        //define o tamanho
        nuvem.scale = 0.5;
        //deixa o trex na frente
        trex.depth = nuvem.depth + 1;
        //define o tempo de vida 
        nuvem.lifetime = 200;
        //adiciona as nuvens no grupo de nuvens
        grupoNuvem.add(nuvem);
    }
}

function criarCactos(){
    if(frameCount % 60 == 0){
        var cacto = createSprite(600,170,50,50);
        var a = Math.round(random(1,6));
        switch(a){
            case 1: cacto.addImage(o1);
            break;
            case 2: cacto.addImage(o2);
            break;
            case 3: cacto.addImage(o3);
            break;
            case 4: cacto.addImage(o4);
            break;
            case 5: cacto.addImage(o5);
            break;
            case 6: cacto.addImage(o6);
            break;
        }
        cacto.velocityX = -3;
        cacto.scale = 0.5;
        cacto.lifetime = 200;
        grupoCacto.add(cacto);
    }
}