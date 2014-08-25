/**
 * Mental Graphics by myounggun@gmail.com
 *
 * Mesh3D.js
 */
!window.mg && (window.mg = {});

(function() {
    "use strict";

var NS = mg;

/**
 * @constructor
 */
var Mesh3D = function(vertexList, faceList, backfaceCulling) {
    this.vertexList = vertexList;
    this.faceList = faceList;
    this.backfaceCulling = backfaceCulling;
};

var p = Mesh3D.prototype = new NS.Object3D();

p.constructor = Mesh3D;

/** override */
p.render = function(renderTarget, piplineMatrix) {
    this._renderTarget = renderTarget;

    this.vertexList.project(piplineMatrix);

    var numFace = this.faceList.length;
    for (var i = 0; i < numFace; i++) {
        var face = this.faceList[i];
        if (!face) continue;

        var v0 = this.vertexList.getVertexAt(face.idx0);
        var v1 = this.vertexList.getVertexAt(face.idx1);
        var v2 = this.vertexList.getVertexAt(face.idx2);

        if (this.backfaceCulling) {
            var dx1 = v1.screenX - v0.screenX,
                dy1 = v1.screenY - v0.screenY,
                dx2 = v2.screenX - v0.screenX,
                dy2 = v2.screenY - v0.screenY,
                fronted = (dx1 * dy2 - dy1 * dx2 >= 0);

            if (!fronted) {
                return;
            }
        }

        if (!this._material) {
            this._material = new NS.BasicMaterial();
        }

        this._material.draw(this._renderTarget, v0, v1, v2);
        new NS.BasicMaterial().draw(this._renderTarget, v0, v1, v2);
    }
};

p.setMaterial = function(material) {
    this._material = material;
};

p.getMaterial = function(material) {
    return this._material;
};

Mesh3D.createPlane = function(x, y, z,  x2, y2, z2,  uSegs, vSegs, u1, v1,  u2, v2, backfaceCulling) {
    var numVertex = (uSegs+1)*(vSegs+1),
        vertList = new NS.VertexList(numVertex),
        index = 0,
        dx = x2 - x,
        dy = y2 - y,
        dz = z2 - z,
        du = (u2 - u1) / uSegs,
        dv = (v2 - v1) / vSegs,
        i, j, vertex;

        if (dx == 0) {
            dy = dy / uSegs;
            dz = dz / vSegs;
            for (i = 0; i <= uSegs; i++) {
                for (j = 0; j <= vSegs; j++) {
                    vertex = new NS.TVertex(x, y+j*dy, z+i*dz, u1+du*i, v1+dv*j);
                    vertList.setVertexAt(index++, vertex);
                }
            }
        } else if (dy == 0) {
            dx = dx / vSegs;
            dz = dz / uSegs;
            for (i = 0; i <= uSegs; i++) {
                for (j = 0; j <= vSegs; j++) {
                    vertex = new NS.TVertex(x+j*dx, y, z+i*dz, u1+du*i, v1+dv*j);
                    vertList.setVertexAt(index++, vertex);
                }
            }
        } else if (dz == 0) {
            dx = dx / uSegs;
            dy = dy / vSegs;
            for (i = 0; i <= uSegs; i++) {
                for (j = 0; j <= vSegs; j++) {
                    vertex = new NS.TVertex(x+i*dx, y+j*dy, z, u1+du*i, v1+dv*j);
                    vertList.setVertexAt(index++, vertex);
                }
            }
        } else {
            console.log("is not plane");
            return null;
        }

        index = 0;

        var faceList = new Array(uSegs*vSegs*2);
        for (i = 0; i < uSegs; i++) {
            for (j = 0; j < vSegs; j++) {
                var base = i * (vSegs + 1) + j;
                faceList[index++] = new NS.Face(base, base+vSegs+1, base+vSegs+2);
                faceList[index++] = new NS.Face(base, base+vSegs+2, base+1);
            }
        }

        var mesh = new NS.Mesh3D(vertList, faceList, backfaceCulling);

        return mesh;
};

NS.Mesh3D = Mesh3D;

})();
