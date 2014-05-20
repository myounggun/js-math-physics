window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        p = particle.create(width / 2, height / 2, 3, Math.random() * Math.PI * 2);

    p.radius = 50;
    
    update();

    function update() {
        context.clearRect(0, 0, width, height);
        
        p.update();

        drawCircle(p.position, p.radius, "#EA005E");

        if (p.position.getX() - p.radius > width) {
            p.position.setX(-p.radius);
        }
        if (p.position.getX() + p.radius < 0) {
            p.position.setX(width + p.radius);
        }

        if (p.position.getY() - p.radius> height) {
            p.position.setY(-p.radius);
        }
        if (p.position.getY() + p.raidus < 0) {
            p.position.setY(height + p.radius);
        }

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