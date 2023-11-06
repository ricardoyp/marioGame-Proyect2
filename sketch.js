//OBJETOS EN PANTALLA
let character;

let fire;
let life1;
let life2;
let life3;
let pipe;
let coinCount;
let cloud;
let cubesLevel1 = [];
let cubesLevel2 = [];

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

//FUENTE
let marioFont;

//AUXILIARES
let lastPositionCubeX = 400;
let positionInitialX = 900;
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
}

function level1SetUp(){
    character = new Character(50, 0, 20, 3.5 , marioImg)

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

    //SUELO
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

function draw(){
    //FONDO

    if(actualLevel === 1){
        background(99, 152, 251);

        drawLevel1();
    } if(actualLevel === 2){
        background(0);
        drawLevel2();
    }
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

class Character {
    constructor(positionX, positionY, gravity, speed, imgCharacter){
        this.positionX = positionX
        this.positionY = positionY
        this.gravity = gravity
        this.speed = speed
        this.imgCharacter = imgCharacter
        this.isJumping = true;
        this.life = 3;
        this.coinsCollected = 0;
    }

    update(){
        //MOVER PERSONAJE
        if(!cloudFly){
            //no se mueve
            if(keyIsDown(RIGHT_ARROW)){
                this.positionX += this.speed * 2;
            } else if(keyIsDown(LEFT_ARROW)) {
                this.positionX -= this.speed * 1,5;
            }
        } else if(cloudFly){
            this.gravity = 0; //IMPORTANTE
        }

        //SALTAR
        if(!cloudFly){
            if (keyIsDown(UP_ARROW) && !this.isJumping){
                if(!this.isJumping){
                    this.positionY -= this.gravity * 5;
                    this.isJumping = true;
                }           
            }
        }

        //CAER POR GRAVEDAD
        if(!cloudFly){
            this.positionY += this.gravity * 0.15;
        }

        //SE ASEGURA QUE CAE AL SUELO PARA VOLVER A SALTAR ---- CREO QUE HAY QUE BORRAR
        // if (this.positionY > 475) {
        //     this.positionY = 475;
        //     this.isJumping = false;
        // }

        //COLISION CON CUBOS

        //FINISH
        if(this.life <= 0){
            gameOver = true;
        }
        if(finish){
            this.life -= 1;
            this.positionY = positionInitialY;
            this.positionX = positionInitialX;
            pipeVisible = true;
            finish = false;

        }
        //MONEDAS
        
        //GAMEOVER

    }

    isCollidingCube(cubes){
        for (let i = 0; i < cubes.length; i++) {
            const cube = cubes[i];
            if (
                this.positionX + this.imgCharacter.width > cube.positionX &&
                this.positionX < cube.positionX + cube.imgCube.width &&
                this.positionY + this.imgCharacter.height >= cube.positionY &&
                this.positionY < cube.positionY
            ) {
                // Detener la caída y ajustar la posición
                this.positionY = cube.positionY - this.imgCharacter.height;
                this.isJumping = false;
            }
        }
    }

    isCollidingPipe(pipe){
            if (
                this.positionX + this.imgCharacter.width > pipe.positionX &&
                this.positionX < pipe.positionX + pipe.imgPipe.width &&
                this.positionY + this.imgCharacter.height >= pipe.positionY &&
                this.positionY < pipe.positionY
            ) {
                this.positionY = pipe.positionY - this.imgCharacter.height;
                this.isJumping = false;
                //pipeVisible = false;
            }
        }

    isCollidingFires(img){
        if(this.positionY + this.imgCharacter.height > height - img.height){
            finish = true;        
        }
    }

    isCollidingFloor(img){
        if(this.positionY + this.imgCharacter.height > height - img.height){
            this.positionY = height - img.height - this.imgCharacter.height - 2;
            this.isJumping = false;
        }
    }

    isCollidingCoins(){
        for (let i = coins.length - 1; i >= 0; i--) {
            const coin = coins[i];
            if (
                this.positionX + this.imgCharacter.width > coin.positionX &&
                this.positionX < coin.positionX + coin.imgCoin.width &&
                this.positionY + this.imgCharacter.height >= coin.positionY &&
                this.positionY < coin.positionY
            ) {
                // Incrementar contador de monedas recolectadas
                this.coinsCollected++;
                if(this.coinsCollected === 1){
                    //win = true;
                    actualLevel++;
                    clear();
                    setup();
                }
                // Eliminar la moneda del array
                coins.splice(i, 1);
            }
        }
    }

    isCollidingCloud(cloud){
        if (
            this.positionX + this.imgCharacter.width > cloud.positionX &&
            this.positionX < cloud.positionX + cloud.imgCloud.width &&
            this.positionY + this.imgCharacter.height >= cloud.positionY &&
            this.positionY < cloud.positionY
        ) {
            cloudFly = true;
            this.positionX = cloud.positionX + 10;
            this.positionY = cloud.positionY - 30;
        }
    }

    isCollidingFireBall(fireballs){
        for(i=0; i<fireballs.length; i++){
            let fireball = fireballs[i];
            if (
                this.positionX + this.imgCharacter.width > fireball.positionX &&
                this.positionX < fireball.positionX + fireball.imgFireBallUp.width &&
                this.positionY + this.imgCharacter.height >= fireball.positionY &&
                this.positionY < fireball.positionY
            ) {
                finish = true;
            }
    }
    }

    isCollidingCastle(castle){
        if (
            this.positionX + this.imgCharacter.width > castle.positionX &&
            this.positionX < castle.positionX + castle.imgFire.width &&
            this.positionY + this.imgCharacter.height >= castle.positionY
        ) {
            actualLevel--;
            clear();
            setup();
        }
    }

    draw(){
        image(this.imgCharacter, this.positionX, this.positionY)
    }
}

class Cube{
    constructor(positionX, positionY, speed, imgCube){
        this.positionX = positionX;
        this.positionY = positionY;
        this.speed = speed;
        this.imgCube = imgCube;
    }
    draw(){
        image(this.imgCube, this.positionX, this.positionY)
    }

    move(){
        if(!gameOver){
        this.positionX -= this.speed;
        }
    }
}

class Pipe{
    constructor(positionX, positionY, speed, imgPipe){
        this.positionX = positionX;
        this.positionY = positionY;
        this.speed = speed;
        this.imgPipe = imgPipe;
    }
    draw(){
        image(this.imgPipe, this.positionX, this.positionY)
    }

    move(){
        if(!gameOver){
            if(!pipeVisible){
                this.positionX -= this.speed;
            }
            if (pipeVisible){
                this.positionX = -30;
            }
        }
        
    }
}

class Fire {
    constructor(positionX, positionY, speed, imgFire) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.speed = speed;
        this.imgFire = imgFire;
    }

    draw(){
        image(this.imgFire, this.positionX, this.positionY);
    }
}

class Life {
    constructor (positionX, positionY, imgLife){
        this.positionX = positionX;
        this.positionY = positionY;
        this.imgLife = imgLife;
    }

    draw(){
        image(this.imgLife, this.positionX, this.positionY)
    }
}

class Coin{
    constructor(positionX, positionY, speed, imgCoin){
        this.positionX = positionX;
        this.positionY = positionY;
        this.speed = speed;
        this.imgCoin = imgCoin;
    }
    draw(){
        image(this.imgCoin, this.positionX, this.positionY)
    }

    move(){
        if(!gameOver){
        this.positionX -= this.speed;
        }
    }
}

class Cloud{
    constructor(positionX, positionY, speed, imgCloud){
        this.positionX = positionX;
        this.positionY = positionY;
        this.speed = speed;
        this.imgCloud = imgCloud;
    }
    draw(){
        image(this.imgCloud, this.positionX, this.positionY)
    }

    update(){
        if(cloudFly){
            if(keyIsDown(RIGHT_ARROW)){
                this.positionX += this.speed * 2;
            } else if(keyIsDown(LEFT_ARROW)) {
                this.positionX -= this.speed * 2;
            } else if(keyIsDown(UP_ARROW)) {
                this.positionY -= this.speed * 2;
            } else if(keyIsDown(DOWN_ARROW)) {
                this.positionY += this.speed * 2;
            }
        }
    }
    
}

class FireBall{
    constructor(positionX, positionY, speed, imgFireBallUp, imgFireBallDown) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.speed = speed;
        this.imgFireBallUp = imgFireBallUp;
        this.imgFireBallDown = imgFireBallDown;
        this.movingUp = true;
        this.originalPositionY = positionY;
    }

    move(){
        if (this.movingUp) {
            this.positionY -= this.speed;
            if (this.positionY <= this.originalPositionY - 250) {
                this.movingUp = false;
            }
        } else {
            this.positionY += this.speed;
            if (this.positionY >= this.originalPositionY) {
                this.movingUp = true;
            }
        }
    }

    draw(){
        if(this.movingUp){
            image(this.imgFireBallUp, this.positionX ,this.positionY)
        } else {
            image(this.imgFireBallDown, this.positionX ,this.positionY)
        }
    }
}