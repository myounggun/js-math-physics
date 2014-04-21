window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        sunRadius = 10,
        stickThickness = 5,
        stickHeight = 50,
        shadowLength = 0,
        stickPoint = {x: 0, y: 0},
        sunPoint = {x: 0, y: -stickHeight},
        shadowPoint = {x: 0, y: -stickThickness / 2};

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        context.save();

        context.translate(width / 2,  height / 2);
        
        drawShadow(shadowPoint, shadowLength, stickThickness, "#999999");
        drawStick(stickPoint, -stickHeight, stickThickness, "#000000");
        drawSun(sunPoint, sunRadius, "rgba(234, 0, 94, 1)");
        
        context.restore();

        requestAnimationFrame(update);
    }

    function drawStick(p, height, thickness, color) {
        drawLine(p, {x: p.x, y: p.y + height}, thickness, color);
    }

    function drawShadow(p, length, thickness, color) {
        drawLine(p, {x: p.x + length, y: p.y}, thickness, color);
    }

    function drawSun(p, radius, color) {
        context.beginPath();
        context.arc(p.x, p.y, radius, 0, Math.PI * 2, false);
        context.fillStyle = color;
        context.fill();
        context.closePath();
    }

    function drawLine(p1, p2, thickness, color) {
        context.beginPath();
        context.moveTo(p1.x, p1.y);    
        context.lineTo(p2.x, p2.y);
        context.lineWidth = thickness;
        context.strokeStyle = color;
        context.stroke();
        context.closePath();
    }

    document.body.addEventListener("mousemove", function(event) {
        sunPoint = {
            x: event.x - width / 2,
            y: event.y - height / 2 
        };

        var dx = sunPoint.x - stickPoint.x,
            dy = sunPoint.y - stickPoint.y - stickHeight,
            dist = Math.sqrt(dx * dx + dy * dy),
            cos = dx / dist,
            sin = dy / dist,
            tan = sin / cos;

        shadowLength = stickHeight / tan;
    });
};