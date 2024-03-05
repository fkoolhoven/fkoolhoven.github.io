// GLOBAL VARIABLES
let		particles = [];
const	number_of_particles = 3000;

let		white;
let		green;
let		red;
let		blue;
let		black;

let		noiseScale;
let		noiseScaleDefault = 0.007;
let		noiseScaleEffect = 0.0009;

let		speed;
let		speedDefault = 1.2;
let		speedEffect = 2;

let 	previousSpeedTimeout;
let		previousStrokeTimeout
let 	effectDuration = 3000;

let		strokeWeightDefault = 1;
let		strokeWeightEffect = 1;
let		medium_stroke = false;
let		large_stroke = false;

let		short_trail = false;
let		long_trail = false;

let 	direction;
let		directionEffect = 4;
let		inverse_direction = false;
let		warp_direction = false;
let		diagonal_direction = false;
let		sunshine_direction = false;
let		circle_direction = false;

let 	color_blue = false;
let 	color_red = false;
let 	color_green = false;
let 	color_white = false;


let		screen_center;

// INITIAL CANVAS SETUP
function setup()
{
	const canvas = createCanvas(window.innerWidth, window.innerHeight);
	canvas.parent("canvas_location");

	for (let i = 0; i < number_of_particles; i++) 
		particles.push(createVector(random(width), random(height)));

	strokeWeight(strokeWeightDefault);
	white = 255;
	black = 0;
	green = color(173, 255, 47);
	red = color(248, 51, 60); 
	blue = color(43, 158, 179);
	screen_center = createVector(width / 2, height / 2);
	speed = speedDefault;
	clear();
}

// DRAWING THE FLOW FIELD
function draw()
{
	fill_background();

	for (let i = 0; i < number_of_particles; i++) 
	{
		let particle = particles[i];
		
		get_stroke_color(i);
		get_stroke_weight();
		point(particle.x, particle.y);
		get_particle_direction(particle);
		update_particle_position(particle);
		if (!particle_is_on_screen(particle)) 
		{
			particle.x = random(width);
			particle.y = random(height);
		}
	}
}

function fill_background()
{
	if (short_trail || long_trail)
		background(black, 0);
	else if (sunshine_direction || mouseIsPressed)
		background(black, 5);
	else if (inverse_direction)
		background(black, 7)
	else
		background(black, 10);
}

function get_stroke_color(i)
{
	if (color_white)
		stroke(white);
	else if (color_green)
		stroke(green);
	else if (color_red)
		stroke(red);
	else if (color_blue)
		stroke(blue);
	else
		stroke(select_default_color(i));
}

function select_default_color(i)
{
	let range = number_of_particles / 4;

    if (i < range)
        return white;
    else if (i < 2 * range)
        return green;
    else if (i < 3 * range)
        return red;
    else
        return blue;
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
	if (mouseIsPressed)
	{
		direction = atan2(mouseY - particle.y, mouseX - particle.x);
	}
	else if (diagonal_direction)
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
	if (sunshine_direction && !mouseIsPressed)
	{
		particle.add(p5.Vector.mult(direction, speed));
	}
	else if (circle_direction && !mouseIsPressed)
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
		background(white);
	}
	else if (key == 's' || key == 'S') 
	{
		background(green);
	}
	else if (key == 'd' || key == 'D') 
	{
		background(red);
	}
	else if (key == 'f' || key == 'F') 
	{
	 	background(blue);
	}
	else if (key == 'g' || key == 'G') 
	{
		background(color(random(100, 255), random(100, 200), random(100, 255)));
	}
	else if ((key == 'h' || key == 'H')) 
	{
		revertColor();
		color_white = true;

		if (!inverse_direction)
			speedUp();
		setTimeout(revertWhite, effectDuration);
	}
	else if ((key == 'j' || key == 'J')) 
	{
		revertColor();
		color_green = true;

		if (!inverse_direction)
			speedUp();
		setTimeout(revertGreen, effectDuration);
	}
	else if ((key == 'k' || key == 'K')) 
	{
		revertColor();
		color_red = true;

		if (!inverse_direction)
			speedUp();
		setTimeout(revertRed, effectDuration);
	}
	else if ((key == 'l' || key == 'L')) 
	{
		revertColor();
		color_blue = true;

		if (!inverse_direction)
			speedUp();
		setTimeout(revertBlue, effectDuration);
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
		setTimeout(revertShortTrail, effectDuration * 5);
	}
	else if ((key == 't' || key == 'T') && !long_trail && !short_trail)
	{
		long_trail = true;
		setTimeout(revertLongTrail, effectDuration * 10);
	}
	else if ((key == 'y' || key == 'Y') && !warp_direction)
	{
	 	warp_direction = true;
		setTimeout(revertWarpDirection, effectDuration * 3);
	}
	else if ((key == 'u' || key == 'U'))
	{
		revertDirection();
		diagonal_direction = true;
		setTimeout(revertDiagonalDirection, effectDuration);
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
	 	setTimeout(revertCircleDirection, effectDuration * 2);
	}
	else if ((key == 'p' || key == 'P')) 
	{
		revertDirection();
		sunshine_direction = true;
		setTimeout(revertSunshineDirection, 9000);
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
		revertInverseDirection();
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
		revertMediumStroke();
		revertLargeStroke();
	}
}

// RESET EFFECT FUNCTIONS

function revertColor()
{
	color_white = false;
	color_green = false;
	color_red = false;
	color_blue = false;
}

function revertSunshineDirection()
{
	sunshine_direction = false;
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

function revertLargeStroke()
{
	large_stroke = false;
	strokeWeightEffect = strokeWeightDefault;
}

function revertInverseDirection()
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

function revertCircleDirection()
{
	circle_direction = false;
}

function revertShortTrail()
{
	short_trail = false;
}

function revertLongTrail()
{
	long_trail = false;
}

function revertDiagonalDirection()
{
	diagonal_direction = false;
}

function revertWarpDirection()
{
	warp_direction = false;
}

function revertMediumStroke()
{
	medium_stroke = false;
	strokeWeightEffect = strokeWeightDefault;
}
