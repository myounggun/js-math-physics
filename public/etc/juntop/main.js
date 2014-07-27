
window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        w = canvas.width = 800, //window.innerWidth,
        h = canvas.height = 600; //window.innerHeight;
    
    drawText(getRandomPoint(), "채명석", "#000000");
    drawText(getRandomPoint(), "황준상", "#000000");
    drawText(getRandomPoint(), "테스트", "#000000");
    
    var collisonPoints = [],
        txtIndex = 0,
        prevPoint,
        imageData = context.getImageData(0, 0, w, h).data;
    
    for (var y = 0; y < h; y += 1) {
        for (var x = 0; x < w; x++) {
            var index = (y * w + x) * 4,
                alpha = imageData[index + 3];
            
            if (alpha > 0) {
                var newPoint = { x: x, y: y};
                
                if (prevPoint && (newPoint.y - prevPoint.y) > 1) {
                    txtIndex++; // 새로운 텍스트 시작
                }
                
                if (!collisonPoints[txtIndex]) {
                    collisonPoints[txtIndex] = [];
                }
                
                collisonPoints[txtIndex].push(newPoint);
                prevPoint = newPoint;
            }
        }
    }
    
    // 텍스트 좌표를 이차원 배열로 저장
    console.log(collisonPoints);

    var len = collisonPoints.length;
    for (var i = 0; i < len; i++) {
        var textPoints = collisonPoints[i],
            prevTextPoints = collisonPoints[i -1];
        
        var textLen = textPoints.length;
        for (var j = 0; j < textLen; j++) {
            var rect = getTextRect(textPoints);
//            drawRect(rect, "#ff0000"); // 검출한 텍스트에 색칠을 하고 싶다면..
            
            var p1, p2, prevTextRect, text;
            if (prevTextPoints) { // 이전 텍스트가 있다면 가이드 라인 시작 위치를 조정한다.
                prevTextRect = getTextRect(prevTextPoints);
                p1 = { 
                    x: rect.x + rect.width / 2,
                    y: prevTextRect.y + prevTextRect.height
                };
            } else {
                p1 = { 
                    x: rect.x + rect.width / 2,
                    y: 0
                };
            }
            
            p2 = {
                x: rect.x + rect.width / 2, 
                y: rect.y
            };

            drawLine(p1, p2, "#ff0000"); // 가이드 세로 라인 표시
            
            
            textPoint = {
                x: p2.x,
                y: p2.y - rect.height / 2
            };
            
            text = p2.y - p1.y;
            drawText(textPoint, text, "#000000"); // 가이드 텍스트 표시
        }
    }

    
    function getTextRect(points) {
        var minX, maxX, minY, maxY;
        
        points.sort(function(a, b) { return a.x - b.x; });
        
        minX = points[0].x;
        maxX = points[points.length - 1].x;
        
        points.sort(function(a, b) { return a.y - b.y; });
        
        minY = points[0].y;
        maxY = points[points.length - 1].y;
        
        return {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY
        }
    }
    
    function getRandomPoint() {
        return {
            x: Math.random() * w / 2 + 50,
            y: Math.random() * h / 2 + 50
        }
    }

    function drawRect(rect, color) {
        context.fillStyle = color;
        context.fillRect(rect.x, rect.y, rect.width, rect.height);
    }
    
    function drawText(p, text, color) {
        context.fillStyle = color;
        context.fillText(text, p.x, p.y);
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