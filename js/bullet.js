class Bullet {
    constructor(x, y, playerY0, playerH, ctx) {
        this.ctx = ctx

        this.x = x
        this.y = y

        this.playerY0 = playerY0
        this.playerH = playerH

        this.r = 5

        this.y0 = playerY0
        this.w
        this.h

        this.vy = -2
        this.vx = 50
    }

    draw() {
        
        this.ctx.beginPath()
        this.ctx.fillStyle = "orange"
        this.ctx.arc(this.x,this.y,45,-270*Math.PI/180,-450*Math.PI/180,true)
        this.ctx.fill()
        this.ctx.closePath()

    }

    move() {
        const gravity = 0.2

        this.x += this.vx
        
        this.vy += gravity
        this.y += this.vy

        if(this.y > this.playerY0 + this.playerH) {
            this.y -= this.r
            this.vy *= -1
        }
    }

}