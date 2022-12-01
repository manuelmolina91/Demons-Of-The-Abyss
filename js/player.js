class Player {
    constructor(canvasW, canvasH, keys, ctx) {
        this.ctx = ctx
        this.keys = keys

        this.canvasW = canvasW

        this.img = new Image()

        this.img.src = "./img/HostileAttackReaper-Sheet.png"
        
        this.img.frames = 10
        this.img.frameIndex = 0

        this.w = 150;
        this.h = 150;

        this.x = canvasW * 0.08;

        this.y0 = canvasH * .7
        this.y = this.y0

        this.vy = 1

        this.bullets = []

        this.setControls()     
    }

    setControls() {
        document.onkeydown = (e) => {
            e = e || window.event;
            switch (e.key) {
                case 'ArrowUp':
                    if(navigator.userAgent.match(/chrome|chromium|crios/i)[0] = 'Chrome'){
                        if (this.y == 499.79999999999995){
                            this.y -= 5;  
                            this.vy += -10;
                        }
                    }else if (navigator.userAgent.match(/edg/i)[0] = 'Edg') {
                        if (this.y == 522.1999999999999){
                            this.y -= 5;  
                            this.vy += -10;
                        }
                    }

                    break;
                case 'ArrowDown':
                    break;
                case 'ArrowLeft':
                    this.x -= 20;
                    break;
                case 'ArrowRight':
                    this.x += 20;
                    break;
                case ' ':
                    this.shoot()
                    break;
                default:
                    break;
            }
        }
    }

    shoot() {
        console.log("Disparar");

        this.bullets.push(new Bullet(
                this.x + this.w, 
                this.y + this.h / 2, 
                this.y0,
                this.h,
                this.ctx))
    }

    removeBullet() {
        if(this.bullets.length > 0) {
            this.bullets.pop();
        }
    }

    draw(frameCounter) {
        this.ctx.drawImage(
            this.img, 
                // Calcula x del fograma actual
                this.img.frameIndex * Math.floor(this.img.width / this.img.frames), 
                0, 
                // Ancho de un fotograma
                Math.floor(this.img.width / this.img.frames), 
                this.img.height, 
                this.x, 
                this.y, 
                this.w,
                this.h
        );

        this.animateImg(frameCounter)

        this.bullets = this.bullets.filter((bullet) => bullet.x - bullet.r < this.canvasW)

        this.bullets.forEach((bullet) => {
            bullet.draw()
            bullet.move()
        })
    }

    // cambia el fotogramas del skin cada 6 frame
    animateImg(frameCounter) {
        if(frameCounter % 6 === 0) {
            this.img.frameIndex++

            if (this.img.frameIndex > this.img.frames - 1) 
                this.img.frameIndex = 0
        }
    }

    move() {
        let gravity = 0.2

        // Detecta el fin de salto
        if(this.y >= this.y0) {
            this.y = this.y0
            this.vy = 1
        } else {
            this.vy += gravity
            this.y += this.vy
        }
    }
}
