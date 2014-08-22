window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        image = document.getElementById("image"),
        slider = document.getElementById("slider");
        w = image.width,
        h = image.height;

    canvas.width  = w;
    canvas.height = h;

    context.drawImage(image, 0, 0, w, h);

    var texture = context.getImageData(0, 0, w, h).data; // 34x34
    var canvas2 = document.getElementById("canvas2");
    var context2 = canvas2.getContext("2d");
    var size = 9;
    var z = 1000;

    canvas2.width = w * size;
    canvas2.height = h * size;

    context2.translate(canvas2.width / 2, canvas2.height / 2);

    slider.addEventListener("input", function(e) {
        setZ(e.target.value);
    }, false);

    render();

    function render() {
        context2.clearRect(-canvas2.width / 2, -canvas2.height / 2, canvas2.width, canvas2.height);

        var i, j, t = texture;
        var p = [];
        for (j = 0; j < h - 1; j++)  {
            p[j] = [];

            for (i = 0; i < w - 1; i++) {
                p[j][i] = [];
                p[j][i][0] = (i - (w - 2) * 0.5) * size / (i / z + 1);
                p[j][i][1] = (j - (h - 2) * 0.5) * size / (i / z + 1);
            }
        }

        var x, y, k = 0;
        for (y = 0; y < h - 2; y++)  {
            for (x = 0; x < w - 2; x++) {
                // if (k > 0) return;
                i = (y * w + x) * 4;
                r = t[i + 0];
                g = t[i + 1];
                b = t[i + 2];
                a = t[i + 3];

                // context.save();
                context2.beginPath();
                context2.moveTo(p[y][x][0], p[y][x][1]);
                context2.lineTo(p[y][x+1][0], p[y][x+1][1]);
                context2.lineTo(p[y+1][x+1][0], p[y+1][x+1][1]);
                context2.lineTo(p[y+1][x][0], p[y+1][x][1]);
                context2.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
                context2.fill();
                context2.closePath();
                // context.restore();
                k++;
            }
        }
    }

    function setZ(value) {
        z = 950 * value + 50;
        render();
    }
};
