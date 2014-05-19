window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        centerX = width / 2,
        centerY = height / 2,
        maxRadius = 100;
    
    for (var i = 0; i < 1000; i++) {
        var radius = Math.sqrt(Math.random()) * maxRadius,//Maths.randomRange(0, maxRadius),
            angle = Maths.randomRange(0, Math.PI * 2), 
            x = centerX + Math.cos(angle) * radius,
            y = centerY + Math.sin(angle) * radius;
        
        context.beginPath();
        context.arc(x, y, 1, 0, Math.PI * 2, false);
        context.fill();
    }

    //update();

    function update() {
        context.clearRect(0, 0, width, height);

        // code

        requestAnimationFrame(update);
    }
};