
window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        w = canvas.width = 200,//window.innerWidth,
        h = canvas.height = 200;//window.innerHeight;
    
    context.fillStyle = '#000000';
    context.fillText('가나다', 50, 50);
    
    var points = [];
    var imageData = context.getImageData(0, 0, w, h).data;
    for (var y = 0; y < h; y +=2) {
        for (var x=0; x < w; x++) {
            var index = (y * w + x) * 4,
                alpha = imageData[index + 3];
            
            if (alpha > 0) {
               points.push({ x: x, y: y});
            }
        }
    }
    
    points.sort(function(a, b) {
        if (a.x == b.x) {
            return a.y - b.y;
        }
        return a.x - b.x;
     });
    
    
    var sp = points[0],
        ep = points[points.length - 1];
    
    context.fillStyle = "#ff0000";
    context.fillRect(sp.x, sp.y, ep.x - sp.x, ep.y - sp.y);
};