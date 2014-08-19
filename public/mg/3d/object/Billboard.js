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
    
    this._renderTarget.fillStyle = this.color || "#000000";
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

NS.Billboard = Billboard;

})();