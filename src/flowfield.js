// GLOBAL VARIABLES
let		particles = [];
const	number_of_particles = 3000;

let		noiseScale;
let		noiseScaleDefault = 0.007;
let		noiseScaleEffect = 0.0009;
let 	direction;
let		directionEffect = 4;
let		speed;
let		speedDefault = 1.2;
let		speedEffect = 2;
let		strokeWeightDefault = 1;
let		strokeWeightEffect = 1;

let		color1;
let		color2;
let		color3;
let		color4;

let		h_pressed = false;
let		j_pressed = false;
let		k_pressed = false;
let		l_pressed = false;
let		w_pressed = false;
let		e_pressed = false;
let		r_pressed = false;
let		p_pressed = false;
let		o_pressed = false;

let 	previousSpeedTimeout;
let		previousStrokeTimeout
let 	effectDuration = 3000;

// INITIAL CANVAS SETUP
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
	speed = speedDefault;
	clear();
}
const acceleration = 1000;
// DRAWING THE FLOW FIELD
function draw()
{
	fill_background();

	for(let i = 0; i < number_of_particles; i++) 
	{
		let particle = particles[i];
		
		get_stroke_color(i);
		get_stroke_weight();
		point(particle.x, particle.y);
		get_particle_direction(particle);
		if (!o_pressed)
			update_particle_position(particle);
		if(!particle_is_on_screen(particle)) 
		{
			particle.x = random(width);
			particle.y = random(height);
		}
	}
}

function fill_background()
{
	if (p_pressed)
		background(0, 5);
	else
		background(0, 10);
}

function get_stroke_color(i)
{
	if (speed == speedDefault)
		stroke(select_default_color(i));
	else if (h_pressed)
		stroke(color1);
	else if (j_pressed)
		stroke(color2);
	else if (k_pressed)
		stroke(color3);
	else if (l_pressed)
		stroke(color4);
}

function select_default_color(i)
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

function get_stroke_weight()
{
	if (w_pressed)
		strokeWeight(strokeWeightEffect);
	else
		strokeWeight(strokeWeightDefault);
}

function get_particle_direction(particle)
{
	if (e_pressed)
		direction = directionEffect;
	else if (p_pressed)
	{
		let screen_center = createVector(width / 2, height / 2);
		direction = p5.Vector.sub(particle, screen_center).normalize();
	}
	else if (o_pressed)
	{
		let screen_center = createVector(width / 2, height / 2);
		let angle = atan2(particle.y - screen_center.y, particle.x - screen_center.x);

    	let radius = dist(particle.x, particle.y, screen_center.x, screen_center.y);
		angle += radians(speed / 3);
		
		particle.x = screen_center.x + radius * cos(angle); // update pos
    	particle.y = screen_center.y + radius * sin(angle);
	}
	else
	{
		if (r_pressed)
			noiseScale = noiseScaleEffect;
		else
			noiseScale = noiseScaleDefault;
		let noise_value = noise(particle.x * noiseScale, particle.y * noiseScale, frameCount * noiseScale * noiseScale);
		direction = TAU * noise_value;
	}
}

function update_particle_position(particle)
{
	if (p_pressed)
		particle.add(p5.Vector.mult(direction, speed));
	else
	{
		particle.x += cos(direction) * speed;
		particle.y += sin(direction) * speed;
	}
}

function particle_is_on_screen(particle)
{
	if (particle.x >= 0 && particle.x <= width && particle.y >= 0 && particle.y <= height)
		return (true);
	else
		return (false);
}

