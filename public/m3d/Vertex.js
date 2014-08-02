/**
 * Mental Graphics by myounggun@gmail.com
 * 
 * Vertex.js 
 */
!window.m3d && (window.m3d = {});
!window.m3d.geom && (window.m3d.geom = {});

(function() {
var NS = m3d.geom;

NS.Vertex = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    
    this.sx = 0;
    this.sy = 0;
}

NS.Vertex.prototype = {

    project: function(m) {
        var x = m.m00 * this.x + m.m01 * this.y + m.m02 * this.z + m.m03,
            y = m.m10 * this.x + m.m11 * this.y + m.m12 * this.z + m.m13,
            z = m.m20 * this.x + m.m21 * this.y + m.m22 * this.z + m.m23;

        this.sx =  x;
        this.sy =  y;
    },
    
    clone: function() {
        return new NS.Vertex(this.x, this.y, this.z);
    },
    
    toString: function() {
        return "vertex(" + this.x + "," + this.y + "," + this.z + "/" + this.sx + "," + this.sy + ")";
    }
};

})();