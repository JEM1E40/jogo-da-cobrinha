let snake;
let food;
let tileSize = 20;

function setup() {
  createCanvas(400, 400);
  snake = new Snake();
  food = createFood();
  frameRate(10);
}

function draw() {
  background(220);
  
  snake.move();
  snake.checkCollision();
  snake.update();
  snake.show();
  
  if (snake.eat(food)) {
    food = createFood();
  }
  
  fill(255, 0, 0);
  rect(food.x, food.y, tileSize, tileSize);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.changeDirection(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.changeDirection(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    snake.changeDirection(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    snake.changeDirection(-1, 0);
  }
}

function createFood() {
  let cols = floor(width / tileSize);
  let rows = floor(height / tileSize);
  let foodLocation = createVector(floor(random(cols)), floor(random(rows)));
  foodLocation.mult(tileSize);
  return foodLocation;
}

class Snake {
  constructor() {
    this.body = [];
    this.body[0] = createVector(floor(width / 2), floor(height / 2));
    this.xspeed = 0;
    this.yspeed = 0;
  }
  
  changeDirection(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }
  
  eat(pos) {
    let x = this.body[0].x;
    let y = this.body[0].y;
    if (x === pos.x && y === pos.y) {
      this.body.push(createVector(x, y));
      return true;
    }
    return false;
  }
  
  move() {
    let head = this.body[this.body.length - 1].copy();
    this.body.shift();
    head.x += this.xspeed * tileSize;
    head.y += this.yspeed * tileSize;
    this.body.push(head);
  }
  
  checkCollision() {
    let x = this.body[this.body.length - 1].x;
    let y = this.body[this.body.length - 1].y;
    if (x > width - tileSize || x < 0 || y > height - tileSize || y < 0) {
      noLoop();
      console.log("Game Over");
    }
  }
  
  update() {
    for (let i = 0; i < this.body.length; i++) {
      fill(0);
      noStroke();
      rect(this.body[i].x, this.body[i].y, tileSize, tileSize);
    }
  }
  
  show() {
    fill(0);
    for (let i = 0; i < this.body.length; i++) {
      rect(this.body[i].x, this.body[i].y, tileSize, tileSize);
    }
  }
}
