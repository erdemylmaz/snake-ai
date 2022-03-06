// Canvas
const canvasDIV = document.querySelector(".canvas");
const ctx = canvasDIV.getContext("2d");
const textDiv = document.querySelector(".text");
const fixBtn = document.querySelector(".fix");

class Canvas {
  width = 900;
  height = 900;
  bgColor = "#000";
}

class Snake {
  width = 10;
  height = 5;
  color = "#fff";

  posX = 10;
  posY = 10;

  movementSize = 5;

  checkWin() {
    if (snake.posX == apple.posX && snake.posY == apple.posY) {
      apple.count++;

      textDiv.textContent = apple.count;
      apple.createApple();
    }
  }

  //   Movements
  goLeft() {
    ctx.fillStyle = "#fff";
    ctx.clearRect(snake.posX, snake.posY, snake.width, snake.height);
    snake.posX -= snake.movementSize;

    if (snake.posX <= -5) {
      snake.posX = 295;
    }

    snake.checkWin();
    ctx.fillRect(snake.posX, snake.posY, snake.width, snake.height);
  }

  goRight() {
    ctx.fillStyle = "#fff";
    ctx.clearRect(snake.posX, snake.posY, snake.width, snake.height);
    snake.posX += snake.movementSize;

    if (snake.posX >= 295) {
      snake.posX = 0;
    }

    snake.checkWin();
    ctx.fillRect(snake.posX, snake.posY, snake.width, snake.height);
  }

  goUp() {
    ctx.fillStyle = "#fff";
    ctx.clearRect(snake.posX, snake.posY, snake.width, snake.height);
    snake.posY -= snake.movementSize;

    if (snake.posY < 0) {
      snake.posY = 145;
    }

    snake.checkWin();
    ctx.fillRect(snake.posX, snake.posY, snake.width, snake.height);
  }

  goDown() {
    ctx.fillStyle = "#fff";
    ctx.clearRect(snake.posX, snake.posY, snake.width, snake.height);
    snake.posY += snake.movementSize;

    if (snake.posY > 145) {
      snake.posY = 0;
    }

    snake.checkWin();
    ctx.fillRect(snake.posX, snake.posY, snake.width, snake.height);
  }
}

class Apple {
  posX = 50;
  posY = 50;

  width = 10;
  height = 5;

  count = 0;

  createApple() {
    let randomX = Math.floor(Math.random() * 290);

    while (randomX % 5 != 0) {
      randomX--;

      if (randomX % 5 == 0) {
        break;
      }
    }

    apple.posX = randomX;

    let randomY = Math.floor(Math.random() * 140);

    while (randomY % 5 != 0) {
      randomY--;

      if (randomY % 5 == 0) {
        break;
      }
    }

    apple.posY = randomY;

    ctx.fillStyle = "#ff0000";
    ctx.fillRect(apple.posX, apple.posY, apple.width, apple.height);
  }
}

class AI {
  fixAI(e) {
    e.preventDefault();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    apple.createApple();
  }

  makeDecide() {
    if (snake.posX < apple.posX) {
      if (apple.posX - snake.posX >= 140) {
        snake.goLeft();
      } else {
        snake.goRight();
      }
    }

    if (snake.posX > apple.posX) {
      if (snake.posX - apple.posX >= 140) {
        snake.goRight();
      } else {
        snake.goLeft();
      }
    }

    if (snake.posY < apple.posY) {
      if (apple.posY - snake.posY >= 70) {
        snake.goUp();
      } else {
        snake.goDown();
      }
    }

    if (snake.posY > apple.posY) {
      if (snake.posY - apple.posY >= 70) {
        snake.goDown();
      } else {
        snake.goUp();
      }
    }
  }
}

const canvas = new Canvas();
const snake = new Snake();
const apple = new Apple();
const ai = new AI();

setInterval(ai.makeDecide, 1000 / 30);
fixBtn.addEventListener("click", ai.fixAI);

canvasDIV.style.width = `${canvas.width}px`;
canvasDIV.style.height = `${canvas.height}px`;
canvasDIV.style.backgroundColor = `${canvas.bgColor}`;

// Movement
document.addEventListener("keydown", (e) => {
  if (e.keyCode == 87) {
    snake.goUp();
  } else if (e.keyCode == 65) {
    snake.goLeft();
  } else if (e.keyCode == 83) {
    snake.goDown();
  } else if (e.keyCode == 68) {
    snake.goRight();
  }
});

// Snake
ctx.fillStyle = "#fff";
ctx.fillRect(snake.posX, snake.posY, snake.width, snake.height);

// apple
ctx.fillStyle = "#ff0000";
ctx.fillRect(apple.posX, apple.posY, apple.width, apple.height);
