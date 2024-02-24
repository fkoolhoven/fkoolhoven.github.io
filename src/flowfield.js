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
let		color5;

let		inverse_direction = false;
let		medium_stroke = false;
let		large_stroke = false;
let		random_background = false;
let		short_trail = false;
let		long_trail = false;
let		warp_direction = false;
let		diagonal_direction = false;
let		sunshine_direction = false;
let		circle_direction = false;
let		pause_particles = false;
let 	color_blue = false;
let 	color_red = false;
let 	color_green = false;
let 	color_white = false;

let 	previousSpeedTimeout;
let		previousStrokeTimeout
let 	effectDuration = 3000;

let		screen_center;

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
	color5 = color(228, 208, 10);
	screen_center = createVector(width / 2, height / 2);
	speed = speedDefault;
	clear();
}

// DRAWING THE FLOW FIELD
function draw()
{
	if (!pause_particles)
	{
		fill_background();
	
		for(let i = 0; i < number_of_particles; i++) 
		{
			let particle = particles[i];
			
			get_stroke_color(i);
			get_stroke_weight();
			point(particle.x, particle.y);
			get_particle_direction(particle);
			update_particle_position(particle);
			if(!particle_is_on_screen(particle)) 
			{
				particle.x = random(width);
				particle.y = random(height);
			}
		}
	}
}

function fill_background()
{
	if (short_trail || long_trail)
		background(0, 0);
	else if (sunshine_direction)
		background(0, 5);
	else if (inverse_direction)
		background(0, 7)
	else
		background(0, 10);
}

function get_stroke_color(i)
{
	if (color_white)
		stroke(color1);
	else if (color_green)
		stroke(color2);
	else if (color_red)
		stroke(color3);
	else if (color_blue)
		stroke(color4);
	else
		stroke(select_default_color(i));
}

function select_default_color(i)
{
	let range = number_of_particles / 4;

    if (i < range)
        return color1;
    else if (i < 2 * range)
        return color2;
    else if (i < 3 * range)
        return color3;
    else
        return color4;
}

function get_stroke_weight()
{
	if (medium_stroke || large_stroke)
		strokeWeight(strokeWeightEffect);
	else
		strokeWeight(strokeWeightDefault);
}

function get_particle_direction(particle)
{
	if (diagonal_direction)
	{
		direction = directionEffect;
	}
	else if (sunshine_direction)
	{
		direction = p5.Vector.sub(particle, screen_center).normalize();
	}
	else if (circle_direction)
	{
		direction = atan2(particle.y - screen_center.y, particle.x - screen_center.x);
		direction += radians(speed / 3);
	}
	else
	{
		if (warp_direction)
			noiseScale = noiseScaleEffect;
		else
			noiseScale = noiseScaleDefault;
		let noise_value = noise(particle.x * noiseScale, particle.y * noiseScale, frameCount * noiseScale * noiseScale);
		direction = TAU * noise_value;
	}
}

