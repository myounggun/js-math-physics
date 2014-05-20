window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        particles = [];
    
    for (var i = 0; i < 500; i++) {
        var p = particle.create(width / 2, height, Math.random() * 10 + 5, -Math.PI / 2 + (Math.random() * 0.2 - 0.1), 0.1);
        p.radius = Math.random() * 10 + 2;
        particles.push(p);
    }
    
    update();

    function update() {
        context.clearRect(0, 0, width, height);
        
        var len = particles.length;
        for (var i = 0; i < len; i++) {
            var p = particles[i];
            
            p.update();
            drawCircle(p.position, p.radius, "#00000");
            
            if (p.position.getY() - p.radius > height) {
                p.position.getX(width /2);
                p.position.getY(height);
                p.velocity.setLength(Math.random() * 10 + 5);
                p.velocity.setAngle(-Math.PI / 2 + (Math.random() * 0.2 - 0.1));
            }
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