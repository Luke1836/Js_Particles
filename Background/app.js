const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = 'grey';
ctx.lineWidth = 2

//Resizing the canvas, making sure that the canvas width remains the same upon resizing
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

/*
                    ------------Adding Linear Gradients--------------

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'green');
    gradient.addColorStop(0.5, 'cyan');
    gradient.addColorStop(1, 'violet');
    ctx.fillStyle = gradient;

*/
class Particles 
{
    constructor(effect)
    {
        this.effect = effect;
        this.radius = Math.random() * 20 + 1;
        //To make sure that all the particles are clearly visible
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);   
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
        this.vx = Math.random() * 3 - 2;
        this.vy = Math.random() * 3 - 2;
    }

    draw(context)
    {
        context.fillStyle = 'cyan';
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        context.stroke();
    }

    update()
    {
        this.x += this.vx;
        if(this.x > this.effect.width + this.radius || this.x < this.radius)
            this.vx *= -1;
        this.y += this.vy;
        if(this.y > this.effect.height + this.radius || this.y < this.radius)
            this.vy *= -1;
    }
}

class Effects 
{
    constructor(canvas)
    {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = 150;
        this.createParticles();
    }

    createParticles()
    {
        for(let i = 0 ; i < this.numberOfParticles ; i++)
            this.particles.push(new Particles(this));
    }

    handleParticles(context)
    {
        this.particles.forEach(particle => {
            particle.draw(context);
            particle.update();
        });
    }
}

const effects = new Effects(canvas);

function animate()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effects.handleParticles(ctx);
    requestAnimationFrame(animate);
}
animate();