/**
 * Mental Graphics by myounggun@gmail.com
 * 
 * Plane.js
 */
!window.mg && (window.mg = {});
!window.mg.objects && (window.mg.objects = {});

(function() {
var NS = mg.objects;

NS.Plane = function() {
    this.position = {x: 0, y: 0, z:0};
    
    this.vertices = [];
    this.vertices[0] = {x: -500, y: -500, z: 500};
    this.vertices[1] = {x:  500, y: -500, z: 500}; 
    this.vertices[2] = {x: -500, y:  500, z: 500}; 
    this.vertices[3] = {x:  500, y:  500, z: 500};
}

NS.Plane.prototype = {
    toString: function() {
        return "Plane()";
    }
};

})();