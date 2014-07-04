/**
 * Hook's law : F = kx
 */
window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        springPoint = vector.create(width / 2, height / 2),
        weight = particle.create(Math.random() * width, Math.random() * height, 50, 0);// Math.random() * Math.PI * 2),
        k = 0.1;
    
    weight.radius = 20;
    weight.friction = 0.9;
    
    document.body.addEventListener("mousemove", function(event) {
        springPoint.setX(event.clientX);
        springPoint.setY(event.clientY);
    });
    
    update();

    function update() {
        context.clearRect(0, 0, width, height);
        
        var distance = springPoint.subtract(weight.position), // x = distance
            springForce = distance.multiply(k); // F = kx
        
        weight.velocity.addTo(springForce); // F = velocity
        weight.update();
        
        drawCircle(weight.position, weight.radius, "#EA005E");
        drawCircle(springPoint, 4, "#000000");
        
        drawLine(weight.position, springPoint, "#000000")

        requestAnimationFrame(update);
    }
    
    function drawCircle(p, radius, color) {
        context.beginPath();
        context.arc(p.getX(), p.getY(), radius, 0, Math.PI * 2, false);
        context.fillStyle = color;
        context.fill();
        context.closePath();
    }
    
    function drawLine(p1, p2, color) {
        context.beginPath();
        context.moveTo(p1.getX(), p1.getY());    
        context.lineTo(p2.getX(), p2.getY());
        context.strokeStyle = color;
        context.stroke();
        context.closePath();
    }
};