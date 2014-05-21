/**
 * 2014.05.20 fountain particle by boundary
 */
window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        particles = [],
        particleCount = width / 2;
    
    for (var i = 0; i < particleCount; i++) {
        var p = particle.create(width / 2, height, Math.random() * 20 + 5, -Math.PI / 2 + (Math.random() * 0.2 - 0.1), 0.1);
        p.radius = Math.random() * 10 + 2;
        p.bounce = -0.1;
        p.alpha = Maths.map(p.radius, 2, 12, 0.7, 0.1);
        particles.push(p);
    }
    
    update();

    function update() {
        context.clearRect(0, 0, width, height);
        
        var len = particles.length;
        for (var i = 0; i < len; i++) {
            var p = particles[i];
            
            p.update();
            drawCircle(p.position, p.radius, "rgba(0, 0, 0, " + p.alpha + ")");
            
            // regeneration
            if (p.position.getY() - p.radius > height) {
                p.position.getX(width /2);
                p.position.getY(height);
                p.velocity.setLength(Math.random() * 10 + 5);
                p.velocity.setAngle(-Math.PI / 2 + (Math.random() * 0.2 - 0.1));
            }
            
            // left, right, top bouncing
            if (p.position.getX() + p.radius > width) {
                p.position.setX(width - p.radius);
                p.velocity.setX(p.velocity.getX() * p.bounce);
            }
            if (p.position.getX() - p.radius < 0) {
                p.position.setX(p.radius);
                p.velocity.setX(p.velocity.getX() * p.bounce);
            }

//            if (p.position.getY() + p.radius > height) {
//                p.position.setY(height - p.radius);
//                p.velocity.setY(p.velocity.getY() * p.bounce);
//            }
         
            if (p.position.getY() - p.radius < 0) {
                p.position.setY(p.radius);
                p.velocity.setY(p.velocity.getY() * p.bounce);
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