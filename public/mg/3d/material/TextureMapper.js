/**
 * Mental Graphics by myounggun@gmail.com
 *
 * TextureMapper.js
 */
!window.mg && (window.mg = {});

(function() {
    "use strict";

var NS = mg;

/**
 * @constructor
 */
var TextureMapper = function() {
};

var p = TextureMapper.prototype;

p.constructor = TextureMapper;

TextureMapper.getMatrix = function(u0,v0,u1,v1,u2,v2, x0,y0,x1,y1,x2,y2) {
    var im = new NS.Matrix2D();
    im.a = u1 - u0; im.c = u2 - u0; im.tx = u0;
    im.b = v1 - v0; im.d = v2 - v0; im.ty = v0;
    im = im.inverse();

    var m = new NS.Matrix2D();
    m.a = x1 - x0; m.c = x2 - x0; m.tx = x0;
    m.b = y1 - y0; m.d = y2 - y0; m.ty = y0;

    return m.multiply(im);
};

TextureMapper.drawTriangle = function(renderTarget, texture, u0,v0,u1,v1,u2,v2, x0,y0,x1,y1,x2,y2) {
    var m = TextureMapper.getMatrix(u0,v0,u1,v1,u2,v2, x0,y0,x1,y1,x2,y2);

    renderTarget.save();
    renderTarget.beginPath();
    renderTarget.moveTo(x0, y0);
    renderTarget.lineTo(x1, y1);
    renderTarget.lineTo(x2, y2);
    renderTarget.closePath();
    renderTarget.clip();
    renderTarget.transform(m.a, m.b, m.c, m.d, m.tx, m.ty);
    renderTarget.drawImage(texture, 0, 0);
    renderTarget.restore();
};

NS.TextureMapper = TextureMapper;

})();
