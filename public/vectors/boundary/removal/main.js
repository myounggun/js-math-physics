window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        particles = [];
    
    for (var i = 0; i < 100; i++) {
        var p = particle.create(width / 2, height / 2, Math.random() * 5 + 2, Math.random() * Math.PI * 2);
        p.radius = 10;
        particles.push(p);
    }
    
    update();

    function update() {
        context.clearRect(0, 0, width, height);
        
        console.log(particles.length);
        
        var len = particles.length;
        for (var i = 0; i < len; i++) {
            var p = particles[i];
            
            p.update();
            drawCircle(p.position, p.radius, "#00000");
        }
        
        removeDeadParticles();
        
        requestAnimationFrame(update);
    }
    
    function drawCircle(p, radius, color) {
        context.beginPath();
        context.arc(p.getX(), p.getY(), radius, 0, Math.PI * 2, false);
        context.fillStyle = color;
        context.fill();
        context.closePath();
    }
    
    function removeDeadParticles() {
        for (var i = particles.length - 1; i >= 0; i--) {
            var p = particles[i];
            if (p.position.getX() - p.radius > width || 
                p.position.getX() + p.radius < 0 ||
                p.position.getY() - p.radius > height ||
                p.position.getY() + p.radius < 0) {
                
                particles.splice(i, 1);
            }
        }
    }
};