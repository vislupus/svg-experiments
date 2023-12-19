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

    Element.prototype.computeCentroid = function (vertices) {
        let centroidX = 0,
            centroidY = 0;
        let det = 0,
            tempDet = 0;
        let j = 0;
        let nVertices = vertices.length;

        for (let i = 0; i < nVertices; i++) {
            // closed polygon
            if (i + 1 == nVertices) {
                j = 0;
            } else {
                j = i + 1;
            }

            // compute the determinant
            tempDet = vertices[i].x * vertices[j].y - vertices[j].x * vertices[i].y;
            det += tempDet;

            centroidX += (vertices[i].x + vertices[j].x) * tempDet;
            centroidY += (vertices[i].y + vertices[j].y) * tempDet;
        }

        // divide by the total mass of the polygon
        centroidX /= 3 * det;
        centroidY /= 3 * det;

        return {
            x: centroidX,
            y: centroidY
        };
    }

    Element.prototype.area = function (vertices) {
        let area = 0;
        let pts = vertices;
        let nPts = vertices.length;
        let j = nPts - 1;
        let p1;
        let p2;

        for (let i = 0; i < nPts; j = i++) {
            p1 = pts[i];
            p2 = pts[j];
            area += p1.x * p2.y;
            area -= p1.y * p2.x;
        }
        area /= 2;
        return area;
    }

    Element.prototype.centroid = function (vertices) {
        let pts = vertices;
        let nPts = vertices.length;
        let x = 0;
        let y = 0;
        let f;
        let j = nPts - 1;
        let p1;
        let p2;

        for (let i = 0; i < nPts; j = i++) {
            p1 = pts[i];
            p2 = pts[j];
            f = p1.x * p2.y - p2.x * p1.y;
            x += (p1.x + p2.x) * f;
            y += (p1.y + p2.y) * f;
        }

        f = this.area(vertices) * 6;
        return {
            x: x / f,
            y: y / f
        };
    }

    Element.prototype.centerSimple = function (vertices) {
        let x = 0;
        let y = 0;
        let nVertices = vertices.length;

        for (let i = 0; i < nVertices; i++) {
            x += vertices[i].x;
            y += vertices[i].y;
        }

        x /= nVertices;
        y /= nVertices;

        return {
            x: x,
            y: y
        };
    }

    Element.prototype.pointInPolygon = function (vertices, x, y) {
        let i, j, c = 0;
        let nVertices = vertices.length
        for (i = 0, j = nVertices - 1; i < nVertices; j = i++) {
            if (((vertices[i].y > y) != (vertices[j].y > y)) &&
                (x < (vertices[j].x - vertices[i].x) * (y - vertices[i].y) / (vertices[j].y - vertices[i].y) + vertices[i].x))
                c = !c;
        }

        return c;
    }
});
