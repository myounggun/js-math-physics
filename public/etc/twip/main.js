/**
 * twip: 1/20 -> 0.05 단위로 좌표 계산
 */
window.onload = function() {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext("2d"),
        width = canvas.width = window.innerWidth,
        height = canvas.height = window.innerHeight;
    
    document.body.addEventListener("mousemove", function(event) {
        var twip = 0.05,
            rand = Math.random(),
            value = rand;
       
        value = Maths.roundNearest(value, twip); 
        value = Maths.roundToPlaces(value, 2);
        
        //console.log(rand, value);

        value = rand;
        
        value = Maths.roundToShift(value, 16);
        console.log(value, Math.floor(value));
    });
    
};