/**
 * Mental Graphics by myounggun@gmail.com
 *
 * Billboard.js
 */
!window.mg && (window.mg = {});

(function() {
    "use strict";

var NS = mg;

/**
 * @constructor
 */
var Billboard = function(width, height) {
    NS.Object3D.call(this);

    this.color = null;

    this._setVertices(width / 2, height / 2);
};

var p = Billboard.prototype = new NS.Object3D();

p.constructor = Billboard;

/** override */
p.render = function(renderTarget, piplineMatrix) {
    this._renderTarget = renderTarget;

    var len = this._vertices.length;
    for (var i = 0; i < len; i++) {
        var vertex = this._vertices[i],
            projectVector = piplineMatrix.transformVertex(vertex).project();

        vertex.screenX = projectVector.x;
        vertex.screenY = projectVector.y;
    }

    // wireframe
    this._renderTarget.save();
    this._renderTarget.beginPath();

    this._drawVertexLine(0, 1, 2, 3, 0);

    this._renderTarget.fillStyle = this.color || "#ff0000";
    this._renderTarget.fill();

    this._renderTarget.closePath();
    this._renderTarget.restore();


    // if (!this._material) return;
    // if (!this._material.getImageData()) return;


    // var vt0 = this._vertices[1];
    // var vt1 = this._vertices[3];

    // var w = this._material.width;
    // var h = this._material.height;
    // var t = this._material.getImageData();

    // var x, y;
    // var p = [];
    // for (y = 0; y < h; y++)  {
    //     p[y] = [];

    //     for (x = 0; x < w; x++) {
    //         var xx = NS.Maths.map(x, 0, w - 1, vt0.x, vt1.x),
    //             yy = NS.Maths.map(y, 0, h - 1, vt0.y, vt1.y),
    //             vt = new NS.Vertex(xx, yy, 0),
    //             projectVector = piplineMatrix.transformVertex(vt).project();

    //         p[y][x] = [];
    //         p[y][x][0] = projectVector.x;
    //         p[y][x][1] = projectVector.y;
    //     }
    // }

    // var i, r, g, b, a;
    // for (y = 0; y < h - 2; y++)  {
    //     for (x = 0; x < w - 2; x++) {
    //         i = (y * w + x) * 4;
    //         r = t[i + 0]; g = t[i + 1]; b = t[i + 2]; a = t[i + 3];
    //         // this._renderTarget.save();
    //         this._renderTarget.beginPath();
    //         this._renderTarget.moveTo(p[y][x][0], p[y][x][1]);
    //         this._renderTarget.lineTo(p[y][x+1][0], p[y][x+1][1]);
    //         this._renderTarget.lineTo(p[y+1][x+1][0], p[y+1][x+1][1]);
    //         this._renderTarget.lineTo(p[y+1][x][0], p[y+1][x][1]);
    //         this._renderTarget.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
    //         this._renderTarget.fill();
    //         this._renderTarget.closePath();
    //         // this._renderTarget.restore();
    //     }
    // }
};

// p.setMaterial = function(material) {
//     this._material = material;
// };

// p.getMaterial = function(material) {
//     return this._material;
// };

p._setVertices = function(hWidth, hHeight) {
    this._vertices = [];

    this._vertices[0] = new NS.Vertex(-hWidth, -hHeight, 0);
    this._vertices[1] = new NS.Vertex(-hWidth,  hHeight, 0);
    this._vertices[2] = new NS.Vertex( hWidth,  hHeight, 0);
    this._vertices[3] = new NS.Vertex( hWidth, -hHeight, 0);
};

p._drawVertexLine = function() {
    var vertex = this._vertices[arguments[0]];
    this._renderTarget.moveTo(vertex.screenX, vertex.screenY);

    var len = arguments.length;
    for (var i = 1; i < len; i++) {
        vertex = this._vertices[arguments[i]];
        this._renderTarget.lineTo(vertex.screenX, vertex.screenY);
    }
}

NS.Billboard = Billboard;

})();
