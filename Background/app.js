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

class Particles 
{
    constructor(effect)
    {
        this.effect = effect;
        this.radius = 15;
        //To make sure that all the particles are clearly visible
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);   
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
    }

    draw(context)
    {
        context.fillStyle = 'cyan';
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        context.stroke();
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
        this.numberOfParticles = 120;
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
        });
    }
}

const effects = new Effects(canvas);
effects.handleParticles(ctx);