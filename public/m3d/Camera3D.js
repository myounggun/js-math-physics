/**
 * Mental Graphics by myounggun@gmail.com
 * 
 * Camera3D.js
 */
!window.m3d && (window.m3d = {});

(function() {
var NS = m3d,
    D2R = 0.0174532925199,
    R2D = 57.2957795131;

NS.Camera3D = function(fov, aspect, near, far) {
    this._fov = fov || 35;
    this._aspect = aspect || 1;
    this._near = near || 0.1;
    this._far = far || 2000;
    
    this.setProjMatrix();
};

NS.Camera3D.prototype = {
    lookAt: function(eye, target, up) {
        var aZ = target.subtract(eye).normalize(),
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
        
        this._viewMatrix = new m3d.geom.Matrix3D(m);
    },
    
    getViewMatrix: function() {
        return this._viewMatrix.clone();
    },
    
    setProjMatrix: function() {
        var top = Math.tan((this._fov * 0.5) * D2R) * this._near,
            bottom = -top,
            left = bottom * this._aspect,
            right = top * this._aspect,
            m00 = 2 * this._near / (right - left),
            m11 = 2 * this._near / (top - bottom),
            m03 = (right + left) / (right - left),
            m12 = (top + bottom) / (top - bottom),
            m22 = -(this._far + this._near) / (this._far - this._near),
            m23 = -2 * this._far * this._near / (this._far - this._near),
            m = [ m00,   0,  m03,   0,
                    0, m11,  m12,   0,
                    0,   0,  m22, m23,
                    0,   0,   -1,   0 ];

        this._projMatrix = new m3d.geom.Matrix3D(m);
        console.log('projMatrix'); console.log(this._projMatrix.toString());
    },
    
    getViewProjMatrix: function() {
        return this._projMatrix.multiply(this._viewMatrix);
    },
    
//    test
//    getViewProjMatrix: function() {
//        var m = this.getViewMatrix();
//        m.m00 *= this._scaleX;
//        m.m01 *= this._scaleX;
//        m.m02 *= this._scaleX;
//        m.m03 *= this._scaleX;
//        
//        m.m10 *= this._scaleY;
//        m.m11 *= this._scaleY;
//        m.m12 *= this._scaleY;
//        m.m13 *= this._scaleY;
//        
//        return m;
//    },
//    
    toString: function() {
        return "Camera3D()";
    }
};

})();