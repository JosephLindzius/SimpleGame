var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var maxParticles = 10;
var particles = [];// push a ball and it's values into the array
 /* function addBall(){
    var ball = {
        x: mouseX,
        y: mouseY,
        speed_x: random(-5, 5),
        speed_y: random(-5, 5),
        size: 20,
        colour: rgb(randomInt(55),randomInt(255),0)
    }
    balls.push(ball);
    if (balls.length > max_balls) balls.splice(0,1); */
 if (mouseMoved) {
        addParticles();
    }


