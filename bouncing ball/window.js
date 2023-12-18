window.addEventListener('resize', resize)
resize();

function resize() {
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    //console.log(screenWidth, screenHeight)

    let el = document.querySelector('#wrap');
    el.style.transform = `scale(1)`;

    let elementHeight = el.getBoundingClientRect().height;
    let elementWidth = el.getBoundingClientRect().width;
    //console.log(elementWidth, elementHeight)

    let scaleWidth = screenWidth / elementWidth;
    let scaleHeight = screenHeight / elementHeight;
//    console.log(scaleWidth, scaleHeight)

    if (scaleWidth < scaleHeight) {
        el.style.transform = `scale(${scaleWidth})`;
    } else {
        el.style.transform = `scale(${scaleHeight})`;
    }
}
