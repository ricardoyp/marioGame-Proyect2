class Character {
    constructor(positionX, positionY, gravity, speed, imgCharacter, life){
        this.positionX = positionX
        this.positionY = positionY
        this.gravity = gravity
        this.speed = speed
        this.imgCharacter = imgCharacter
        this.isJumping = true;
        this.life = life;
        this.coinsCollected = 0;
        this.isAttacking = true;
    }

    update(){
        //MOVER PERSONAJE Y SALTO
        if(!cloudFly){
            //no se mueve
            if(keyIsDown(RIGHT_ARROW)){
                this.positionX += this.speed * 2;
            } else if(keyIsDown(LEFT_ARROW)) {
                this.positionX -= this.speed * 1,5;
            }
            if (keyIsDown(UP_ARROW)){
                if(!this.isJumping){
                    jumpSound.play();
                    this.positionY -= this.gravity * 5;
                    this.isJumping = true;
                }           
            }
        }

        //CAER POR GRAVEDAD
        if(!cloudFly){
            this.positionY += this.gravity * 0.15;
        }

        //FINISH
        if(finish){
            this.life--;
            this.positionX = positionInitialX;
            this.positionY = positionInitialY;
            pipeVisible = true;
            finish = false;
        }

        //GAMEOVER
        if(this.life <= 0){
            gameOver = true;
        }
    }

    isCollidingCube(cubes){
        let collidingCube = cubes.find(cube => (
            this.positionX + this.imgCharacter.width > cube.positionX &&
            this.positionX < cube.positionX + cube.imgCube.width &&
            this.positionY + this.imgCharacter.height >= cube.positionY &&
            this.positionY < cube.positionY
        ));
        //SI COLISIONA CON EL CUBO, LA POSICION ES LA DEL CUBO Y PUEDE SALTAR
        if (collidingCube) {
            this.positionY = collidingCube.positionY - this.imgCharacter.height;
            this.isJumping = false;
        }
        
    }

    isCollidingPipe(pipe){
            if (
                this.positionX + this.imgCharacter.width > pipe.positionX &&
                this.positionX < pipe.positionX + pipe.imgPipe.width &&
                this.positionY + this.imgCharacter.height >= pipe.positionY &&
                this.positionY < pipe.positionY
            ) {
                //SI COLISIONA QUE SE ESCONDA LA TUBERIA
                this.positionY = pipe.positionY - this.imgCharacter.height;
                this.isJumping = false;
                pipeVisible = false;
            }
        }

    isCollidingFires(img){
        //SI TOCA LOS FUEGOS FINISH
        if(this.positionY + this.imgCharacter.height > height - img.height){
            finish = true;        
        }
        //SE REGENERA LA NUBE
        if(cloudFly && finish){
            cloudMario.positionX = 230;
            cloudMario.positionY = 500;
            cloudFly = false;
        }
    }

    isCollidingCoins(coins){
        coins.forEach((coin, index) => {
            if (
                this.positionX + this.imgCharacter.width > coin.positionX &&
                this.positionX < coin.positionX + coin.imgCoin.width &&
                this.positionY + this.imgCharacter.height >= coin.positionY &&
                this.positionY < coin.positionY
            ) {
                //AÑADE UNA MONEDA Y LA ELIMINA
                this.coinsCollected++;
                if (this.coinsCollected === 10) {
                    actualLevel++;
                    clear();
                    setup();
                }
                coins.splice(index, 1);
                coinSound.play();
            }
        });        
    
    }

    isCollidingCloud(cloud){
        if (
            this.positionX + this.imgCharacter.width > cloud.positionX &&
            this.positionX < cloud.positionX + cloud.imgCloud.width &&
            this.positionY + this.imgCharacter.height >= cloud.positionY &&
            this.positionY < cloud.positionY
        ) {
            if(this !== bowser) {
                cloudFly = true;
            }
            this.positionX = cloud.positionX + 10;
            this.positionY = cloud.positionY - 40;
        }
    }

    isCollidingFireBall(fireballs) {
        const collidingFireBall = fireballs.find(fireball => (
            this.positionX + this.imgCharacter.width > fireball.positionX &&
            this.positionX < fireball.positionX + fireball.imgFireBallUp.width &&
            this.positionY + this.imgCharacter.height >= fireball.positionY &&
            this.positionY < fireball.positionY
        ));
    
        if (collidingFireBall) {
            finish = true;
        }
    }

    isCollidingCastle(castle){
        if (
            this.positionX + this.imgCharacter.width > castle.positionX &&
            this.positionX < castle.positionX + castle.imgFire.width &&
            this.positionY + this.imgCharacter.height >= castle.positionY
        ) {
            actualLevel++;
            clear();
            setup();
        }
    }

    isCollidingAttack(attacks) {
        attacks.forEach((attack, index) => {
            if (
                this.positionX + this.imgCharacter.width > attack.positionX &&
                this.positionX < attack.positionX + attack.imgAttack.width &&
                this.positionY + this.imgCharacter.height >= attack.positionY &&
                this.positionY < attack.positionY + attack.imgAttack.height
            ) {
                this.life--;
                attacks.splice(index, 1);
            }
        });
    }

    draw(){
        image(this.imgCharacter, this.positionX, this.positionY)
    }


}