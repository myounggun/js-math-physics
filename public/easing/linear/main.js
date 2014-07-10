window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        ballRadius = 50,
        ballPoint = {x: ballRadius, y: height / 2},
        t = 0,
        b = ballPoint.x;
        c = width - (ballPoint.x + ballRadius),
        d = 30; // c 값이 들어가면 선형 보간 없이 1픽셀 이동과 같음.

    update();

    function update() {
        context.clearRect(0, 0, width, height);
        
        t++;
        
        ballPoint.x = linearTween(t, b, c, d);
        console.log('t, b, c, d=', t, b, c, d, ', ballPoint.x = ', ballPoint.x);

        drawCircle(ballPoint, ballRadius, "rgba(234, 0, 94, 1)");
        drawCircle(ballPoint, 2, "rgba(255, 255, 255, 1)"); // ball center
        
        if (t === d) {
            return;
        }
        
        requestAnimationFrame(update);
    }

    function drawCircle(p, radius, color) {
        context.beginPath();
        context.arc(p.x, p.y, radius, 0, Math.PI * 2, false);
        context.fillStyle = color;
        context.fill();
        context.closePath();
    }
    
    function linearTween(t, b, c, d) {
        t /= d;
        return c * t + b;
        //return c * t/d + b;
//        lerp: (max - min) * norm + min
    }
    
    function easeInQuad(t, b, c, d) {
        return c * (t /= d) * t + b;
//        t /= d
//        t = t / d
//        (t / d) * t
//        (t * t) / (d * d)
//        c * (t * t) / (d * d) + b;
     };
};