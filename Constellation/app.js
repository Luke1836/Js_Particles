const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = 'white';
ctx.lineWidth = 2;

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
        this.numberOfParticles = 300;
        this.createParticles();
    }

    createParticles()
    {
        for(let i = 0 ; i < this.numberOfParticles ; i++)
            this.particles.push(new Particles(this));
    }

    handleParticles(context)
    {
        this.connectParticles(context);
        this.particles.forEach(particle => {
            particle.draw(context);
            particle.update();
        });
    }

    connectParticles(context)
    {
        const maxDistance = 100;
        for(let i = 0 ; i < this.particles.length ; i++)
        {   for(let j = i ; j < this.particles.length ; j++)
            {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const dist = Math.hypot(dx, dy);
                if(dist < maxDistance)
                {
                    const opacity = 1 - (dist/maxDistance);     //When the particles are close the lines become transparent and when they are farther the opacity decreases and they become even more clearer
                    context.globalAlpha = opacity;
                    context.beginPath();
                    context.moveTo(this.particles[i].x, this.particles[i].y);
                    context.lineTo(this.particles[j].x, this.particles[j].y);
                    context.stroke();
                }
            }

        }
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