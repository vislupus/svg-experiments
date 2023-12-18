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
var step = 15;

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

var pointer_line_refl = s.line(x1, y1, x2, y2).attr({
    stroke: "brown",
    strokeWidth: 1
});


//var pointer_center = s.circle((originX+originX)/2, (originY+originY - radius)/2, 5).attr({
//    fill: "black"
//});

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
    strokeWidth: 1
});

var ver_line = s.line(originX, originY - radius, originX, originY + radius).attr({
    stroke: "black",
    strokeWidth: 1
});

let inter = s.intersection(x1, y1, x2, y2, x3, y3, x4, y4);
let x_inter = inter.x;
let y_inter = inter.y;

var intersection = s.circle(x_inter, y_inter, 5).attr({
    fill: "purple"
});

let angleBetween = s.angleBetween(x1, y1, x2, y2, x3, y3, x4, y4);

//console.log(angleBetween, 180 - angleBetween)

let lineInt = s.line(x_inter, 0, x_inter, height).attr({
    stroke: "black",
    strokeWidth: 1,
    strokeDasharray: "3 2"
});


let inter_hor = s.intersection(originX - radius, originY, originX + radius, originY, x3, y3, x4, y4);
let x_inter_hor = inter_hor.x;
let y_inter_hor = inter_hor.y;

//console.log(originX-(x_inter_hor-originX))

var intersection_hor = s.circle(x_inter_hor, y_inter_hor, 5).attr({
    fill: "green"
});

let angleBetween_hor = s.angleBetween(originX - radius, originY, originX + radius, originY, x3, y3, x4, y4);

var inter_hor_new = s.circle(originX - (x_inter_hor - originX), y_inter_hor, 5).attr({
    fill: "blue"
});

let line = s.equationLine(originX - (x_inter_hor - originX), originY, x_inter, y_inter);
let lineRefl = s.line(0, line.b, width, width * line.m + line.b).attr({
    stroke: "black",
    strokeWidth: 1,
    strokeDasharray: "3 2"
});

var inter_hor_refl = s.circle(x_inter - originX, y_inter_hor, 5).attr({
    fill: "gold"
});

let line_new;
let lineRefl_new = s.line(originX, originY, x_inter, y_inter).attr({
    stroke: "black",
    strokeWidth: 1,
    strokeDasharray: "3 2"
});

var refl_point = s.circle(originX, originY - radius, 5).attr({
    fill: "brown"
});

//var hor_line = s.line(x_inter, y_inter, originX+(x_inter_hor-originX), y_inter).attr({
//    stroke: "black",
//    strokeWidth: 1,
//    strokeDasharray: "5 2"
//});


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
    //console.log(angleShow)


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

    let X_refl = originX + Math.cos((270 - angleShow) * Math.PI / 180) * radius;
    let Y_refl = originY + Math.sin((270 - angleShow) * Math.PI / 180) * radius;

    pointer_line_refl.attr({
        x2: X_refl,
        y2: Y_refl
    });

    //    pointer_center.attr({
    //        cx: (originX+X)/2,
    //        cy: (originY+Y)/2
    //    });

    let inter = s.intersection(x1, y1, x2, y2, x3, y3, x4, y4);
    intersection.attr({
        cx: inter.x,
        cy: inter.y
    });

    lineInt.attr({
        x1: inter.x,
        x2: inter.x
    });

    inter_hor_new.attr({
        cx: inter.x - (x_inter_hor - inter.x),
        cy: y_inter_hor
    });

    line = s.equationLine(inter.x - (x_inter_hor - inter.x), originY, inter.x, inter.y);
    lineRefl.attr({
        y1: line.b,
        y2: width * line.m + line.b
    });

    if (angleShow > 180 && angleShow != 0) {
        inter_hor_refl.attr({
            cx: inter.x - Math.abs(inter.x - originX)
        });

        line_new = s.equationLine(inter.x - Math.abs(inter.x - originX), originY, inter.x, inter.y);
        lineRefl_new.attr({
            x1: inter.x - Math.abs(inter.x - originX),
            y1: originY,
            x2: width,
            y2: width * line_new.m + line_new.b
        });
        
        let new_points = s.intersectionLineCircle(line_new.m, line_new.b, originX, originY, radius);
        refl_point.attr({
            cx: new_points.x1,
            cy: new_points.y1
        });
    } else if (angleShow < 180 && angleShow != 0) {
        inter_hor_refl.attr({
            cx: inter.x + Math.abs(inter.x - originX)
        });

        line_new = s.equationLine(inter.x + Math.abs(inter.x - originX), originY, inter.x, inter.y);
        lineRefl_new.attr({
            x1: inter.x + Math.abs(inter.x - originX),
            y1: originY,
            x2: 0,
            y2: line_new.b
        });

        let new_points = s.intersectionLineCircle(line_new.m, line_new.b, originX, originY, radius);
        refl_point.attr({
            cx: new_points.x2,
            cy: new_points.y2
        });

    } else {
        lineRefl_new.attr({
            x1: originX,
            y1: originY,
            x2: inter.x,
            y2: inter.y
        });
    }



    //    console.log(Math.abs(inter.x - originX))

    angleBetween = s.angleBetween(x1, y1, x2, y2, x3, y3, x4, y4);
    //    console.log(angleBetween, 180 - angleBetween)


    //    mirror.transform(`r${angleShow} ${originX} ${originY}`);
});
