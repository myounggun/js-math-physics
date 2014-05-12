window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        results = [],
        speed = 10,
        count = 500;
    
    for (var i = 0; i < count; i++) {
        results[i] = 0;
    }

    update();

    function update() {
        for (var i = 0; i < speed; i++) {
            addResult();
            draw();
        }
        
        requestAnimationFrame(update);
    }
    
    function addResult() {
        var result = Math.floor(Maths.randomDist(0, count, 3));
        
        results[result] += 1;
    }
    
    function draw() {
        var w = width / count;
        for (var i = 0; i < count; i++) {
            var h = results[i] * -10;
            context.fillRect(w * i, height, w, h);
        }
    }
};