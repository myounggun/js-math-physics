/**
 * Mental Graphics by myounggun@gmail.com
 * 
 * Vector3D.js 
 * 
 * | x |
 * | y |
 * | z |
 * | 0 |
 */
!window.mg && (window.mg = {});

(function() {
    "use strict";

var NS = mg;

/**
 * @constructor
 */
var Vector3D = function(x, y, z, w) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.w = w || 0;
};

var p = Vector3D.prototype = {
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    },
    
    get lengthSquared() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
};

p.constructor = Vector3D;

p.add = function(b) {
    return new Vector3D(this.x + b.x, this.y + b.y, this.z + b.z);
};

p.subtract = function(b) {
    return new Vector3D(this.x - b.x, this.y - b.y, this.z - b.z);
};

p.multiply = function(s) {
    return new Vector3D(this.x * s, this.y * s, this.z * s);
};

p.normalize = function() {
    var len = this.length;
    this.x /= len;
    this.y /= len;
    this.z /= len;
    return this;
};

p.dot = function(b) {
    return this.x * b.x + this.y * b.y + this.z * b.z; 
};

p.cross = function(b) {
    return new Vector3D(this.y * b.z - b.y * this.z,
                        this.z * b.x - b.z * this.x,
                        this.x * b.y - b.x * this.y);
};

p.project = function() {
    this.x /= this.w;
    this.y /= this.w;
    this.z /= this.w;
    return this;
};

p.clone = function() {
    return new Vector3D(this.x, this.y, this.z, this.w);
};

p.toString = function() {
    return "Vector3D(" + this.x + "," + this.y + "," + this.z + "," + this.w + ")";
};

NS.Vector3D = Vector3D;

})();