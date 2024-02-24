const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
    }
}


class Effect
{
    constructor(canvas, context)
    {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = 300;
        this.createParticles();

        this.mouse = 
        {
            x: 0,
            y: 0,
            pressed: false,
            radius: 250,
        };

        window.addEventListener('resize', e => {
            this.resize(e.target.window.innerWidth, e.target.window.innerHeight, context);
        });

        window.addEventListener('mousemove', e => {
            if(this.mouse.pressed)
            {
                this.mouse.x = e.x;
                this.mouse.y = e.y;
            }
        });

        window.addEventListener('mousedown', e=> {
            this.mouse.pressed = true;
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });

        window.addEventListener('mouseup', e => {
            this.mouse.pressed = false;
        });
    }

    createParticles()
    {
        for(let i = 0 ; i < this.particles.length ; i++)
            this.particles.push(new Particles(this));
    }

    handleParticles()
    {

    }

}