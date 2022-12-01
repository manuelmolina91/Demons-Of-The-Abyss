class Enemy {
    constructor(canvasW, canvasH, nextEnemy, ctx) {
        this.ctx = ctx
        this.nextEnemy = nextEnemy
        this.img = new Image()
        this.img.src = "./img/ghost-idle.png"

        this.img.frames = 7
        this.img.frameIndex = 0

        this.w = 200;
        this.h = 200;

        this.x = canvasW * 0.85;

        this.y0 = canvasH * .100
        this.y = 460
        

        //this.vy = 5

        this.dx = 4

        this.life = 2
        this.state = "normal"

        console.log(this.x)
        console.log(this.y)
        
    }


    draw(frameCounter) {
        this.ctx.drawImage(
            this.img,
                this.img.frameIndex * Math.floor(this.img.width / this.img.frames), 
                0, 
                
                Math.floor(this.img.width / this.img.frames), 
                this.img.height, 
                this.x,
                this.y,
                this.w,
                this.h
        );

        this.animateImg(frameCounter)

    }

    animateImg(frameCounter) {
        if(frameCounter % 6 === 0) {
            this.img.frameIndex++

            if (this.img.frameIndex > this.img.frames - 1) 
                this.img.frameIndex = 0
        }
    }

    move() {

        this.x = this.x - this.dx
    }

    damage() {
        if(this.state !== "attacked") {
            this.life--
            this.state = "attacked"
            
            if (!this.life) {
                this.death()
            }
        }
        

    }


    death() {
        console.log("MUERTO")

        if (this.nextEnemy)
            this.nextEnemy.dx = 4
            
        this.img.frames = 0
        this.y = -1000
    }
}