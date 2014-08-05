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

/**
 * @param fov 0 ~ 180 사이 각도
 */
NS.Camera3D = function(fov, aspect, near, far) {
    this._fov = fov || 35;
    this._aspect = aspect || 1;
    this._near = near || 1;
    this._far = far || 10000;
    
    this._updateProjMatrix();
};

NS.Camera3D.prototype = {
    setView: function(eye, target, up) {
        this._eye = eye;
        this._target = target;
        this._up = up;
        
        this._viewMatrix = m3d.geom.Matrix3D.lookAt(this._eye, this._target, this._up);
        
        
//      검증하기 
//       m3d.geom.Matrix3D.lookAt(new m3d.geom.Vector3D(-1, 0, 1), new m3d.geom.Vector3D(0, 0, 0), new m3d.geom.Vector3D(0, 1, 0)).transformVector(new m3d.geom.Vector3D(0, 0, 0)); // RH
       var p = this._viewMatrix.transformVector(new m3d.geom.Vector3D(0, 0, 0));
       console.log('@p=', p); // z = -root2
       
       console.log('cameraViewMatrix');
       console.log(this._viewMatrix.toString());
       console.log('--');
    },
    
    translate: function(x, y, z) {
        this._eye.x += x;
        this._eye.y += y;
        this._eye.z += z;
        
        this._updateViewMatrix();
    },
    
    rotateX: function(rad) {
        this._viewMatrix = this._viewMatrix.rotateX(rad);
    },
    
    rotateY: function(rad) {
        this._viewMatrix = this._viewMatrix.rotateY(rad);
        
//        var m = new m3d.geom.Matrix3D;
//        m = m.rotateY(rad);
//        
//        var aZ = this._target.subtract(this._eye).normalize();
//        console.log('aZ=', aZ);
//        
//        this._target = m.transformVector(aZ);
//        this._target = this._target.add(this._eye);
//        
//        this._updateViewMatrix();
    },
    
    rotateZ: function(rad) {
        this._viewMatrix = this._viewMatrix.rotateZ(rad);
    },
    
    getViewMatrix: function() {
        return this._viewMatrix.clone();
    },
    
    getProjMatrix: function() {
        return this._projMatrix.clone();
    },
    
    getViewportMatrix: function(screenWidth, screenHeight) {
        var hW = screenWidth / 2,
            hH = screenHeight / 2,
            m = [ hW,   0,  0, hW,
                   0, -hH,  0, hH,
                   0,   0,  1,  0,
                   0,   0,  0,  1 ];
        
        return new m3d.geom.Matrix3D(m);
    },
    
    _updateViewMatrix: function() {
        this.setView(this._eye, this._target, this._up);
    },
    
    _updateProjMatrix: function() {
        var ymax = Math.tan((this._fov * 0.5) * D2R) * this._near,
            ymin = -ymax,
            xmin = ymin * this._aspect,
            xmax = ymax * this._aspect,
            m00 = 2 * this._near / (xmax - xmin),
            m11 = 2 * this._near / (ymax - ymin),
            m03 = (xmax + xmin) / (xmax - xmin),
            m12 = (ymax + ymin) / (ymax - ymin),
            m22 = -(this._far + this._near) / (this._far - this._near),
            m23 = -2 * this._far * this._near / (this._far - this._near),
            m = [ m00,   0,  m03,   0,
                    0, m11,  m12,   0,
                    0,   0,  m22, m23,
                    0,   0,   -1,   0 ];

        this._projMatrix = new m3d.geom.Matrix3D(m);
    }
};

})();