//OBJETOS EN PANTALLA
let character;
let bowser;

let fire;
let life1;
let life2;
let life3;
let pipe;
let coinCount;
let cloud;
let cloudMario;
let cubesLevel1 = [];
let cubesLevel2 = [];
let attacks = [];

let onlyOneAttack;

let coins = [];
let fires = [];
let fireballs = [];
let lavas = [];
let castle;

//IMAGENES CARGADAS
let marioImg;
let imgFire;
let imgCube;
let imgLife;
let imgPipe;
let imgCoin;
let imgCoinCount;
let imgCloud;
let imgFireBallUp;
let imgFireBallDown;
let imgCastle;
let imgBowser;

//FUENTE
let marioFont;

//AUXILIARES
let lastPositionCubeX = 400;
let positionInitialX = 100;
let positionInitialY = 0;
let pipePosition = -30;

//BOOLEANOS
let finish = false;
let win = false;
let gameOver = false;

let pipeVisible = true;
let cloudFly = false;

//NIVELES
let actualLevel = 2;

function preload(){
    marioImg = loadImage('./imgs/mario.png')
    imgFire = loadImage('./imgs/fire.gif')
    imgCube = loadImage('./imgs/bloque.png')
    imgLife = loadImage('./imgs/heart.png')
    imgPipe = loadImage('./imgs/tube.png')
    imgCoin = loadImage('./imgs/coin-spin.gif')
    imgCoinCount = loadImage('./imgs/coinCount.png')
    imgCloud = loadImage('./imgs/cloud.png')
    imgFireBallUp = loadImage('./imgs/fireballUp.gif')
    imgFireBallDown = loadImage('./imgs/fireballDown.gif')
    imgLava = loadImage('./imgs/lava.png')
    imgCastle = loadImage('./imgs/castle.png')
    imgCastleWallPaper = loadImage('./imgs/castilloFondo.gif')
    imgAttackFireBll = loadImage('./imgs/AttackFireball.png')
    imgBowser = loadImage('./imgs/bowser.png')

    marioFont = loadFont('SuperMarioBros.ttf');

}

function setup() {

    textFont(marioFont);

    createCanvas(1250, 600)

    if(actualLevel === 1){
        level1SetUp();
    }
    if (actualLevel === 2){
        level2SetUp();
    }
    if(actualLevel === 3){
        level3SetUp();
    }
}

function draw(){
    //FONDO

    if(actualLevel === 1){
        background(99, 152, 251);
        drawLevel1();
    }
    if(actualLevel === 2){
        background(0);
        drawLevel2();
    }
    if(actualLevel === 3){
        background(imgCastleWallPaper);
        drawLevel3();
    }
}

function level1SetUp(){
    character = new Character(positionInitialX, positionInitialY, 20, 3.5 , marioImg)

    pipe = new Pipe(-30, 150, 1, imgPipe)

    life1 = new Life(950, 50, imgLife)
    life2 = new Life(980, 50, imgLife)
    life3 = new Life(1010, 50, imgLife)

    coinCount = new Coin(1060, 37, 0, imgCoinCount)

    for (aux = 0; aux < width; aux += imgFire.width) {
        fire = new Fire(aux, height - imgFire.height, 0, imgFire);
        fires.push(fire);
    }

    lastPositionCubeX = 400;
    cubesLevel1 = []
    coins = []

}

function level2SetUp(){
    character = new Character(positionInitialX, positionInitialY, 20, 3.5 , marioImg);

    //VIDAS
    life1 = new Life(950, 50, imgLife)
    life2 = new Life(980, 50, imgLife)
    life3 = new Life(1010, 50, imgLife)

    //ESCALERA DE CUBOS

    cubesLevel2 = [];

    for(i = 0; i < 5; i++){
        cubesLevel2.push(new Cube((imgCube.width * 5) + (imgCube.width * i), height - (2 * imgCube.height), 0, imgCube))
    }
    for(i = 0; i < 4; i++){
        cubesLevel2.push(new Cube((imgCube.width * 6) + (imgCube.width * i), height - (3 * imgCube.height), 0, imgCube))
    }
    for(i = 0; i < 3; i++){
        cubesLevel2.push(new Cube((imgCube.width * 7) + (imgCube.width * i), height - (4 * imgCube.height), 0, imgCube))
    }

    //CUBO 3X3
    for (i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            cubesLevel2.push(new Cube((imgCube.width * 13) + (imgCube.width * j), height - (2 * imgCube.height) - (imgCube.height * i), 0, imgCube));
        }
    }

    //CUBOS 2X3
    for (let x = 18; x <= 30; x += 4) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 2; j++) {
                cubesLevel2.push(new Cube((imgCube.width * x) + (imgCube.width * j), height - (2 * imgCube.height) - (imgCube.height * i), 0, imgCube));
            }
        }
    }

    //BASE CASTILLO
    for (i = 0; i < 3; i++) {
        for (let j = 0; j < 8; j++) {
            cubesLevel2.push(new Cube((imgCube.width * 34) + (imgCube.width * j), height - (2 * imgCube.height) - (imgCube.height * i), 0, imgCube));
        }
    }

    //BOLAS DE FUEGO
    fireballs = [];

    for(i=0; i < 5; i++){
        fireballs.push(new FireBall(490 + (120*i), 520, 6+i, imgFireBallUp, imgFireBallDown))
    }
    fireballs.push (new FireBall (325, 520, 5, imgFireBallUp, imgFireBallDown))

    //LAVAS
    lavas = [ ];

    for(i=0; i < 4; i++){
        lavas.push(new FireBall(300 + (i*180) , height - imgLava.height - imgCube.height , 0, imgLava))
    }

    //SUELO DE CUBE - UNA FILA
    fires = [];

    for (aux = 0; aux < width; aux += imgCube.width) {
        fire = new Fire(aux, height - imgCube.height, 0, imgCube);
        fires.push(fire);
    }

    for (i = 0; i < fires.length; i++) {
        fires[i].draw();
    }

    //MONEDAS
    coinCount = new Coin(1060, 37, 0, imgCoinCount)
    
    //CASTILLO
    castle = new Fire(1100, 340, 0, imgCastle)

}

