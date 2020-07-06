let uniformsShader;
let smoothX = 0.5;
let smoothY = 0.5;
let dY = 0.0;
let lastY = 0;

function preload(){
    uniformsShader = loadShader('assets/vert.glsl', 'assets/frag.glsl');
}

function setup() {
    let canv = createCanvas(windowWidth, windowHeight, WEBGL);
    canv.parent = "canvas-container";
    noStroke();
    smoothX = mouseX/width;
    smoothY = mouseY/height;

}

function draw() {  
    shader(uniformsShader);
    let v = 0.05
    dY = abs(lastY - mouseY);
    lastY = mouseY;
    smoothX = lerp(smoothX, mouseX/width, v);
    smoothY = lerp(smoothY, mouseY/height, v);
    uniformsShader.setUniform('dY', dY);
    uniformsShader.setUniform('time', frameCount);
    uniformsShader.setUniform('ar', width/height);
    uniformsShader.setUniform('mouseX', smoothX);
    uniformsShader.setUniform('mouseY', smoothY);

    rect(0,0,width, height);
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

function lerp(v0, v1, t) {
    return v0*(1-t)+v1*t
}
