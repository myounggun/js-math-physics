window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        sun = particle.create(width / 2, height / 2, 0, 0),
        planet =  particle.create(width / 2 + 200, height / 2, 10, -Math.PI / 2);

    sun.mass = 20000; // 40000, 70000, 100000
    
    update();

    function update() {
        context.clearRect(0, 0, width, height);

        planet.gravitateTo(sun);
        planet.update();
        
        drawCircle(sun.position, 20, "#EA005E");
        drawCircle(planet.position, 5, "#0C88E8");

        requestAnimationFrame(update);
    }
    
    function drawCircle(p, radius, color) {
        context.beginPath();
        context.arc(p.getX(), p.getY(), radius, 0, Math.PI * 2, false);
        context.fillStyle = color;
        context.fill();
        context.closePath();
    }
};