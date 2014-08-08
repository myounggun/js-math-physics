/**
 * Mental Graphics by myounggun@gmail.com
 * 
 * Object3D.js 
 */
!window.mg && (window.mg = {});

(function() {
    "use strict";

var NS = mg;

/**
 * @constructor
 */
var Object3D = function() {
    this._m = new NS.Matrix3D();
};

var p = Object3D.prototype = {    
    get x() {
        return this._m.m03;  
    },
    
    get y() {
        return this._m.m13;
    },
    
    get z() {
        return this._m.m23;
    },
    
    set position(v) {
        this._m.m03 = v.x;
        this._m.m13 = v.y;
        this._m.m23 = v.z;
    },
    
    get position() {
        return new NS.Vector3D(this._m.m03, this._m.m13, this._m.m23);
    }
};

p.constructor = Object3D;

p.getMatrix = function() {
    return this._m;
};

p.translate = function(x, y, z) {
    this._m = this._m.translate(x, y, z);
};

p.rotateX = function(rad) {
    this._m = this._m.rotateX(rad);
};

p.rotateY = function(rad) {
    this._m = this._m.rotateY(rad);
};

// override
//p.render = function(obj) {
//    // impl
//};

NS.Object3D = Object3D;

})();