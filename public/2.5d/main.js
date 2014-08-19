window.onload = function() {
    var NS = mg,
        canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        focalLength = 300, // 초점 거리
        boxes = [],
        numBoxes = 100;
    
    context.translate(width / 2, height / 2);

    for (var i = 0; i < numBoxes; i++) {
        var box = {
            x: NS.Maths.randomRange(-1000, 1000),
            y: NS.Maths.randomRange(-1000, 1000),
            z: NS.Maths.randomRange(0, 10000)
        };
        
        boxes.push(box);
    }
    
    update();

    function update() {
        context.clearRect(-width / 2, -height / 2, width, height);
        
        drawXYAxis();
        
        boxes.sort(function (a, b) {return b.z - a.z});
        
        for (var i = 0; i < numBoxes; i++) {
            var box = boxes[i],
                perspective = focalLength / (focalLength + box.z);
            
            context.save();

            context.beginPath();
            context.scale(perspective, perspective);
            context.translate(box.x, box.y);
            
            var alpha = NS.Maths.map(box.z, 0, 5000, 1, 0);
  
            context.fillStyle = "rgba(0, 0, 0, " + alpha + ")";
            context.arc(0, 0, 100, 0, Math.PI * 2, true);
            context.fill();
            context.closePath();
            
            context.restore();
            
            box.z -= 5;
            if (box.z < 0) {
                box.z = 10000;
            }
        }

        requestAnimationFrame(update);
    }
    
    
    function drawXYAxis() {
        drawLine({x: -width / 2, y: 0}, {x: width, y: 0}, "#999999");
        drawLine({x: 0, y: -height / 2}, {x: 0, y: height}, "#999999");
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