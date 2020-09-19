const emote = document.querySelector("#emote");
const error = document.querySelector("#error");
const filter = document.querySelector("#filter");
const colors = ["red", "#00b7ff", "orange", "#ff5990", "#00ff00;", "#873bd3"];

let startX;
let startY;

let startSpeed;
let mu; // Friction amount (between 0 and 1)

let speed = startSpeed;
let xdir, ydir;

let dropping = false;
let frameCounter = 0;

const dropSetup = () => {
  dropping = true;
  emote.classList.add("visible");
  emote.classList.remove("fading");

  startX = Math.random() * window.innerWidth;
  startY = Math.random() * window.innerHeight;
  emote.style.left = `${startX}px`;
  emote.style.top = `${startY}px`;

  startSpeed = 400 + Math.floor(100 * Math.random());
  mu = 0.02; // Friction amount (between 0 and 1)

  size = 40 + 100 * Math.random();
  document.documentElement.style.setProperty("--size", `${size}px`);

  speed = startSpeed;
  xdir = Math.random() + 0.5;
  ydir = Math.random() + 0.5;
};

const dropLoop = () => {
  frameCounter++;

  let left = parseInt(emote.style.left) || 0;
  let top = parseInt(emote.style.top) || 0;

  emote.style.left = `${left + speed * xdir}px`;
  emote.style.top = `${top + speed * ydir}px`;

  if (frameCounter % 5 === 0) {
    const randomColorIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomColorIndex];
    document.documentElement.style.setProperty("--color", randomColor);
  }

  checkCollision();
  applyFriction();

  if (speed === 0) {
    dropping = false;
    emote.classList.add("fading");
    emote.classList.remove("visible");
  } else requestAnimationFrame(dropLoop);
};

const checkCollision = () => {
  let left = parseInt(emote.style.left) || 0;
  let top = parseInt(emote.style.top) || 0;

  if (xdir > 0 && left + emote.clientWidth >= window.innerWidth) {
    xdir *= -1;
  } else if (xdir < 0 && left <= 0) {
    xdir *= -1;
  }
  if (ydir > 0 && top + emote.clientHeight >= window.innerHeight) {
    ydir *= -1;
  } else if (ydir < 0 && top < 0) {
    ydir *= -1;
  }
};

const applyFriction = () => {
  speed = Math.floor(speed * (1 - mu));
};

let lastDropId = 0;
const checkDrops = async () => {
  if (!dropping)
    try {
      const response = await fetch(
        `http://159.69.127.163:9879/drops?last=${lastDropId}`
      );
      const drop = await response.json();
      if (drop.id != lastDropId) {
        lastDropId = drop.id;
        dropSetup();
        dropLoop();
      }
      error.innerText = "";
    } catch (er) {
      error.innerText = er;
    }
  requestAnimationFrame(checkDrops);
};

function sleep(ms) {
  return;
}

checkDrops();
