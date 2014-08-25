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

        var x, y,
            t = texture,
            p = [];

        for (y = 0; y < h - 1; y++)  {
            p[j] = [];
            for (x = 0; x < w - 1; x++) {
                p[y][x] = [];
                p[y][x][0] = (x - (w - 2) * 0.5) * size / (x / z + 1);
                p[y][x][1] = (y - (h - 2) * 0.5) * size / (y / z + 1);
            }
        }

        var r, g, b, a, idx;
        for (y = 0; y < h - 2; y++)  {
            for (x = 0; x < w - 2; x++) {
                idx = (y * w + x) * 4;
                r = t[idx + 0]; g = t[idx + 1]; b = t[idx + 2]; a = t[idx + 3];

                context2.beginPath();
                context2.moveTo(p[y][x][0], p[y][x][1]);
                context2.lineTo(p[y][x+1][0], p[y][x+1][1]);
                context2.lineTo(p[y+1][x+1][0], p[y+1][x+1][1]);
                context2.lineTo(p[y+1][x][0], p[y+1][x][1]);
                context2.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
                context2.fill();
                context2.closePath();
            }
        }
    }

    function setZ(value) {
        z = 950 * value + 50;
        render();
    }
};
