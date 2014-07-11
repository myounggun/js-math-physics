window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        ball0 = {x: 50, y: 100, radius: 50},
        ball1 = {x: 50, y: 200, radius: 50},
        ball2 = {x: 50, y: 300, radius: 50},
        ball3 = {x: 50, y: 400, radius: 50},
        t = 0,
        b = ball0.x;
        c = width - (ball0.x + ball0.radius),
        d = 100;
        
    update();

    function update() {
        context.clearRect(0, 0, width, height);
        
        t++;
        
        ball0.x = linearTween(t, b, c, d);
        ball1.x = easeInQuadTween(t, b, c, d);
        ball2.x = easeOutQuadTween(t, b, c, d);
        ball3.x = easeInOutQuadTween(t, b, c, d);

        drawCircle(ball0, ball0.radius, "#ff0000");
        drawCircle(ball1, ball1.radius, "#00ff00");
        drawCircle(ball2, ball2.radius, "#0000ff");
        drawCircle(ball3, ball2.radius, "#808080");
        
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
        return c * t / d + b;
//        t /= d;
//        return c * t + b;
    }
    
    function easeInQuadTween(t, b, c, d) {
        return c * (t /= d) * t + b;
//        t /= d;
//        return c * t * t + b;
     };
     
     function easeOutQuadTween(t, b, c, d) {
         return -c * (t /= d) * (t - 2) + b;
//         t /= d;
//         return c * -t * (t - 2) + b;
      };
      
    function easeInOutQuadTween(t, b, c, d) {
        t /= d / 2;
//        d = d / 2;
//        t = t / d;
        if (t < 1) {
            return (c / 2) * t * t + b;
        } else {
            return (-c / 2) * (--t * (t - 2) - 1) + b;
        }
    };
};