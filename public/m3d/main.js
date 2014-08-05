window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = 500,//window.innerWidth,
        height = canvas.height = 500,//window.innerHeight,
        gridSize = 50,
        vertexList = [],
        changed = true,
        worldMat = new m3d.geom.Matrix3D(),
        camera = new m3d.Camera3D(45, width / height, 1, 1000),
        engine = m3d.M3D.getInstance();
    
    engine.setScreen(canvas, width, height);
    camera.setView(new m3d.geom.Vector3D(0, 0, 1500), new m3d.geom.Vector3D(0, 0, 0), new m3d.geom.Vector3D(0, 1, 0));
//    camera.rotateY(0.5);
//    context.translate(width / 2, height / 2);

    var size = 200;
    // plane
    vertexList[0] = new m3d.geom.Vertex(-size,  size, -size);
    vertexList[1] = new m3d.geom.Vertex( size,  size, -size); 
    vertexList[2] = new m3d.geom.Vertex(-size, -size, -size); 
    vertexList[3] = new m3d.geom.Vertex( size, -size, -size);
//    console.log(vertexList);
    
    // cube
//    vertexList[0] = new m3d.geom.Vertex(-size, -size,  size);
//    vertexList[1] = new m3d.geom.Vertex( size, -size,  size); 
//    vertexList[2] = new m3d.geom.Vertex( size, -size, -size); 
//    vertexList[3] = new m3d.geom.Vertex(-size, -size, -size);
//    vertexList[4] = new m3d.geom.Vertex(-size,  size,  size);
//    vertexList[5] = new m3d.geom.Vertex( size,  size,  size); 
//    vertexList[6] = new m3d.geom.Vertex( size,  size, -size); 
//    vertexList[7] = new m3d.geom.Vertex(-size,  size, -size);

    
    function drawVertexLine() {
        var vertex = vertexList[arguments[0]];
        context.moveTo(vertex.screenX, vertex.screenY);
        
        for (var i = 1; i < arguments.length; i++) {
            vertex = vertexList[arguments[i]];
            context.lineTo(vertex.screenX, vertex.screenY);
        }
    }
    
    function translateWorld(x, y, z) {
        worldMat = worldMat.translate(x, y, z);
        
        changed = true;
    }
    
    function translateCamera(x, y, z) {
        camera.translate(x, y, z);
        
        changed = true;
    }
    
    function rotateX(angle) {
        camera.rotateX(angle);
        
        changed = true;
    }
    
    function rotateY(angle) {
        camera.rotateY(angle);
        
        changed = true;
    }
    
    function rotateZ(angle) {
        camera.rotateZ(angle);
        
        changed = true;
    }
    
    function transformVertices() {
        var viewMat = camera.getViewMatrix();
        var projMat = camera.getProjMatrix();
        var screenMat = camera.getViewportMatrix(width, height);
        
        // V * W
        var finalMat;
        
        finalMat = viewMat.multiply(worldMat);
        finalMat = projMat.multiply(finalMat);
        finalMat = screenMat.multiply(finalMat);
        
//        console.log('cameraViewProjMatrix-------');
//        console.log(cameraMat.toString());
//        console.log('--');
        
        console.log('finalMatrix---------');
        console.log(finalMat.toString());
        console.log('--', screenMat.toString());
        
        for (var i = 0; i < vertexList.length; i++) {
            var vertex = vertexList[i];
            
            var vector = finalMat.transformVector(vertex);
            vector.project();
            
            vertex.screenX = vector.x;
            vertex.screenY = vector.y;
        }
    }
    
    document.body.addEventListener("keydown", function(event) {
        console.log(event.keyCode);
        switch(event.keyCode) {
            // translate
            case 37: // left
                if (event.shiftKey) {
                    translateWorld(-20, 0, 0);
                } else {
                    translateCamera(-20, 0, 0);
                }
                break;
            case 39: // right
                if (event.shiftKey) {
                    translateWorld(20, 0, 0);
                } else {
                    translateCamera(20, 0, 0);
                }
                break
            case 38: // up
                if (event.shiftKey) {
                    translateWorld(0, 20, 0);
                } else {
                    translateCamera(0, 0, -20);
                }
                break;
                
            case 40: // down
                if (event.shiftKey) {
                    translateWorld(0, -20, 0);
                } else {
                    translateCamera(0, 0, 20);
                }
                break;
            
            // rotate
            case 65: // A : left
                rotateY(-0.1);
                break;
            case 68: // D : right
                rotateY(0.1);
                break;
            case 87: // W : up
                rotateX(-0.1);
                break;
            case 83: // S : down
                rotateX(0.1);
                break;
        }
    });
    
    update();

    function update() {
        if (changed) {
//            context.clearRect(-width / 2, -height / 2, width, height);
            context.clearRect(0, 0, width, height);
    
            var rect = engine.getClipRect();
            context.fillStyle = "rgba(255, 0, 0, 0.3)";
            context.fillRect(rect.x, rect.y, rect.width, rect.height);
            
//            drawGrid();
//            drawXYAxis();
 
//            perspectiveProject(getTransformVertices());
            transformVertices();
            
            context.save();
            context.beginPath();
            
            // plane
            drawVertexLine(0, 1, 2, 0);
            drawVertexLine(1, 3, 2, 1);
            
            // cube
//            drawVertexLine(0, 1, 2, 3, 0);
//            drawVertexLine(4, 5, 6, 7, 4);
//            drawVertexLine(0, 4);
//            drawVertexLine(1, 5);
//            drawVertexLine(2, 6);
//            drawVertexLine(3, 7);
            
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