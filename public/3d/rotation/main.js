window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = 800,//window.innerWidth,
        height = canvas.height = 600,//window.innerHeight,
        gridSize = 100,
        point = {
             x: 100,
             y: 100
        },
        delta = 0.05;

    
    context.translate(width / 2, height / 2);
    
    update();

    function update() {

        context.clearRect(-width / 2, -height / 2, width, height);
    
        drawGrid();
        drawXYAxis();
        
        context.beginPath();
        context.arc(point.x, point.y, 20, 0, Math.PI * 2, false);
        context.fill();
        
        var cosA = Math.cos(delta), // p1과 p2 사이 각 즉, 회전할 각도 (매 프래임마다 0.05씩 회전)
            sinA = Math.sin(delta),
            x1 = point.x * cosA - point.y * sinA,
            y1 = point.x * sinA + point.y * cosA;
        
        point.x = x1;
        point.y = y1;
        
        console.log(delta);
        
        requestAnimationFrame(update);
    }
    
    
    function drawGrid() {
        context.beginPath();
        context.strokeStyle = "#cccccc";
 
        for (var x = -width; x <= width; x += gridSize) {
            context.moveTo(x, -width);
            context.lineTo(x, height);
        }

        for (var y = -height; y <= height; y += gridSize) {
            context.moveTo(-width, y);
            context.lineTo(width, y);
        }
        
        context.stroke();
    }
    
    function drawXYAxis() {
        drawLine({x: -width, y: 0}, {x: width, y: 0}, "#000000");
        drawLine({x: 0, y: -height}, {x: 0, y: height}, "#000000");
    }
    
    function drawLine(p1, p2, color) {
        context.beginPath();
        context.moveTo(p1.x, p1.y);    
        context.lineTo(p2.x, p2.y);
        context.strokeStyle = color;
        context.stroke();
        context.closePath();
    }
};