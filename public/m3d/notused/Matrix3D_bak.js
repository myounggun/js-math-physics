/**
 * Mental Graphics by myounggun@gmail.com
 * 
 * Matrix3D.js 
 * 
 * 4X4
 * m30, m31, m32, m33 = 0, 0, 0, 1
 * 
 * | m00, m01, m02, m03(tx) |
 * | m10, m11, m12, m13(ty) |
 * | m20, m21, m22, m23(tx) |
 * | m30, m31, m32, m33(tw) |
 *   (x)  (y)  (z)           - axis
 */
!window.m3d && (window.m3d = {});
!window.m3d.geom && (window.m3d.geom = {});

(function() {
var NS = m3d.geom;

NS.Matrix3D = function(m) {
    if (!m) {
        this.identity();
        return;
    }
    
    this.m00 = m[0];
    this.m01 = m[1];
    this.m02 = m[2];
    this.m03 = m[3];

    this.m10 = m[4];
    this.m11 = m[5];
    this.m12 = m[6];
    this.m13 = m[7];

    this.m20 = m[8];
    this.m21 = m[9];
    this.m22 = m[10];
    this.m23 = m[11];

    this.m30 = m[12];
    this.m31 = m[13];
    this.m32 = m[14];
    this.m33 = m[15];
}

NS.Matrix3D.prototype = {
    /**
     * | m00, m01, m02, m03 |   | m00, m01, m02, m03 |
     * | m10, m11, m12, m13 | * | m10, m11, m12, m13 |
     * | m20, m21, m22, m23 |   | m20, m21, m22, m23 |
     * | m30, m31, m32, m33 |   | m30, m31, m32, m33 |
     */
    concat: function(m) {
        this.m00 = this.m00 * m.m00 + this.m01 * m.m10 + this.m02 * m.m20 + this.m03 * m.m30;
        this.m01 = this.m00 * m.m01 + this.m01 * m.m11 + this.m02 * m.m21 + this.m03 * m.m31;
        this.m02 = this.m00 * m.m02 + this.m01 * m.m12 + this.m02 * m.m22 + this.m03 * m.m32;
        this.m03 = this.m00 * m.m03 + this.m01 * m.m13 + this.m02 * m.m23 + this.m03 * m.m33;
            
        this.m10 = this.m10 * m.m00 + this.m11 * m.m10 + this.m12 * m.m20 + this.m13 * m.m30;
        this.m11 = this.m10 * m.m01 + this.m11 * m.m11 + this.m12 * m.m21 + this.m13 * m.m31;
        this.m12 = this.m10 * m.m02 + this.m11 * m.m12 + this.m12 * m.m22 + this.m13 * m.m32;
        this.m13 = this.m10 * m.m03 + this.m11 * m.m13 + this.m12 * m.m23 + this.m13 * m.m33;
            
        this.m20 = this.m20 * m.m00 + this.m21 * m.m10 + this.m22 * m.m20 + this.m23 * m.m30;
        this.m21 = this.m20 * m.m01 + this.m21 * m.m11 + this.m22 * m.m21 + this.m23 * m.m31;
        this.m22 = this.m20 * m.m02 + this.m21 * m.m12 + this.m22 * m.m22 + this.m23 * m.m32;
        this.m23 = this.m20 * m.m03 + this.m21 * m.m13 + this.m22 * m.m23 + this.m23 * m.m33;
            
        this.m30 = this.m30 * m.m00 + this.m31 * m.m10 + this.m32 * m.m20 + this.m33 * m.m30;
        this.m31 = this.m30 * m.m01 + this.m31 * m.m11 + this.m32 * m.m21 + this.m33 * m.m31;
        this.m32 = this.m30 * m.m02 + this.m31 * m.m12 + this.m32 * m.m22 + this.m33 * m.m32;
        this.m33 = this.m30 * m.m03 + this.m31 * m.m13 + this.m32 * m.m23 + this.m33 * m.m33;
    },
    
    identity: function() {
        this.m01 = this.m02 = this.m03 = 0;
        this.m10 = this.m12 = this.m13 = 0;
        this.m20 = this.m21 = this.m23 = 0;
        this.m30 = this.m31 = this.m32 = 0;
        this.m00 = this.m11 = this.m22 = this.m33 = 1;
    },

    translate: function(tx, ty, tz) {
        var m = [ 1, 0, 0, tx,
                  0, 1, 0, ty,
                  0, 0, 1, tz,
                  0, 0, 0,  1 ];

        this.concat(new NS.Matrix3D(m));
    },
    
    scale: function(sx, sy, sz) {
        var m = [ sx, 0,  0, 0,
                  0, sy,  0, 0,
                  0,  0, sz, 0,
                  0,  0,  0, 1 ];

        this.concat(new NS.Matrix3D(m));
    },
    
    rotateX: function(angle) {
        var cos = Math.cos(angle),
            sin = Math.sin(angle);
        
        var m = [ 1,   0,    0, 0,
                  0, cos, -sin, 0,
                  0, sin,  cos, 0,
                  0,   0,    0, 1 ];

        this.concat(new NS.Matrix3D(m));
    },
    
    rotateY: function(angle) {
        var cos = Math.cos(angle),
            sin = Math.sin(angle);
        
        var m = [ cos, 0, sin, 0,
                    0, 1,   0, 0,
                 -sin, 0, cos, 0,
                    0, 0,   0, 1 ];
        
        this.concat(new NS.Matrix3D(m));
    },
    
    rotateZ: function(angle) {
        var cos = Math.cos(angle),
            sin = Math.sin(angle);

        var m = [ cos, -sin, 0, 0,
                  sin,  cos, 0, 0,
                    0,    0, 1, 0,
                    0,    0, 0, 1 ];
                  
        this.concat(new NS.Matrix3D(m));
    },
    
    /**
     * | m00, m01, m02, m03 |   | x |
     * | m10, m11, m12, m13 | * | y |
     * | m20, m21, m22, m23 |   | z |
     * | m30, m31, m32, m33 |   | 1 |
     */
    transform: function(v) {
        return {
            x: this.m00 * v.x + this.m01 * v.y + this.m02 * v.z + this.m03,
            y: this.m10 * v.x + this.m11 * v.y + this.m12 * v.z + this.m13,
            z: this.m20 * v.x + this.m21 * v.y + this.m22 * v.z + this.m23
        };
    },
    
    clone: function() {
        var m = [ this.m00, this.m01, this.m02, this.m03,
                  this.m10, this.m11, this.m12, this.m13,
                  this.m20, this.m21, this.m22, this.m23,
                  this.m30, this.m31, this.m32, this.m33 ];
    
        return new NS.Matrix3D(m);
    },
    
    toString: function() {
        return "" + //"matrix3d(" + 
                this.m00 + "," + this.m01 + "," + this.m02 + "," + this.m03 + "\n" +
                this.m10 + "," + this.m11 + "," + this.m12 + "," + this.m13 + "\n" +
                this.m20 + "," + this.m21 + "," + this.m22 + "," + this.m23 + "\n" +
                this.m30 + "," + this.m31 + "," + this.m32 + "," + this.m33;// + ")";
    }
};

NS.Matrix3D.multiply = function(a, b) {
    var m = new NS.Matrix3D();

//    m.m00 = a.m00 * b.m00 + a.m01 * b.m10 + a.m02 * b.m20;
//    m.m01 = a.m00 * b.m01 + a.m01 * b.m11 + a.m02 * b.m21;
//    m.m02 = a.m00 * b.m02 + a.m01 * b.m12 + a.m02 * b.m22;
//    m.m03 = a.m00 * b.m03 + a.m01 * b.m13 + a.m02 * b.m23 + a.m03;
//      
//    m.m10 = a.m10 * b.m00 + a.m11 * b.m10 + a.m12 * b.m20;
//    m.m11 = a.m10 * b.m01 + a.m11 * b.m11 + a.m12 * b.m21;
//    m.m12 = a.m10 * b.m02 + a.m11 * b.m12 + a.m12 * b.m22;
//    m.m13 = a.m10 * b.m03 + a.m11 * b.m13 + a.m12 * b.m23 + a.m13;
//
//    m.m20 = a.m20 * b.m00 + a.m21 * b.m10 + a.m22 * b.m20;
//    m.m21 = a.m20 * b.m01 + a.m21 * b.m11 + a.m22 * b.m21;
//    m.m22 = a.m20 * b.m02 + a.m21 * b.m12 + a.m22 * b.m22;
//    m.m23 = a.m20 * b.m03 + a.m21 * b.m13 + a.m22 * b.m23 + a.m23;
    m.m00 = a.m00 * b.m00 + a.m01 * b.m10 + a.m02 * b.m20 + a.m03 * b.m30;
    m.m01 = a.m00 * b.m01 + a.m01 * b.m11 + a.m02 * b.m21 + a.m03 * b.m31;
    m.m02 = a.m00 * b.m02 + a.m01 * b.m12 + a.m02 * b.m22 + a.m03 * b.m32;
    m.m03 = a.m00 * b.m03 + a.m01 * b.m13 + a.m02 * b.m23 + a.m03 * b.m33;
        
    m.m10 = a.m10 * b.m00 + a.m11 * b.m10 + a.m12 * b.m20 + a.m13 * b.m30;
    m.m11 = a.m10 * b.m01 + a.m11 * b.m11 + a.m12 * b.m21 + a.m13 * b.m31;
    m.m12 = a.m10 * b.m02 + a.m11 * b.m12 + a.m12 * b.m22 + a.m13 * b.m32;
    m.m13 = a.m10 * b.m03 + a.m11 * b.m13 + a.m12 * b.m23 + a.m13 * b.m33;
        
    m.m20 = a.m20 * b.m00 + a.m21 * b.m10 + a.m22 * b.m20 + a.m23 * b.m30;
    m.m21 = a.m20 * b.m01 + a.m21 * b.m11 + a.m22 * b.m21 + a.m23 * b.m31;
    m.m22 = a.m20 * b.m02 + a.m21 * b.m12 + a.m22 * b.m22 + a.m23 * b.m32;
    m.m23 = a.m20 * b.m03 + a.m21 * b.m13 + a.m22 * b.m23 + a.m23 * b.m33;
        
    m.m30 = a.m30 * b.m00 + a.m31 * b.m10 + a.m32 * b.m20 + a.m33 * b.m30;
    m.m31 = a.m30 * b.m01 + a.m31 * b.m11 + a.m32 * b.m21 + a.m33 * b.m31;
    m.m32 = a.m30 * b.m02 + a.m31 * b.m12 + a.m32 * b.m22 + a.m33 * b.m32;
    m.m33 = a.m30 * b.m03 + a.m31 * b.m13 + a.m32 * b.m23 + a.m33 * b.m33;
    
    return m;
};

/**
 * | m00, m01, m02, m03 |    | m00, m10, m20, m30 |
 * | m10, m11, m12, m13 | -> | m01, m11, m21, m31 |
 * | m20, m21, m22, m23 |    | m02, m12, m22, m32 |
 * | m30, m31, m32, m33 |    | m03, m13, m23, m33 |
 */
NS.Matrix3D.transpose = function(m) {
    var mt = [ m.m00, m.m10, m.m20, m.m30,
               m.m01, m.m11, m.m21, m.m31,
               m.m02, m.m12, m.m22, m.m32,
               m.m03, m.m13, m.m23, m.m33 ];
    
    return new NS.Matrix3D(mt);
};

NS.Matrix3D.identity = function() {
    var m = [ 1, 0, 0, 0,
              0, 1, 0, 0,
              0, 0, 1, 0,
              0, 0, 0, 1 ];

    return new NS.Matrix3D(m);
};

})();