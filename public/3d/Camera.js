/**
 * Mental Graphics by myounggun@gmail.com
 * 
 * Camera.js
 */
!window.mg && (window.mg = {});
!window.mg.core && (window.mg.core = {});

(function() {
var NS = mg.core;

NS.Camera = function(position, lookAt, up) {
    this.position = position;
    this.lookAt = lookAt;
    this.up = up;
    
    this._setMatrix(position, lookAt, up);
}

NS.Camera.prototype = {
    _setMatrix: function(position, lookAt, up) {
        var aZ = lookAt.subtract(position).normalize(),
            aX = up.cross(aZ).normalize(),
            aY = aZ.cross(aX),
            tx = -aX.dot(position),
            ty = -aY.dot(position),
            tz = -aZ.dot(position);
        
        var m = [ aX.x, aY.x, aZ.x, tx,
                  aX.y, aY.y, aZ.y, ty,
                  aX.z, aY.z, aZ.z, tz,
                     0,    0,    0,  1 ];
        
        this.matrix = new mg.geom.Matrix3D(m);
    },
    
    getMatrix: function() {
        return this.matrix;
    },
    
    toString: function() {
        return "Camera()";
    }
};

})();