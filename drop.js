const emote = document.querySelector("#emote");
const filter = document.querySelector("#filter");

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

  filter.setAttribute("flood-color", "blue");
};

const dropLoop = () => {
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

document.documentElement.addEventListener("mousedown", (ev) => {
  dropSetup();
  dropLoop();
});
