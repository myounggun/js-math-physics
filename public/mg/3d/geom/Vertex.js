/**
 * Mental Graphics by myounggun@gmail.com
 *
 * Vertex.js
 *
 * | x |
 * | y |
 * | z |
 * | 1 |
 */
!window.mg && (window.mg = {});

(function() {
    "use strict";

var NS = mg;

/**
 * @constructor
 */
var Vertex = function(x, y, z) {
    NS.Vector3D.call(this, x, y, z, 1);

    this.screenX = 0;
    this.screenY = 0;
};

var p = Vertex.prototype = new NS.Vector3D();

p.constructor = Vertex;

p.project = function(tm) {
    var projectVector = tm.transformVertex(this).project();

    this.screenX = projectVector.x;
    this.screenY = projectVector.y;
};

p.clone = function() {
    return new NS.Vertex(this.x, this.y, this.z, this.w);
};

p.toString = function() {
    return "vertex(" + this.x + "," + this.y + "," + this.z + "," + this.w + "/" + this.screenX + "," + this.screenY + ")";
};

NS.Vertex = Vertex;

})();
