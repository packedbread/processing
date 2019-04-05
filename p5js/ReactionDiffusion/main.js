const width = 200;
const height = 200;

let grid = [];
let next = [];

const diff_a = 1;
const diff_b = 0.3;

// default
const feed = 0.055;
const kill = 0.062;

// mitosis
// const feed = 0.0367;
// const kill = 0.0649;


const dt = 1;
const w = [
    [ 0.05, 0.2, 0.05 ],
    [  0.2,  -1,  0.2 ],
    [ 0.05, 0.2, 0.05 ]
];

const iterations_per_draw = 10;


function setup() {
    createCanvas(width, height);
    pixelDensity(1);

    for (let x = 0; x < width; ++x) {
        grid.push([]);
        next.push([]);
        for (let y = 0; y < height; ++y) {
            grid[x].push({ a: 1, b: 0 });
            next[x].push({ a: 0, b: 0 });
        }
    }

    for (let x = width / 2 - 5; x < width / 2 + 5; ++x) {
        for (let y = height / 2 - 5; y < height / 2 + 5; ++y) {
            grid[x][y].b = 1;
        }
    }
}

function mouseDragged() {
    grid[floor(mouseX)][floor(mouseY)].b = 1;
}

function draw() {
    background(255);

    for (let i = 0; i < iterations_per_draw; ++i) {
        iteration();
    }

    draw_pixels();
}

function iteration() {
    for (let x = 1; x + 1 < width; ++x) {
        for (let y = 1; y + 1 < height; ++y) {
            let a = grid[x][y].a;
            let b = grid[x][y].b;
            let l = laplacian(x, y);
            next[x][y].a = a + (diff_a * l.a - a * b * b + feed * (1 - a)) * dt;
            next[x][y].b = b + (diff_b * l.b + a * b * b - (kill + feed) * b) * dt;
        }
    }
    [grid, next] = [next, grid];
}

function draw_pixels() {
    loadPixels();
    for (let x = 0; x < width; ++x) {
        for (let y = 0; y < height; ++y) {
            let p = (x + y * width) * 4;
            let a = floor(grid[x][y].a * 255);
            let b = floor(grid[x][y].b * 255);
            let c = constrain(a - b, 0, 255)
            pixels[p + 0] = c;
            pixels[p + 1] = c;
            pixels[p + 2] = c;
            pixels[p + 3] = 255;
        }
    }
    updatePixels();
}

function laplacian(x, y)  {
    let sum = { a: 0, b: 0 };

    let half = floor(w.length / 2);
    x -= half;
    y -= half;
    for (let i = 0; i < w.length; ++i) {
        for (let j = 0; j < w[i].length; ++j) {
            sum.a += w[i][j] * grid[x + i][y + j].a;
            sum.b += w[i][j] * grid[x + i][y + j].b;
        }
    }

    return sum;
}
