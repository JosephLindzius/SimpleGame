//gets canvas and context

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//draw my first rect

 ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FFFF00";
ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
ctx.stroke();
ctx.fill();
ctx.closePath();

//circle
ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI*2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();

