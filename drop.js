const emote = document.querySelector(".emote");
const randomStartinLocation = Math.random() * window.innerWidth;
emote.style.left = `${randomStartinLocation}px`;

const startSpeed = 400;
const mu = 0.03; // Friction amount (between 0 and 1)

let xspeed = startSpeed;
let yspeed = startSpeed;

const dropLoop = () => {
  let left = parseInt(emote.style.left) || 0;
  let top = parseInt(emote.style.top) || 0;

  emote.style.left = `${left + xspeed}px`;
  emote.style.top = `${top + yspeed}px`;

  checkCollision();
  applyFriction();

  requestAnimationFrame(dropLoop);
};

const checkCollision = () => {
  let left = parseInt(emote.style.left) || 0;
  let top = parseInt(emote.style.top) || 0;

  if (xspeed > 0 && left + emote.clientWidth >= window.innerWidth) {
    xspeed = -xspeed;
  }
  if (xspeed < 0 && left <= 0) {
    xspeed = -xspeed;
  }
  if (yspeed > 0 && top + emote.clientHeight >= window.innerHeight) {
    yspeed = -yspeed;
  }
  if (yspeed < 0 && top < 0) {
    yspeed = -yspeed;
  }
};

const applyFriction = () => {
  if (xspeed !== 0) {
    if (Math.abs(xspeed) <= 10)
      xspeed = Math.floor(Math.abs(xspeed) - 1) * (xspeed / Math.abs(xspeed));
    else xspeed = Math.floor(xspeed * (1 - mu));
  }
  if (yspeed !== 0) {
    if (Math.abs(yspeed) <= 10)
      yspeed = Math.floor(Math.abs(yspeed) - 1) * (yspeed / Math.abs(yspeed));
    else yspeed = Math.floor(yspeed * (1 - mu));
  }

  // console.log(xspeed, yspeed);
};

dropLoop();
