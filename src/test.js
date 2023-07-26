// EVENT LISTENER
// document.body.addEventListener("keydown", (ev) => 
// {
// 	if (ev.key == 'a')
// 	{
// 		console.log("great work you pressed A");
// 		let audio = new Audio("audio/a.wav");
// 		audio.play();
// 	}
// });

// document.body.addEventListener("keydown", (ev) => 
// {
// 	if (ev.key == 'a')
// 	{
// 		noiseSeed(random(0, 10));
// 	}
// 	if (ev.key == 'b')
// 	{
// 		background(100, 10);
// 	}
// 	if (ev.key == 'c')
// 	{
// 		noiseSeed(random(0, 10));
// 	}
// });



// GLOBAL VARIABLES
let		particles = [];
const	number_of_particles = 3000;
const	noiseScale = 0.007;
let		speed = 1.2;
let		color1;
let		color2;
let		color3;
let		color4;
let		h_pressed = false;
let		j_pressed = false;
let		k_pressed = false;
let		l_pressed = false;
let		w_pressed = false;
let		strokeWeightDefault = 1;
let		strokeWeightEffect = 1;

// CODE FOR FLOW FIELD VISUALS
function setup()
{
	const canvas = createCanvas(window.innerWidth, window.innerHeight);

	canvas.parent("canvas_location");
	for(let i = 0; i < number_of_particles; i++) 
		particles.push(createVector(random(width), random(height)));
	strokeWeight(strokeWeightDefault);
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
		if (speed != 2)
			stroke(get_color(i));
		else if (h_pressed)
			stroke(color1);
		else if (j_pressed)
			stroke(color2);
		else if (k_pressed)
			stroke(color3);
		else if (l_pressed)
			stroke(color4);
		if (w_pressed)
			strokeWeight(strokeWeightEffect);
		else
			strokeWeight(strokeWeightDefault);
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

function particle_is_on_screen(particle)
{
	if (particle.x >= 0 && particle.x <= width && particle.y >= 0 && particle.y <= height)
		return (true);
	return (false);
}

let previousSpeedTimeout;
let	previousStrokeTimeout
let effectDuration = 3000;
function keyPressed() 
{
	if (key === 'z') 
	{
	//   background(color4);
	}
	if (key === 'x') 
	{
	//   background(color4);
	}
	if (key === 'c') 
	{
	//   background(color4);
	}
	if (key === 'v') 
	{
	//   background(color4);
	}
	if (key === 'b') 
	{
	//   background(color4);
	}
	if (key === 'n') 
	{
	//   background(color4);
	}
	if (key === 'm') 
	{
	//   background(color4);
	}
	if (key === 'a') 
	{
		background(color2);
	}
	if (key === 's') 
	{
		background(color3);
	}
	if (key === 'd') 
	{
		background(color4);
	}
	if (key === 'f') 
	{
	 	noiseSeed(random(0, 10));
	}
	if (key === 'g') 
	{
	 	noiseSeed(random(0, 10));
	}
	if (key === 'h') 
	{
		revertSpeed();
		speed = 2;
		h_pressed = true;
		clearTimeout(previousSpeedTimeout);
		previousSpeedTimeout = setTimeout(revertSpeed, effectDuration);
	}
	if (key === 'j') 
	{
		revertSpeed();
		speed = 2;
		j_pressed = true;
		clearTimeout(previousSpeedTimeout);
		previousSpeedTimeout = setTimeout(revertSpeed, effectDuration);
	}
	if (key === 'k') 
	{
		revertSpeed();
		speed = 2;
		k_pressed = true;
		clearTimeout(previousSpeedTimeout);
		previousSpeedTimeout = setTimeout(revertSpeed, effectDuration);
	}
	if (key === 'l') 
	{
		revertSpeed();
		speed = 2;
		l_pressed = true;
		clearTimeout(previousSpeedTimeout);
		previousSpeedTimeout = setTimeout(revertSpeed, effectDuration);
	}
	if (key === 'q') 
	{
		glitches(40);
		
	}
	if (key === 'w') 
	{
		if (!w_pressed)
		{
			w_pressed = true;
			strokeGrow(40);
		}
	}
	if (key === 'e') 
	{
	//   background(color4);
	}
	if (key === 'r') 
	{
	//   background(color4);
	}
	if (key === 't') 
	{
	//   background(color4);
	}
	if (key === 'y') 
	{
	//   background(color4);
	}
	if (key === 'u') 
	{
	//   background(color4);
	}
	if (key === 'i') 
	{
	//   background(color4);
	}
	if (key === 'o') 
	{
	//   background(color4);
	}
	if (key === 'p') 
	{
	//   background(color4);
	}
}

function	glitches(number)
{
	if (number > 0)
	{
		noiseSeed(random(0, 10));
		setTimeout(() => glitches(number - 1), 30);
	}
}

function	strokeGrow(number)
{
	if (number > 20)
	{
		strokeWeightEffect += 0.5;
		console.log("number = ", number);
		setTimeout(() => strokeGrow(number - 1), 30);
	}
	else if (number > 0)
	{
		strokeWeightEffect -= 0.5;
		console.log("number = ", number);
		setTimeout(() => strokeGrow(number - 1), 30);
	}
	else if (number == 0)
		revertW();
}

function	revertSpeed()
{
	if (speed == 2)
		speed = 1.2;
	h_pressed = false;
	j_pressed = false;
	k_pressed = false;
	l_pressed = false;
	
}

function	revertW()
{
	w_pressed = false;
	strokeWeightEffect = strokeWeightDefault;
}