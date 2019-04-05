let cities = [];
let cities_count = 10;

let population = [];
let population_size = 100;
let display_population_root = 4;
let distances = [];


let fitness = [];
let fitness_prefix_sums = [];
let mutation_probability = 0.1;
let mutation_reduction = 0.999;


let width = 800;
let height = 800;

let city_size = 12;

let best_distance = 1e100;
let best_path = [];
let distance_P;
let mutation_probability_P;


function factorial(n) {
    if (n == 0) {
        return 1;
    }
    return n * factorial(n - 1);
}

function setup() {
    createCanvas(2 * width, height);

    let path = [];
    for (let i = 0; i < cities_count; ++i) {
        let v = createVector(random(width), random(height))
        cities.push(v);
        path.push(i);
    }

    for (let i = 0; i < 2 * population_size; ++i) {
        population.push(shuffle(path));
        distances.push(path_distance(population[i]));
        fitness.push(1);
        fitness_prefix_sums.push(0);
    }

    distance_P = createP();
    mutation_probability_P = createP();
}

function draw() {
    background(0);

    push();
    stroke(255, 0, 0);
    scale(1 / display_population_root, 1 / display_population_root);
    for (let i = 0; i < display_population_root; ++i) {
        push();
        for (let j = 0; j < display_population_root; ++j) {
            draw_path(population[i * display_population_root + j]);
            translate(width, 0);
        }
        pop();
        translate(0, height);
    }
    pop();
    
    stroke(255);
    line(width, 0, width, height);
    translate(width, 0);
    
    for (let i = 0; i < population.length; ++i) {
        distances[i] = path_distance(population[i]);
        if (distances[i] < best_distance) {
            best_distance = distances[i];
            best_path = population[i].slice();
            distance_P.html(`Best path length = ${best_distance.toFixed(5)}`);
        }
    }

    calculate_fitness();
    population = next_generation();
    mutate_population();

    stroke(0, 128, 0);
    draw_path(best_path);
    mutation_probability_P.html(`Mutation probability = ${mutation_probability.toFixed(7)}`)
}

function calculate_fitness() {
    let sum = 0;
    for (let i = 0; i < population.length; ++i) {
        fitness[i] = f(distances[i]);
        console.log(fitness[i]);
        sum += fitness[i];
    }
    for (let i = 0; i < fitness.length; ++i) {
        fitness[i] /= sum;
    }
    for (let i = 1; i < fitness.length; ++i) {
        fitness_prefix_sums[i] = fitness_prefix_sums[i - 1] + fitness[i - 1];
    }
}

function f(x) {
    return 1 / Math.pow(x + 1, 1 / 2);
}

function next_generation() {
    let generation = [];
    for (let i = 0; i < population_size; ++i) {
        generation[i] = pick_one();
    }
    return generation;
}

function pick_one() {
    let r = random();
    let L = 0;
    let R = population.length;
    while (R - L > 1) {
        let m = L + (R - L) / 2;
        if (fitness_prefix_sums[m] < r) {
            L = m;
        } else {
            R = m;
        }
    }
    return population[L].slice();
}

function mutate_population() {
    for (let i = 0; i < population_size; ++i) {
        let p = mutation_probability;
        let pop = population[i].slice();
        while (random() < p) {
            let s = floor(random() * pop.length);
            let t = floor(random() * pop.length);
            swap(pop, s, t);
            p *= mutation_probability;
        }
        population.push(pop);
    }
    
    mutation_probability *= mutation_reduction;
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
