var Maths = {
    D2R: 0.0174532925199, // degrees / 180 * Math.PI
    R2D: 57.2957795131,   // radians * 180 / Math.PI
    
    norm: function(value, min, max) {
        return (value - min) / (max - min);
    },
    
    lerp: function(norm, min, max) {
        return (max - min) * norm + min;
    },

    map: function(value, sourceMin, sourceMax, destMin, destMax) {
        return utils.lerp(Maths.norm(value, sourceMin, sourceMax), destMin, destMax);
    },

    clamp: function(value, min, max) {
        return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
    },

    distance: function(p0, p1) {
        var dx = p1.x - p0.x,
            dy = p1.y - p0.y;
        return Math.sqrt(dx * dx + dy * dy);
    },

    distanceXY: function(x0, y0, x1, y1) {
        var dx = x1 - x0,
            dy = y1 - y0;
        return Math.sqrt(dx * dx + dy * dy);
    },

    roundToPlaces: function(value, places) {
        var mult = Math.pow(10, places);
        return Math.round(value * mult) / mult;
    },

    roundNearest: function(value, nearest) {
        return Math.round(value / nearest) * nearest;
    }
}