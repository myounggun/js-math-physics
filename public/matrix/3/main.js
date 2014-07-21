window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = 800;//window.innerWidth,
        height = canvas.height = 600;//window.innerHeight,
        gridSize = 50;
    
    context.translate(width / 2, height / 2);
    
    drawGrid();
    drawXYAxis();
    
    context.fillStyle = "#ff0000";
    
    var A = 45 * Math.PI / 180;
    var cosA = Math.cos(A);
    var sinA = Math.sin(A);
    var tanA = Math.tan(A);
  
    //rotate
    /**
     * | a  c tx  |
     * | b  d ty  |
     * | 0  0  1  |
     */
    //context.transform(cosA, -sinA, sinA, cosA, 100, 100);
    
    /**
     * | a  b   0  |
     * | c  d   0  |
     * | tx ty  1  |
     */
    context.transform(cosA, sinA, -sinA, cosA, 100, 100);
  
    //skew
    //context.transform(1, 0, tanA, 1, 100, 100);
    
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