window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = 800;//window.innerWidth,
        height = canvas.height = 600;//window.innerHeight,
        gridSize = 50,
        focalLength = 300, // 초점 거리
        box = {x: 200, y: 200, z: 300}; // z = 0 -> scale = 1, z = forcalLength -> scale = 0.5

    
    context.translate(width / 2, height / 2);
    
    drawGrid();
    drawXYAxis();

    context.save();
    
    var perspective = focalLength / (focalLength + box.z);
    
//    context.translate(box.x * perspective, box.y * perspective);
//    context.scale(perspective, perspective);
    
    // 스케일 적용하면 이후 이동에 스케일이 적용된다. 연산을 줄임.
    context.scale(perspective, perspective);
    context.translate(box.x, box.y);
    
    context.fillRect(-100, -100, 200, 200);
    
    console.log(perspective);
    context.restore();
    
    
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