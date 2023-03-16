// DOM selectors
const movementDisplay = document.querySelector("#movement");
const statusDisplay = document.querySelector("#status");
const canvas = document.querySelector("canvas");

// canvas setup

const ctx = canvas.getContext("2d");
// ask the DOM what size the canvas actually is in px
// and set the canvas's resolution to be that size
canvas.setAttribute("height", getComputedStyle(canvas).height);
canvas.setAttribute("width", getComputedStyle(canvas).width);

// // set renderer properties
// ctx.fillStyle = "pink";

// // invoke renderer methods

// // fillRect(x, y, width, height)
// ctx.fillRect(10, 10, 100, 100);

// // set renderer properties
// ctx.fillStyle = "rebeccapurple";

// // invoke renderer methods
// ctx.fillRect(130, 130, 60, 60);

// ctx.strokeStyle = "#bada55";
// ctx.lineWidth = 5;

// ctx.strokeRect(140, 10, 20, 20);

// // group context property setting and method calls together as we see fit

// function drawBox(x, y, w, h, color) {
//   ctx.fillStyle = color;
//   ctx.fillRect(x, y, w, h);
// }

// drawBox(200, 200, 20, 20, "yellow");

// canvas.addEventListener("click", (e) => {
//   console.log(e);
//   drawBox(e.offsetX, e.offsetY, 40, 40, "hotpink");
// });

class Crawler {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.alive = true;
  }
  render() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

document.addEventListener("keydown", handleKeyPressEvent);

// GAME OBJECTS
const hero = new Crawler(5, 5, 45, 45, "hotpink");
const ogre = new Crawler(200, 75, 100, 150, "#bada55");

// const testCrawler = new Crawler(10, 45, 100, 50, "#bada55")
// testCrawler.render()

function handleKeyPressEvent(e) {
  const speed = 30;
  switch (e.key) {
    case "w":
    case "ArrowUp":
      hero.y -= speed;
      break;
    case "s":
    case "ArrowDown":
      hero.y += speed;
      break;
    case "a":
    case "ArrowLeft":
      hero.x -= speed;
      break;
    case "d":
    case "ArrowRight":
      hero.x += speed;
      break;
  }
  movementDisplay.innerText = `x: ${hero.x} y: ${hero.y}`;
}

function detectHit() {
  // axis aligned bounding box collision detection
  // AABB
  const left = ogre.x <= hero.width + hero.x;
  const right = ogre.x + ogre.width >= hero.x;
  const top = ogre.y <= hero.height + hero.y;
  const bottom = ogre.y + ogre.height >= hero.y;
  return left && right && top && bottom ? true : false;
}

const gameLoop = () => {
  // clear off the renderer
  // business logic of our game
  // check for collisions
  // check for end game conditions
  // do all of our rendering
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (detectHit()) {
    // end game here
    console.log("end the game!");
    ogre.alive = false;
    statusDisplay.innerText =
      "the hero has bravely faced their ogre and slayed it!";
    clearInterval(gameLoopInterval);
  }
  if (ogre.alive) {
    ogre.render();
  }
  hero.render();
};

const gameLoopInterval = setInterval(gameLoop, 60);
