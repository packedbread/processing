const width = 800;
const height = 800;


const length_factor = 0.7;
const length = 200;
let branching_factor = 2;
const min_length = 4;


let slider;

function setup() {
    createCanvas(width, height);
    slider = createSlider(2, 10, 2, 1);
    slider.elt.addEventListener('input', slider_update);
}

function slider_update(e) {
    branching_factor = slider.value();
    redraw();
}

function draw() {
    background(255);
    translate(width / 2, height);

    branching_factor = slider.value();

    stroke(0, 64, 0);
    branch(length, 1);
    
    noLoop();
}

function weight_mapping(d) {
    return 5 / d;
}

function branch(length, depth) {
    strokeWeight(weight_mapping(depth));
    line(0, 0, 0, -length);
    push();
    
    translate(0, -length);
    rotate(PI / 2 - PI / (branching_factor * 2));
    
    if (length > min_length) {
        for (let i = 1; i <= branching_factor; ++i) {
            branch(length * length_factor, depth + 1);
            rotate(-PI / branching_factor);
        }
    }
    
    pop();
}