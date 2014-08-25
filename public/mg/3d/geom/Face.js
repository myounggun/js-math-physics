/**
 * Mental Graphics by myounggun@gmail.com
 *
 * Face.js
 */
!window.mg && (window.mg = {});

(function() {
    "use strict";

var NS = mg;

/**
 * @constructor
 */
var Face = function(idx0, idx1, idx2) {
    this.idx0 = idx0;
    this.idx1 = idx1;
    this.idx2 = idx2;
};

var p = Face.prototype;

p.constructor = Face;

p.clone = function() {
    return new NS.Face(this.idx0, this.idx1, this.idx2);
};

p.toString = function() {
    return "Face(" + this.idx0 + "," + this.idx1 + "," + this.idx2 + ")";
};

NS.Face = Face;

})();
