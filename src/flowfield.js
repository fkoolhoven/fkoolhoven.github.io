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

let 	previous_speed_timeout = null;
let		previous_stroke_timeout = null;
let 	previous_color_timeout = null;
let 	previous_curl_timeout = null;
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
let 	collide_with_curl = false;

let 	color_blue = false;
let 	color_red = false;
let 	color_green = false;
let 	color_white = false;

let		curl_effect = false;

let		screen_center;

let 	curl_position;
let 	curl_radius = 200;



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
	FillBackground();

	for (let i = 0; i < number_of_particles; i++) 
	{
		let particle = particles[i];
		
		GetStrokeColor(i);
		GetStrokeWeight();
		point(particle.x, particle.y);
		if (curl_effect)
			collide_with_curl = CollideWithCurl(particle);
		GetParticleDirection(particle);
		UpdateParticlePosition(particle);

		if (!ParticleIsOnScreen(particle) || TooCloseToCurl(particle) || TooCloseToCursor(particle)) 
		{
			particle.x = random(width);
			particle.y = random(height);
		}
	}
}

function FillBackground()
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

function GetStrokeColor(i)
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
		stroke(SelectDefaultColor(i));
}

function SelectDefaultColor(i)
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

function GetStrokeWeight()
{
	if (medium_stroke || large_stroke)
		strokeWeight(strokeWeightEffect);
	else
		strokeWeight(strokeWeightDefault);
}

