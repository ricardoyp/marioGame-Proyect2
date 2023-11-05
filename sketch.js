//OBJETOS EN PANTALLA
let character;
let cubes = [];
let fire;
let fires = [];
let life1;
let life2;
let life3;
let pipe;
let coins = [];
let coinCount;
let cloud;

//IMAGENES CARGADAS
let marioImg;
let imgFire;
let imgCube;
let imgLife;
let imgPipe;
let imgCoin;
let imgCoinCount;
let imgCloud;

//FUENTE
let marioFont;

//AUXILIARES
let lastPositionCubeX = 400;
let finish = false;
let positionInitialX = 10;
let positionInitialY = 10;
let gameOver = false;
let pipePosition = -30;
let pipeVisible = true;
let cloudFly = false;

function preload(){
    marioImg = loadImage('./imgs/mario.png')
    imgFire = loadImage('./imgs/fire.gif')
    imgCube = loadImage('./imgs/bloque.png')
    imgLife = loadImage('./imgs/heart.png')
    imgPipe = loadImage('./imgs/tube.png')
    imgCoin = loadImage('./imgs/coin-spin.gif')
    imgCoinCount = loadImage('./imgs/coinCount.png')
    imgCloud = loadImage('./imgs/cloud.png')

    marioFont = loadFont('SuperMarioBros.ttf');
}

function setup() {
    character = new Character(50, 0, 20, 3.5 , marioImg)

    pipe = new Pipe(-30, 150, 1, imgPipe)

    life1 = new Life(950, 50, imgLife)
    life2 = new Life(980, 50, imgLife)
    life3 = new Life(1010, 50, imgLife)

    coinCount = new Coin(1060, 37, 0, imgCoinCount)

    cloud = new Cloud(200, 300, 3, imgCloud)

    textFont(marioFont);

    createCanvas(1250, 600)

    createFireOnGround();
}

function draw(){
    //FONDO
    background(99, 152, 251);

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
    makeCubesCoins();

    //DIBUJA EL SUELO DE FUEGO
    for (i = 0; i < fires.length; i++) {
        fires[i].draw();
    }

    //DIBUJA LA TUBERIA
    pipe.move();
    pipe.draw();


    //HACE QUE SE PUEDA MARIO QUEDAR ENCIMA DE CUBOS Y TUBERIA
    character.update(cubes, pipe, coins, cloud)
    cloud.update();
    //DIBUJA MARIO
    character.draw()

    //MONEDAS
    coinCount.draw();
    textSize(35);
    fill(255);
    text(character.coinsCollected, 1105, 74)

    //NUBE
    cloud.draw()

    //TEXTO DE OBJETIVO


}

function createFireOnGround() {
    for (aux = 0; aux < width; aux += imgFire.width) {
      fire = new Fire(aux, height - imgFire.height, 0, imgFire);
      fires.push(fire);
    }
}

function makeCubesCoins(){
    let random = Math.floor(Math.random() * (400 - 300 + 1)) + 300;

    if(!gameOver){
        cubes.push(new Cube(lastPositionCubeX, random, 3, imgCube));
        coins.push(new Coin(lastPositionCubeX - 10, random - 75, 3, imgCoin))
        lastPositionCubeX += 205;
    }

    for(i = cubes.length - 1 ; i >= 0 ; i--){
        cubes[i].move();
        cubes[i].draw();
    }

    for(i = coins.length - 1 ; i >= 0 ; i--){
        coins[i].move();
        coins[i].draw();
    }
}

class Character {
    constructor(positionX, positionY, gravity, speed, imgCharacter){
        this.positionX = positionX
        this.positionY = positionY
        this.gravity = gravity
        this.speed = speed
        this.imgCharacter = imgCharacter
        this.isJumping = false;
        this.life = 3;
        this.coinsCollected = 0;
    }

    update(cubes, pipe, coins, cloud){
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
                this.jump();            
            }
        }

        

        //CAER POR GRAVEDAD
        if(!cloudFly){
            this.positionY += this.gravity * 0.15;
        }

        //SE ASEGURA QUE CAE AL SUELO PARA VOLVER A SALTAR
        if (this.positionY > 475) {
            this.positionY = 475;
            this.isJumping = false;
        }

        //COLISION CON CUBOS
        this.isCollidingCoins(coins)
        this.isCollidingCloud(cloud)

        this.isCollidingCube(cubes)
        this.isCollidingPipe(pipe)
        this.isCollidingFloor()

        //FINISH
        if(this.life <= 0){
            gameOver = true;
        }
        if(finish){
            this.life -= 1;
            console.log(this.life)
            this.positionY = positionInitialY;
            this.positionX = positionInitialX;
            pipeVisible = true;
            finish = false;

        }

        //MONEDAS
        
        //GAMEOVER

    }

    jump(){
        if(!this.isJumping){
            this.positionY -= this.gravity * 5;
            this.isJumping = true;
        }
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
                pipeVisible = false;
            }
        }

    isCollidingFloor(){
        if(this.positionY + this.imgCharacter.height > 475){
            finish = true;        
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
            this.positionX = cloud.positionX+10;
            this.positionY = cloud.positionY -30;
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