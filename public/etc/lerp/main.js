window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        R2D = 57.2957795131,
        radius = 10,
        p1 = {x: 0,   y: 0},
        p2 = {x: 200, y: 0},
        p3 = {x: 400, y: 0},
        p4 = {x: 600, y: 0},
        lookAt = {x: 200, y: 200};

    update();

    function update() {
        //context.clearRect(0, 0, width, height);

        //context.save();

        context.translate(width / 2,  height / 2);

        drawCircle(p1, radius, "rgba(80, 80, 80, 1)");
        drawCircle(p2, radius, "rgba(80, 80, 80, 1)");
        drawCircle(p3, radius, "rgba(80, 80, 80, 1)");
        drawCircle(p4, radius, "rgba(80, 80, 80, 1)");

        drawCircle(lookAt, radius, "rgba(234, 0, 94, 1)");

        interpolateAngle(p1, p2, 10, lookAt, true);
        interpolateAngle(p3, p4, 10, lookAt, false);
        //drawArrowLine(p1, p2, "#999999");
        
        //context.restore();

        //requestAnimationFrame(update);
    }

    function interpolateAngle(p1, p2, step, lookAt, started) {
        var angle = betweenAngle(p2, lookAt) * R2D,
            begin = 0,
            end   = angle;

        console.log("angle=" + angle, started);

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

    function betweenAngle(p1, p2) {
        return Math.atan2(p2.y - p1.y, p2.x - p1.x); // -2.356194490192345 
    }

    // function drawArrow(p1, p2, color) {
    //     var dx = p2.x - p1.x;
    //     var dy = p2.y - p1.y;
    //     var dist = Math.sqrt(dx * dx + dy * dy);

    //     var vx = dx / dist;
    //     var vy = dy / dist;

    //     // TODO: size 매핑은 임시코드임. lineWIdth 크기로 매핑 필요.
    //     var size = map(dist, 0, width / 2, 5, 50);

    //     var backTriX = p2.x - vx * size * 2;
    //     var backTriY = p2.y - vy * size * 2;
    //     var perpendDx = - vy * size;
    //     var perpendDy = vx * size;

    //     context.beginPath();
    //     context.moveTo(p2.x, p2.y);    
    //     context.lineTo(backTriX + perpendDx, backTriY + perpendDy);
    //     context.lineTo(backTriX - perpendDx, backTriY - perpendDy);
    //     context.fillStyle = color;
    //     context.fill();
    //     context.closePath();
    // }

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

    // document.body.addEventListener("mousemove", function(event) {
    //     p2 = {
    //         x: event.x - width / 2,
    //         y: event.y - height / 2 
    //     };
    // });
};