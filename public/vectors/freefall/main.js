window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        ballRadius = 20,
        ballPoint = {x: ballRadius, y: ballRadius},
        vx = 3;
        vy = 0,  // 초속도 
        g = 0.5; // 중력

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        vy += g;
        ballPoint.x += vx;
        ballPoint.y += vy;

        if (ballPoint.y + ballRadius / 2 >= height) {
            console.log('--');
            console.log(vy);
            vy = -vy - g;
            console.log(vy);
            console.log('---');
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