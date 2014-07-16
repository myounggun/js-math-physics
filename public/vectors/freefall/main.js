window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        ballRadius = 50,
        ballPoint = {x: ballRadius, y: ballRadius},
        vx = 10,
        vy = 0,  // 초속도
        g = 0.5; // 중력

    update();

    function update() {
        context.clearRect(0, 0, width, height);
        
        vy += g;
        ballPoint.x += vx;
        ballPoint.y += vy;

        if (ballPoint.y + ballRadius >= height) {
            vy = -vy - g;
        }
        
        // 좌우 경계면 체크
        if (ballPoint.x + ballRadius > width) {
            ballPoint.x = width - ballRadius;
            vx = -vx;
        }
        if (ballPoint.x - ballRadius < 0) {
            ballPoint.x = ballRadius;
            vx = -vx;
        }

        drawCircle(ballPoint, ballRadius, "rgba(234, 0, 94, 1)");
        drawCircle(ballPoint, 2, "rgba(255, 255, 255, 1)"); // ball center

        requestAnimationFrame(update);
    }

    function drawCircle(p, radius, color) {
        context.beginPath();
        context.arc(p.x, p.y, radius, 0, Math.PI * 2, false);
        context.fillStyle = color;
        context.fill();
        context.closePath();
    }
};