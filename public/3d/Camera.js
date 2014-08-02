/**
 * Mental Graphics by myounggun@gmail.com
 * 
 * Camera.js
 */
!window.mg && (window.mg = {});
!window.mg.core && (window.mg.core = {});

(function() {
var NS = mg.core;

NS.Camera = function(eye, lookAt, up) {
    this._setMatrix(eye, lookAt, up);
}

NS.Camera.prototype = {
    setEye: function(eye) {
        var dEye = eye.subtract(this.eye);
//        this.lookAt = this.lookAt.add(dEye);
          
        this.eye = eye.clone();
        this._setMatrix(this.eye, this.lookAt, this.up);
    },
    
    _setMatrix: function(eye, lookAt, up) {
        this.eye = eye;
        this.lookAt = lookAt;
        this.up = up;
        
        var aZ = lookAt.subtract(eye).normalize(),
            aX = up.cross(aZ).normalize(),
            aY = aZ.cross(aX),
            tx = -aX.dot(eye),
            ty = -aY.dot(eye),
            tz = -aZ.dot(eye);
        
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