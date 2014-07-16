window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;
    
    function getVertexBy(points) {
        points.sort(function(a, b){return a.y - b.y});
        console.log('y sort=', points);
        
        var len = points.length;
        for (var i = 0; i < len; i++) {
            var p0 = points[0],
                p1 = points[i],
                dx = p1.x - p0.x,
                dy = p1.y - p0.y;
            
            p1.angle = Math.atan2(dy, dx);
        }
        
        points.sort(function(a, b){return a.angle - b.angle});
        console.log('angle sort=', points);
       
        for (i = 0; i < points.length - 2; i++) {
            var v0 = points[i],
                v1 = points[i + 1],
                v2 = points[i + 2];
            
            var ab = v1.subtract(v0);
            var bc = v2.subtract(v1);
            
            if (ab.cross(bc).z < 0) {
                points.splice(i + 1, 1);
                i -= 2;
            }
        }
        
        return points;
    }

    function createPoints() {
        var points = [];
        for (var i = 0; i < 50; i++) {
            var x = Math.random() * width / 2 + 20,
                y = Math.random() * width / 2 + 20,
                p = new Vector3D(x, y, 0);
            
            drawCircle(p, 5, "rgba(234, 0, 94, 1)");
            
            points.push(p);
        }
        
        return points;
    }
    
    
    function drawCircle(p, radius, color) {
        context.beginPath();
        context.arc(p.x, p.y, radius, 0, Math.PI * 2, false);
        context.fillStyle = color;
        context.fill();
        context.closePath();
    }
    
    function drawConvexHull(vertices) {
        var v0 = vertices[0];
        
        context.beginPath();
        context.moveTo(v0.x, v0.y);
        
        var len = vertices.length;
        for (var i = 0; i < len; i++) {
            var v = vertices[i];
            context.lineTo(v.x, v.y);
        }
        
        context.lineTo(v0.x, v0.y);
        context.strokeStyle = '#999999';
        context.stroke();
        context.closePath();
    }

    var vertices = getVertexBy(createPoints());
    
    drawConvexHull(vertices);
    
    
};