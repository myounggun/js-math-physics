window.onload = function() {
    var NS = mg,
        canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        gridSize = 50,
        changed = true,
        camera = new NS.Camera3D(30, width / height, 50, 10000),
        engine = NS.M3D.getInstance(),
        plane = new NS.Plane(200, 200);
    
    camera.setView(new NS.Vector3D(0, 0, 1500), new NS.Vector3D(0, 0, 0), new NS.Vector3D(0, 1, 0));
    engine.setRenderTarget(context, width, height);
    engine.camera = camera;
    
    update();

    function update() {
        if (changed) {
            
            engine.clear();
            drawXYAxis();
            engine.render(plane);

            changed = false;
        }
        
        requestAnimationFrame(update);
    }
    
    // camera
    function camTranslate(x, y, z) {
        camera.translate(x, y, z);
        changed = true;
    }
    
    function camRotateX(angle) {
        camera.rotateX(angle);
        changed = true;
    }
    
    function camRotateY(angle) {
        camera.rotateY(angle);
        changed = true;
    }
    
    // plane
    function planeTranslate(x, y, z) {
        plane.translate(x, y, z);
        changed = true;
    }
    
    function planeRotateX(angle) {
        plane.rotateX(angle);
        changed = true;
    }
    
    function planeRotateY(angle) {
        plane.rotateY(angle);
        changed = true;
    }
    
    document.body.addEventListener("keydown", function(event) {
        console.log(event.keyCode);
        
        var isModelControl = (event.shiftKey);
        
        switch(event.keyCode) {
            // translate
            case 37: // left
                if (isModelControl) {
                    planeTranslate(-20, 0, 0);
                } else {
                    camTranslate(-20, 0, 0);
                }
                
                break;
            case 39: // right
                if (isModelControl) {
                    planeTranslate(20, 0, 0);
                } else {
                    camTranslate(20, 0, 0);
                }
                break
            case 38: // up
                if (isModelControl) {
                    planeTranslate(0, 0, -20);
                } else {
                    camTranslate(0, 0, -20);
                }
                break;
                
            case 40: // down
                if (isModelControl) {
                    planeTranslate(0, 0, 20);
                } else {
                    camTranslate(0, 0, 20);
                }
                break;
            
            // rotate
            case 65: // A : left
                if (isModelControl) {
                    planeRotateY(-0.2);
                } else {
                    camRotateY(-0.2);
                }
                break;
            case 68: // D : right
                if (isModelControl) {
                    planeRotateY(0.2);
                } else {
                    camRotateY(0.2);
                }
                break;
            case 87: // W : up
                if (isModelControl) {
                    planeRotateX(-0.2);
                } else {
                    camRotateX(-0.2);
                }
                break;
            case 83: // S : down
                if (event.shiftKey) {
                    planeRotateX(0.2);
                } else {
                    camRotateX(0.2);
                }
                break;
        }
    });
    
    function drawXYAxis() {
        var c = engine.screenCenter;
        drawLine({x: c.x - width, y: c.y}, {x: c.x + width, y: c.y}, "#999999");
        drawLine({x: c.x, y: c.y - height}, {x: c.x, y: c.y + height}, "#999999");
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