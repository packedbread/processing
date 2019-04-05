let x = 0.01;
let y = 0;
let z = 0;

let hue = 0;

let alpha = 0;

let points = [];


const dt = 0.01;

const sigma = 10;
const rho = 28;
const beta = 8 / 3;

const width = 800;
const height = 800;

let empty;

function setup() {
    createCanvas(width, height, WEBGL);
    colorMode(HSB);
}

function draw() {
    background(0);
    scale(7);
    alpha += 0.01;
    rotateY(alpha);

    let dx = (sigma * (y - x)) * dt;
    let dy = (x * (rho - z) - y) * dt;
    let dz = (x * y - beta * z) * dt;

    x += dx;
    y += dy;
    z += dz;

    hue = (hue + 1) % 256;

    points.push(createVector(x, y, z));
    stroke(hue, 255, 255);
    noFill();
    beginShape();
    for (let i = 0; i < points.length; ++i) {
        vertex(points[i].x, points[i].y, points[i].z);
    }
    endShape();
}