// VISUAL EFFECTS TRIGGERED BY KEY PRESSES
function keyPressed() 
{
	if (key == 'z' || key == 'Z') 
	{
	//	do something
	}
	else if (key == 'x' || key == 'X') 
	{
	//   do something
	}
	else if (key == 'c' || key == 'C') 
	{
	//   do something
	}
	else if (key == 'v' || key == 'V') 
	{
	//   do something
	}
	else if (key == 'b' || key == 'B') 
	{
	//   do something
	}
	else if (key == 'n' || key == 'N') 
	{
	//   do something
	}
	else if (key == 'm' || key == 'M') 
	{
	//   do something
	}
	else if (key == 'a' || key == 'A') 
	{
		background(color1);
	}
	else if (key == 's' || key == 'S') 
	{
		background(color2);
	}
	else if (key == 'd' || key == 'D') 
	{
		background(color3);
	}
	else if (key == 'f' || key == 'F') 
	{
	 	background(color4);
	}
	else if (key == 'g' || key == 'G') 
	{
	 	noiseSeed(random(0, 10));
	}
	else if (key == 'h' || key == 'H') 
	{
		revertSpeed();
		speed = speedEffect;
		h_pressed = true;
		clearTimeout(previousSpeedTimeout);
		previousSpeedTimeout = setTimeout(revertSpeed, effectDuration);
	}
	else if (key == 'j' || key == 'J') 
	{
		revertSpeed();
		speed = speedEffect;
		j_pressed = true;
		clearTimeout(previousSpeedTimeout);
		previousSpeedTimeout = setTimeout(revertSpeed, effectDuration);
	}
	else if (key == 'k' || key == 'K') 
	{
		revertSpeed();
		speed = speedEffect;
		k_pressed = true;
		clearTimeout(previousSpeedTimeout);
		previousSpeedTimeout = setTimeout(revertSpeed, effectDuration);
	}
	else if (key == 'l' || key == 'L') 
	{
		revertSpeed();
		speed = speedEffect;
		l_pressed = true;
		clearTimeout(previousSpeedTimeout);
		previousSpeedTimeout = setTimeout(revertSpeed, effectDuration);
	}
	else if (key == 'q' || key == 'Q') 
	{
		glitches(40);
		
	}
	else if ((key == 'w' || key == 'W') && !w_pressed) 
	{
		w_pressed = true;
		strokeGrow(40);
	}
	else if ((key == 'e' || key == 'E') && !e_pressed) 
	{
		e_pressed = true;
		setTimeout(revertE, effectDuration);
	}
	else if ((key == 'r' || key == 'R') && !r_pressed) 
	{
		r_pressed = true;
		setTimeout(revertR, effectDuration * 3);
	}
	else if (key == 't' || key == 'T')
	{
	//   do something
	}
	else if (key == 'y' || key == 'Y')
	{
	//   do something
	}
	else if (key == 'u' || key == 'U')
	{
	//   do something
	}
	else if (key == 'i' || key == 'I')
	{
	//   do something
	}
	else if ((key == 'o' || key == 'O') && !o_pressed)
	{
		o_pressed = true;
	 	setTimeout(revertP, effectDuration * 3);
	}
	else if ((key == 'p' || key == 'P') && !p_pressed) 
	{
		p_pressed = true;
		setTimeout(revertP, effectDuration * 3);
	}
}

// EFFECT FUNCTIONS
function glitches(number)
{
	if (number > 0)
	{
		noiseSeed(random(0, 10));
		setTimeout(() => glitches(number - 1), 30);
	}
}

function strokeGrow(number)
{
	if (number > 20)
	{
		strokeWeightEffect += 0.5;
		setTimeout(() => strokeGrow(number - 1), 30);
	}
	else if (number > 0)
	{
		strokeWeightEffect -= 0.5;
		setTimeout(() => strokeGrow(number - 1), 30);
	}
	else if (number == 0)
		revertW();
}


// RESET EFFECT FUNCTIONS
function revertSpeed()
{
	if (speed == speedEffect)
		speed = speedDefault;
	h_pressed = false;
	j_pressed = false;
	k_pressed = false;
	l_pressed = false;
	
}

function revertE()
{
	e_pressed = false;
}

function revertP()
{
	p_pressed = false;
}

function revertO()
{
	o_pressed = false;
}

function revertR()
{
	r_pressed = false;
}

function revertW()
{
	w_pressed = false;
	strokeWeightEffect = strokeWeightDefault;
}
