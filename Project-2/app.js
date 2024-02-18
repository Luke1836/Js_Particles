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
        this.size = Math.random() * 15 + 1;
        this.weight = Math.random() * 1 + 1;
        this.directionX = -5;
    }

    update() 
    {
        if(this.y > canvas.height)
        {
            this.y = 0;
            this.weight = Math.random() * 1 + 1;
            this.x = Math.random() * canvas.width * 1.5;
        }
        this.weight += 0.02;
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

function init() 
{
    for(let i = 0 ; i < 100 ; i++)
    {
        const x = Math.random() * canvas.width;
        particlesArray.push(new Particles(x, 0));
    }
}
init();

function animate() 
{
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for(let i = 0 ; i < particlesArray.length ; i++)
    {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}
animate();
