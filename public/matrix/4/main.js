window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = 800;//window.innerWidth,
        height = canvas.height = 600;//window.innerHeight,
        gridSize = 50;
    
    context.translate(width / 2, height / 2);
    
    drawGrid();
    drawXYAxis();
    
    // https://github.com/STRd6/matrix.js
    var m = new Matrix(1, 0, 0, 1, 0, 0);

    //m = m.scale(2, 2, new Point(0, 0));
    
//    m = m.translate(50, 50);
//    m = m.scale(0.5, 0.5, new Point(0, 0));
    m = m.rotate(45 * Math.PI / 180);
    //m = m.translate(-50, -50);
    //m = m.rotate(45 * Math.PI / 180, new Point(0, 0));
    
    m = m.translate(50, 50);
    
    context.fillStyle = "#ff0000";
  
    /**
     * | a  b   0  |
     * | c  d   0  |
     * | tx ty  1  |
     */
    context.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
    
    context.fillRect(0, 0, 50, 50);
    
    // div clone
    var box = document.getElementById("box");

    box.style.position = "relative";
    box.style.width = "100px";
    box.style.height = "100px";
    box.style.backgroundColor = "#FF8080";
    box.style.webkitTransformOrigin = "left top";
    box.style.webkitTransform = "matrix("+m.a+","+m.b+","+m.c+","+m.d+","+m.tx+","+m.ty+")";

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