const width = 800;
const height = 800;

const axiom = "F";
const rules = [
     { from: "F", to: "FF+[+F-F-F]-[-F+F+F]" }, // bush-tree - angle = 25 degrees, scale = 0.5
    //{ from: "F", to: "F+F-F-F+F" } // koch curve - angle = 90 degrees, scale = 1 / 3
];

class LSystem {
    constructor(axiom, rules) {
        this.axiom = axiom;
        this.rules = rules;
        this.state = this.axiom.slice();
    }

    next() {
        let next_state = ''
        for (let i = 0; i < this.state.length; ++i) {
            let matched = false;
            for (let j = 0; j < this.rules.length; ++j) {
                if (this.rules[j].from == this.state.charAt(i)) {
                    next_state += this.rules[j].to;
                    matched = true;
                    break;
                }
            }
            if (!matched) {
                next_state += this.state.charAt(i);
            }
        }
        this.state = next_state;
    }
}

let system = new LSystem(axiom, rules);

let button;

let angle = 0;
let line_length = 0;
let scale = 0;

function setup() {
    createCanvas(width, height);

    button = createButton('Next Generation');
    button.mousePressed(update_generation);

    angle = radians(25);
    line_length = 200;
    scale = 0.5;

    noLoop();
}

function draw() {
    background(255);
    translate(width / 2, height);
    
    stroke(0, 128, 0);
    turtle();
}

function update_generation() {
    line_length *= scale;
    system.next();
    redraw();
}

function turtle() {
    for (let i = 0; i < system.state.length; ++i) {
        let c = system.state.charAt(i);
        
        if (c == 'F') {
            line(0, 0, 0, -line_length);
            translate(0, -line_length);
        } else if (c == '+') {
            rotate(angle);
        } else if (c == '-') {
            rotate(-angle);
        } else if (c == '[') {
            push();
        } else if (c == ']') {
            pop();
        }
    }
}
