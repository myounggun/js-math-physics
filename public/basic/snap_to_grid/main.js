window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        gridSize = 40,
        circlePoint = {x: 0, y: 0};

    update();

    function update() {
        context.clearRect(0, 0, width, height);
        
        drawGrid();
        drawCircle(circlePoint, 20, "rgba(234, 0, 94, 1)");

        requestAnimationFrame(update);
    }
    
    function drawGrid() {
        context.beginPath();
        context.strokeStyle = "#cccccc";
        
        // X 축 
        for (var x = 0; x <= width; x += gridSize) {
            context.moveTo(x, 0);
            context.lineTo(x, height);
        }
        
        // Y 축 
        for (var y = 0; y <= height; y += gridSize) {
            context.moveTo(0, y);
            context.lineTo(width, y);
        }
        
        context.stroke();
    }
    
    function drawCircle(p, radius, color) {
        context.beginPath();
        context.arc(p.x, p.y, radius, 0, Math.PI * 2, false);
        context.fillStyle = color;
        context.fill();
        context.closePath();
    }
    
    document.body.addEventListener("mousemove", function(event) {
        var x = Maths.roundNearest(event.clientX, gridSize),
            y = Maths.roundNearest(event.clientY, gridSize)
            
        circlePoint.x = x;
        circlePoint.y = y;
    });
};