function GetParticleDirection(particle)
{
	if (collide_with_curl)
	{
		let angleToCurl = atan2(curl_position.y - particle.y, curl_position.x - particle.x);
		direction = angleToCurl + 0.8;
	}
	else if (mouseIsPressed)
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

function UpdateParticlePosition(particle)
{	
	if (sunshine_direction && !mouseIsPressed && !collide_with_curl)
	{
		particle.add(p5.Vector.mult(direction, speed));
	}
	else if (circle_direction && !mouseIsPressed && !collide_with_curl)
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

function CollideWithCurl(particle) 
{
	let distance = particle.dist(curl_position);
	return (distance < curl_radius);
}

function ParticleIsOnScreen(particle)
{
	if (particle.x >= 0 && particle.x <= width && particle.y >= 0 && particle.y <= height)
		return (true);
	else
		return (false);
}

function TooCloseToCurl(particle)
{
	if (!curl_effect)
		return false;
	let distance = particle.dist(curl_position);
	return (distance < 3);
}

function TooCloseToCursor(particle)
{
	if (!mouseIsPressed)
		return false;
	let distance = particle.dist(createVector(mouseX, mouseY));
	return (distance < 3);
}

// VISUAL EFFECTS TRIGGERED BY KEY PRESSES

function keyPressed() 
{
	if (key == 'z' || key == 'Z') 
	{
		if (previous_curl_timeout)
		{
			RevertCurl();
			clearTimeout(previous_curl_timeout);
		}
		curl_position = createVector(random(width), random(height));
		curl_effect = true;
		previous_curl_timeout = setTimeout(RevertCurl, effectDuration * 5);
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
		if (previous_color_timeout)
		{
			clearTimeout(previous_color_timeout);
			RevertColor();
		}
		color_white = true;

		if (!inverse_direction)
			SpeedUp();
		previous_color_timeout = setTimeout(RevertWhite, effectDuration);
	}
	else if ((key == 'j' || key == 'J')) 
	{
		if (previous_color_timeout)
		{
			clearTimeout(previous_color_timeout);
			RevertColor();
		}
		color_green = true;

		if (!inverse_direction)
			SpeedUp();
		previous_color_timeout = setTimeout(RevertGreen, effectDuration);
	}
	else if ((key == 'k' || key == 'K')) 
	{
		if (previous_color_timeout)
		{
			clearTimeout(previous_color_timeout);
			RevertColor();
		}
		color_red = true;

		if (!inverse_direction)
			SpeedUp();
		previous_color_timeout = setTimeout(RevertRed, effectDuration);
	}
	else if ((key == 'l' || key == 'L')) 
	{
		if (previous_color_timeout)
		{
			clearTimeout(previous_color_timeout);
			RevertColor();
		}
		color_blue = true;

		if (!inverse_direction)
			SpeedUp();
		previous_color_timeout = setTimeout(RevertBlue, effectDuration);
	}
	else if (key == 'q' || key == 'Q') 
	{
		Glitches(40);
	}
	else if ((key == 'w' || key == 'W') && !medium_stroke && !large_stroke) 
	{
		medium_stroke = true;
		StrokeGrow(40);
	}
	else if ((key == 'e' || key == 'E') && !large_stroke && !medium_stroke) 
	{
		large_stroke = true;
		StrokeGrow(60);
	}
	else if ((key == 'r' || key == 'R') && !short_trail && !long_trail) 
	{
		short_trail = true;
		setTimeout(RevertShortTrail, effectDuration * 5);
	}
	else if ((key == 't' || key == 'T') && !long_trail && !short_trail)
	{
		long_trail = true;
		setTimeout(RevertLongTrail, effectDuration * 10);
	}
	else if ((key == 'y' || key == 'Y') && !warp_direction)
	{
	 	warp_direction = true;
		setTimeout(RevertWarpDirection, effectDuration * 3);
	}
	else if ((key == 'u' || key == 'U') && !diagonal_direction)
	{
		RevertDirection();
		diagonal_direction = true;
		setTimeout(RevertDiagonalDirection, effectDuration);
	}
	else if ((key == 'i' || key == 'I') && !inverse_direction)
	{
		RevertSpeed();
		clearTimeout(previous_speed_timeout);
		inverse_direction = true;
		SlowDown(41);
	}
	else if ((key == 'o' || key == 'O') && !circle_direction)
	{
		RevertDirection();
		circle_direction = true;
	 	setTimeout(RevertCircleDirection, effectDuration * 2);
	}
	else if ((key == 'p' || key == 'P') && !sunshine_direction) 
	{
		RevertDirection();
		sunshine_direction = true;
		setTimeout(RevertSunshineDirection, 9000);
	}
}

// EFFECT FUNCTIONS
function Glitches(number)
{
	if (number > 0)
	{
		noiseSeed(random(0, 10));
		setTimeout(() => Glitches(number - 1), 30);
	}
}

function SpeedUp()
{
	RevertSpeed();
	speed = speedEffect;
	speed_up = true;
	clearTimeout(previous_speed_timeout);
	previous_speed_timeout = setTimeout(RevertSpeed, effectDuration);
}

function SlowDown(number)
{
	if (number > 35)
	{
		speed += 0.3;
		setTimeout(() => SlowDown(number - 1), 50);
	}
	else if (number > 1)
	{
		speed -= 0.2;
		setTimeout(() => SlowDown(number - 1), 50);
	}
	else if (number == 1)
	{
		speed -= 0.2;
		setTimeout(() => SlowDown(number - 1), 5000);
	}
	else if (number == 0)
		RevertInverseDirection();
}

function StrokeGrow(number)
{
	if (number > 20)
	{
		strokeWeightEffect += 0.5;
		setTimeout(() => StrokeGrow(number - 1), 30);
	}
	else if (number > 0 && medium_stroke)
	{
		strokeWeightEffect -= 0.5;
		setTimeout(() => StrokeGrow(number - 1), 30);
	}
	else if (number > 0 && large_stroke)
	{
		strokeWeightEffect -= 0.20;
		setTimeout(() => StrokeGrow(number - 0.2), 60);
	}
	else if (number <= 0)
	{
		RevertMediumStroke();
		RevertLargeStroke();
	}
}

// RESET EFFECT FUNCTIONS

function RevertCurl()
{
	curl_effect = false;
}

function RevertColor()
{
	color_white = false;
	color_green = false;
	color_red = false;
	color_blue = false;
}

function RevertSunshineDirection()
{
	sunshine_direction = false;
}

function RevertDirection()
{
	diagonal_direction = false;
	warp_direction = false;
	circle_direction = false;
	sunshine_direction = false;
}

function RevertSpeed()
{
	if (speed == speedEffect)
		speed = speedDefault;
}

function RevertLargeStroke()
{
	large_stroke = false;
	strokeWeightEffect = strokeWeightDefault;
}

function RevertInverseDirection()
{
	inverse_direction = false;
	speed = speedDefault;
}

function RevertWhite()
{
	color_white = false;
}

function RevertGreen()
{
	color_green = false;
}

function RevertRed()
{
	color_red = false;
}

function RevertBlue()
{
	color_blue = false;
}

function RevertCircleDirection()
{
	circle_direction = false;
}

function RevertShortTrail()
{
	short_trail = false;
}

function RevertLongTrail()
{
	long_trail = false;
}

function RevertDiagonalDirection()
{
	diagonal_direction = false;
}

function RevertWarpDirection()
{
	warp_direction = false;
}

function RevertMediumStroke()
{
	medium_stroke = false;
	strokeWeightEffect = strokeWeightDefault;
}
