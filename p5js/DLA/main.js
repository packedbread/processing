const width = 800;
const height = 800;

let tree = []
let diameter = 4;

let walkers = [];
const walkers_count = 8196;
const max_retries = 10;
const walker_step = 1;
const walker_iterations = 10;

function setup() {
    createCanvas(2 * width, height);

    tree.push(createVector(width / 2, height / 2));
    
    addWalkers();
}

function draw() {
    background(0);

    for (let i = 0; i < walker_iterations; ++i) {
        update_walkers();
    }

    render_tree();

    translate(width, 0);
    render_walkers();
}

function check_position(vector) {
    for (let i = 0; i < tree.length; ++i) {
        let v = p5.Vector.sub(vector, tree[i]);
        if (v.magSq() < diameter * diameter) {
            return true;
        }
    }
    return false;
}

function update_walkers() {
    //addWalkers();

    for (let i = 0; i < walkers.length;) {
        let velocity = p5.Vector.random2D();
        velocity.mult(walker_step);
        walkers[i].add(velocity);
        walkers[i].x = constrain(walkers[i].x, 0, width);
        walkers[i].y = constrain(walkers[i].y, 0, height);
        if (check_position(walkers[i])) {
            tree.push(walkers[i]);
            walkers[i] = walkers[walkers.length - 1];
            walkers.pop();
        } else {
            ++i;
        }
    }
}

function addWalkers() {
    let retries = 0;
    while (walkers.length < walkers_count && retries < max_retries) {
        let walker = createVector(random(width), random(height));
        if (check_position(walker)) {
            ++retries;
        } else {
            walkers.push(walker);
        }
    }
    if (retries == max_retries) {
        console.log("Exceeded retry limit for adding new walkers!");
    }
}

function render_tree() {
    strokeWeight(diameter);
    stroke(255, 0, 0, 128);
    for (let i = 0; i < tree.length; ++i) {
        point(tree[i].x, tree[i].y);
    }
}

function render_walkers() {
    strokeWeight(diameter);
    stroke(255, 128);
    for (let i = 0; i < walkers.length; ++i) {
        point(walkers[i].x, walkers[i].y);
    } 
}
