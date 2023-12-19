var width = 848;
var height = 480;

var s = new Snap("#svg").attr({
    viewBox: `0 0 ${width} ${height}`,
    preserveAspectRatio: 'xMaxYMax',
    width: width,
    height: height
});

var radius = 200;
var originX = width / 2;
var originY = height / 2;
var step = 10;

for (let angle = 0; angle < 360; angle += step) {
    let Xm1 = originX + Math.sin(angle * Math.PI / 180) * radius;
    let Ym1 = originY - Math.cos(angle * Math.PI / 180) * radius

    s.circle(Xm1, Ym1, 5).attr({
        fill: "red"
    });

    let Xm1_t = originX + Math.sin(angle * Math.PI / 180) * (radius + 20);
    let Ym1_t = originY - Math.cos(angle * Math.PI / 180) * (radius + 20)

    s.text(Xm1_t - 10, Ym1_t + 5, angle.toString()).attr({
        "font-family": "sans-serif",
        "font-size": 12,
        "fill": "black"
    });
}

//var mirror = s.rect(originX - 10, originY - radius / 2, 20, radius).attr({
//    fill: 'blue'
//});

var circle = s.circle(originX, originY, radius).attr({
    fill: "none",
    stroke: 'black',
    strokeOpacity: .3,
    strokeWidth: 2
});

var circle_center = s.circle(originX, originY, 5).attr({
    fill: "black"
});

var circle_thumb = s.circle(originX, originY - radius, 10).attr({
    fill: "black"
});

var x1 = originX;
var x2 = originX;
var y1 = originY;
var y2 = originY - radius;

var pointer_line = s.line(x1, y1, x2, y2).attr({
    stroke: "black",
    strokeWidth: 1
});

var x3 = 200;
var y3 = 30;
var x4 = 700;
var y4 = 320;

var mirror_line = s.line(x3, y3, x4, y4).attr({
    stroke: "black",
    strokeWidth: 1
});

var hor_line = s.line(originX - radius, originY, originX + radius, originY).attr({
    stroke: "black",
    strokeWidth: 1,
    strokeDasharray: "3 2 5"
});

var ver_line = s.line(originX, originY - radius, originX, originY + radius).attr({
    stroke: "black",
    strokeWidth: 1,
    strokeDasharray: "3 2 5"
});

let inter = s.intersection(x1, y1, x2, y2, x3, y3, x4, y4);
let x_inter = inter.x;
let y_inter = inter.y;

var intersection = s.circle(x_inter, y_inter, 5).attr({
    fill: "purple"
});

let angleBetween = s.angleBetween(x1, y1, x2, y2, x3, y3, x4, y4);

let lineNorm = s.line(x3, y3, x_inter, y_inter).attr({
    stroke: "black",
    strokeWidth: 1,
    strokeDasharray: "3 2"
});

lineNorm.transform(`r${90} ${x_inter} ${y_inter}`);

let lineRefl = s.line(x3, y3, x_inter, y_inter).attr({
    stroke: "maroon",
    strokeWidth: 1,
    opacity: 0
});

lineRefl.transform(`r${angleBetween} ${x_inter} ${y_inter}`);

let lineReflDash = s.line(x3, y3, x_inter, y_inter).attr({
    stroke: "black",
    strokeWidth: 1,
    strokeDasharray: "3 2"
});

var interLineCircle = s.circle(552.0186428350758, 86.34054833279761, 5).attr({
    fill: "maroon"
});

let lineReflShow = s.line(x_inter, y_inter, 552.0186428350758, 86.34054833279761).attr({
    stroke: "maroon",
    strokeWidth: 1
});

let lineCenter = s.line(originX, originY, originX, height).attr({
    stroke: "black",
    strokeWidth: 1,
    strokeDasharray: "3 2"
});

let linePointer = s.line(originX, originY - radius, originX, 0).attr({
    stroke: "black",
    strokeWidth: 1,
    strokeDasharray: "3 2"
});

circle_thumb.drag(function (dx, dy, x, y) {
    let mouse = s.getCursorPoint(x, y);
    let mouse_dx = mouse.x - originX;
    let mouse_dy = mouse.y - originY;

    let angle = Math.atan2(mouse_dy, mouse_dx) * 180 / Math.PI;
    let nextAngle = Math.round(angle / step) * step;

    let X = originX + Math.cos(nextAngle * Math.PI / 180) * radius;
    let Y = originY + Math.sin(nextAngle * Math.PI / 180) * radius;

    let angleShow = s.angle(X, Y, originX, originY);


    circle_thumb.attr({
        cx: X,
        cy: Y
    });

    x2 = X;
    y2 = Y;

    let m = s.equationLine(x1, y1, x2, y2).m;
    let b = s.equationLine(x1, y1, x2, y2).b;

    linePointer.attr({
        x1: X,
        y1: Y
    });

    if (isFinite(m) && angleShow < 180) {
        lineCenter.attr({
            x2: 0,
            y2: b
        });

        linePointer.attr({
            x2: width,
            y2: width * m + b
        });
    } else if (isFinite(m) && angleShow > 180) {
        lineCenter.attr({
            x2: width,
            y2: width * m + b
        });

        linePointer.attr({
            x2: 0,
            y2: b
        });
    } else if (angleShow === 180) {
        lineCenter.attr({
            x2: originX,
            y2: 0
        });

        linePointer.attr({
            x2: originX,
            y2: height
        });
    } else if (angleShow === 0) {
        lineCenter.attr({
            x2: originX,
            y2: height
        });

        linePointer.attr({
            x2: originX,
            y2: 0
        });
    }

    pointer_line.attr({
        x2: x2,
        y2: y2
    });


    let inter = s.intersection(x1, y1, x2, y2, x3, y3, x4, y4);
    intersection.attr({
        cx: inter.x,
        cy: inter.y
    });

    lineNorm.attr({
        x2: inter.x,
        y2: inter.y
    });

    lineNorm.transform(`r${90} ${inter.x} ${inter.y}`);


    angleBetween = s.angleBetween(x1, y1, x2, y2, x3, y3, x4, y4);

    lineRefl.attr({
        x2: inter.x,
        y2: inter.y
    });

    lineRefl.transform(`r${angleBetween} ${inter.x} ${inter.y}`);

    let coorlineRefl = lineRefl.getBBox();
    let lineE = s.equationLine(coorlineRefl.x, coorlineRefl.y, coorlineRefl.x2, coorlineRefl.y2);

    if (angleShow <= 50 || angleShow >= 330) {
        lineE = s.equationLine(coorlineRefl.x, coorlineRefl.y2, coorlineRefl.x2, coorlineRefl.y);
    }

    lineReflDash.attr({
        x1: 0,
        y1: lineE.b,
        x2: width,
        y2: width * lineE.m + lineE.b
    });

    let dotRefl = s.intersectionLineCircle(lineE.m, lineE.b, originX, originY, radius);
    if (angleShow >= 60 && angleShow < 320) {
        interLineCircle.attr({
            cx: dotRefl.x2,
            cy: dotRefl.y2
        });

        lineReflShow.attr({
            x1: inter.x,
            y1: inter.y,
            x2: dotRefl.x2,
            y2: dotRefl.y2
        });
    } else {
        interLineCircle.attr({
            cx: dotRefl.x1,
            cy: dotRefl.y1
        });

        lineReflShow.attr({
            x1: inter.x,
            y1: inter.y,
            x2: dotRefl.x1,
            y2: dotRefl.y1
        });
    }
});
