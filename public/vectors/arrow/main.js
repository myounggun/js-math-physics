window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        p1 = {x: 0, y: 0},
        p2 = {x: 100, y: 0};

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        context.save();

        context.translate(width / 2,  height / 2);

        drawArrowLine(p1, p2, "#999999");
        
        context.restore();

        requestAnimationFrame(update);
    }

    function drawArrowLine(p1, p2, color) {
        drawLine(p1, p2, color);
        drawArrow(p1, p2, color);
    }

    function drawArrow(p1, p2, color) {
        var dx = p2.x - p1.x;
        var dy = p2.y - p1.y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        var vx = dx / dist;
        var vy = dy / dist;

        // TODO: size 매핑은 임시코드임. lineWIdth 크기로 매핑 필요.
        var size = map(dist, 0, width / 2, 5, 50);

        var backTriX = p2.x - vx * size * 2;
        var backTriY = p2.y - vy * size * 2;
        var perpendDx = - vy * size;
        var perpendDy = vx * size;

        context.beginPath();
        context.moveTo(p2.x, p2.y);    
        context.lineTo(backTriX + perpendDx, backTriY + perpendDy);
        context.lineTo(backTriX - perpendDx, backTriY - perpendDy);
        context.fillStyle = color;
        context.fill();
        context.closePath();
    }

    function drawLine(p1, p2, color) {
        context.beginPath();
        context.moveTo(p1.x, p1.y);    
        context.lineTo(p2.x, p2.y);
        context.strokeStyle = color;
        context.stroke();
        context.closePath();
    }

    function norm(value, min, max) {
        return (value - min) / (max - min);
    }

    function lerp(norm, min, max) {
        return (max - min) * norm + min;
    }

    function map(value, srcMin, srcMax, destMin, destMax) {
        return lerp(norm(value, srcMin, srcMax), destMin, destMax);
    }

    document.body.addEventListener("mousemove", function(event) {
        p2 = {
            x: event.x - width / 2,
            y: event.y - height / 2 
        };
    });
};