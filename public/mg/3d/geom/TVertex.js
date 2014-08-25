/**
 * Mental Graphics by myounggun@gmail.com
 *
 * TVertex.js
 *
 * | x |
 * | y |
 * | z |
 * | 1 |
 *   +
 * | u |
 * | v |
 */
!window.mg && (window.mg = {});

(function() {
    "use strict";

var NS = mg;

/**
 * @constructor
 */
var TVertex = function(x, y, z, u, v) {
    NS.Vertex.call(this, x, y, z);

    this.u = u;
    this.v = v;
};

var p = TVertex.prototype = new NS.Vertex();

p.constructor = TVertex;

p.clone = function() {
    return new NS.TVertex(this.x, this.y, this.z, this.u, this.v);
};

p.toString = function() {
    return "TVertex(" + this.x + "," + this.y + "," + this.z + "," + this.u + "," + this.v + ")";
};

NS.TVertex = TVertex;

})();
