/**
 * Mental Graphics by myounggun@gmail.com
 * 
 * Maths.js
 */
!window.mg && (window.mg = {});

(function() {
    "use strict";

var NS = mg;

NS.Maths = {
    D2R: 0.0174532925199, // degrees / 180 * Math.PI
    R2D: 57.2957795131,   // radians * 180 / Math.PI
    
    norm: function(value, min, max) {
        return (value - min) / (max - min);
    },
    
    lerp: function(norm, min, max) {
        return (max - min) * norm + min;
    },

    map: function(value, sourceMin, sourceMax, destMin, destMax) {
        return Maths.lerp(Maths.norm(value, sourceMin, sourceMax), destMin, destMax);
    },

    clamp: function(value, min, max) {
        min = Math.min(min, max);
        max = Math.max(min, max);
        return Math.min(Math.max(value, min), max);
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
    
    // shift: 16 === Math.floor
    roundToShift: function(value, shift) {
        var mult = 1 << shift;
        return Math.round(value * mult) >> shift; 
    },

    roundNearest: function(value, nearest) {
        return Math.round(value / nearest) * nearest;
    },
    
    randomRange: function(min, max) {
        return min + Math.random() * (max - min);
    },
    
    randomInt: function(min, max) {
        return Math.floor(min + Math.random() * (max - min + 1));
    },
    
    randomDist: function(min, max, iterations) {
        for (var i = 0, total = 0; i < iterations; i++) {
            total += Maths.randomRange(min, max);
        }
        
        return total / iterations;
    },
    
    circleCollision: function(c0, c1) {
        return Maths.distance(c0, c1) < c0.radius + c1.radius;
    },
    
    circlePointCollision: function(x, y, circle) {
        return Maths.distanceXY(x, y, circle.x, circle.y) < circle.radius;
    },
    
    pointInRect: function(x, y, rect) {
        return Maths.inRange(x, rect.x, rect.x + rect.width) &&
               Maths.inRange(y, rect.y, rect.y + rect.height); 
    },
    
    inRange: function(value, min, max) {
        min = Math.min(min, max);
        max = Math.max(min, max);
        return value >= min && value <= max;
    },
    
    rangeIntersect: function(min0, max0, min1, max1) {
        min0 = Math.min(min0, max0);
        max0 = Math.max(min0, max0);
        min1 = Math.min(min1, max1);
        max1 = Math.max(min1, max1);
        return max0 >= min1 && min0 <= max1;
    },
    
    rectIntersect: function(r0, r1) {
        return Maths.rangeIntersect(r0.x, r0.x + r0.width, r1.x, r1.x + r1.width) &&
               Maths.rangeIntersect(r0.y, r0.y + r0.height, r1.y, r1.y + r1.height);
    }
};

})();

