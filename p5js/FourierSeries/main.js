const width = 800;
const height = 800;

const radius = 150;
const max_wave_length = 750;
const angle_step = 0.03;

let wave = [];
let angle = 0;

let slider;

function setup() {
    createCanvas(2 * width, height);

    slider = createSlider(1, 64, 5);
}

function draw() {
    background(0);
    noFill();
    translate(width / 2, height / 2);

    let x = 0;
    let y = 0;
    for (let i = 0; i < slider.value(); ++i) {
        let px = x;
        let py = y;
        
        let n = get_n(i);
        let v = nth_wave(n, angle);
        x += radius * v.x;
        y += radius * v.y;

        stroke(255);
        line(px, py, x, y);
        stroke(255, 128);
        ellipse(px, py, 2 * radius * v.r);
    }
    wave.unshift(y);
    if (wave.length > max_wave_length) {
        wave.pop();
    }

    stroke(255, 128);
    line(x, y, width / 2, y);

    stroke(255);
    beginShape();
    for (let i = 0; i < wave.length; ++i) {
        vertex(width / 2 + i, wave[i])
    }
    endShape();

    angle -= angle_step;
}

// saw
// function get_n(iteration) {
//     return iteration + 1;
// }

// function nth_wave(n, theta) {
//     let r = 2 / (n * PI) * (n % 2 === 1 ? -1 : 1);
//     return { x: r * cos(n * theta), y: r * sin(n * theta), r: r };
// }


// square
function get_n(iteration) {
    return 2 * iteration + 1;
}

function nth_wave(n, theta) {
    let r = 4 / (n * PI);
    return { x: r * cos(n * theta), y: r * sin(n * theta), r: r };
}
