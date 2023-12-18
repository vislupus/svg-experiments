Snap.plugin(function (Snap, Element, Paper, global) {
    Element.prototype.getCursorPoint = function (x, y) {
        var pt = this.paper.node.createSVGPoint();
        pt.x = x;
        pt.y = y;
        return pt.matrixTransform(this.paper.node.getScreenCTM().inverse());
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

    Element.prototype.normalLine = function (x1, y1, x2, y2, x, y) {
        let x_middle = (x1 + x2) / 2;
        let y_middle = (y1 + y2) / 2;
        let dx = x2 - x1;
        let dy = y2 - y1;

        return {
            x_middle: x_middle,
            y_middle: y_middle,
            x_out: x + dy,
            y_out: y - dx,
            x_in: x - dy,
            y_in: y + dx
        };
    }
});
