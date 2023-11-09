//OBJETOS EN PANTALLA
let character;
let bowser;

let player;
let nombre = '';
let difficult = 1;
let objetivo;

let fire;

let lifesMario = [];
let lifesBowser = [];

let pipe;
let coinCount;
let cloud;
let cloudMario;
let cubesLevel1 = [];
let cubesLevel2 = [];
let attacks = [];
let attacksBowser = [];

let onlyOneAttack;

let coins = [];
let coinsLevel2 = [];
let fires = [];
let fireballs = [];
let lavas = [];
let castle;

//FUENTE
let marioFont;

//AUXILIARES
let lastPositionCubeX;
let positionInitialX;
let positionInitialY;
let pipePosition = -30;

//BOOLEANOS
let finish = false;
let win = false;
let gameOver = false;

let pipeVisible = true;
let cloudFly = false;

let firstTime = true;

let speedCubeAndCoins = 3;
let speedFireballs = 5;
let speedAttacksBowser = 1000;

let tiempoUltimoAtaque;

//NIVELES
let actualLevel = 0;

function mostrarJuego() {

    document.getElementById('firstScreen').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    document.getElementById('objetivo').style.display = 'block';

    // Obtener el valor del input y mostrarlo en div2
    nombre = document.getElementById('name').value;
    
    
}

function selectButton(id) {
    let buttons = document.querySelectorAll('button');
    let selectedButton = document.getElementById(id);

    buttons.forEach((button) => {
        button.classList.remove('selected');
        button.style.transform = "translateY(0px)"; 
    });

    selectedButton.classList.add('selected');

    selectedButton.style.transform = "translateY(-10px)";


    if (id === 'easy') {
        difficult = 1;
        difficultFunction(1);
    } else if (id === 'normal') {
        difficult = 2;
        difficultFunction(2);
    } else if (id === 'hard') { 
        difficult = 3;
        difficultFunction(3);
    }
}

function difficultFunction(difficult){
    if (difficult === 1) {
        speedCubeAndCoins = 3;
        speedFireballs = 4;
        speedAttacksBowser = 1000;
    } else if (difficult === 2) {
        speedCubeAndCoins = 4;
        speedFireballs = 6;
        speedAttacksBowser = 600;
    } else if (difficult === 3) { 
        speedCubeAndCoins = 5;
        speedFireballs = 9;
        speedAttacksBowser = 300;
    }
}

function preload(){

    marioImg = loadImage('./imgs/mario.png')
    luigiImg = loadImage('./imgs/luigi.png')

    seleccionMario = loadImage('./imgs/seleccionMario.png')
    seleccionLuigi = loadImage('./imgs/seleccionLuigi.png')

    imgFire = loadImage('./imgs/fire.gif')
    imgCube = loadImage('./imgs/bloque.png')
    imgLife = loadImage('./imgs/heart.png')
    imgLifeBowser = loadImage('./imgs/heartBowser.png')
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
    imgAttackFireBllBowser = loadImage('./imgs/AttackFireballBowser.gif')
    imgMarioWin = loadImage ('./imgs/win.gif')

    marioFont = loadFont('SuperMario256.ttf');
    
    coinSound = loadSound('./sounds/coinSound.mp3')
    jumpSound = loadSound('./sounds/jumpSound.mp3')
    looserSound = loadSound('./sounds/looserSound.mp3')
    gameOverSound = loadSound('./sounds/gameOver.mp3')
    winSound =  loadSound('./sounds/winSound.mp3')

    gameSound = loadSound('./sounds/game.mp3')

}

function setup() {

    //player = luigiImg;
    textFont(marioFont);

    let canvas = createCanvas(1250, 600)
    canvas.parent('juego')

    gameSound.stop();
    if(actualLevel === 1){
        level1SetUp();
        gameSound.play();
    }
    if(actualLevel === 2){
        level2SetUp();
        gameSound.play();
    }
    if(actualLevel === 3){
        level3SetUp();
        gameSound.play();
    }
}

