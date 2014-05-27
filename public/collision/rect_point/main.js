window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight,
        rect = {
            x: 300,
            y: 200,
            width: 200, // -200
            height: 200 // -200
        },
        mouseX = 0,
        mouseY = 0;

    
    update();

    function update() {
        context.clearRect(0, 0, width, height);
       
        if (Maths.pointInRect(mouseX, mouseY, rect)) {
            context.fillStyle = "#ff6666";
        } else {
            context.fillStyle = "#999999";
        }

        context.fillRect(rect.x, rect.y, rect.width, rect.height);

        requestAnimationFrame(update);
    }
    
    document.body.addEventListener("mousemove", function(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });
};