window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        D2R = Math.PI / 180,
        size = 100; // 진폭 

    context.translate(width / 2 - size * Math.PI, height / 2);
    context.scale(1, -1); // 데카르트 좌표계 -> 화면 좌표계

    drawSinCurve("#ff0000"); // RED
    drawCosCurve("#00ff00"); // GREEN
    drawTanCurve("#0000ff"); // BLUE

    drawLine({x: 0, y: 0}, {x: size * Math.PI * 2, y: 0}, "#000000"); // X 축
    drawLine({x: size * 90 * D2R,    y: size}, {x: size * 90 * D2R,    y: -size}, "#999999"); // 90 degree
    drawLine({x: size * Math.PI,     y: size}, {x: size * Math.PI,     y: -size}, "#999999"); // 180 degree (PI)
    drawLine({x: size * 270 * D2R,   y: size}, {x: size * 270 * D2R,   y: -size}, "#999999"); // 270 degree 
    drawLine({x: size * Math.PI * 2, y: size}, {x: size * Math.PI * 2, y: -size}, "#999999"); // 360 degree (2PI)

    function drawSinCurve(color) {
        for (var angle = 0; angle < Math.PI * 2; angle += 0.01) {
            var x = angle * size,
                y = Math.sin(angle) * size;

            context.fillStyle = color;
            context.fillRect(x, y, 3, 3);
        }
    }

    function drawCosCurve(color) {
        for (var angle = 0; angle < Math.PI * 2; angle += 0.01) {
            var x = angle * size,
                y = Math.cos(angle) * size;

            context.fillStyle = color;
            context.fillRect(x, y, 3, 3);
        }
    }

    function drawTanCurve(color) {
        for (var angle = 0; angle < Math.PI * 2; angle += 0.01) {
            var x = angle * size,
                y = Math.tan(angle) * size;
            
            console.log('a=', angle * (Math.PI * 180), ' t=', Math.tan(angle));

            context.fillStyle = color;
            context.fillRect(x, y, 3, 3);
        }
    }

    function drawLine(p1, p2, color) {
        context.beginPath();
        context.moveTo(p1.x, p1.y);    
        context.lineTo(p2.x, p2.y);
        context.strokeStyle = color;
        context.stroke();
        context.closePath();
    }
};