function draw(){

    if(gameOver){
        clear();

        gameSound.stop();

        fill(250);
        textSize(52);
        textFont(marioFont);
        textAlign(CENTER); // Centra el texto horizontal y verticalmente
        text("GAME OVER", width/2, 260)

        textSize(22);
        text("PULSA LA TECLA ENTER PARA VOLVER A EMPEZAR", width/2, 360)
        if(keyIsDown(13)){
            gameOver = false;
            actualLevel = 0;
            clear();
            setup();
            difficultFunction(1);
        }
    }
    if(win){
        clear();
        gameSound.stop();
        fill(250);
        textSize(55);
        textFont(marioFont);
        textAlign(CENTER); // Centra el texto horizontal y verticalmente
        text("!!! VICTORIA !!!", width/2, 300);
        textSize(20);
        text("Pulsa la tecla Enter para volver a empezar", width/2, 400)
        
        attacksBowser = [];

        if(keyIsDown(13)){
            actualLevel = 0;
            clear();
            setup();
            difficult++;
            difficultFunction(difficult);
            winSound.play();

            win = false

        }
    }

    //FONDO
    if(actualLevel === 0 && !gameOver && !win){
        background(0);
        drawLevel0();
        document.getElementById("objetivo").innerHTML = "";
    }
    if(actualLevel === 1 && !gameOver && !win){
        background(99, 152, 251);
        drawLevel1();
        document.getElementById("objetivo").innerHTML = "Consigue 10 monedas 💰"
    }
    if(actualLevel === 2 && !gameOver && !win){
        background(180, 0, 0);
        drawLevel2();
        document.getElementById("objetivo").innerHTML = "Llega al castillo 🏰"
    }
    if(actualLevel === 3 && !gameOver && !win){
        background(imgCastleWallPaper);
        drawLevel3();
        document.getElementById("objetivo").innerHTML = "Derrota a Bowser 🦖 disparando con la tecla espacio"
    } 

}

function level1SetUp(){

    cloudFly = false;
    finish = false;

    //POSICIONES INICIALES
    positionInitialX = 50;
    positionInitialY = 10;

    //MARIO
    character = new Character(positionInitialX, positionInitialY, 20, 3.5 , player, 3)

    //TUBERIA
    pipe = new Pipe(-30, 150, 1, imgPipe)

    //VIDAS
    lifesMario = [];
    let positionFirstLifeMario = 1010;
    for(i = 0; i < character.life; i++){
        lifesMario.push(new Life(positionFirstLifeMario, 50, imgLife))
        positionFirstLifeMario -= 30;
    }

    //MONEDA
    coinCount = new Coin(1130, 37, 0, imgCoinCount)

    //SUELO DE FUEGOS
    for (aux = 0; aux < width; aux += imgFire.width) {
        fires.push(new Fire(aux, height - imgFire.height, 0, imgFire))
    }


    lastPositionCubeX = 400;
    cubesLevel1 = []
    coins = []

}

function level2SetUp(){
    cloudFly = false;

    positionInitialX = 10;
    positionInitialY = 300;

    character = new Character(positionInitialX, positionInitialY, 20, 3.5 , player, 3);

    //VIDAS
    lifesMario = [];
    let positionFirstLifeMario = 1010;
    for(i = 0; i < character.life; i++){
        lifesMario.push(new Life(positionFirstLifeMario, 50, imgLife))
        positionFirstLifeMario -= 30;
    }
    
    //MONEDA
    coinCount = new Coin(1130, 37, 0, imgCoinCount)
    coinsLevel2 = []

    for(i=0; i < 5; i++){
        coinsLevel2.push(new Coin(480+(120*i), 350, 0, imgCoin, imgCoin))
    }

    //ESCALERA DE CUBOS

    cubesLevel2 = [];
    fires = [];
    for(i = 0; i < 42; i++){
        cubesLevel2.push(new Cube((imgCube.width * 7) + (imgCube.width * i), height - (1 * imgCube.height), 0, imgCube))
    }
    for(i = 0; i < 7; i++){
        cubesLevel2.push(new Cube((imgCube.width * 0) + (imgCube.width * i), height - (4 * imgCube.height), 0, imgCube))
    }

    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            cubesLevel2.push(new Cube((imgCube.width * 7) + (imgCube.width * j), height - (2 * imgCube.height) - (imgCube.height * i), 0, imgCube));
        }
    }

    //CUBO 3X3
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            cubesLevel2.push(new Cube((imgCube.width * 13) + (imgCube.width * j), height - (2 * imgCube.height) - (imgCube.height * i), 0, imgCube));
        }
    }

    //CUBOS 2X3
    for (x = 18; x <= 30; x += 4) {
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 2; j++) {
                cubesLevel2.push(new Cube((imgCube.width * x) + (imgCube.width * j), height - (2 * imgCube.height) - (imgCube.height * i), 0, imgCube));
            }
        }
    }

    //BASE CASTILLO
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 8; j++) {
            cubesLevel2.push(new Cube((imgCube.width * 34) + (imgCube.width * j), height - (2 * imgCube.height) - (imgCube.height * i), 0, imgCube));
        }
    }

    //BOLAS DE FUEGO
    fireballs = [];
    fireballs.push (new FireBall (325, 520, speedFireballs-1, imgFireBallUp, imgFireBallDown))
    for(i=0; i < 5; i++){
        fireballs.push(new FireBall(490 + (120*i), 520, speedFireballs+i, imgFireBallUp, imgFireBallDown))
    }

    //LAVAS
    lavas = [ ];
    for(i=0; i < 4; i++){
        lavas.push(new FireBall(300 + (i*180) , height - imgLava.height - imgCube.height , 0, imgLava))
    }

    

    //CASTILLO
    castle = new Fire(1100, 340, 0, imgCastle)

}

