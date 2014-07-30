/**
 * Mental Graphics by myounggun@gmail.com
 * 
 * Matrix2D.js 
 * 
 * | m00, m01, m02 |
 * | m10, m11, m12 |
 * | m20, m21, m22 |
 * | m30, m31, m32 |
 * 
 * | a  c tx |
 * | b  d ty |
 * | 0  0  1 |
 */
!window.mg && (window.mg = {});
!window.mg.geom && (window.mg.geom = {});

(function() {
var NS = mg.geom;

NS.Matrix2D = function(a, b, c, d, tx, ty) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.tx = tx;
    this.ty = ty;
}

NS.Matrix2D.prototype = {
    /**
     * | a  c tx |   | a  c tx |
     * | b  d ty | * | b  d ty |
     * | 0  0  1 |   | 0  0  1 |
     */
    concat: function(m) {
        var a = this.a * m.a + this.c * m.b,
            b = this.b * m.a + this.d * m.b,
            c = this.a * m.c + this.c * m.d,
            d = this.b * m.c + this.d * m.d,
            tx = this.a * m.tx + this.c * m.ty + this.tx,
            ty = this.b * m.tx + this.d * m.ty + this.ty;
        
        return new NS.Matrix2D(a, b, c, d, tx, ty);
    },
    
    translate: function(tx, ty) {
        return this.concat(new NS.Matrix2D(1, 0, 0, 1, tx, ty));
    },
    
    scale: function(sx, sy) {
        return this.concat(new NS.Matrix2D(sx, 0, 0, sy, 0, 0));
    },
    
    rotate: function(angle) {
        var cosA = Math.cos(angle),
            sinA = Math.sin(angle);
        
        return this.concat(new NS.Matrix2D(cosA, sinA, -sinA, cosA, 0, 0));
    },
    
    shear: function(rx, ry) {
        return this.concat(new NS.Matrix2D(1, rx, ry, 1, 0, 0));
    },
    
    /**
     * | a  c tx |   | x |
     * | b  d ty | * | y |
     * | 0  0  1 |   | 1 |
     */
    transform: function(p) {
        return {
            x: this.a * p.x + this.c * p.y + this.tx * p.z,
            y: this.b * p.x + this.d * p.y + this.ty * p.z,
        };  
    },
    
    /**
     * | a  c tx |    |  a  b  0 |
     * | b  d ty | -> |  c  d  0 |
     * | 0  0  1 |    | tx ty  1 |
     */
    transpose: function() {
    },
    
    toString: function() {
        return "matrix(" + this.a + "," + this.b + "," + this.c + "," + this.d + "," + this.tx + "," + this.ty + ")";
    }
};

})();