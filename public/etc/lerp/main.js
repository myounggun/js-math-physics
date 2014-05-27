window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        R2D = 57.2957795131,
        TWO_PI = 6.283185307179586,
        radius = 10,
        // p1 = {x: 100, y: 100},
        // p2 = {x: 200, y: 100},
        // p3 = {x: 300, y: 100},
        // p4 = {x: 400, y: 100},
        // lookAt = {x: 100, y: 50};

        // p1 = {x: 100, y: 100},
        // p2 = {x: 200, y: 100},
        // p3 = {x: 300, y: 100},
        // p4 = {x: 400, y: 100},
        // lookAt = {x: 300, y: 200};

        p1 = {x: 100, y: 400},
        p2 = {x: 100, y: 300},
        p3 = {x: 100, y: 200},
        p4 = {x: 100, y: 100},
        lookAt = {x: 50, y: 350};

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        drawCircle(p1, radius, "rgba(80, 80, 80, 1)");
        drawCircle(p2, radius, "rgba(80, 80, 80, 1)");
        drawCircle(p3, radius, "rgba(80, 80, 80, 1)");
        drawCircle(p4, radius, "rgba(80, 80, 80, 1)");

        drawCircle(lookAt, radius, "rgba(234, 0, 94, 1)");

        interpolateAngle(p1, p2, 3, lookAt, true);
        //interpolateAngle(p2, p3, 3, lookAt, false);

        //requestAnimationFrame(update);
    }

    function interpolateAngle(p1, p2, step, lookAt, started) {
        var angle = betweenAngle(p1, p2, lookAt),
            begin = 0,
            end   = angle;

        console.log("interpol angle=" + angle, started);

        if (!started) {
            begin = angle;
            end   = 0;
        }

        var angles = [];
        for (var i = 0; i <= step; i++) {
            angles.push(map(i, 0, step, begin, end));
        }

        console.log(angles);
    }

    function drawCircle(p, radius, color) {
        context.beginPath();
        context.arc(p.x, p.y, radius, 0, Math.PI * 2, false);
        context.fillStyle = color;
        context.fill();
        context.closePath();
    }

    function betweenAngle(p1, p2, p3) {
        var angle = getAngle(p2, p3) - getAngle(p1, p2);
        angle *= R2D;

        if (angle > 180) {
            angle -= 360;
        } else if (angle < -180) {
            angle += 360;  
        }
            
        return angle;
    }

    function getAngle(p1, p2) {
        var dx = p2.x - p1.x,
            dy = p2.y - p1.y;
        
        return Math.atan2(dy, dx);
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
};