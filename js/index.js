window.onload = function () {
    

    document.getElementById('start').onclick = function(e) {

        e.currentTarget.style.display = 'none'
        document.getElementById('introductions').style.display = 'none'
        document.getElementById('canvas').style.display = 'block'
        
        Game.init()
    }
}