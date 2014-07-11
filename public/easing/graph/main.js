window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;
        
    context.translate(width / 2, height / 2);
    context.scale(1, -1); // 데카르트 좌표계 -> 화면 좌표계

    drawLinear('#FF0000');
    drawEaseInQuad('#00FF00');
    drawEaseOutQuad('#0000FF');
    drawEaseInOutQuad('#808080');
    
    // linear : c * t / d + b
    function drawLinear(color) {
        var dotSize = 3,
            t = 0,
            b = 0,
            c = 300 - b,
            d = Math.floor(c / dotSize);
        
        for (t = 0; t <= d; t++) {
            var x = t * dotSize,
                y = c * t / d; // y = x

            drawCurve(x, y, color);
        }
    }
    
    // easeInQuad : c * (t /= d) * t + b
    function drawEaseInQuad(color) {
        var dotSize = 3,
            t = 0,
            b = 0,
            c = 300 - b,
            d = Math.floor(c / dotSize);
        
        for (t = 0; t <= d; t++) {
            var x = t * dotSize,
                y = c * ((t / d) / d) * t; // (t * t) / (d * d) : y = x^2

            drawCurve(x, y, color);
        }
    }

    // easeOutQuad : -c * (t /= d) * (t - 2) + b
    function drawEaseOutQuad(color) {
        var dotSize = 3,
            t = 0,
            b = 0,
            c = 300 - b,
            d = Math.floor(c / dotSize);
        
        for (t = 0; t <= d; t++) {
            var x = t * dotSize,
                y = c * -(t / d) * ((t / d) - 2); // -x  * (x - 2) : y = -2x^2 + 2x

            drawCurve(x, y, color);
        }
    }
    
    function drawCurve(x, y, color) {
        context.fillStyle = color;
        context.fillRect(x, y, 3, 3);
    }
};