function level3SetUp(){

    positionInitialX = 50;
    positionInitialY = 450;

    tiempoUltimoAtaque = 0;


    character = new Character(positionInitialX, positionInitialY, 20, 3.5 , player, 3);
    bowser = new Character(800, 300, 1, 3.5, imgBowser, 10)

    //VIDAS
    lifesMario = [];
    let positionFirstLifeMario = 1150;
    for(i = 0; i < character.life; i++){
        lifesMario.push(new Life(positionFirstLifeMario, 30, imgLife))
        positionFirstLifeMario -= 35;
    }
    lifesBowser = [];
    let positionFirstLifeBowser = 1150;
    for(i = 0; i < bowser.life; i++){
        lifesBowser.push(new Life(positionFirstLifeBowser, 60, imgLifeBowser))
        positionFirstLifeBowser -= 35;
    }

    //BLOQUE INICIO
    fires = [];
    for(i = 0; i < 5; i++){
        fires.push(new Cube((imgCube.width * 0) + (imgCube.width * i), height - (1 * imgCube.height), 0, imgCube))
    }

    //NUBES
    cloudMario = new Cloud (200, 530, 3, imgCloud);
    cloudBowser = new Cloud(800, 360, 3, imgCloud);

    //ATAQUES BOWSER Y MARIO
    attacks = [];

    //ATAQUE BOWSER - MARIO
    // if(firstTime){
    //     setInterval(function() {
    //         attacksBowser.push(new BallAttack(bowser.positionX, bowser.positionY + 15, 7, imgAttackFireBllBowser))
    //         attacksBowser[i].moveMario();
    //         attacksBowser[i].draw();
    //         i++; // Aumenta el valor de i para cada ataque
    //     }, 500);
    //     firstTime = false;
    // }   
}

function drawLevel1(){

    //NOMBRE
    textSize(20)
    fill(0)
    textAlign(LEFT)
    text(nombre,50, 50);

    //DIBUJA LOS CORAZONES DE VIDA
    for (i = 0; i < character.life; i++) {
        lifesMario[i].draw();
    }

    //CUBOS ALEATORIAMENTE
    let random = Math.floor(Math.random() * (400 - 300 + 1)) + 300;
    
    cubesLevel1.push(new Cube(lastPositionCubeX, random, speedCubeAndCoins, imgCube));
    coins.push(new Coin(lastPositionCubeX - 10, random - 75, speedCubeAndCoins, imgCoin))
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
    fires.forEach((fire) => fire.draw())

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
}

