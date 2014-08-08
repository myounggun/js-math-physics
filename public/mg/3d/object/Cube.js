/**
 * Mental Graphics by myounggun@gmail.com
 * 
 * Cube.js 
 */
!window.mg && (window.mg = {});

(function() {
    "use strict";

var NS = mg;

/**
 * @constructor
 */
var Cube = function(size) {
    NS.Object3D.call(this);
    
    this._setVertices(size);
};

var p = Cube.prototype = new NS.Object3D();

p.constructor = Cube;

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
    this._drawVertexLine(4, 5, 6, 7, 4);
    this._drawVertexLine(0, 4);
    this._drawVertexLine(1, 5);
    this._drawVertexLine(2, 6);
    this._drawVertexLine(3, 7);

    this._renderTarget.strokeStyle = "#000000";
    this._renderTarget.stroke();
    
    this._renderTarget.closePath();
    this._renderTarget.restore();   
};

p._setVertices = function(size) {
    this._vertices = [];
    
    this._vertices[0] = new NS.Vertex(-size,-size, size);
    this._vertices[1] = new NS.Vertex( size,-size, size); 
    this._vertices[2] = new NS.Vertex( size,-size,-size); 
    this._vertices[3] = new NS.Vertex(-size,-size,-size);
    this._vertices[4] = new NS.Vertex(-size, size, size);
    this._vertices[5] = new NS.Vertex( size, size, size); 
    this._vertices[6] = new NS.Vertex( size, size,-size); 
    this._vertices[7] = new NS.Vertex(-size, size,-size);
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

NS.Cube = Cube;

})();