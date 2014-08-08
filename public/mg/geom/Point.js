/**
 * Mental Graphics by myounggun@gmail.com
 * 
 * Point.js
 */
!window.mg && (window.mg = {});

(function() {
    "use strict";

var NS = mg;

/**
 * @constructor
 */
var Point = function(x, y) {
    this.x = x;
    this.y = y;
};

var p = Point.prototype;

p.constructor = Point;

p.clone = function() {
    return new Point(this.x, this.y);
};

p.toString = function() {
    return "point(" + this.x + "," + this.y + ")";
};

NS.Point = Point;

})();