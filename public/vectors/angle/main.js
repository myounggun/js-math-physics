window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        p1 = {x: 0, y: 0},
        p2 = {x: 100, y: 0},
        R2D = 57.2957795131;

    update();

    function update() {
        context.clearRect(0, 0, width, height);

        context.save();

        context.translate(width / 2,  height / 2);

        drawCircle(p1, 10, "rgba(234, 0, 94, 1)");
        drawCircle(p2, 10, "rgba(80, 80, 80, 1)");
        drawLine(p1, p2, "#999999");

        var degree = theta(p1, p2) * R2D;
        console.log(Math.floor(degree));

        context.restore();

        requestAnimationFrame(update);
    }

    function drawCircle(p, radius, color) {
        context.beginPath();
        context.arc(p.x, p.y, radius, 0, Math.PI * 2, false);
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

    function theta(p1, p2) {
        var dx = p2.x - p1.x,
            dy = p2.y - p1.y;

        return Math.atan2(-dy, dx);
    }

    document.body.addEventListener("mousemove", function(event) {
        p2 = {
            x: event.x - width / 2,
            y: event.y - height / 2
        };
    });
};
