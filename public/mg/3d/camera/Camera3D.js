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
    
    this._updateProjMatrix();
};

var p = Camera3D.prototype;

p.constructor = Camera3D;

p.setView = function(eye, target, up) {
    this._eye = eye;
    this._target = target;
    this._up = up;
    
    this._viewMatrix = NS.Matrix3D.lookAt(this._eye, this._target, this._up);
};

p.translate = function(x, y, z) {
    this._eye.x += x;
    this._eye.y += y;
    this._eye.z += z;
    
    this._updateViewMatrix();
};

p.rotateX = function(rad) {
    this._viewMatrix = this._viewMatrix.rotateX(rad);
};

p.rotateY = function(rad) {
    this._viewMatrix = this._viewMatrix.rotateY(rad);
 
    
//    var m = new mg.Matrix3D;
//    m = m.rotateY(rad);
//    
//    var aZ = this._target.subtract(this._eye).normalize();
//    console.log('aZ=', aZ);
//    
//    this._target = m.transformVector(aZ);
//    this._target = this._target.add(this._eye);
//    
//    this._updateViewMatrix();
};

p.getViewMatrix = function() {
    return this._viewMatrix.clone();
};

p.getProjMatrix = function() {
    return this._projMatrix.clone();
};

p._updateViewMatrix = function() {
    this.setView(this._eye, this._target, this._up);
};

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