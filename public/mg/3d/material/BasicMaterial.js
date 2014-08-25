/**
 * Mental Graphics by myounggun@gmail.com
 *
 * BasicMaterial.js
 */
!window.mg && (window.mg = {});

(function() {
    "use strict";

var NS = mg;

/**
 * @constructor
 */
var BasicMaterial = function() {
};

var p = BasicMaterial.prototype;

p.constructor = BasicMaterial;

// TVertex: v0, v1, v2
p.draw = function(renderTarget, v0, v1, v2) {
    renderTarget.save();
    renderTarget.beginPath();
    renderTarget.moveTo(v0.screenX, v0.screenY);
    renderTarget.lineTo(v1.screenX, v1.screenY);
    renderTarget.lineTo(v2.screenX, v2.screenY);
    renderTarget.strokeStyle = "#ff0000";
    renderTarget.stroke();
    renderTarget.closePath();
};

p.toString = function() {
    return "BasicMaterial()";
};

NS.BasicMaterial = BasicMaterial;

})();
