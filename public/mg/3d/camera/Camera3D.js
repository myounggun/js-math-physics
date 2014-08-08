/**
 * Mental Graphics by myounggun@gmail.com
 * 
 * Camera3D.js
 */
!window.mg && (window.mg = {});

(function() {
    "use strict";

var NS = mg;

/**
 * mg.Matrix3D.lookAt(new mg.Vector3D(-1, 0, 1), new mg.Vector3D(0, 0, 0), new mg.Vector3D(0, 1, 0)).transformVector(new mg.Vector3D(0, 0, 0)); // RH
 * @param fov 0 ~ 180 사이 각도
 * 
 * @constructor
 */
var Camera3D = function(fov, aspect, near, far) {
    this._fov = fov || 35;
    this._aspect = aspect || 1;
    this._near = near || 50;
    this._far = far || 10000;
    
    this._m = new NS.Matrix3D();

    this._updateProjMatrix();
};

var p = Camera3D.prototype;

p.constructor = Camera3D;

p.lookAt = function(eye, target, up) {
    this._eye = eye;
    this._target = target;
    this._up = up;
    
    this._m = NS.Matrix3D.lookAt(this._eye, this._target, this._up);
};

p.translate = function(x, y, z) {
//    this._eye.x += x;
//    this._eye.y += y;
//    this._eye.z += z;
//    this._updateLookAt();
    this._m.m03 += x;
    this._m.m13 += y;
    this._m.m23 += z;
};

p.rotateX = function(rad) {
    this._m = this._m.rotateX(rad);
};

p.rotateY = function(rad) {
    this._m = this._m.rotateY(-rad);
};

p.getViewMatrix = function() {
    return this._m.clone();
};

p.getProjMatrix = function() {
    return this._projMatrix.clone();
};

//p._updateLookAt = function() {
//    var aZ = this._target.subtract(this._eye).normalize(),
//        aX = this._up.cross(aZ).normalize(),
//        aY = aZ.cross(aX),
//        tx = -aX.dot(this._eye),
//        ty = -aY.dot(this._eye),
//        tz = -aZ.dot(this._eye);
//    
//    this._m.m00 = aX.x; this._m.m01 = aX.y; this._m.m02 = aX.z; this._m.m03 = tx;
//    this._m.m10 = aY.x; this._m.m11 = aY.y; this._m.m12 = aY.z; this._m.m13 = ty;
//    this._m.m20 = aZ.x; this._m.m21 = aZ.y; this._m.m22 = aZ.z; this._m.m23 = tz; 
//};

p._updateProjMatrix = function() {
    var ymax = Math.tan((this._fov * 0.5) * NS.Maths.D2R) * this._near,
        ymin = -ymax,
        xmin = ymin * this._aspect,
        xmax = ymax * this._aspect,
        m00 = 2 * this._near / (xmax - xmin),
        m11 = 2 * this._near / (ymax - ymin),
        m03 = (xmax + xmin) / (xmax - xmin),
        m12 = (ymax + ymin) / (ymax - ymin),
        m22 = -(this._far + this._near) / (this._far - this._near),
        m23 = -2 * this._far * this._near / (this._far - this._near),
        m = [ m00,   0,  m03,   0,
                0, m11,  m12,   0,
                0,   0,  m22, m23,
                0,   0,   -1,   0 ];

    this._projMatrix = new NS.Matrix3D(m);
};

NS.Camera3D = Camera3D;

})();