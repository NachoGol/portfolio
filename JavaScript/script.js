// Fondo animado con partículas interconectadas
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// Crea partículas
function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 120; i++) {
    let size = Math.random() * 3 + 1;
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let dx = (Math.random() - 0.5) * 2;
    let dy = (Math.random() - 0.5) * 2;
    particlesArray.push({ x, y, dx, dy, size });
    }
}

// Dibuja partículas
function drawParticles(p) {
    ctx.beginPath();
  ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "#00d4ff";
    ctx.fill();
}

// Actualiza partículas
function updateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
    let p = particlesArray[i];
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

    drawParticles(p);

    // Conexiones entre partículas
    for (let j = i; j < particlesArray.length; j++) {
        let p2 = particlesArray[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(0, 212, 255, 0.1)";
        ctx.lineWidth = 1;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
        }
    }
    }
}

function animate() {
    updateParticles();
    requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

initParticles();
animate();
