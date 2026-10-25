// Personalize the messages in this file and index.html.
const $ = (selector) => document.querySelector(selector);
const toast = $('#toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}
function hearts(count = 18, originX = window.innerWidth / 2, originY = window.innerHeight * .75) {
  const layer = $('#heartsLayer');
  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = ['♡', '♥', '✧', 'ღ'][Math.floor(Math.random() * 4)];
    heart.style.left = `${Math.max(2, Math.min(98, originX / window.innerWidth * 100 + (Math.random() - .5) * 28))}%`;
    heart.style.bottom = `${Math.max(-10, (window.innerHeight - originY) / window.innerHeight * 100 + Math.random() * 8)}%`;
    heart.style.setProperty('--size', `${12 + Math.random() * 20}px`);
    heart.style.setProperty('--duration', `${2.4 + Math.random() * 2.4}s`);
    layer.appendChild(heart);
    setTimeout(() => heart.remove(), 5200);
  }
}
function burstAt(el, count = 16) {
  const rect = el.getBoundingClientRect();
  hearts(count, rect.left + rect.width / 2, rect.top + rect.height / 2);
}
function makeRipple(event) {
  const ocean = $('#ocean');
  const rect = ocean.getBoundingClientRect();
  const x = event.clientX ?? rect.width / 2;
  const y = event.clientY ?? rect.height / 2;
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.left = `${x - rect.left}px`;
  ripple.style.top = `${y - rect.top}px`;
  ocean.appendChild(ripple);
  setTimeout(() => ripple.remove(), 1600);
}
function activateOnEnter(el, handler) {
  el.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(e); }
  });
}

$('#openSurprise').addEventListener('click', () => {
  hearts(32, window.innerWidth / 2, window.innerHeight / 2);
  showToast('surprise! happy birthday, my pretty girl ♡');
  setTimeout(() => $('#birthday').scrollIntoView({ behavior: 'smooth' }), 500);
});
$('#envelopeCat').addEventListener('click', () => {
  burstAt($('#envelopeCat'), 10);
  showToast('pspsps... happy birthday, pretty girl! 🐾');
});
activateOnEnter($('#envelopeCat'), () => $('#envelopeCat').click());

function moonMessage() {
  burstAt($('#moon'), 12);
  showToast("even the moon looks prettier tonight, but you're still my favorite view. ♡");
}
$('#moon').addEventListener('click', moonMessage);
activateOnEnter($('#moon'), moonMessage);

$('#ocean').addEventListener('click', e => {
  makeRipple(e);
  showToast('a little wave, just to say i love you ♡');
});
activateOnEnter($('#ocean'), () => makeRipple({ clientX: window.innerWidth / 2, clientY: window.innerHeight * .75 }));

document.querySelectorAll('.shell').forEach((shell, index) => {
  const wishes = ['i hope today gives you a hundred tiny reasons to smile. ♡', 'you deserve the softest days and the sweetest surprises. ✧'];
  const reveal = () => { burstAt(shell, 8); showToast(wishes[index % wishes.length]); };
  shell.addEventListener('click', reveal);
  activateOnEnter(shell, reveal);
});

$('#cake').addEventListener('click', () => {
  const cake = $('#cake');
  cake.classList.toggle('blown');
  if (cake.classList.contains('blown')) {
    hearts(30, window.innerWidth / 2, window.innerHeight * .55);
    showToast('make a wish, birthday girl... ✨');
    setTimeout(() => { cake.classList.remove('blown'); }, 4500);
  } else {
    showToast('your candles are glowing again, little star ♡');
  }
});
activateOnEnter($('#cake'), () => $('#cake').click());
$('#sleepyCat').addEventListener('click', () => {
  burstAt($('#sleepyCat'), 9);
  showToast('mrrp... this kitten says you are very, very loved 🐾');
});
activateOnEnter($('#sleepyCat'), () => $('#sleepyCat').click());

$('#letterButton').addEventListener('click', () => {
  const note = $('#loveNote');
  const isOpening = note.hidden;
  note.hidden = !isOpening;
  $('#letterButton').classList.toggle('open', isOpening);
  $('#letterButton').setAttribute('aria-expanded', String(isOpening));
  $('.letter-button-label').textContent = isOpening ? 'close the little letter' : 'open the little letter';
  if (isOpening) {
    hearts(18, window.innerWidth / 2, window.innerHeight * .65);
    setTimeout(() => note.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
  }
});
$('#signCat').addEventListener('click', () => showToast("don't worry, your secret is safe with this kitty. 🐱"));
activateOnEnter($('#signCat'), () => $('#signCat').click());

$('#hugButton').addEventListener('click', () => {
  hearts(42, window.innerWidth / 2, window.innerHeight * .75);
  $('#hugCaption').textContent = 'sending you the biggest, softest virtual hug... *squish* ♡';
  showToast('hug delivered! with extra cat cuddles 🐈');
});
$('#finalHeart').addEventListener('click', () => {
  hearts(50, window.innerWidth / 2, window.innerHeight * .75);
  $('#finalLine').textContent = 'secret: if i could, i would choose to make you smile every day. ♡';
  showToast('one last secret, just between us. ♡');
});

// Background music starts OFF. Add assets/ocean-piano.mp3 to enable playback.
const music = $('#bgMusic');
const musicToggle = $('#musicToggle');
music.volume = 0.28;
musicToggle.addEventListener('click', async () => {
  if (!music.paused) {
    music.pause();
    $('#musicIcon').textContent = '♫';
    $('#musicLabel').textContent = 'music off';
    musicToggle.setAttribute('aria-label', 'Turn background music on');
    return;
  }
  try {
    await music.play();
    $('#musicIcon').textContent = '♫ ♪';
    $('#musicLabel').textContent = 'music on';
    musicToggle.setAttribute('aria-label', 'Turn background music off');
  } catch (error) {
    showToast('add your MP3 as assets/ocean-piano.mp3, then try again ♡');
  }
});
music.addEventListener('error', () => {
  // Keep the website working even when the optional music file isn't present.
});

function drawStars() {
  const canvas = $('#stars');
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.scale(dpr, dpr);
  const amount = Math.min(170, Math.floor(window.innerWidth / 7));
  const dots = Array.from({ length: amount }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.4 + .25,
    a: Math.random() * .6 + .2,
    phase: Math.random() * Math.PI * 2
  }));
  let tick = 0;
  function paint() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    dots.forEach(d => {
      const alpha = d.a * (.72 + Math.sin(tick * .018 + d.phase) * .28);
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 245, 231, ${alpha})`;
      ctx.fill();
    });
    tick++;
    requestAnimationFrame(paint);
  }
  paint();
}
drawStars();
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(drawStars, 200);
});
