/**
 * Mental Graphics by myounggun@gmail.com
 *
 * VertexList.js
 */
!window.mg && (window.mg = {});

(function() {
    "use strict";

var NS = mg;

/**
 * @constructor
 */
var VertexList = function(numVertex) {
    this.vertices = new Array(numVertex);
};

var p = VertexList.prototype;

p.constructor = VertexList;

p.setVertexAt = function(index, vertex) {
    this.vertices[index] = vertex;
};

p.getVertexAt = function(index) {
    return this.vertices[index];
};

p.project = function(tm) {
    var len = this.vertices.length;
    for (var i = 0; i < len; i++) {
        var vertex = this.vertices[i];
        vertex.project(tm);
    }
};

p.clone = function() {
    var newVertices = new Array(this.vertices.length);
    var len = this.vertices.length;
    for (var i = 0; i < len; i++) {
        var vertex = this.vertices[i];
        newVertices[i] = vertex.clone();
    }

    var verticeList = new NS.VertexList(1);
    verticeList.vertices = newVertices;

    return verticeList;
};

p.toString = function() {
    return "VertexList(" + this.vertices.length + ")";
};

NS.VertexList = VertexList;

})();
