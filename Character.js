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
        //MOVER PERSONAJE
        if(!cloudFly){
            //no se mueve
            if(keyIsDown(RIGHT_ARROW)){
                this.positionX += this.speed * 2;
            } else if(keyIsDown(LEFT_ARROW)) {
                this.positionX -= this.speed * 1,5;
            }
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

        //FINISH
        if(finish){
            console.log("finish")
            this.life--;
            this.positionX = positionInitialX;
            this.positionY = positionInitialY;
            pipeVisible = true;
            finish = false;
        }

        if(this.life <= 0){
            gameOver = true;
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

    isCollidingCoins(coins){
        for (i = coins.length - 1; i >= 0; i--) {
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
            if(this !== bowser) {
                cloudFly = true;
            }
            this.positionX = cloud.positionX + 10;
            this.positionY = cloud.positionY - 40;
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
            actualLevel++;
            clear();
            setup();
        }
    }

    isCollidingAttack(attacks){
        for(i = 0; i<attacks.length; i++){
            let attack = attacks[i];
            if (
                this.positionX + this.imgCharacter.width > attack.positionX &&
                this.positionX < attack.positionX + attack.imgAttack.width &&
                this.positionY + this.imgCharacter.height >= attack.positionY &&
                this.positionY < attack.positionY + attack.imgAttack.height
            ){
                this.life--;
                attacks.splice(i, 1);
            }
        }
    }
    
    draw(){
        image(this.imgCharacter, this.positionX, this.positionY)
    }


}