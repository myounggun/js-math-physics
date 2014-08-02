function Vector3D(x, y, z)
{
        this.x = x !== undefined ? x : 0;
        this.y = y !== undefined ? y : 0;
        this.z = z !== undefined ? z : 0;
}
Vector3D.prototype =
{
        add: function(b)
        {
                return new Vector3D(this.x + b.x, this.y + b.y, this.z + b.z);
        },
        subtract: function(b)
        {
                return new Vector3D(this.x - b.x, this.y - b.y, this.z - b.z);
        },
        multiply: function(scalar)
        {
                return new Vector3D(this.x * scalar, this.y * scalar, this.z * scalar);
        },
        scale: function(b)
        {
                return new Vector3D(this.x * b.x, this.y * b.y, this.z * b.z);
        },
        invert: function(b)
        {
                this.x *= -1;
                this.y *= -1;
                this.z *= -1;
                return this;
        },
        length: function()
        {
                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        },
        lengthSquared: function()
        {
                return this.x * this.x + this.y * this.y + this.z * this.z;
        },
        normalize: function()
        {
                var l = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
                this.x /= l;
                this.y /= l;
                this.z /= l;
                return this;
        },
        dot: function(b)
        {
                return this.x * b.x + this.y * b.y + this.z * b.z;
        },
        cross: function(b)
        {
                return new Vector3D(this.y * b.z - b.y * this.z,
                        b.x * this.z - this.x * b.z,
                        this.x * b.y - b.x * this.y);
        },
        angleFrom: function(b)
        {
                var dot = this.x * b.x + this.y * b.y + this.z * b.z;
                var mod1 = this.x * this.x + this.y * this.y + this.z * this.z;
                var mod2 = b.x * b.x + b.y * b.y + b.z * b.z;
                var mod = Math.sqrt(mod1) * Math.sqrt(mod2);
                if(mod === 0) return null;
                var theta = dot / mod;
                if(theta < -1) return Math.acos(-1);
                if(theta > 1) return Math.acos(1);
                return Math.acos(theta);
        },
        distanceFrom: function(b)
        {
                var dx = b.x - this.x, dy = b.y - this.y, dz = b.z - this.z;
                return Math.sqrt(dx * dx + dy * dy + dz * dz);
        },
        yRotate: function(a, out)
        {
                if(!out)
                        out = new Vector3D(0, 0, 0);
                var x = this.x, y = this.y, z = this.z;
                var sinA = Math.sin(a);
                var cosA = Math.cos(a);
                out.x = x * cosA - z * sinA;
                out.y = y;
                out.z = x * sinA + z * cosA;
                return out;
        },
        clone: function() {
            return new Vector3D(this.x, this.y, this.z);
        }
};