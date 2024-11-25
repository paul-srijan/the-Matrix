
const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");
const panel = document.getElementById("customisation-panel");
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);
const fontSize = 16;
const columns = Math.floor(width / fontSize);
const drops = Array(columns).fill(1);

let characters = "0123456789ABCDEF";
let speed = 50;
let color = "#00ff00";

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const char = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);
        if (y > height || Math.random() > 0.95) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

function updateSettings() {
    const charInput = document.getElementById("characters");
    const speedInput = document.getElementById("speed");
    const colorInput = document.getElementById("color");

    characters = charInput.value || characters;
    speed = 101 - parseInt(speedInput.value || speed, 10);
    color = colorInput.value || color;
}

function interactiveRipple(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 100, 0, Math.PI * 2, false);
    ctx.fillStyle = "rgba(0, 255, 0, 0.2)";
    ctx.fill();

    setTimeout(() => {
        ctx.clearRect(mouseX - 100, mouseY - 100, 200, 200);
    }, 200);
}

function mouseEffect(event) {
    const x = Math.floor(event.clientX / fontSize);
    drops[x] = 0;
}

canvas.addEventListener("click", interactiveRipple);
canvas.addEventListener("mousemove", mouseEffect);
panel.addEventListener("input", updateSettings);

window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

setInterval(draw, speed);
