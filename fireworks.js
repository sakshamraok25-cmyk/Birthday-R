const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

class Firework {
    constructor() {
        this.x = random(0, canvas.width);
        this.y = canvas.height;
        this.targetY = random(100, 300);
        this.color = `hsl(${random(0,360)},100%,60%)`;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.y -= 4;
        if (this.y <= this.targetY) {
            explode(this.x, this.y, this.color);
            return true;
        }
        this.draw();
        return false;
    }
}

function explode(x, y, color) {
    for (let i = 0; i < 30; i++) {
        ctx.beginPath();
        ctx.arc(x + random(-50,50), y + random(-50,50), 2, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    }
}

let fireworks = [];

setInterval(() => {
    fireworks.push(new Firework());
}, 700);

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    fireworks = fireworks.filter(f => !f.update());
    requestAnimationFrame(animate);
}

animate();