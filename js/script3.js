var lastPcent = 0;
var pcent = 0;
function setup () {
    background("#FFF7E2")
    let c = createCanvas()
    c.parent("canvas-container")
    resizeCanvas(windowWidth, windowHeight)
    fill('grey');
    stroke('white');
    strokeWeight(10);
    pcent = 3;
    draw();
}


function draw () {
    let newPcent = lerp(lastPcent, pcent, 0.05);
    lastPcent = newPcent;
    if ( pcent == undefined ) pcent = 0;
    if ( Math.abs( newPcent - pcent ) < 2 ) {
	return;
    }
    background("#EEE")
    let numThingys = 5 
    let stepx = width/(numThingys+1)
    let stepy = height/(numThingys+1)
    let centerX = width/2
    let centerY = height/2
    for( let x = 0; x < numThingys; x++) {
	for( let y = 0; y < numThingys; y++) {
	    let ax = stepx*(x+1)
	    let ay = stepy*(y+1)
	    let d = Math.sqrt(Math.pow(ax - centerX, 2) + Math.pow(ay - centerY, 2))
	    let angle = Math.atan2(centerY - ay, centerX - ax) ;
	    let r =  Math.sin(d/100 + angle+newPcent/20) * 60;
	    r = Math.max( r, 10);
	    r = Math.min(r, 55);
	    circle(ax, ay, r);
	}
    }
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

window.onscroll = (e) => {
    pcent = getScrollPercent();
    draw();
}

function getScrollPercent() {
    /*
      https://stackoverflow.com/questions/2387136/cross-browser-method-to-determine-vertical-scroll-percentage-in-javascript
    */
    var h = document.documentElement, 
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
}

function lerp(v0, v1, t) {
    return v0*(1-t)+v1*t
}
