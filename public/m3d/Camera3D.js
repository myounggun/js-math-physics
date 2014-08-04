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
    
    // test
    this._scaleX = 800;
    this._scaleY = 800;
    
    this.setProjMatrix();
};

NS.Camera3D.prototype = {
    lookAt: function(eye, target, up) {
        var aZ = target.subtract(eye).normalize(),
            aX = up.cross(aZ).normalize(),
            aY = aZ.cross(aX),
            tx = aX.dot(eye),
            ty = aY.dot(eye),
            tz = aZ.dot(eye);
//        var m = [ aX.x, aY.x, aZ.x, tx,
//                  aX.y, aY.y, aZ.y, ty,
//                  aX.z, aY.z, aZ.z, tz,
//                     0,    0,    0,  1 ];
//        
//        var mat = new m3d.geom.Matrix3D(m);
        
//      RotationMatrix^Transpose + eye
        var m = [ aX.x, aX.y, aX.z, tx,
                  aY.x, aY.y, aY.z, ty,
                  aZ.x, aZ.y, aZ.z, tz,
                     0,    0,    0,  1 ];

        this._viewMatrix = new m3d.geom.Matrix3D(m);
        
//       검증하기 
//        camera.lookAt(new Vector3D(-1, 0, 1), new Vector3D(0, 0, 0), new Vector3D(0, 1, 0)); // 오른손
//        camera.lookAt(new Vector3D(-1, 0, -1), new Vector3D(0, 0, 0), new Vector3D(0, 1, 0)); // 오른손
//        var p = this._viewMatrix.transform(new Vector3D(0, 0, 0));
//        console.log('@p=', p); // z = -루트 2
        
        console.log('cameraViewMatrix');
        console.log(this._viewMatrix.toString());
        console.log('--');
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
            
//            m20 = (right + left) / (right - left),
//            m21 = (top + bottom) / (top - bottom),
//            m22 = -(this._far + this._near) / (this._far - this._near),
//            m32 = -2 * this._far * this._near / (this._far - this._near),
//            
//            m = [ m00,   0,   0,   0,
//                    0, m11,   0,   0,
//                  m20, m21, m22,  -1,
//                    0,   0, m32,   0 ];
        
            m03 = (right + left) / (right - left),
            m12 = (top + bottom) / (top - bottom),
            m22 = -(this._far + this._near) / (this._far - this._near),
            m23 = -2 * this._far * this._near / (this._far - this._near),
            m = [ m00,   0,  m03,   0,
                    0, m11,  m12,   0,
                    0,   0,  m22, m23,
                    0,   0,   -1,   0 ];

        this._projMatrix = new m3d.geom.Matrix3D(m);
        
        console.log('projMatrix---------------'); 
        console.log(this._projMatrix.toString());
        console.log('--');
    },
    
    getProjMatrix: function() {
        return this._projMatrix.clone();
    },
    
    setPosition: function(v) {
        this._viewMatrix.m03 = v.x;
        this._viewMatrix.m13 = v.y;
        this._viewMatrix.m23 = v.z;
    },
    
    getPosition: function() {
        return new Vector3D(this._viewMatrix.m03, this._viewMatrix.m13, this._viewMatrix.m23);
    },
    
    translateX: function(dist) {
        this._viewMatrix = this._viewMatrix.translate(dist, 0, 0);
    },
    
    translateY: function(dist) {
        this._viewMatrix = this._viewMatrix.translate(0, dist, 0);
    },
    
    translateZ: function(dist) {
        this._viewMatrix = this._viewMatrix.translate(0, 0, dist);
    },
    
    rotateX: function(rad) {
        this._viewMatrix = this._viewMatrix.rotateX(rad);
    },
    
    rotateY: function(rad) {
        this._viewMatrix = this._viewMatrix.rotateY(rad);
    },
    
    rotateZ: function(rad) {
        this._viewMatrix = this._viewMatrix.rotateZ(rad);
    },
  
    toString: function() {
        return "Camera3D()";
    }
};

})();