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
        this.movingUp = true;
        this.originalPositionY = 500;
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

    //MUEVE BOWSER ARRIBA Y ABAJO
    bowserDefense(){
        if (this.movingUp) {
            this.positionY -= this.speed;
            if (this.positionY <= this.originalPositionY - 450) {
                this.movingUp = false;
            }
        } else {
            this.positionY += this.speed;
            if (this.positionY >= this.originalPositionY) {
                this.movingUp = true;
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

class BallAttack{
    constructor(positionX, positionY, speed, imgAttack){
        this.positionX = positionX
        this.positionY = positionY
        this.speed = speed;
        this.imgAttack = imgAttack;
    }

    draw(){
        image(this.imgAttack, this.positionX, this.positionY)
    }
    
    moveMario(){
        this.positionX += this.speed;
    }
}

