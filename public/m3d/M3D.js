/**
 * Mental Graphics by myounggun@gmail.com
 * 
 * Simple 3d engine
 * 
 * JS3D.js
 */
!window.m3d && (window.m3d = {});

(function() {
var NS = m3d,
    INSTANCE = null;

NS.M3D = function() {
//    this._camera = new NS.Camera3D();
//    this._camera.setViewMatrix(new Vector3D(100, 100, -200), new Vector3D(0, 0, 0), new Vector3D(0, 1, 0));
};

NS.M3D.prototype = {
    setScreen: function(viewport, width, height) {
        this._screenCenter = {
            x: width / 2,
            y: height / 2
        };
        
        this._clipRect = {
            x: 0,//-width / 2,
            y: 0,//-height / 2,
            width: width,
            height: height
        };
    },
    
    getClipRect: function() {
        return this._clipRect;
    },
    
    getScreenCenter: function() {
        return this._screenCenter;
    },
    
    toString: function() {
        return "M3D";
    }
};

NS.M3D.getInstance = function() {
    if (INSTANCE === null) {
        INSTANCE = new NS.M3D();
    }
    
    return INSTANCE;
};

})();