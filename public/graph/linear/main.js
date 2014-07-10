window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;
        
    context.translate(width / 2, height / 2);
    context.scale(1, -1); // 데카르트 좌표계 -> 화면 좌표계

    drawLinear('#FF0000');
    drawInQuad('#0000FF');
    drawOutQuad('#0000FF');
    //drawEaseInQuad('#00FF00');
    
    function drawLinear(color) {
        var dotSize = 3,
            t = 0,
            b = 0,
            c = 100 - b,
            d = Math.floor(c / dotSize);
        
        for (t = 0; t <= d; t++) {
            var x = t * dotSize;
                y = c * t / d;

            drawCurve(x, y, color);
        }
    }
    
    function drawInQuad(color) {
        var dotSize = 3,
            t = 0,
            b = 0,
            c = 100 - b,
            d = Math.floor(c / dotSize);
        
        for (t = 0; t <= d; t++) {
            var x = t * dotSize;
                y = c * ((t / d) / d) * t;// (t /= d) * t : (t * t) / (d * d) : x^2

            drawCurve(x, y, color);
        }
    }
    
    function drawOutQuad(color) {
        var dotSize = 3,
            t = 0,
            b = 0,
            c = 100 - b,
            d = Math.floor(c / dotSize);
        
        for (t = 0; t <= d; t++) {
            var x = t * dotSize,
                y = c * -(t / d) * ((t / d) - 2); // -x  * (x - 2) : -2x^2 + 2x ->미분 2x + 2 

            drawCurve(x, y, color);
        }
    }

    function drawCurve(x, y, color) {
        context.fillStyle = color;
        context.fillRect(x, y, 3, 3);
    }
    
    function linearTween(t, b, c, d) {
        return c * t/d + b;
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