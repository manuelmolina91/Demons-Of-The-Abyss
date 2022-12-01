// REALMENTE QUERIA LLAMAR A LA CLASS PRINCESS PERO NO CONSEGUI QUE FUNCIONARA EL JUEGO.
// ASI QUE HICE UN POCO DE TRAMPA Y LO SOLUCIONE LLAMANDO A LA CLASS ENEMY5.
// AL MENOS LA COÑA FUNCIONA Y ADEMAS AÑADI LA FUNCION WINNER, ASI QUE TAMPOCO ESTA TAN MAL

class Enemy5 {
    constructor(canvasW, canvasH, ctx) {
        this.ctx = ctx

        this.img = new Image()
        this.img.src = "./img/hips.png"

        this.img.frames = 8
        this.img.frameIndex = 0

        this.w = 150;
        this.h = 150;

        this.x = canvasW;

        this.y0 = canvasH * .100
        this.y = 480
        

        //this.vy = 5

        this.dx = 0.01
        
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
}