/**
 * Mental Graphics by myounggun@gmail.com
 *
 * Matrix2D.js (Affine Transform)
 *
 * | a  c tx |
 * | b  d ty |
 * | 0  0  1 |
 */
!window.mg && (window.mg = {});

(function() {
    "use strict";

var NS = mg;

/**
 * @constructor
 */
var Matrix2D = function(a, b, c, d, tx, ty) {
    this.a = a || 1;
    this.b = b || 0;
    this.c = c || 0;
    this.d = d || 1;
    this.tx = tx || 0;
    this.ty = ty || 0;
};

var p = Matrix2D.prototype;

p.constructor = Matrix2D;

/**
 * | a  c tx |   | a  c tx |
 * | b  d ty | * | b  d ty |
 * | 0  0  1 |   | 0  0  1 |
 */
p.multiply = function(m) {
    var a = this.a * m.a + this.c * m.b,
        b = this.b * m.a + this.d * m.b,
        c = this.a * m.c + this.c * m.d,
        d = this.b * m.c + this.d * m.d,
        tx = this.a * m.tx + this.c * m.ty + this.tx,
        ty = this.b * m.tx + this.d * m.ty + this.ty;

    return new Matrix2D(a, b, c, d, tx, ty);
};

p.identity = function() {
    return new Matrix2D(1, 0, 0, 1, 0, 0);
};

p.inverse = function() {
    var det = this.a * this.d - this.b * this.c;
    return new NS.Matrix2D(
         this.d / det,
        -this.b / det,
        -this.c / det,
         this.a / det,
        (this.c * this.ty - this.d * this.tx) / det,
        (this.b * this.tx - this.a * this.ty) / det);
};

p.translate = function(tx, ty) {
    return this.multiply(new Matrix2D(1, 0, 0, 1, tx, ty));
};

p.scale = function(sx, sy) {
    return this.multiply(new Matrix2D(sx, 0, 0, sy, 0, 0));
};

p.rotate = function(angle) {
    var cosA = Math.cos(angle),
        sinA = Math.sin(angle);

    return this.multiply(new Matrix2D(cosA, sinA, -sinA, cosA, 0, 0));
};

p.skew = function(rx, ry) {
    return this.multiply(new Matrix2D(1, rx, ry, 1, 0, 0));
};

/**
 * | a  c tx |   | x |
 * | b  d ty | * | y |
 * | 0  0  1 |   | 1 |
 */
p.transform = function(p) {
    var x = this.a * p.x + this.c * p.y + this.tx,
        y = this.b * p.x + this.d * p.y + this.ty;

    return new NS.Point(x, y);
};

p.clone = function() {
    return new Matrix2D(this.a, this.b, this.c, this.d, this.tx, this.ty);
};

p.toString = function() {
    // return "matrix(" + this.a + "," + this.b + "," + this.c + "," + this.d + "," + this.tx + "," + this.ty + ")";

    // return "matrix(" +
    return this.a + "," + this.c + "," + this.tx + "\n" +
           this.b + "," + this.d + "," + this.ty; //+ ")";
};

NS.Matrix2D = Matrix2D;

})();
