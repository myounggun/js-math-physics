window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = 800;//window.innerWidth,
        height = canvas.height = 600;//window.innerHeight,
        gridSize = 50;
    
    context.translate(width / 2, height / 2);
    
    drawGrid();
    drawXYAxis();
    
    var m = new mg.geom.Matrix2D(1, 0, 0, 1, 50, 50);
    console.log(m.toString());
    //matrix2D = matrix2D.concat(new mg.geom.Matrix2D(1, 0, 0, 1, 100, 100));
   // m = m.translate(100, 100);
    m = m.scale(2, 2);
    m = m.rotate(Math.PI / 4);
    console.log(m.toString());
    
    context.fillStyle = "#ff0000";
    //context.translate(100, 100);
    //context.rotate(45 * Math.PI / 180);
    //context.scale(0.5, 0.5);
    context.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
    context.fillRect(0, 0, 100, 100);

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