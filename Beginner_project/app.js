const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
let hue = 0;

//For storing eaach particle objects.
const particlesArray = [];

window.addEventListener('resize', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});

const mouse = {
    x: undefined,
    y: undefined,
};

canvas.addEventListener('click', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i = 0 ; i < 10 ; i++)
    {
        particlesArray.push(new Particles());
    }
});

canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i = 0 ; i < 20 ; i++)
    {
        particlesArray.push(new Particles());
    }
});

//Building the class for animation
class Particles {

    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 10 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if(this.size > 0.2)
            this.size -= 0.1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleParticles() {
    for(let i = 0 ; i < particlesArray.length ; i++)
    {
        particlesArray[i].update();
        particlesArray[i].draw();
        if(particlesArray[i].size <= 0.2)
        {
            particlesArray.splice(i, 1);     //Removing one element from the ith index
            i--; 
        }  
    }
}

//Function which initializes the animations on the canvas
function animate() {
    /* ctx.clearRect(0, 0, canvas.width, canvas.height); */
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    hue+=5;
    handleParticles();
    requestAnimationFrame(animate);
}
animate();