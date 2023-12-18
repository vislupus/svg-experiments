var width = 848;
var height = 480;

var s = new Snap("#svg").attr({
    viewBox: `0 0 ${width} ${height}`,
    preserveAspectRatio: 'xMaxYMax',
    width: width,
    height: height
});


let path = [];
let pathBalls = [];
let r = 20;
let collision = false;
let n = 0;
let pos = createVector(10, 10);
let vel = createVector(3, 5);

let shape = s.path("M406,43L578,102L627,196L563,342L402,380L255,254L226,128Z").attr({
    fill: "green",
    opacity: 0.5
});

let ball = s.circle(pos.x, pos.y, r).attr({
    fill: "purple"
});

let totalLength = shape.getTotalLength();
let shapeArr = Snap.parsePathString(shape);


//for (let i = 0; i < shapeArr.length - 1; i++) {
//    let normal_line;
//
//    if (i === shapeArr.length - 2) {
//        normal_line = s.normalLine(shapeArr[i][1], shapeArr[i][2], shapeArr[0][1], shapeArr[0][2])
//    } else {
//        normal_line = s.normalLine(shapeArr[i][1], shapeArr[i][2], shapeArr[i + 1][1], shapeArr[i + 1][2])
//    }
//
//    s.circle(normal_line.x_middle, normal_line.y_middle, r / 4).attr({
//        fill: "black"
//    });
//
//    s.line(normal_line.x_middle, normal_line.y_middle, normal_line.x_out, normal_line.y_out).attr({
//        stroke: "black"
//    });
//
//
//
//    s.line(shapeArr[i][1], shapeArr[i][2] - 50, normal_line.x_middle, normal_line.y_middle).attr({
//        stroke: "red"
//    });
//
//    let v1 = createVector((normal_line.x_middle - shapeArr[i][1]), (normal_line.y_middle - shapeArr[i][2] + 50));
//    let n = createVector((normal_line.x_out - normal_line.x_middle), (normal_line.y_out - normal_line.y_middle));
//    let v = v1.copy();
//
//    let refl = v.reflect(n);
//
//    s.line(normal_line.x_middle, normal_line.y_middle, (normal_line.x_middle + refl.x), (normal_line.y_middle + refl.y)).attr({
//        stroke: "blue"
//    });
//}

