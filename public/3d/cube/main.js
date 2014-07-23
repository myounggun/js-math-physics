window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = 800,//window.innerWidth,
        height = canvas.height = 600,//window.innerHeight,
        gridSize = 50,
        fl = 300,
        points = [],
        needUpdate = true,
        centerZ = 1500;

    
    context.translate(width / 2, height / 2);
    
    points[0] = {x: -500, y: -500, z: 500};
    points[1] = {x:  500, y: -500, z: 500}; 
    points[2] = {x:  500, y: -500, z: -500}; 
    points[3] = {x: -500, y: -500, z: -500};
    points[4] = {x: -500, y: 500, z: 500};
    points[5] = {x:  500, y: 500, z: 500}; 
    points[6] = {x:  500, y: 500, z: -500}; 
    points[7] = {x: -500, y: 500, z: -500};

    function project() {
        for (var i = 0; i < points.length; i++) {
            var p = points[i],
                scale = fl / (fl + p.z + centerZ);
            
            p.sx = p.x * scale;
            p.sy = p.y * scale;
        }
    }
    
    function drawVertexLine() {
        var p = points[arguments[0]];
        context.moveTo(p.sx, p.sy);
        
        for (var i = 1; i < arguments.length; i++) {
            p = points[arguments[i]];
            context.lineTo(p.sx, p.sy);
        }
    }
    
    function translateModel(x, y, z) {
        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            p.x += x;
            p.y += y;
            p.z += z;
        }
        
        needUpdate = true;
    }
    
    function rotateX(angle) {
        var cosA = Math.cos(angle),
            sinA = Math.sin(angle);
        
        for (var i = 0; i < points.length; i++) {
            var p = points[i],
                y1 = p.y * cosA - p.z * sinA,
                z1 = p.y * sinA + p.z * cosA;
            
            p.y = y1;
            p.z = z1;   
        }
        
        needUpdate = true;
    }
    
    function rotateY(angle) {
        var cosA = Math.cos(angle),
            sinA = Math.sin(angle);
        
        for (var i = 0; i < points.length; i++) {
            var p = points[i],
                x1 = p.x * cosA - p.z * sinA,
                z1 = p.x * sinA + p.z * cosA;
            
            p.x = x1;
            p.z = z1;   
        }
        
        needUpdate = true;
    }
    
    function rotateZ(angle) {
        var cosA = Math.cos(angle),
            sinA = Math.sin(angle);
        
        for (var i = 0; i < points.length; i++) {
            var p = points[i],
                x1 = p.x * cosA - p.y * sinA,
                y1 = p.x * sinA + p.y * cosA;
            
            p.x = x1;
            p.y = y1;   
        }
        
        needUpdate = true;
    }
    
    // 3d model translate & rotation
    document.body.addEventListener("keydown", function(event) {
        console.log(event.keyCode);
        switch(event.keyCode) {
            // translate
            case 37: // left
                translateModel(-20, 0, 0);
                break;
            case 39: // right
                translateModel(20, 0, 0);
                break
            case 38: // up
                if (event.shiftKey) {
                    translateModel(0, 0, 20);
                } else {
                    translateModel(0, -20, 0);
                }
                break;
                
            case 40: // down
                if (event.shiftKey) {
                    translateModel(0, 0, -20);
                } else {
                    translateModel(0, 20, 0);
                }
                break;
            
            // rotate
            case 65: // A : left
                rotateY(0.05);
                break;
            case 68: // D : right
                rotateY(-0.05);
                break;
            case 87: // W : up
                rotateX(0.05);
                break;
            case 83: // S : down
                rotateX(-0.05);
                break;                
           
        }
    });
    
    
    update();

    function update() {
        
        if (needUpdate) {
            context.clearRect(-width / 2, -height / 2, width, height);
    
            drawGrid();
            drawXYAxis();
            
            project();
            
            context.save();
            context.beginPath();
            
            drawVertexLine(0, 1, 2, 3, 0);
            drawVertexLine(4, 5, 6, 7, 4);
            drawVertexLine(0, 4);
            drawVertexLine(1, 5);
            drawVertexLine(2, 6);
            drawVertexLine(3, 7);
            context.strokeStyle = "#000000";
            context.stroke();
            context.closePath();
            context.restore();
            
            console.log('update');
            
            needUpdate = false;
        }
        
        requestAnimationFrame(update);
    }
    
    
    function drawGrid() {
        context.beginPath();
        context.strokeStyle = "#eeeeee";
 
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
        drawLine({x: -width, y: 0}, {x: width, y: 0}, "#999999");
        drawLine({x: 0, y: -height}, {x: 0, y: height}, "#999999");
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