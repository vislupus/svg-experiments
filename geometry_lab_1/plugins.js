Snap.plugin(function (Snap, Element, Paper, global) {
    Element.prototype.getCursorPoint = function (x, y) {
        var pt = this.paper.node.createSVGPoint();
        pt.x = x;
        pt.y = y;
        return pt.matrixTransform(this.paper.node.getScreenCTM().inverse());
    }

    Element.prototype.getCenter = function () {
        let bbox = this.getBBox();
        return {
            x: bbox.cx,
            y: bbox.cy
        }
    }

    Element.prototype.intersection = function (x1, y1, x2, y2, x3, y3, x4, y4) {
        let d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        let x_inter = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / d;
        let y_inter = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / d;

        return {
            x: x_inter,
            y: y_inter
        }
    }

    Element.prototype.intersectionLineCircle = function (m, b, originX, originY, radius) {
        let d = radius ** 2 * (1 + m ** 2) - (originY - m * originX - b) ** 2

        let x1 = (originX + originY * m - b * m + Math.sqrt(d)) / (1 + m ** 2);
        let x2 = (originX + originY * m - b * m - Math.sqrt(d)) / (1 + m ** 2);
        
        let y1 = (b + originX * m + originY * m**2 + m*Math.sqrt(d)) / (1 + m ** 2);
        let y2 = (b + originX * m + originY * m**2 - m*Math.sqrt(d)) / (1 + m ** 2);
        
        return {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        }
    }

    Element.prototype.angle = function (x, y, originX, originY) {
        let beta = Math.atan2(Math.abs(Math.abs(y) - Math.abs(originY)), Math.abs(Math.abs(x) - Math.abs(originX))) * 180 / Math.PI;

        if (x >= originX && y <= originY) {
            return Math.round(90 - beta);
        } else if (x >= originX && y >= originY) {
            return Math.round(90 + beta);
        } else if (x <= originX && y >= originY) {
            return Math.round(270 - beta);
        } else if (x <= originX && y <= originY) {
            return Math.round(270 + beta);
        }
    }

    Element.prototype.equationLine = function (x1, y1, x2, y2) {
        let m = (y2 - y1) / (x2 - x1);
        let b = (x2 * y1 - x1 * y2) / (x2 - x1);
        //    let b1 = y1 - m * x1;

        return {
            m: m,
            b: b
        }
    }

    Element.prototype.angleBetween = function (x1, y1, x2, y2, x3, y3, x4, y4) {
        let dx1 = x2 - x1;
        let dy1 = y2 - y1;
        let dx2 = x4 - x3;
        let dy2 = y4 - y3;

        let d = dx1 * dx2 + dy1 * dy2;
        let l = Math.sqrt((dx1 ** 2 + dy1 ** 2) * (dx2 ** 2 + dy2 ** 2))

        return Math.round(Math.acos(d / l) * 180 / Math.PI);
    }

    Element.prototype.angleBetween2 = function (x1, y1, x2, y2, x3, y3, x4, y4) {
        let angle1 = Math.atan2(y1 - y2, x1 - x2);
        let angle2 = Math.atan2(y3 - y4, x3 - x4);
        let result = (angle2 - angle1) * 180 / Math.PI;
        if (result < 0) {
            result += 360;
        }

        return Math.round(result);
    }


    Element.prototype.dist = function (x1, y1, x2, y2) {
        return Math.round(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2));
    }


    Element.prototype.show = function () {
        this.attr('display', '');
    };

    Element.prototype.hide = function () {
        this.attr('display', 'none');
    }
});
