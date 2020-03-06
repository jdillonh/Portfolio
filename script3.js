
class Part {
    constructor (i, r) {
	this.x = Math.random()*width
	this.y = Math.random()*height
	this.r = r
	this.c = Math.random()*255
	this.ind = i
    }

    update (x, y) {
	let desx = x 
	let desy = y
	let dx = -this.x + desx
	let dy = -this.y + desy
	let invspd = 10
	this.x += dx/invspd
	this.y += dy/invspd
    }

    draw () {
	fill(this.c)
	circle(this.x, this.y, this.r)
    }
}

var parts = []
var invrotspd = 20
function setup () {
    noStroke()
    background("#FFF7E2")
    let c = createCanvas()
    c.parent("canvas-container")
    resizeCanvas(windowWidth, windowHeight)
    for( let i = 0; i < 10; i++ ) {
	parts.push(new Part(i, 50));
    }
}


function draw () {
    let d = Math.abs(dist(mouseX, mouseY, parts[0].x, parts[0].y))
    d = max(0, d-100)
    d = d / 100
    invrotspd = Math.abs(lerp(100, 20, d))
    for( let i = 0; i < parts.length; i++ ) {
	let r = 100
	let a = 2*3.14*i/parts.length + frameCount/invrotspd
	let desx = r * cos(a)
	let desy = r * sin(a)

	parts[i].update(mouseX + desx, mouseY + desy)
    }
    for( let i = 0; i < parts.length; i++ ) {
	parts[i].draw()
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
