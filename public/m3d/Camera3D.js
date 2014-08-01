/**
 * Mental Graphics by myounggun@gmail.com
 * 
 * Camera3D.js
 */
!window.m3d && (window.m3d = {});

(function() {
var NS = m3d;

NS.Camera3D = function(fov, aspectRatio) {
    this._fov = fov || Math.PI / 4;
    this._aspectRatio = aspectRatio || 1;
    this._scaleX = 800;
    this._scaleY = 800;
};

NS.Camera3D.prototype = {
    setView: function(eye, lookAt, up) {
        var aZ = lookAt.subtract(eye).normalize(),
            aX = up.cross(aZ).normalize(),
            aY = aZ.cross(aX),
            tx = -aX.dot(eye),
            ty = -aY.dot(eye),
            tz = -aZ.dot(eye);
        
//        var m = [ aX.x, aY.x, aZ.x, tx,
//                  aX.y, aY.y, aZ.y, ty,
//                  aX.z, aY.z, aZ.z, tz,
//                     0,    0,    0,  1 ];
//        
//        var mat = new m3d.geom.Matrix3D(m);
        
//      matrix^Transpose
        var m = [ aX.x, aX.y, aX.z, tx,
                  aY.x, aY.y, aY.z, ty,
                  aZ.x, aZ.y, aZ.z, tz,
                     0,    0,    0,  1 ];
        
        this._matrix = new m3d.geom.Matrix3D(m);
    },
    
    getViewMatrix: function() {
        return this._matrix.clone();
    },
    
    getViewProjectMatrix: function() {
        var m = this.getViewMatrix();
        m.m00 *= this._scaleX;
        m.m01 *= this._scaleX;
        m.m02 *= this._scaleX;
        m.m03 *= this._scaleX;
        
        m.m10 *= this._scaleY;
        m.m11 *= this._scaleY;
        m.m12 *= this._scaleY;
        m.m13 *= this._scaleY;
        
        return m;
    },
    
    toString: function() {
        return "Camera3D()";
    }
};

})();