/**
 * Mental Graphics by myounggun@gmail.com
 * 
 * Plane.js 
 */
!window.mg && (window.mg = {});

(function() {
    "use strict";

var NS = mg;

/**
 * @constructor
 */
var Plane = function(width, height, backfaceCulling) {
    NS.Object3D.call(this);
    
    this.backfaceCulling = backfaceCulling;
    this.color = null;

    this._setVertices(width / 2, height / 2);
};

var p = Plane.prototype = new NS.Object3D();

p.constructor = Plane;

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
    
    if (this.backfaceCulling) {
        var v0 = this._vertices[0],
            v1 = this._vertices[1],
            v2 = this._vertices[2],
            dx1 = v1.screenX - v0.screenX,
            dy1 = v1.screenY - v0.screenY,
            dx2 = v2.screenX - v0.screenX,
            dy2 = v2.screenY - v0.screenY,
            fronted = (dx1 * dy2 - dy1 * dx2 >= 0);

        if (!fronted) {
            return;
        }
    }
    
    // wireframe
//    this._renderTarget.save();
//    this._renderTarget.beginPath();
//
//    this._drawVertexLine(0, 1, 2, 0);
//    this._drawVertexLine(1, 3, 2, 1);
//
//    this._renderTarget.strokeStyle = "#000000";
//    this._renderTarget.stroke();
//    
//    this._renderTarget.closePath();
//    this._renderTarget.restore();
    
    this._renderTarget.save();
    this._renderTarget.beginPath();
    
    this._drawVertexLine(0, 2, 1, 0);

    this._renderTarget.fillStyle = this.color || "#ff0000";
    this._renderTarget.fill();

    this._renderTarget.closePath();
    this._renderTarget.restore();

    this._renderTarget.save();
    this._renderTarget.beginPath();
    this._drawVertexLine(0, 3, 2, 0);
    
    this._renderTarget.fillStyle = this.color || "#0000ff";
    this._renderTarget.fill();
    
    this._renderTarget.closePath();
    this._renderTarget.restore();
};

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

NS.Plane = Plane;

})();