function level3SetUp(){

    character = new Character(positionInitialX, positionInitialY, 20, 3.5 , marioImg);
    bowser = new Character(800, 300, 1, 3.5, imgBowser)

    //VIDAS
    life1 = new Life(1100, 50, imgLife)
    life2 = new Life(1130, 50, imgLife)
    life3 = new Life(1160, 50, imgLife)

    fires = [];

    for(i = 0; i < 5; i++){
        fires.push(new Cube((imgCube.width * 0) + (imgCube.width * i), height - (1 * imgCube.height), 0, imgCube))
    }

    cloudMario = new Cloud (230, 500, 3, imgCloud);
    cloudBowser = new Cloud(800, 360, 3, imgCloud);

}

function drawLevel1(){
    //DIBUJA LOS CORAZONES DE VIDA
    if(character.life === 3){
        life1.draw()
        life2.draw()
        life3.draw()
    } else if (character.life === 2){
        life3.draw()
        life2.draw()
    } else if (character.life === 1){
        life3.draw()
    }

    //CUBOS ALEATORIAMENTE
    let random = Math.floor(Math.random() * (400 - 300 + 1)) + 300;
    
    cubesLevel1.push(new Cube(lastPositionCubeX, random, 3, imgCube));
    coins.push(new Coin(lastPositionCubeX - 10, random - 75, 3, imgCoin))
    lastPositionCubeX += 205;
    
    for(i = cubesLevel1.length - 1 ; i >= 0 ; i--){
        cubesLevel1[i].move();
        cubesLevel1[i].draw();
    }
    
    for(i = coins.length - 1 ; i >= 0 ; i--){
        coins[i].move();
        coins[i].draw();
    }

    //DIBUJA EL SUELO DE FUEGO
    for (i = 0; i < fires.length; i++) {
        fires[i].draw();
    }

    //DIBUJA LA TUBERIA
    pipe.move();
    pipe.draw();

    //HACE QUE SE PUEDA MARIO QUEDAR ENCIMA DE CUBOS Y TUBERIA
    character.update();

    //COLISIONES
    character.isCollidingPipe(pipe);
    character.isCollidingCube(cubesLevel1);
    character.isCollidingCoins(coins);
    character.isCollidingFires(imgFire);

    //DIBUJA MARIO 
    character.draw()

    //MONEDAS
    coinCount.draw();
    textSize(35);
    fill(255);
    text(character.coinsCollected, 1105, 74)

    //WIN

}

function drawLevel2(){
    //DIBUJA VIDAS
    if(character.life === 3){
        life1.draw()
        life2.draw()
        life3.draw()
    } else if (character.life === 2){
        life3.draw()
        life2.draw()
    } else if (character.life === 1){
        life3.draw()
    }

    for(i = 0; i < fireballs.length ;i++){
        fireballs[i].draw();
        fireballs[i].move()
    }

    //DIBUJA EL SUELO DE BLOQUES
    for (i = 0; i < fires.length; i++) {
        fires[i].draw();
    }

    //LAVAS
    for (i = 0; i < lavas.length; i++) {
        lavas[i].draw()
    }

    //DIBUJAR CUBOS EN EL SUELO
    for(i = 0; i < cubesLevel2.length ;i++){
        cubesLevel2[i].draw();
    }

    //CASTILLO
    castle.draw()

    //COLISIONES
    character.isCollidingFloor(imgCube);
    character.isCollidingCube(cubesLevel2);
    character.isCollidingFireBall(fireballs);
    character.isCollidingFireBall(lavas);
    character.isCollidingCastle(castle)

    
    character.update();
    character.draw()

    //MONEDAS
    coinCount.draw();
    textSize(35);
    fill(255);
    text(character.coinsCollected, 1105, 74)
}

function drawLevel3(){
    //DIBUJA VIDAS
    if(character.life === 3){
        life1.draw()
        life2.draw()
        life3.draw()
    } else if (character.life === 2){
        life3.draw()
        life2.draw()
    } else if (character.life === 1){
        life3.draw()
    }

    //BLOQUES INICIALES
    for (i = 0; i < fires.length; i++) {
        fires[i].draw();
    }

    //COLISIONES
    character.isCollidingCube(fires)
    character.isCollidingCloud(cloudMario)

    bowser.isCollidingCloud(cloudBowser)
    

    if(cloudFly){
        if(keyIsDown(32) && onlyOneAttack === true){
            attacks.push(new BallAttack(character.positionX, character.positionY + 15  , 7, imgAttackFireBll))
            onlyOneAttack = false;
        }
        for(i=0; i < attacks.length; i++){
            attacks[i].moveMario();
            attacks[i].draw();
        }
        if(!keyIsDown(32)){
            onlyOneAttack = true;
        }
    }

    character.update();


    bowser.draw()

    character.draw()

    cloudMario.update()
    cloudMario.draw()

    cloudBowser.bowserDefense()
    cloudBowser.draw()

}