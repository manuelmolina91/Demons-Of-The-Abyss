const Game = {
    canvas: undefined,
    ctx: undefined,
    scoreBoard: undefined,
    fps: 60, 
    keys: {
        TOP_KEY: 87,
        SPACE: 32
    },

    init: function() {
        this.canvas = document.getElementById('canvas')
        this.ctx = canvas.getContext('2d')

        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight

        this.start()

        this.audio = new Audio('music/bso.mp3')
        this.audio.play()
    },

    start: function() {
        this.reset()
        this.scoreBoard.init(this.ctx)

        // Bucle de renderizado
        this.interval = setInterval(() => {
            
            this.clear()
            this.score += 0.01
            // Mecanismo para generar acciones cada X frames
            this.frameCounter++;

            // Generar obstaculo cada 50 frames
            if(this.frameCounter % 50 === 0)
                this.generateObstacle()
    
            // Estoy validando si algun tipo de enemigo impacta
            if(this.isCollision(this.enemy) || this.isCollision(this.enemy1) || this.isCollision(this.enemy2) || this.isCollision(this.enemy3) || this.isCollision(this.enemy4))
                this.gameOver()

            if(this.isCollision(this.enemy5) === true) 
                this.winner()
            
            this.isImpact(this.enemy)
            this.isImpact(this.enemy1)
            this.isImpact(this.enemy2)
            this.isImpact(this.enemy3)
            this.isImpact(this.enemy4)

            //if(this.moreCollision()
              //  this.gameOver()

                
            this.drawAll()
            this.moveAll()

            this.clearObstacles()
        }, 1000 / this.fps)
    },

    reset: function() {
        this.background = new Background(this.canvas.width, this.canvas.height, this.ctx) 
        this.player = new Player(this.canvas.width, this.canvas.height, this.keys, this.ctx)
        this.scoreBoard = ScoreBoard
        this.frameCounter = 0
        
        this.score = 0
        this.obstacles = []

        this.enemy5 = new Enemy5(this.canvas.width, this.canvas.height, this.ctx)
        this.enemy4 = new Enemy4(this.canvas.width, this.canvas.height, this.enemy5 ,this.ctx)
        this.enemy3 = new Enemy3(this.canvas.width, this.canvas.height, this.enemy4, this.ctx)
        this.enemy2 = new Enemy2(this.canvas.width,this.canvas.height, this.enemy3, this.ctx)
        this.enemy1 = new Enemy1(this.canvas.width,this.canvas.height, this.enemy2, this.ctx)
        this.enemy = new Enemy(this.canvas.width, this.canvas.height, this.enemy1,this.ctx)
    },

    clear: function () {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
    },

    moveAll: function() {
        //this.background.move()
        this.player.move()

        //this.obstacles.forEach(obstacle => {
            //obstacle.move()
        //})

        this.enemy.move()
        this.enemy1.move()
        this.enemy2.move()
        this.enemy3.move()
        this.enemy4.move()
        this.enemy5.move()

    },

    drawAll: function () {

        this.background.draw()

        this.player.draw(this.frameCounter)

        this.obstacles.forEach(obstacle => {
            obstacle.draw()
        })

        this.enemy.draw(this.frameCounter)
        this.enemy1.draw(this.frameCounter)
        this.enemy2.draw(this.frameCounter)
        this.enemy3.draw(this.frameCounter)
        this.enemy4.draw(this.frameCounter)
        this.enemy5.draw(this.frameCounter)
        
        //this.drawScore(this.score)
    },

    generateObstacle: function() {
        this.obstacles.push(new Obstacle(this.canvas.width, this.player.h ,this.player.y0, this.ctx))
    },

    clearObstacles: function () {
        this.obstacles = this.obstacles.filter((obstacle) => obstacle.x + obstacle.w >= 0)
    },

    isCollision(enemy) {
     
            return (
                this.player.x + this.player.w  -105 >= enemy.x &&
                this.player.x +100 <= enemy.x + enemy.w &&
                this.player.y + this.player.h -100 >= enemy.y &&
                this.player.y <= enemy.y + enemy.h
            )
    },


    isImpact(enemy) {
        const isImpacted = this.player.bullets.some((bullet) => {
                return (
                    bullet.x + bullet.r >= enemy.x &&
                    bullet.x - bullet.r <= enemy.x + enemy.w &&
                    bullet.y + bullet.r >= enemy.y &&
                    bullet.y - bullet.r <= enemy.y + enemy.h
                ) 
            })

            if(isImpacted) {
                enemy.damage()
                this.player.removeBullet()
            } else {
                enemy.state = "normal"
            }
    },

    

    otherImpact() {
        return this.player.bullets.some((bullet) => {
                return (
                    bullet.x + bullet.r >= this.enemy1.x &&
                    bullet.x - bullet.r <= this.enemy1.x + this.enemy1.w &&
                    bullet.y + bullet.r >= this.enemy1.y &&
                    bullet.y - bullet.r <= this.enemy1.y + this.enemy1.h
                )
        })
    },


    otherMore() {
        if (this.isImpact === true) {
            this.draw.enemy(frameCounter)
        }
    },

    stop() {
        clearInterval(this.interval)
    },
    
    gameOver() {
        this.stop()

        if(confirm("Has muerto basura humana, (¿quiéres volver a fracasar?")) {
            document.getElementById('start').style.display = 'block'
            document.getElementById('canvas').style.display = 'none'
            this.audio.pause()
        }
            
    },

    drawScore(score) {
        ScoreBoard.update(score)
    },

    winner() {
        this.stop()

        if(confirm("Haceme un pete colorado alcahuete!! Hazme tuya Papito!!!!")) {
            document.getElementById('start').style.display = 'block'
            document.getElementById('canvas').style.display = 'none'
            this.audio.pause()
        }
            
    },
}