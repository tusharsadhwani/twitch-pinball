const emote = document.querySelector(".emote");
const randomStartinLocation = Math.random() * window.innerWidth;
emote.style.left = `${randomStartinLocation}px`;

const startSpeed = 400 + Math.floor(100 * Math.random());
const mu = 0.02; // Friction amount (between 0 and 1)

let speed = startSpeed;
let xdir = Math.random() + 0.5;
let ydir = Math.random() + 0.5;

const dropLoop = () => {
  let left = parseInt(emote.style.left) || 0;
  let top = parseInt(emote.style.top) || 0;

  emote.style.left = `${left + speed * xdir}px`;
  emote.style.top = `${top + speed * ydir}px`;

  checkCollision();
  applyFriction();

  requestAnimationFrame(dropLoop);
};

const checkCollision = () => {
  let left = parseInt(emote.style.left) || 0;
  let top = parseInt(emote.style.top) || 0;

  if (xdir > 0 && left + emote.clientWidth >= window.innerWidth) {
    xdir *= -1;
  }
  if (xdir < 0 && left <= 0) {
    xdir *= -1;
  }
  if (ydir > 0 && top + emote.clientHeight >= window.innerHeight) {
    ydir *= -1;
  }
  if (ydir < 0 && top < 0) {
    ydir *= -1;
  }
};

const applyFriction = () => {
  if (Math.abs(speed) <= 50)
    speed = Math.floor(Math.abs(speed) - 1) * (speed / Math.abs(speed));
  else speed = Math.floor(speed * (1 - mu));
};

dropLoop();
