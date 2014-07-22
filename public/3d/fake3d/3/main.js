window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        focalLength = 300, // 초점 거리
        cards = [],
        numCards = 8,
        centerZ = 1000,
        radius = 1000,
        baseAngle = 0,
        rotationSpeed = 0.01;
    
    for (var i = 0; i < numCards; i++) {
        var card = {
            y: 0,
            angle: Math.PI * 2 / numCards * i,
        };
        
        card.x = Math.cos(card.angle + baseAngle) * radius;
        card.z = centerZ + Math.sin(card.angle + baseAngle) * radius;
        
        cards.push(card);
    }
    
    context.translate(width / 2, height / 2);
    
    document.body.addEventListener("mousemove", function(event){
        
    });
    
    update();

    function update() {
        baseAngle += rotationSpeed;
        cards.sort(function (a, b) {return b.z - a.z});
        
        context.clearRect(-width / 2, -height / 2, width, height);
        
        drawXYAxis();
        
        for (var i = 0; i < numCards; i++) {
            var card = cards[i],
                perspective = focalLength / (focalLength + card.z);
            
            context.save();

            context.beginPath();
            context.scale(perspective, perspective);
            context.translate(card.x, card.y);
            
            var color = Math.floor(Maths.map(card.z, 0, centerZ, 0, 80));
            
            context.fillStyle = "rgba("+color+","+color+","+color+", 1)";
            context.fillRect(-100, -100, 200, 200);
            context.fill();
            context.closePath();

            context.translate(-100, -100);
            
            context.restore();
            
            card.x = Math.cos(card.angle + baseAngle) * radius;
            card.z = centerZ + Math.sin(card.angle + baseAngle) * radius;
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