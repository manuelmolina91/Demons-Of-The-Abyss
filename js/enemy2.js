class Enemy2 {
    constructor(canvasW, canvasH, nextEnemy, ctx) {
        this.ctx = ctx
        this.nextEnemy = nextEnemy

        this.img = new Image()
        this.img.src = "./img/fire-skull.png"

        this.img.frames = 8
        this.img.frameIndex = 0

        this.w = 300;
        this.h = 300;

        this.x = canvasW

        this.y0 = canvasH * .100
        this.y = 300

        this.dx = 0.01

        this.life = 4
        this.state = "normal"
        
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