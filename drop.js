const emote = document.querySelector("#emote");
const filter = document.querySelector("#filter");
const colors = [
  "rebeccapurple",
  "blue",
  "orange",
  "palevioletred",
  "green",
  "red",
];

let startX;
let startY;

let startSpeed;
let mu; // Friction amount (between 0 and 1)

let speed = startSpeed;
let xdir, ydir;

const dropSetup = () => {
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

  const randomColorIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomColorIndex];
  filter.setAttribute("flood-color", randomColor);
};

const dropLoop = () => {
  emote.style.display = "block";

  let left = parseInt(emote.style.left) || 0;
  let top = parseInt(emote.style.top) || 0;

  emote.style.left = `${left + speed * xdir}px`;
  emote.style.top = `${top + speed * ydir}px`;

  checkCollision();
  applyFriction();

  if (speed === 0) {
    emote.style.display = "none";
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

lastDropId = -1;
const checkDrops = async () => {
  console.log("bruh");
  const response = await fetch("http://localhost:9879/drops");
  const drop = await response.json();
  if (drop.id != lastDropId) {
    lastDropId = drop.id;
    dropSetup();
    dropLoop();
  }
  await checkDrops();
};

checkDrops();
