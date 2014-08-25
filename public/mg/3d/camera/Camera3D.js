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
 * @constructor
 */
var Camera3D = function(fov, aspect, near, far) {
    this._fov = fov || 35;
    this._aspect = aspect || 1;
    this._near = near || 50;
    this._far = far || 10000;

    this._updateProjMatrix();

    this.up = new NS.Vector3D(0, 1, 0);
    this.position = new NS.Vector3D();

    this._m = new NS.Matrix3D();
};

var p = Camera3D.prototype;

p.constructor = Camera3D;

p.lookAt = function(target) {
    this._target = target;

    var aZ = this.position.subtract(target).normalize(),
        aX = this.up.cross(aZ).normalize(),
        aY = aZ.cross(aX),
        tX = aX.dot(this.position),
        tY = aY.dot(this.position),
        tZ = aZ.dot(this.position),
        m = [ aX.x, aX.y, aX.z, -tX,
              aY.x, aY.y, aY.z, -tY,
              aZ.x, aZ.y, aZ.z, -tZ,
                 0,    0,    0,   1 ]; //  R^T + eye

    this.up = aY;

    this._m = new NS.Matrix3D(m);
};

p.updateLookAt = function() {
    this.lookAt(this._target);
};

p.translate = function(x, y, z) {
    this.position.x += x;
    this.position.y += y;
    this.position.z += z;

    this._m.m03 -= x;
    this._m.m13 -= y;
    this._m.m23 -= z;

//    this.updateLookAt();
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

p.getInverseMatrixY = function() {
    var m = new NS.Matrix3D();

    m.m00 = this._m.m00;
    m.m02 = this._m.m02;
    m.m20 = this._m.m20;
    m.m22 = this._m.m22;

    return m.inverse();
};

p.getProjMatrix = function() {
    return this._projMatrix.clone();
};

/**
 * view volume 2x2x2 for OpenGL
 */
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
