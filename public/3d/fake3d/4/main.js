window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        focalLength = 300, // 초점 거리
        points = [],
        numPoints = 200,
        centerZ = 2000,
        radius = 1000,
        baseAngle = 0,
        rotationSpeed = 0.01;
    
    for (var i = 0; i < numPoints; i++) {
        var point = {
            angle: 0.2 * i,
            y: 2000 - 4000 / numPoints * i
        };
        
        console.log('@point angle=', point.angle, 'y=', point.y);
        
        point.x = Math.cos(point.angle + baseAngle) * radius;
        point.z = centerZ + Math.sin(point.angle + baseAngle) * radius;
        
        points.push(point);
    }
    
    context.translate(width / 2, height / 2);
    
    document.body.addEventListener("mousemove", function(event){
        rotationSpeed = (event.clientX - width / 2) * 0.00005;
//        console.log('clientX=', event.clientX,'halfWidth=', width / 2);
//        console.log('factor=', (event.clientX - width / 2));
    });
    
    update();

    function update() {
        baseAngle += rotationSpeed;
//        points.sort(function (a, b) {return b.z - a.z});
        
        context.clearRect(-width / 2, -height / 2, width, height);
        
        drawXYAxis();
        
        for (var i = 0; i < numPoints; i++) {
            var point = points[i],
                perspective = focalLength / (focalLength + point.z);
            
            context.save();

            context.beginPath();
            context.scale(perspective, perspective);
            context.translate(point.x, point.y);
            
            // 좌우 끝: 0, 중앙: -1 or 1 (x=1 y=0, x=0, y=1) 
            context.scale(Math.sin(point.angle + baseAngle), 1);
            
            var color = Math.floor(Maths.map(point.z, 0, centerZ, 0, 80));
            
            context.fillStyle = "rgba("+color+","+color+","+color+", 1)";
//            context.fillRect(-100, -100, 200, 200);
            context.arc(0, 0, 40, 0, Math.PI * 2, false);
            context.fill();
            context.closePath();

            context.translate(-100, -100);
            
            context.restore();
            
            point.x = Math.cos(point.angle + baseAngle) * radius;
            point.z = centerZ + Math.sin(point.angle + baseAngle) * radius;
//            console.log('angle=', point.angle + baseAngle);
//            console.log('sinA=', Math.sin(point.angle + baseAngle));
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