function update_particle_position(particle)
{
	if (sunshine_direction)
	{
		particle.add(p5.Vector.mult(direction, speed));
	}
	else if (circle_direction)
	{
    	let radius = dist(particle.x, particle.y, screen_center.x, screen_center.y);
		particle.x = screen_center.x + radius * cos(direction);
    	particle.y = screen_center.y + radius * sin(direction);
	}
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
		background(color(random(100, 255), random(100, 200), random(100, 255)));
	}
	else if ((key == 'h' || key == 'H')) 
	{
		revertColor();
		color_white = true;

		if (inverse_direction)
			setTimeout(revertWhite, effectDuration);
		else
			speedUp();
	}
	else if ((key == 'j' || key == 'J')) 
	{
		revertColor();
		color_green = true;

		if (inverse_direction)
			setTimeout(revertGreen, effectDuration);
		else
			speedUp();
	}
	else if ((key == 'k' || key == 'K')) 
	{
		revertColor();
		color_red = true;

		if (inverse_direction)
			setTimeout(revertRed, effectDuration);
		else
			speedUp();
	}
	else if ((key == 'l' || key == 'L')) 
	{
		revertColor();
		color_blue = true;

		if (inverse_direction)
			setTimeout(revertBlue, effectDuration);
		else
			speedUp();
	}
	else if (key == 'q' || key == 'Q') 
	{
		glitches(40);
	}
	else if ((key == 'w' || key == 'W') && !medium_stroke && !large_stroke) 
	{
		medium_stroke = true;
		strokeGrow(40);
	}
	else if ((key == 'e' || key == 'E') && !large_stroke && !medium_stroke) 
	{
		large_stroke = true;
		strokeGrow(60);
	}
	else if ((key == 'r' || key == 'R') && !short_trail && !long_trail) 
	{
		short_trail = true;
		setTimeout(revertR, effectDuration * 5);
	}
	else if ((key == 't' || key == 'T') && !long_trail && !short_trail)
	{
		long_trail = true;
		setTimeout(revertT, effectDuration * 10);
	}
	else if ((key == 'y' || key == 'Y') && !warp_direction)
	{
	 	warp_direction = true;
		setTimeout(revertY, effectDuration * 3);
	}
	else if ((key == 'u' || key == 'U'))
	{
		revertDirection();
		diagonal_direction = true;
		setTimeout(revertU, effectDuration);
	}
	else if ((key == 'i' || key == 'I') && !inverse_direction)
	{
		revertSpeed();
		clearTimeout(previousSpeedTimeout);
		inverse_direction = true;
		slowDown(41);
	}
	else if ((key == 'o' || key == 'O'))
	{
		revertDirection();
		circle_direction = true;
	 	setTimeout(revertO, effectDuration * 2);
	}
	else if ((key == 'p' || key == 'P')) 
	{
		revertDirection();
		sunshine_direction = true;
		setTimeout(revertP, 9000);
	}
	if (key == ' ')
	{
		pause_particles = !pause_particles;
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

function speedUp()
{
	revertSpeed();
	speed = speedEffect;
	speed_up = true;
	clearTimeout(previousSpeedTimeout);
	previousSpeedTimeout = setTimeout(revertSpeed, effectDuration);
}

function slowDown(number)
{
	if (number > 35)
	{
		speed += 0.3;
		setTimeout(() => slowDown(number - 1), 50);
	}
	else if (number > 1)
	{
		speed -= 0.2;
		setTimeout(() => slowDown(number - 1), 50);
	}
	else if (number == 1)
	{
		speed -= 0.2;
		setTimeout(() => slowDown(number - 1), 5000);
	}
	else if (number == 0)
		revertI();
}

function strokeGrow(number)
{
	if (number > 20)
	{
		strokeWeightEffect += 0.5;
		setTimeout(() => strokeGrow(number - 1), 30);
	}
	else if (number > 0 && medium_stroke)
	{
		strokeWeightEffect -= 0.5;
		setTimeout(() => strokeGrow(number - 1), 30);
	}
	else if (number > 0 && large_stroke)
	{
		strokeWeightEffect -= 0.20;
		setTimeout(() => strokeGrow(number - 0.2), 60);
	}
	else if (number <= 0)
	{
		revertW();
		revertE();
	}
}


// RESET EFFECT FUNCTIONS

function revertAll()
{
	revertSpeed();
	revertE();
	revertG();
	revertI();
	revertO();
	revertP();
	revertR();
	revertT();
	revertU();
	revertW();
}

function revertColor()
{
	color_white = false;
	color_green = false;
	color_red = false;
	color_blue = false;
}

function revertDirection()
{
	diagonal_direction = false;
	warp_direction = false;
	circle_direction = false;
	sunshine_direction = false;
}

function revertSpeed()
{
	if (speed == speedEffect)
		speed = speedDefault;
}

function revertE()
{
	large_stroke = false;
	strokeWeightEffect = strokeWeightDefault;
}

function revertG()
{
	random_background = false;
}

function revertH()
{
	h_pressed = false;
}

function revertI()
{
	inverse_direction = false;
	speed = speedDefault;
}

function revertWhite()
{
	color_white = false;
}

function revertGreen()
{
	color_green = false;
}

function revertRed()
{
	color_red = false;
}

function revertBlue()
{
	color_blue = false;
}

function revertO()
{
	circle_direction = false;
}

function revertR()
{
	short_trail = false;
}

function revertT()
{
	long_trail = false;
}

function revertU()
{
	diagonal_direction = false;
}

function revertY()
{
	warp_direction = false;
}

function revertW()
{
	medium_stroke = false;
	strokeWeightEffect = strokeWeightDefault;
}
