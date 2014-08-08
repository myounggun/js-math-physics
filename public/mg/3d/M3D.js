/**
 * Mental Graphics by myounggun@gmail.com
 * 
 * Simple 3d engine
 * 
 * M3D.js
 */
!window.mg && (window.mg = {});

(function() {
    "use strict";

var NS = mg,
    INSTANCE = null;

/**
 * @constructor
 */
var M3D = function() {
    this._worldMatrix = new NS.Matrix3D();
    
    this._camera = new NS.Camera3D();
    this._camera.setView(new NS.Vector3D(1, 0, 1), new NS.Vector3D(0, 0, 0), new NS.Vector3D(0, 1, 0));
};

var p = M3D.prototype = {
    get camera() {
        return this._camera;
    },
    
    set camera(camera) {
        this._camera = camera;
    },
    
    get clipRect() {
        return this._clipRect;
    },
    
    get screenCenter() {
        return {x: this._clipRect.width / 2,  y: this._clipRect.height / 2 };
    }
};

p.constructor = M3D;

p.setRenderTarget = function(renderTarget, width, height) {
    this._renderTarget = renderTarget;

    this.setSize(width, height);
};

p.setSize = function(width, height) {
    if (!this._renderTarget) {
        throw new Error("renderTarget is null");
    }
    
    this._renderTarget.width = width;
    this._renderTarget.height = height;
    
    this._clipRect = {
        x: 0,
        y: 0,
        width: width,
        height: height
    };
}

/**
 * @param obj Object3D
 */
p.render = function(obj) {    
    if (!obj) {
        throw new Error("obj is null");
    }
    
    if (!this._renderTarget) {
        throw new Error("renderTarget is null");
    }

    var modelMatrix = obj.getMatrix();
    var viewMatrix = this.camera.getViewMatrix();
    var projMatrix = this.camera.getProjMatrix();
    var screenMatrix = this.getScreenMatrix();

    var piplineMatrix; // M * V * P * S
    piplineMatrix = modelMatrix.multiply(this._worldMatrix);
    piplineMatrix = viewMatrix.multiply(piplineMatrix);
    piplineMatrix = projMatrix.multiply(piplineMatrix);
    piplineMatrix = screenMatrix.multiply(piplineMatrix);
    
    obj.render(this._renderTarget, piplineMatrix); 
};

p.getScreenMatrix = function() {
    var hW = this.clipRect.width / 2,
        hH = this.clipRect.height / 2,
        m = [ hW,   0,  0, hW,
               0, -hH,  0, hH,
               0,   0,  1,  0,
               0,   0,  0,  1 ];
    
    return new NS.Matrix3D(m);
};

p.clear = function() {
    this._renderTarget.clearRect(0, 0, this.clipRect.width, this.clipRect.height);
    
    // 스크린 공간을 가늠하기 위한 코드 
    this._renderTarget.fillStyle = "rgba(0, 0, 0, 0.1)";
    this._renderTarget.fillRect(this.clipRect.x, this.clipRect.y, this.clipRect.width, this.clipRect.height);
};

p.toString = function() {
    return "M3D";
};

/**
 * single-tone
 */
M3D.getInstance = function() {
    if (INSTANCE === null) {
        INSTANCE = new NS.M3D();
    }
    
    return INSTANCE;
};

NS.M3D = M3D;

})();