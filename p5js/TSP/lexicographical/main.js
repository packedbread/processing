let cities = [];
let cities_count = 10;

let path = []
let current_path_index = 0;
let total_path_count;

let width = 600;
let height = 600;

let city_size = 12;

let record_distance;
let best_path;
let distance_P;
let progress_P;

function factorial(n) {
    if (n == 0) {
        return 1;
    }
    return n * factorial(n - 1);
}

function setup() {
    createCanvas(width, height);

    for (let i = 0; i < cities_count; ++i) {
        let v = createVector(random(width), random(height))
        cities.push(v);
        path.push(i);
    }

    total_path_count = factorial(path.length);

    record_distance = path_distance(path);
    best_path = path.slice();
    distance_P = createP();
    progress_P = createP();
}

function draw() {
    background(0);

    stroke(64);
    draw_path(path);

    stroke(255, 0, 0);
    draw_path(best_path)

    let d = path_distance(path);
    if (d < record_distance) {
        record_distance = d;
        best_path = path.slice();
        distance_P.html(record_distance);
    }
    
    progress_P.html(`Processed 
    ${(100 * (current_path_index + 1) / total_path_count).toFixed(5)}%`)

    if (next_permutation(path)) {
        noLoop();
    }
    ++current_path_index;
}

function draw_path(path) {
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < path.length; ++i) {
        vertex(cities[path[i]].x, cities[path[i]].y);
    }
    endShape();

    fill(255);
    for (let i = 0; i < cities.length; ++i) {
        ellipse(cities[i].x, cities[i].y, city_size, city_size);
    }
}

function swap(arr, i, j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

function path_distance(path) {
    let sum = 0;
    for (let i = 1; i < path.length; ++i) {
        sum += dist(cities[path[i - 1]].x, cities[path[i - 1]].y, 
                    cities[path[i]].x, cities[path[i]].y);
    }
    return sum;
}

function next_permutation(perm) {
    let x = -1;
    for (let i = perm.length; i-- > 1;) {
        if (perm[i - 1] < perm[i]) {
            x = i - 1;
            break;
        }
    }

    if (x != -1) {
        let y = perm.length - 1;
        for (;; --y) {
            if (perm[x] < perm[y]) {
                break;
            }
        }

        swap(perm, x, y);
    }

    for (let i = 0; x + 1 + i < perm.length - 1 - i; ++i) {
        swap(perm, x + 1 + i, perm.length - 1 - i);
    }

    return x == -1;
}
