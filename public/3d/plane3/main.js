window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = 800,//window.innerWidth,
        height = canvas.height = 600,//window.innerHeight,
        gridSize = 50,
        focalLength = 300,
        points = [],
        changed = true,
        centerZ = 1500,
        m = new mg.geom.Matrix3D()
        worldMat = new mg.geom.Matrix3D(),
        localMat = new mg.geom.Matrix3D(),
        camera = new mg.core.Camera(new Vector3D(0, 0, -300), new Vector3D(0, 0, 0), new Vector3D(0, 1, 0));
    
    context.translate(width / 2, height / 2);
    
    console.log(camera.getMatrix());
    // plane
    points[0] = {x: -500, y: -500, z: 500};
    points[1] = {x:  500, y: -500, z: 500}; 
    points[2] = {x: -500, y:  500, z: 500}; 
    points[3] = {x:  500, y:  500, z: 500};

    
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
        
        changed = true;
    }
    
    function rotateX(angle) {
        m = m.rotateX(angle);
        
        changed = true;
    }
    
    function rotateY(angle) {
        m = m.rotateY(angle);
        
        changed = true;
    }
    
    function rotateZ(angle) {
        m = m.rotateZ(angle);
        
        changed = true;
    }
    
    function getTransformVertices() {
        var vertices = [];
        for (var i = 0; i < points.length; i++) {
            var p = points[i],
                vertex = m.transform(p);
            
            vertices.push(vertex);
        }
        
        return vertices;
    }
    
    function perspectiveProject(vertices) {
        for (var i = 0; i < vertices.length; i++) {
            var v = vertices[i],
                p = points[i],
                scale = focalLength / (focalLength + v.z + centerZ);
            
            p.sx = v.x * scale;
            p.sy = v.y * scale;
        }
    }
    
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
        if (changed) {
            context.clearRect(-width / 2, -height / 2, width, height);
    
            drawGrid();
            drawXYAxis();
 
            perspectiveProject(getTransformVertices());
            
            context.save();
            context.beginPath();
            
            drawVertexLine(0, 1, 2, 0);
            drawVertexLine(1, 3, 2, 1);
            context.strokeStyle = "#000000";
            context.stroke();
            context.closePath();
            context.restore();
            
            changed = false;
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