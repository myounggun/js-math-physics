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
!window.mg && (window.mg = {});

(function() {
    "use strict";

var NS = mg;

/**
 * @constructor
 */
var Matrix3D = function(m) {
    if (!m) {
        m = [ 1, 0, 0, 0,
              0, 1, 0, 0,
              0, 0, 1, 0,
              0, 0, 0, 1 ];
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
};

var p = Matrix3D.prototype;

p.constructor = Matrix3D;

/**
 * | m00, m01, m02, m03 |   | m00, m01, m02, m03 |
 * | m10, m11, m12, m13 | * | m10, m11, m12, m13 |
 * | m20, m21, m22, m23 |   | m20, m21, m22, m23 |
 * | m30, m31, m32, m33 |   | m30, m31, m32, m33 |
 */
p.multiply = function(m) {
    var m00 = this.m00 * m.m00 + this.m01 * m.m10 + this.m02 * m.m20 + this.m03 * m.m30,
        m01 = this.m00 * m.m01 + this.m01 * m.m11 + this.m02 * m.m21 + this.m03 * m.m31,
        m02 = this.m00 * m.m02 + this.m01 * m.m12 + this.m02 * m.m22 + this.m03 * m.m32,
        m03 = this.m00 * m.m03 + this.m01 * m.m13 + this.m02 * m.m23 + this.m03 * m.m33,
        
        m10 = this.m10 * m.m00 + this.m11 * m.m10 + this.m12 * m.m20 + this.m13 * m.m30,
        m11 = this.m10 * m.m01 + this.m11 * m.m11 + this.m12 * m.m21 + this.m13 * m.m31,
        m12 = this.m10 * m.m02 + this.m11 * m.m12 + this.m12 * m.m22 + this.m13 * m.m32,
        m13 = this.m10 * m.m03 + this.m11 * m.m13 + this.m12 * m.m23 + this.m13 * m.m33,
        
        m20 = this.m20 * m.m00 + this.m21 * m.m10 + this.m22 * m.m20 + this.m23 * m.m30,
        m21 = this.m20 * m.m01 + this.m21 * m.m11 + this.m22 * m.m21 + this.m23 * m.m31,
        m22 = this.m20 * m.m02 + this.m21 * m.m12 + this.m22 * m.m22 + this.m23 * m.m32,
        m23 = this.m20 * m.m03 + this.m21 * m.m13 + this.m22 * m.m23 + this.m23 * m.m33,
        
        m30 = this.m30 * m.m00 + this.m31 * m.m10 + this.m32 * m.m20 + this.m33 * m.m30,
        m31 = this.m30 * m.m01 + this.m31 * m.m11 + this.m32 * m.m21 + this.m33 * m.m31,
        m32 = this.m30 * m.m02 + this.m31 * m.m12 + this.m32 * m.m22 + this.m33 * m.m32,
        m33 = this.m30 * m.m03 + this.m31 * m.m13 + this.m32 * m.m23 + this.m33 * m.m33,
        
        m = [ m00, m01, m02, m03,
              m10, m11, m12, m13,
              m20, m21, m22, m23,
              m30, m31, m32, m33 ];
    
    return new Matrix3D(m);
};

p.identity = function() {
    var m = [ 1, 0, 0, 0,
              0, 1, 0, 0,
              0, 0, 1, 0,
              0, 0, 0, 1 ];

    return new Matrix3D(m);
};

/**
 * | m00, m01, m02, m03 |    | m00, m10, m20, m30 |
 * | m10, m11, m12, m13 | -> | m01, m11, m21, m31 |
 * | m20, m21, m22, m23 |    | m02, m12, m22, m32 |
 * | m30, m31, m32, m33 |    | m03, m13, m23, m33 |
 */
p.transpose = function() {
    var m = [ this.m00, this.m10, this.m20, this.m30,
              this.m01, this.m11, this.m21, this.m31,
              this.m02, this.m12, this.m22, this.m32,
              this.m03, this.m13, this.m23, this.m33 ];
    
    return new Matrix3D(m);
};

p.translate = function(tx, ty, tz) {
    var m = [ 1, 0, 0, tx,
              0, 1, 0, ty,
              0, 0, 1, tz,
              0, 0, 0,  1 ];

    return this.multiply(new Matrix3D(m));
};

p.scale = function(sx, sy, sz) {
    var m = [ sx, 0,  0, 0,
              0, sy,  0, 0,
              0,  0, sz, 0,
              0,  0,  0, 1 ];

    return this.multiply(new Matrix3D(m));
};

p.rotateX = function(angle) {
    var cos = Math.cos(angle),
        sin = Math.sin(angle);
    
    var m = [ 1,   0,    0, 0,
              0, cos, -sin, 0,
              0, sin,  cos, 0,
              0,   0,    0, 1 ];

    return this.multiply(new Matrix3D(m));
};

p.rotateY = function(angle) {
    var cos = Math.cos(angle),
        sin = Math.sin(angle);
    
    var m = [ cos, 0, sin, 0,
                0, 1,   0, 0,
             -sin, 0, cos, 0,
                0, 0,   0, 1 ];
    
    return this.multiply(new Matrix3D(m));
};

p.rotateZ = function(angle) {
    var cos = Math.cos(angle),
        sin = Math.sin(angle);

    var m = [ cos, -sin, 0, 0,
              sin,  cos, 0, 0,
                0,    0, 1, 0,
                0,    0, 0, 1 ];
              
    return this.multiply(new Matrix3D(m));
};

/**
 * | m00, m01, m02, m03 |   | x |
 * | m10, m11, m12, m13 | * | y |
 * | m20, m21, m22, m23 |   | z |
 * | m30, m31, m32, m33 |   | 1 |
 */
p.transformVector = function(v) {
    var x = this.m00 * v.x + this.m01 * v.y + this.m02 * v.z + this.m03,
        y = this.m10 * v.x + this.m11 * v.y + this.m12 * v.z + this.m13,
        z = this.m20 * v.x + this.m21 * v.y + this.m22 * v.z + this.m23;
        
    return new NS.Vector3D(x, y, z, 1);
};

/**
 * | m00, m01, m02, m03 |   | x |
 * | m10, m11, m12, m13 | * | y |
 * | m20, m21, m22, m23 |   | z |
 * | m30, m31, m32, m33 |   | w |
 */
p.transformVertex = function(v) {
    var x = this.m00 * v.x + this.m01 * v.y + this.m02 * v.z + this.m03 * v.w,
        y = this.m10 * v.x + this.m11 * v.y + this.m12 * v.z + this.m13 * v.w,
        z = this.m20 * v.x + this.m21 * v.y + this.m22 * v.z + this.m23 * v.w,
        w = this.m30 * v.x + this.m31 * v.y + this.m32 * v.z + this.m33 * v.w;
        
    return new NS.Vector3D(x, y, z, w);
};

p.clone = function() {
    var m = [ this.m00, this.m01, this.m02, this.m03,
              this.m10, this.m11, this.m12, this.m13,
              this.m20, this.m21, this.m22, this.m23,
              this.m30, this.m31, this.m32, this.m33 ];

    return new Matrix3D(m);
};

p.toString = function() {
    return "" + //"matrix3d(" + 
            this.m00 + "," + this.m01 + "," + this.m02 + "," + this.m03 + "\n" +
            this.m10 + "," + this.m11 + "," + this.m12 + "," + this.m13 + "\n" +
            this.m20 + "," + this.m21 + "," + this.m22 + "," + this.m23 + "\n" +
            this.m30 + "," + this.m31 + "," + this.m32 + "," + this.m33;// + ")";
};

Matrix3D.lookAt = function(eye, target, up) {
    var aZ = target.subtract(eye).normalize(),
        aX = up.cross(aZ).normalize(),
        aY = aZ.cross(aX),
        tx = -aX.dot(eye),
        ty = -aY.dot(eye),
        tz = -aZ.dot(eye),
        m = [ aX.x, aX.y, aX.z, tx,
              aY.x, aY.y, aY.z, ty,
              aZ.x, aZ.y, aZ.z, tz,
                 0,    0,    0,  1 ]; //  R^T + eye

    return new Matrix3D(m);
};

NS.Matrix3D = Matrix3D;

})();