let draw = setInterval(function () {
        n++;
        update();
        edges();
        paths();

        ball.attr({
            cx: pos.x,
            cy: pos.y
        });



        if (path.length > 100) {
            path.splice(0, 1);
            pathBalls.shift().remove();
        }

        pathBalls.push(s.circle(path.at(-1).x, path.at(-1).y, 2).attr({
            fill: "black",
            opacity: 0.5
        }));




        if (Snap.path.isPointInside(shape, pos.x, pos.y)) {
            if (!collision) {
                s.circle(pos.x, pos.y, 2).attr({
                    fill: "black"
                });

                collision = true;

//                let minDot, maxDot;
//                let minCross;
//                let dot, cross;
                let x1, y1, x2, y2;
                let data = [];

                let inter;
                let posX = pos.x;
                let posY = pos.y;
                let velX = vel.x;
                let velY = vel.y;
                let oldPosX = posX - velX * 7;
                let oldPosY = posY - velY * 7;


                for (let i = 0; i < shapeArr.length - 1; i++) {
                    if (i === shapeArr.length - 2) {
                        x1 = shapeArr[i][1];
                        y1 = shapeArr[i][2];
                        x2 = shapeArr[0][1];
                        y2 = shapeArr[0][2];

//                        dot = createVector(pos.x, pos.y).dot(createVector((x2 - x1), (y2 - y1)));
//                        cross = createVector(pos.x, pos.y).cross(createVector((x2 - x1), (y2 - y1)));

                        inter = s.intersection(oldPosX, oldPosY, posX, posY, x1, y1, x2, y2);

                        data.push({
                            x1: x1,
                            y1: y1,
                            x2: x2,
                            y2: y2,
//                            dot: dot,
//                            cross: cross,
                            inter:inter
                        });
                    } else {
                        x1 = shapeArr[i][1];
                        y1 = shapeArr[i][2];
                        x2 = shapeArr[i + 1][1];
                        y2 = shapeArr[i + 1][2];

//                        dot = createVector(pos.x, pos.y).dot(createVector((x2 - x1), (y2 - y1)));
//                        cross = createVector(pos.x, pos.y).cross(createVector((x2 - x1), (y2 - y1)));

                        inter = s.intersection(oldPosX, oldPosY, posX, posY, x1, y1, x2, y2);
   
                        data.push({
                            x1: x1,
                            y1: y1,
                            x2: x2,
                            y2: y2,
//                            dot: dot,
//                            cross: cross,
                            inter:inter
                        });
                    }

//                    if (minDot === undefined) {
//                        minDot = dot;
//                    } else if (minDot > dot) {
//                        minDot = dot;
//                    }
//
//                    if (maxDot === undefined) {
//                        maxDot = dot;
//                    } else if (maxDot < dot) {
//                        maxDot = dot;
//                    }
//
//
//                    if (minCross === undefined) {
//                        minCross = cross;
//                    } else if (cross > 0 && cross <= Math.abs(minCross)) {
//                        minCross = cross;
//                    } else if (cross < 0 && -cross <= Math.abs(minCross)) {
//                        minCross = cross;
//                    } else if (cross === 0) {
//                        minCross = cross;
//                    }
                }


                for (let d of data) {
                     if ((d.inter.x + 5.7 > posX && d.inter.x - 5.7 < posX) && (d.inter.y + 5.7 > posY && d.inter.y - 5.7 < posY)) {
                         s.line(d.x1, d.y1, d.x2, d.y2).attr({
                            stroke: "navy",
                            strokeWidth: 2
                        });

                        let normal_line = s.normalLine(d.x1, d.y1, d.x2, d.y2, pos.x, pos.y)

                        s.line(pos.x, pos.y, normal_line.x_out, normal_line.y_out).attr({
                            stroke: "black",
                            strokeWidth: 1,
                            strokeDasharray: "5 3"
                        });


                        let n = createVector((normal_line.x_out - normal_line.x_in), (normal_line.y_out - normal_line.y_in));
                        let v = vel.copy();
                        let refl = v.reflect(n);

                        vel.x = refl.x;
                        vel.y = refl.y;
                    }
//                    if ((d.dot === minDot || d.dot === maxDot) && d.cross === minCross) {
//                        s.line(d.x1, d.y1, d.x2, d.y2).attr({
//                            stroke: "navy",
//                            strokeWidth: 2
//                        });
//
//                        let normal_line = s.normalLine(d.x1, d.y1, d.x2, d.y2, pos.x, pos.y)
//
//                        s.line(pos.x, pos.y, normal_line.x_out, normal_line.y_out).attr({
//                            stroke: "black",
//                            strokeWidth: 1,
//                            strokeDasharray: "5 3"
//                        });
//
//
//                        let n = createVector((normal_line.x_out - pos.x), (normal_line.y_out - pos.y));
//                        let v = vel.copy();
//                        let refl = v.reflect(n);
//
//                        vel.x = refl.x;
//                        vel.y = refl.y;
//                    }
                }
            }
        } else {
            collision = false;
        }



//        if (n === 3350) {
//            clearInterval(draw);
//        }
    },
    20);




function edges() {
    if (pos.x <= r || pos.x >= width - r) {
        vel.x = -vel.x;
    }

    if (pos.x > width - r) {
        pos.x = width - r;
    }

    if (pos.x < r) {
        pos.x = r;
    }


    if (pos.y <= r || pos.y >= height - r) {
        vel.y = -vel.y;
    }

    if (pos.y > height - r) {
        pos.y = height - r;
    }

    if (pos.y < r) {
        pos.y = r;
    }
}

function update() {
    pos.add(vel);
}

function paths() {
    path.push({
        x: pos.x,
        y: pos.y
    });
}
