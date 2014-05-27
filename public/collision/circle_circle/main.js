window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        circle0 = {
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 50 + Math.random() * 100
        },
        circle1 = {
            x: Math.random() * width,
            y: Math.random() * height,
            radius: 50 + Math.random() * 100
        };

    
    update();

    function update() {
        context.clearRect(0, 0, width, height);
        
        var color = "#999999";
        
        if (Maths.circleCollision(circle0, circle1)) {
            color = "#ff6666";
        }

        drawCircle(circle0, color);
        drawCircle(circle1, color);

        requestAnimationFrame(update);
    }
    
    function drawCircle(c, color) {
        context.beginPath();
        context.arc(c.x, c.y, c.radius, 0, Math.PI * 2, false);
        context.fillStyle = color;
        context.fill();
        context.closePath();
    }
    
    document.body.addEventListener("mousemove", function(event) {
        circle1.x = event.clientX;
        circle1.y = event.clientY;
    });
};