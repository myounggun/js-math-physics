window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        p = particle.create(width / 2, height / 2, 10, Math.random() * Math.PI * 2),
        friction = vector.create(0.15, 0);

    p.radius = 50;
    p.friction = 0.97;
    
    update();

    function update() {
        context.clearRect(0, 0, width, height);
        
//        friction.setAngle(p.velocity.getAngle());
//        if (p.velocity.getLength() > friction.getLength()) {
//            p.velocity.subtractFrom(friction);
//        } else {
//            p.velocity.setLength(0);
//        }
        
        p.update();

        drawCircle(p.position, p.radius, "#EA005E");

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