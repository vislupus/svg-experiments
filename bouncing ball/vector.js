//https://p5js.org/reference/#/p5.Vector

function createVector(x, y) {
    return new Vector(x, y)
}

function degrees(n) {
    return (n * 180) / Math.PI;
}

function radians(n) {
    return (n * Math.PI) / 180;
}

class Vector {
    constructor(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
    }

    copy() {
        return new Vector(this.x, this.y);
    }

    set(x, y) {
        if (x instanceof Vector) {
            this.x = x.x || 0;
            this.y = x.y || 0;
            return this;
        }

        this.x = x || 0;
        this.y = y || 0;
        return this;
    }

    equals(x, y) {
        let a, b;
        if (x instanceof Vector) {
            a = x.x || 0;
            b = x.y || 0;
        }

        a = x || 0;
        b = y || 0;
        return this.x === a && this.y === b;
    }

    add(x, y) {
        if (x instanceof Vector) {
            this.x += x.x || 0;
            this.y += x.y || 0;
            return this;
        }

        this.x += x || 0;
        this.y += y || 0;
        return this;
    }

    sub(x, y) {
        if (x instanceof Vector) {
            this.x -= x.x || 0;
            this.y -= x.y || 0;
            return this;
        }

        this.x -= x || 0;
        this.y -= y || 0;
        return this;
    }

    mult(x, y) {
        if (x instanceof Vector) {
            this.x *= x.x;
            this.y *= x.y;
            return this;
        }

        if (arguments.length === 1) {
            this.x *= x;
            this.y *= x;
        }
        if (arguments.length === 2) {
            this.x *= x;
            this.y *= y;
        }
        return this;
    }

    div(x, y) {
        if (x instanceof Vector) {
            if (x.x === 0 || x.y === 0) {
                console.warn('divide by 0');
                return this;
            }

            this.x /= x.x;
            this.y /= x.y;
            return this;
        }

        if (x === 0 || y === 0) {
            console.warn('divide by 0');
            return this;
        }
        if (arguments.length === 1) {
            this.x /= x;
            this.y /= x;
        }
        if (arguments.length === 2) {
            this.x /= x;
            this.y /= y;
        }
        return this;
    }

    mag() {
        return Math.sqrt(this.magSq());
    }

    magSq() {
        return this.x ** 2 + this.y ** 2;
    }

    dot(v) {
        return this.x * (v.x || 0) + this.y * (v.y || 0);
    }

    cross(v) {
        return this.x * v.y - this.y * v.x;
    }

    dist(v) {
        //        return Math.sqrt((v.x - this.x) ** 2 + (v.y - this.y) ** 2);
        return v.copy().sub(this).mag();
    }

    normalize() {
        let len = this.mag();
        if (len !== 0) this.mult(1 / len);
        return this;
    }

    limit(max) {
        let mSq = this.magSq();
        if (mSq > max * max) {
            this.div(Math.sqrt(mSq)).mult(max);
        }
        return this;
    }

    setMag(n) {
        return this.normalize().mult(n);
    }

    heading() {
        var h = Math.atan2(this.y, this.x);
        return h;
    }

    setHeading(a) {
        let m = this.mag();
        this.x = m * Math.cos(a);
        this.y = m * Math.sin(a);
        return this;
    }

    rotate(a) {
        let newHeading = this.heading() + a;
        let mag = this.mag();
        this.x = Math.cos(newHeading) * mag;
        this.y = Math.sin(newHeading) * mag;
        return this;
    }

    angleBetween(v) {
        let angle, dotmagmag = this.dot(v) / (this.mag() * v.mag());
        angle = Math.acos(Math.min(1, Math.max(-1, dotmagmag)));
        angle = angle * Math.sign(this.cross(v) || 1);
        return angle;
    }

    lerp(x, y, amt) {
        if (x instanceof Vector) {
            return this.lerp(x.x, x.y, y);
        }

        this.x += (x - this.x) * amt || 0;
        this.y += (y - this.y) * amt || 0;
        return this;
    }

    reflect(surfaceNormal) {
        surfaceNormal.normalize();
        return this.sub(surfaceNormal.mult(2 * this.dot(surfaceNormal)));
    }

    fromAngle(angle, length) {
        if (typeof length === 'undefined') {
            length = 1;
        }
        return new Vector(
            length * Math.cos(angle), 
            length * Math.sin(angle)
        );
    }
}
