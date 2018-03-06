var ball;
var player1;
var player2;
var slider1;
var slider2;

function setup() {
  createP("Left paddle use UP and DOWN keyboard keys.");
  createP("Right paddle use the mouse.")
  canvas = createCanvas(600,600);
  canvas.position((windowWidth / 2) - (canvas.width / 2),(windowHeight / 2) - (canvas.height / 2));

  ball = new Ball();

  // slider1 = createSlider(0,height - 120, height/2);
  // slider1.position(75, height - 10);
  player1 = new Player(10, height / 2);

  // slider2 = createSlider(0, height - 120,height/2);
  // slider2.position(width - slider2.width, height - 10);
  player2 = new Player(width - 10 - 15, height / 2);
}

function draw() {
  background(255);

  fill(255);
  rect(0,0,width-1,height-1);

  textSize(15);
  noStroke();
  text('Player 1: use the mouse', 10, height - 20);
  // text('Player 1: use the mouse',slider1.x - 75, slider1.y + 5);

  textSize(15);
  noStroke();
  text('Player 2 use the up & down keyboard keys',10, height -5);
  // text('Player 2 use the up & down keyboard keys:',slider2.x - 190, slider2.y + 5);

  player2.y = mouseY - 50;

  if (mouseY >= height - 50) {
      player2.y = height - 100;
  }

  if (mouseY <= 50) {
    player2.y = 0;
  }

  if (keyIsDown(UP_ARROW) && player1.y > 0) {
    if (player1.y <= 0) {
      player1.y = 0;
    } else {
      player1.y -= 15;
    }
  }

  if (keyIsDown(DOWN_ARROW) && player1.y < height - 100) {
    if (player1.y >= height - 100) {
      player1.y = height - 100;
    } else {
      player1.y += 15;
    }
  }

  player1.show();
  player2.show();

  ball.move();

  if (ball.x - ball.r <= player1.x + 15 && player1.y <= ball.y && player1.y + 100 >= ball.y && ball.x > 0) {
    ball.direction_x = 1;
    ball.velocity = ball.v + random(1, 3);
  }

  if (ball.x + ball.r >= player2.x && player2.y <= ball.y && player2.y + 100 >= ball.y && ball.x < width) {
    ball.direction_x = -1;
    ball.velocity = ball.v + random(1, 3);
  }

  if (ball.y + ball.r >= height) {
    ball.direction_y = random() * -1;
  }

  if (ball.y + ball.r <= 0) {
    ball.direction_y = random() * 1;
  }

  ball.show();

}


class Ball {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.r = 10;
    this.v = 2;
    let dir_opt = [-1, 1]
    this.xDir = random(dir_opt);
    this.yDir = random(-1, 1);
  }

  show() {
    stroke(0);
    strokeWeight(2);
    fill(0, 125);
    ellipse(this.x,this.y,this.r * 2);
  }

  move() {
    this.x += this.v * this.xDir;
    this.y += this.v * this.yDir;
  }

  set direction_x(new_dir) {
    this.xDir = new_dir;
  }

  set direction_y(new_dir) {
    this.yDir = new_dir;
  }

  set velocity(new_velocity) {
    this.v = new_velocity;
  }
}

class Player {
  constructor(x, y) {
    this._x = x;
    this._y = y;
  }

  set x(newX) {
    this._x = newX;
  }

  set y(newY) {
    this._y = newY;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  show() {
    fill(0);
    rect(this._x,this._y,15,100);
  }
}
