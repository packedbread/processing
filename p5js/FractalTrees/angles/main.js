const width = 800;
const height = 800;


const length_factor = 0.7;
const length = 200;
let angle;
const min_length = 2;


let slider;

function setup() {
    createCanvas(width, height);
    slider = createSlider(0, PI / 2, PI / 4, 0.01);
    slider.elt.addEventListener('input', slider_update);
    angle = slider.value();
}

function slider_update(e) {
    angle = slider.value();
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
    return 10 / d;
}

function branch(length, depth) {
    if (length > min_length) {
        push();

        strokeWeight(weight_mapping(depth));
        line(0, 0, 0, -length);
        translate(0, -length);
        
        rotate(angle);
        branch(length * length_factor, depth + 1);
        rotate(-2 * angle);
        branch(length * length_factor, depth + 1);

        pop();
    }
}