let character;
let fire;

let marioImg;
let imgFire;

function preload(){
    marioImg = loadImage('mario.png')
    imgFire = loadImage('fire.gif')
}

function setup() {
    character = new Character(30, 100, 20, 2, marioImg)
    fire = new Fire(0, 200, 0, imgFire)
    createCanvas(800, 400)
}
function draw(){
    background(99, 152, 251);

    character.update()
    character.draw()

    fire.draw()
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

class Character {
    constructor(positionX, positionY, gravity, speed, imgCharacter){
        this.positionX = positionX
        this.positionY = positionY
        this.gravity = gravity
        this.speed = speed
        this.imgCharacter = imgCharacter
        this.isJumping = false;
    }

    update(){
        //MOVER PERSONAJE
        if(keyIsDown(RIGHT_ARROW)){
            this.positionX += this.speed * 2;
        } else if(keyIsDown(LEFT_ARROW)) {
            this.positionX -= this.speed *2;
        }

        //SALTAR
        if (keyIsDown(UP_ARROW) && !this.isJumping){
            this.jump();            
        }

        //CAER POR GRAVEDAD
        this.positionY += this.gravity*0.25;

        //SE ASEGURA QUE CAE AL SUELO PARA VOLVER A SALTAR
        if (this.positionY > 200) {
            this.positionY = 200;
            this.isJumping = false;
        }
    }

    jump(){
        if(!this.isJumping){
            this.positionY -= this.gravity * 7,5;
            this.isJumping = true;
        }
    }

    draw(){
        image(this.imgCharacter, this.positionX, this.positionY)
    }

}

