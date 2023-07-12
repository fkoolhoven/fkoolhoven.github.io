// EVENT LISTENER
document.body.addEventListener("keydown", (ev) => 
{
	if (ev.key == 'a')
	{
		console.log("great work you pressed A");
		let audio = new Audio("audio/a.wav");
		audio.play();
		noiseSeed(random(0, 10));
	}
});

// GLOBAL VARIABLES
let		particles = [];
const	number_of_particles = 3000;
const	noiseScale = 0.007;
let		speed = 1.2;
let		color1;
let		color2;
let		color3;
let		color4;

// CODE FOR FLOW FIELD VISUALS
function setup()
{
	const canvas = createCanvas(window.innerWidth, window.innerHeight);

	canvas.parent("container_test");
	for(let i = 0; i < number_of_particles; i++) 
		particles.push(createVector(random(width), random(height)));
	strokeWeight(1);
	color1 = 255;
	color2 = color(173, 255, 47);
	color3 = color(248, 51, 60); 
	color4 = color(43, 158, 179);
	clear();
}

function get_color(i)
{
	if (i % 5 == 0)
		return (color1);
	else if (i % 3 == 0)
		return (color2);
	else if (i % 2 == 0)
		return (color3);
	else
		return (color4);
}

function draw()
{
	background(0, 10);
	for(let i = 0; i < number_of_particles; i++) 
	{
		stroke(get_color(i));
		let particle = particles[i];
		point(particle.x, particle.y);
		let noise_value = noise(particle.x * noiseScale, particle.y * noiseScale, frameCount * noiseScale * noiseScale);
		let angle = TAU * noise_value;
		particle.x += cos(angle) * speed;
		particle.y += sin(angle) * speed;
		if(!particle_is_on_screen(particle)) 
		{
			particle.x = random(width);
			particle.y = random(height);
		}
	}
}

function mouseReleased() 
{
	noiseSeed(random(0, 10));
}

function particle_is_on_screen(particle)
{
	if (particle.x >= 0 && particle.x <= width && particle.y >= 0 && particle.y <= height)
		return (true);
	return (false);
}
