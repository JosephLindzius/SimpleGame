var canvas = document.getElementById("myCanvas");  //sets canvas up and gets context
var ctx = canvas.getContext("2d");

//setting variable positon
var x = canvas.width/2;
var y = canvas.height-30;
//velocity
var dx = 2;
var dy = -2;


//making ball
function drawBall() {
 ctx.beginPath();
 ctx.arc(x, y, 10, 0, Math.PI*2);
 ctx.fillStyle = "#0095DD";
 ctx.fill();
 ctx.closePath();
}

//drawing function on the canvas
function draw() {
 ctx.clearRect(0, 0, canvas.width, canvas.height);
 drawBall();
 x += dx;
 y += dy;
}
//interval setup to call over and over;
setInterval(draw, 10);
