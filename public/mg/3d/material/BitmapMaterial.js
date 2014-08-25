/**
 * Mental Graphics by myounggun@gmail.com
 *
 * BitmapMaterial.js
 */
!window.mg && (window.mg = {});

(function() {
    "use strict";

var NS = mg;

/**
 * @constructor
 */
var BitmapMaterial = function(imageURL) {
    // TODO: frontTexture, backTexture 인자로 추가 필요.
    this.loadTexture(imageURL);
};

var p = BitmapMaterial.prototype;

p.constructor = BitmapMaterial;

p.loadTexture = function(imageURL) {
    var canvas = document.createElement("canvas"),
        context = canvas.getContext("2d"),
        image = new Image();

    image.src = imageURL;
    image.onload = function() {
        this.width = image.width;
        this.height = image.height;

        context.drawImage(image, 0, 0, this.width, this.height);

        this._image = image;
        // this._imageData = context.getImageData(0, 0, this.width, this.height).data;
    }.bind(this);
};

// TVertex: v0, v1, v2
p.draw = function(renderTarget, v0, v1, v2) {
    if (!this.getTexture()) return;

    var t = this.getTexture(),
        w = this.width,
        h = this.height;

    NS.TextureMapper.drawTriangle(renderTarget, t,
        v0.u*w, v0.v*h, v1.u*w, v1.v*h, v2.u*w, v2.v*h,
        v0.screenX, v0.screenY, v1.screenX, v1.screenY, v2.screenX, v2.screenY);
};

p.getTexture = function() {
    return this._image;
};

// p.getImageData = function() {
//     return this._imageData;
// };

p.toString = function() {
    return "BitmapMaterial()";
};

NS.BitmapMaterial = BitmapMaterial;

})();
