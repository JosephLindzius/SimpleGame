//setup canvas
var canvas = document.getElementById("myCanvas");  //setup context
var ctx = canvas.getContext("2d");
canvas.style.backgroundColor = 'black';

//set up ball vars position and velocity
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;

// paddle dims
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

//logic for moving
var rightPressed = false;
var leftPressed = false;

//now adding bricks to the game first declaring variables
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
//setting up array for brick item
var bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {
            x: 0,
            y: 0,
            status: 1,
            hp: 5
        };  //added status so it will have a tree false setup for brick hp
    }
}

//setting up score
var score = 0;

//giving lives
var lives = 3;

//sound effects
var music = document.getElementById("myMusic");
var myPaddleSoundEffect = document.getElementById("myPaddle");
var myBrickSoundEffect = document.getElementById("myBrick");
var myHit = document.getElementById("myHit");
var death = document.getElementById("death");
function playAudio() {
    music.play();
}
function pauseAudio() {
    music.pause();
}
playAudio();
function playPaddleEffect () {
    myPaddleSoundEffect.play();

}
function playBrickDeath () {
    myBrickSoundEffect.play();
}
function playHit () {
   myHit.play();
}
function playDeathSound() {
    death.play();
}

//paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.fillStyle = "#111422";
    ctx.fill();
    ctx.strokeText("Use me", paddleX + paddleWidth/8, canvas.height);
    ctx.closePath();
}
// added that the bricks will not be drawn if there is a status 0
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                var grad = ctx.createLinearGradient(canvas.width/2, canvas.height/2, brickWidth, brickHeight);
                grd.addColorStop(0, 'rgba(255,0,0,0.6)');
                grd.addColorStop(.2, 'rgba(255,255,0,0.6)');
                grd.addColorStop(.4, 'rgba(0,255,0,0.6)');
                grd.addColorStop(.6, 'rgba(0,255,255,0.6)');
                grd.addColorStop(1, 'rgba(0,0,255,0.6)');
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = grad;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
//draw the bouncing ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}
//basic collision at centers
function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1 && b.hp == 0) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    playBrickDeath();
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            } else if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight && b.hp > 0) {
                playHit();
                b.hp--;
                dy = -dy;
                score++;
            }
        }
    }
}
//score keeping Needto add local storage
function drawScore() {
    ctx.font = "20px Courier";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}
function drawLives() {
    ctx.font = "15px Courier";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-100, 20);

}

/////////////
//MAIN GAME//
/////////////

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();



    //here we are checking for collisions  and at the edge the circle
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            playPaddleEffect();
            dy = -dy;
        } else {
            lives--;
            playDeathSound();
            if(!lives) {
                playDeathSound();
                alert("GAME OVER");
                document.location.reload();

            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }

    x += dx;
    y += dy;

    if (rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    } else if (leftPressed) {
        paddleX -= 7;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }
    requestAnimationFrame(draw);  //this is better than interval for animation does by browser self
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }

}
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

draw();