function drawLevel2(){

    //NOMBRE
    textSize(20)
    fill(250)
    textAlign(LEFT)
    text(nombre,50, 50);

    //DIBUJA VIDAS
    for (i = 0; i < character.life; i++) {
        lifesMario[i].draw();
    }

    //DIBUJA LOS OBSTACULOS DE FUEGO
    for(i = 0; i < fireballs.length ;i++){
        fireballs[i].draw();
        fireballs[i].move()
    }

    //DIBUJA MONEDAS
    coinsLevel2.forEach((coin) => coin.draw())

    //DIBUJA EL SUELO DE BLOQUES
    fires.forEach((fire) => fire.draw())

    //DIBUJA LA LAVA
    lavas.forEach((lava) => lava.draw())

    //DIBUJAR CUBOS EN EL SUELO
    cubesLevel2.forEach((cube) => cube.draw())

    //CASTILLO
    castle.draw()

    //COLISIONES
    finish = false;

    character.isCollidingCube(cubesLevel2);
    character.isCollidingFireBall(fireballs);
    character.isCollidingFireBall(lavas);
    character.isCollidingCastle(castle);
    character.isCollidingCoins(coinsLevel2);

    character.update();
    character.draw()

    //MONEDAS
    coinCount.draw();
    textSize(35);
    fill(255);
    text(character.coinsCollected, 1105, 74)
}

function drawLevel3(){

    //NOMBRE
    textSize(20)
    fill(250)
    textAlign(LEFT)
    text(nombre,50, 50);

    //BLOQUES INICIALES
    fires.forEach((fire) => fire.draw())

    //ATAQUES MARIO - BOWSER
    if(cloudFly){
        if(keyIsDown(32) && onlyOneAttack){
            attacks.push(new BallAttack(character.positionX, character.positionY + 15  , 7, imgAttackFireBll))
            onlyOneAttack = false;
        }

        attacks.forEach(attack => {
            attack.moveMario();
            attack.draw();
        });

        if(!keyIsDown(32)){
            onlyOneAttack = true;
        }
    }

    //ATAQUES BOWSER - MARIO
    if (millis() - tiempoUltimoAtaque > speedAttacksBowser) {
        attacksBowser.push(new BallAttack(bowser.positionX, bowser.positionY + 15, 7, imgAttackFireBllBowser))
        tiempoUltimoAtaque = millis(); 
    }

    attacksBowser.forEach((attack) => {
        attack.moveBowser();
        attack.draw();
    });

    character.update();

    //COLISIONES MARIO
    character.isCollidingCube(fires)
    character.isCollidingCloud(cloudMario)
    character.isCollidingFires(imgLife);
    character.isCollidingAttack(attacksBowser)

    //COLISIONES BOWSER
    bowser.isCollidingCloud(cloudBowser)
    bowser.isCollidingAttack(attacks);
    

    bowser.draw()

    character.draw()

    cloudMario.update()
    cloudMario.draw()

    cloudBowser.bowserDefense()
    cloudBowser.draw()

     //DIBUJA VIDAS
    for (i = 0; i < character.life; i++) {
        lifesMario[i].draw();
    }
    for (i = 0; i < bowser.life; i++) {
        lifesBowser[i].draw();
    }

    if (bowser.life <= 0){
        win = true;
    }

}

function keyPressed() {
    if(actualLevel === 0){
        if (key === '1') {
            player = marioImg;
            actualLevel=1;
            clear();
            setup();
        } else if (key === '2') {
            player = luigiImg;
            actualLevel=1;
            clear();
            setup();
        }
    }
    
}

function drawLevel0(){
    fill(250);
    textSize(52);
    textFont(marioFont);
    textAlign(CENTER); // Centra el texto horizontal
    text("ELIGE PERSONAJE", width/2, 100)

    textSize(25);
    text("NOMBRE:", width/2, 160)

    textSize(15);
    text(nombre, width/2, 180)

    textSize(32);
    text("MARIO", (width/2) - 300, 230)
    text("LUIGI", (width/2) + 300, 230)

    textSize(22);
    text("PULSA (1) PARA SELECCIONAR A MARIO", (width/2) - 300, 480)
    text("PULSA (2) PARA SELECCIONAR A LUIGI", (width/2) + 300, 480)

    image(seleccionMario, (width/2 - 76) - 300, 250, 152, 200)
    image(seleccionLuigi,(width/2 - 76) + 300, 250, 152, 200)

    text("DIFICULTAD: " +  difficult,  width/2, 600)

}

