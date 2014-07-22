window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        focalLength = 300, // 초점 거리
        boxes = [],
        numBoxes = 200;
    
    for (var i = 0; i < numBoxes; i++) {
        var box = {
            x: Maths.randomRange(-1000, 1000),
            y: Maths.randomRange(-1000, 1000),
            z: Maths.randomRange(0, 10000),
        };
        
        boxes.push(box);
    }
    
    context.translate(width / 2, height / 2);
    
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
            
            var color = Math.floor(Maths.map(box.z, 0, 5000, 80, 255));
            
            context.fillStyle = "rgba("+color+","+color+","+color+", 1)";
            context.fillRect(-100, -100, 200, 200);
            context.fill();
            context.closePath();

            context.translate(-100, -100);
            
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