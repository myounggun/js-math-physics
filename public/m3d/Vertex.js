/**
 * Mental Graphics by myounggun@gmail.com
 * 
 * Vertex.js 
 */
!window.m3d && (window.m3d = {});
!window.m3d.geom && (window.m3d.geom = {});

(function() {
var NS = m3d.geom;

NS.Vertex = function(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = 1;
    
    this.screenX = 0;
    this.screenY = 0;
}

NS.Vertex.prototype = {
    setScreenPosition: function(v) {
        this.screenX =  v.x / v.w * 400 + 400;
        this.screenY = -v.y / v.w * 400 + 400;
    },
    
    clone: function() {
        return new NS.Vertex(this.x, this.y, this.z);
    },
    
    toString: function() {
        return "vertex(" + this.x + "," + this.y + "," + this.z + "," + this.w + "/" + this.sx + "," + this.sy + ")";
    }
};

})();