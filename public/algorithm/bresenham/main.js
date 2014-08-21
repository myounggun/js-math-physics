window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;

    drawBresenhamLine(0, 0, 500, 100, 5, "#ff0000");
    drawBresenhamLine(0, 0, 500, 200, 5, "#00ff00");
    drawBresenhamLine(0, 0, 500, 300, 5, "#0000ff");

    /**
     * Bresenham Algorithm
     * @see http://www.edepot.com/linebresenham.html
     * 
     * @param x1, y1 시작점
     * @param x2, y2 끝점
     * @param n 크기
     * @param c 컬러
     */
    function drawBresenhamLine(x1, y1, x2, y2, n, c) {
        var x, y, dx, dy, incx, incy, balance;
        if (!n) {
            n = 1;
        } else {
            x1 = parseInt(x1/n); y1 = parseInt(y1/n);
            x2 = parseInt(x2/n); y2 = parseInt(y2/n);
        }

        if (x2 >= x1) {
            dx = x2-x1;
            incx = 1;
        } else {
            dx = x1-x2;
            incx = -1;
        }

        if (y2 >= y1) {
            dy = y2-y1;
            incy = 1;
        } else {
            dy = y1-y2;
            incy = -1;
        }

        x = x1;
        y = y1;

        if (dx >= dy) {
            dy <<= 1;
            balance = dy-dx;
            dx <<= 1;

            while (x != x2) {
                drawRec(x*n, y*n, n, c);

                if (balance >= 0) {
                    y += incy;
                    balance -= dx;
                }

                balance += dy;
                x += incx;
            }

            drawRec(x*n, y*n, n, c);
        } else {
            dx <<= 1;
            balance = dx-dy;
            dy <<= 1;
            
            while (y != y2) {
                drawRec(x*n, y*n, n, c);

                if (balance >= 0) {
                    x += incx;
                    balance -= dy;
                }

                balance += dx;
                y += incy;
            }

            drawRec(x*n, y*n, n, c);
        }
    }

    function drawRec(x, y, n, c) {
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x+n, y);
        context.lineTo(x+n, y+n);
        context.lineTo(x,   y+n);
        context.lineTo(x,   y);
        context.fillStyle = c || "#000000";
        context.fill();
        context.closePath();
    }
};
