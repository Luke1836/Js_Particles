const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];

class Particles 
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.size = 10;
        this.weight = 3;
        this.directionX = -10;
    }

    update() 
    {
        if(this.y > canvas.height)
        {
            this.y = 0;
            this.weight = 2;
            this.x = Math.random() * canvas.width;
        }
        this.weight += 0.10;
        this.y += this.weight;
        this.x += this.directionX;
    }

    draw() 
    {
        ctx.fillStyle = 'purple';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

const particle1 = new Particles(100,0);

function animate() 
{
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particle1.update();
    particle1.draw();
    ctx.fill();
    requestAnimationFrame(animate);
}
animate();
