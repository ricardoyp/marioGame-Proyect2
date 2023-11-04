let character;
let fire;
let cube;
let cubes = [];
let fireInstances = [];
let life1;
let life2;
let life3;
let pipe;

let marioImg;
let imgFire;
let imgCube;
let imgLife;
let imgPipe;

let lastPositionCubeX = 400;
let finish = false;
let positionInitialX = 10;
let positionInitialY = 10;
let gameOver = false;
let pipePosition = -30;

let pipeVisible = true;

function preload(){
    marioImg = loadImage('mario.png')
    imgFire = loadImage('fire.gif')
    imgCube = loadImage('bloque.png')
    imgLife = loadImage('heart.png')
    imgPipe = loadImage('tube.png')
}

function setup() {
    character = new Character(50, 0, 20, 3.5 , marioImg)

    pipe = new Pipe(-30, 150, 1, imgPipe)

    fire = new Fire(0, 450, 0, imgFire)

    life1 = new Life(1000, 50, imgLife)
    life2 = new Life(1040, 50, imgLife)
    life3 = new Life(1080, 50, imgLife)

    createCanvas(1200, 600)

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
    makeCubes();

    //DIBUJA EL SUELO DE FUEGO
    for (let i = 0; i < fireInstances.length; i++) {
        fireInstances[i].draw();
    }

    //DIBUJA LA TUBERIA
    pipe.move();
    pipe.draw();


    //HACE QUE SE PUEDA MARIO QUEDAR ENCIMA DE CUBOS Y TUBERIA
    character.update(cubes, pipe)

    //DIBUJA MARIO
    character.draw()
}

function createFireOnGround() {
    for (let x = 0; x < width; x += imgFire.width) {
      let fireInstance = new Fire(x, height - imgFire.height, 0, imgFire);
      fireInstances.push(fireInstance);
    }
}

function makeCubes(){
    let random = Math.floor(Math.random() * (400 - 300 + 1)) + 300;

    if(!gameOver){
        cubes.push(new Cube(lastPositionCubeX, random, 3, imgCube));
        lastPositionCubeX += 205;
    }

    for(i = cubes.length - 1 ; i >= 0 ; i--){
        cubes[i].move();
        cubes[i].draw();
    }
}

class Character {
    constructor(positionX, positionY, gravity, speed, imgCharacter, life){
        this.positionX = positionX
        this.positionY = positionY
        this.gravity = gravity
        this.speed = speed
        this.imgCharacter = imgCharacter
        this.isJumping = false;
        this.life = 3;
    }

    update(cubes, pipe){
        //MOVER PERSONAJE
        if(keyIsDown(RIGHT_ARROW)){
            this.positionX += this.speed * 2;
        } else if(keyIsDown(LEFT_ARROW)) {
            this.positionX -= this.speed * 1,5;
        }

        //SALTAR
        if (keyIsDown(UP_ARROW) && !this.isJumping){
            this.jump();            
        }

        //CAER POR GRAVEDAD
        this.positionY += this.gravity * 0.15;

        //SE ASEGURA QUE CAE AL SUELO PARA VOLVER A SALTAR
        if (this.positionY > 475) {
            this.positionY = 475;
            this.isJumping = false;
        }

        //COLISION CON CUBOS
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