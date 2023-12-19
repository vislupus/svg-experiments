var width = 848;
var height = 480;

var s = new Snap("#svg").attr({
    viewBox: `0 0 ${width} ${height}`,
    preserveAspectRatio: 'xMaxYMax',
    width: width,
    height: height
});



let r = 5;
let pathArr = [];
let circleArr = [];
let pathString = '';
let pathShape = s.path(pathString).attr({
    fill: 'green',
    opacity: 0.2
});



let simple;
let centerSimple = s.circle(0, 0, r).attr({
    fill: "purple",
    display: "none"
}).insertAfter(pathShape);

let centroid;
let centerCentroid = s.circle(0, 0, r).attr({
    fill: "brown",
    display: "none"
}).insertAfter(pathShape);


let mouseCircle = s.circle(0, 0, r * 2).attr({
    fill: "gray"
}).insertAfter(pathShape);



for (let count = 0; count < 1000; count++) {
    let x = Math.random() * width;
    let y = Math.random() * height;

    let c = s.circle(x, y, r / 2).attr({
        fill: "silver"
    }).insertAfter(pathShape);

    circleArr.push(c);
}




s.mousedown(function (event, x, y) {
    let cpt = s.getCursorPoint(x, y);
    //    console.log(cpt.x, cpt.y)

    pathArr.push({
        x: cpt.x,
        y: cpt.y,
        shape: s.circle(cpt.x, cpt.y, r)
    });

    if (pathArr.length > 0) {
        pathArr[0].shape.attr({
            fill: 'blue'
        });
    }

    pathString = '';
    for (let i = 0; i < pathArr.length; i++) {
        let letter = 'L';
        if (i == 0) {
            letter = 'M';
        }

        pathString += `${letter}${pathArr[i].x},${pathArr[i].y}`;
    }

    if (pathArr.length > 2) {
        pathString += `Z`;
    }

    //    console.log(pathString)

    pathShape.attr({
        d: pathString
    });

    if (pathArr.length > 2) {
        for (c of circleArr) {
            let x = c.attr('cx');
            let y = c.attr('cy');

            if (Snap.path.isPointInside(pathString, x, y)) {
                c.attr({
                    fill: "coral"
                });
            } else {
                c.attr({
                    fill: "silver"
                });
            }
        }


        simple = s.centerSimple(pathArr);
        //        console.log(simple)
        centerSimple.attr({
            cx: simple.x,
            cy: simple.y,
            display: ""
        });

        centroid = s.computeCentroid(pathArr);
        //        console.log(centroid)
        centerCentroid.attr({
            cx: centroid.x,
            cy: centroid.y,
            display: ""
        });
    }


    
    

    let clipCircle = s.circle(width / 2, height / 2, 100).attr({
        fill: 'black'
    });

    //    pathShape.attr({
    //        clipPath: clipCircle
    //    });

    let clipPathShape = s.path(pathString).attr({
        fill: 'white'
    });

    let g = s.group(clipPathShape, clipCircle);
    pathShape.attr({
        mask: g
    });

    if (pathArr.length > 1) {
        s.selectAll('mask')[0].remove();
        //            s.selectAll('clipPath')[0].remove();
    }

//    s.path("M60,0L120,0L180,60L180,120L120,180L60,180L0,120L0,60Z M100,10L50,80L130,50Z")
});





s.mousemove(function (event, x, y) {
    let cpt = s.getCursorPoint(x, y);
    //    console.log(cpt.x, cpt.y)
    mouseCircle.attr({
        cx: cpt.x,
        cy: cpt.y
    });

    if (pathArr.length > 2 && s.pointInPolygon(pathArr, cpt.x, cpt.y)) {
        mouseCircle.attr({
            fill: "red"
        });
    } else {
        mouseCircle.attr({
            fill: "gray"
        });
    }
});
