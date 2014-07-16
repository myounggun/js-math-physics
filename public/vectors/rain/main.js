/**
 * 2014.05.20 fountain particle by boundary
 */
window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        particles = [],
        particleCount = width / 2,
        circle = {
            x: width / 2,
            y: height * 1.5,
            radius: width / 2
        };
    
    for (var i = 0; i < particleCount; i++) {
        var p = particle.create(Math.random() * width, 0, Math.random() * 50 + 2, Math.PI / 2 + (Math.random() * 0.2 - 0.1), Maths.lerp(Math.random(), 0.01, 0.2));
        p.radius = Math.random() * 50 + 2;
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
            
            
            var color = "rgba(0, 0, 0, " + p.alpha + ")";
            
            if ( Maths.circlePointCollision(p.position.getX(), p.position.getY(), circle)) {
                color = "#ff0000";//"rgba(255, 0, 0, " + p.alpha + ")";
                console.log('ok');
//              p.position.setY(height - p.radius);
                p.velocity.setX(p.velocity.getX() * 0.8);
                p.velocity.setY(p.velocity.getY() * 0.8);
             
            }
            
            drawCircle(p.position, p.radius, color);
            
            // regeneration
            if (p.position.getY() - p.radius > height) {
                p.position.setX(Math.random() * width);
                p.position.setY(-height);
                p.velocity.setLength(Maths.lerp(Math.random(), 0.01, 0.2));
                p.velocity.setAngle(Math.PI / 2 + (Math.random() * 0.2 - 0.1));
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
        
        
        
        drawUmbrella(circle, "rgba(0, 0, 0, 0.5)");
        
        requestAnimationFrame(update);
    }
    
    function drawCircle(p, radius, color) {
        context.beginPath();
        context.arc(p.getX(), p.getY(), radius, 0, Math.PI * 2, false);
        context.fillStyle = color;
        context.fill();
        context.closePath();
    }
    
    function drawUmbrella(c, color) {
        context.beginPath();
        context.arc(c.x, c.y, c.radius, 0, Math.PI * 2, false);
        context.fillStyle = color;
        context.fill();
        context.closePath();
    }
};