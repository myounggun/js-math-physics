window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        rect0 = {
            x: 200,
            y: 200,
            width: 200,
            height: 100
        },
        rect1 = {
            x: 0,
            y: 0,
            width: 100,
            height: 200
        };

    
    update();

    function update() {
        context.clearRect(0, 0, width, height);
       
        if (Maths.rectIntersect(rect0, rect1)) {
            context.fillStyle = "#ff6666";
        } else {
            context.fillStyle = "#999999";
        }

        context.fillRect(rect0.x, rect0.y, rect0.width, rect0.height);
        context.fillRect(rect1.x, rect1.y, rect1.width, rect1.height);

        requestAnimationFrame(update);
    }
    
    document.body.addEventListener("mousemove", function(event) {
        rect1.x = event.clientX - rect1.width / 2;
        rect1.y = event.clientY - rect1.height  / 2;
    });
};