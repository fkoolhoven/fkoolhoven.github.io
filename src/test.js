// // VARIABLES
// const	canvas = document.getElementById("MyCanvas");
// const	context = canvas.getContext("2d");
// const	centerX = canvas.width / 2;
// const	centerY = canvas.height / 2;
// const	maxRadius = 70;
// const	animationSpeed = 1;
// let 	radius = 0;

// // ANIMATION
// function drawCircle() 
// {
// 	context.clearRect(0, 0, canvas.width, canvas.height);
// 	context.beginPath();
// 	context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
// 	context.lineWidth = 1;
// 	context.strokeStyle = '#FF0000';
// 	context.stroke();
// }

// function animateCircle() 
// {
// 	if (radius < maxRadius) 
// 	{
// 		radius += animationSpeed;
// 		drawCircle();
// 		requestAnimationFrame(animateCircle);
// 	}
// }

// EVENT LISTENER
document.body.addEventListener("keydown", (ev) => 
{
	if (ev.key == 'a')
	{
		console.log("great work you pressed A");
		let audio = new Audio("audio/a.wav");
		audio.play();
		animateCircle();
	}
});

let		particles = [];
const	num = 3000;
const	noiseScale = 0.01/2;

function setup() 
{
	const canvas = createCanvas(window.innerWidth, window.innerHeight - 100);
	canvas.parent("container_test");
	for(let i = 0; i < num; i ++) 
	{
		particles.push(createVector(random(width), random(height)));
	}

	stroke(255);
	// For a cool effect try uncommenting this line
	// And comment out the background() line in draw
	// stroke(255, 50);
	clear();
}

function draw() 
{
	background(0, 10);
	for(let i = 0; i < num; i ++) 
	{
		let p = particles[i];
		point(p.x, p.y);
		let n = noise(p.x * noiseScale, p.y * noiseScale, frameCount * noiseScale * noiseScale);
		let a = TAU * n;
		p.x += cos(a);
		p.y += sin(a);
		if(!onScreen(p)) 
		{
			p.x = random(width);
			p.y = random(height);
		}
	}
}

function mouseReleased() 
{
	noiseSeed(millis());
}

function onScreen(v)
{
	return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}