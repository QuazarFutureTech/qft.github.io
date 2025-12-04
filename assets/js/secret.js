(() => {
    
  const canvas = document.getElementById('game');
  const ctx = canvas.getContext('2d');
  const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
  window.onresize = resize; resize();

  const $score = document.getElementById('score');
  const $lives = document.getElementById('lives');
  const $wave  = document.getElementById('wave');

  // Game states
  let gameState = "start"; // "start","playing","gameover"
  let paused = false;

  // Input
  const keys = { ArrowUp:false, ArrowDown:false, ArrowLeft:false, ArrowRight:false, Space:false };
  const actions = { thrust:false, shoot:false, shield:false, pause:false };

  window.addEventListener("load", () => {
  const overlay = document.getElementById("fadeOverlay");
  // Kick off fade after a short delay
  setTimeout(() => {
    overlay.classList.add("hidden");
  }, 200); // small delay so it feels intentional
});

  const touchControls = document.getElementById("touchControls");

// Default: show controls if touch is supported
if (navigator.maxTouchPoints > 0) {
  touchControls.classList.remove("hidden");
} else {
  touchControls.classList.add("hidden");
}

// Hide controls permanently once a keyboard is used
window.addEventListener("keydown", () => {
  touchControls.classList.add("hidden");
});


  window.addEventListener('keydown', e => {
    if (e.code in keys) keys[e.code] = true;
    if (e.code === "Space") { keys.Space = true; e.preventDefault(); }
    if (gameState === "start" && e.code === "Space") { restart(); gameState="playing"; }
    if (gameState === "gameover" && e.code === "Space") { restart(); gameState="playing"; }
    if (e.code === "KeyP") paused = !paused;
  });
  window.addEventListener('keyup', e => { if (e.code in keys) keys[e.code] = false; });

// Tap anywhere to continue
document.addEventListener("touchstart", () => {
  if (gameState === "start") {
    restart();
    gameState = "playing";
  } else if (gameState === "gameover") {
    restart();
    gameState = "playing";
  }
});

// Click anywhere to continue (desktop mouse)
document.addEventListener("click", () => {
  if (gameState === "start") {
    restart();
    gameState = "playing";
  } else if (gameState === "gameover") {
    restart();
    gameState = "playing";
  }
});



  document.querySelectorAll('.btn').forEach(el => {
    const a = el.dataset.a;
    el.onpointerdown = e => { e.preventDefault(); setAction(a,true); };
    el.onpointerup   = e => { e.preventDefault(); setAction(a,false); };
    el.onpointerleave= el.onpointercancel = e => setAction(a,false);
  });
  function setAction(a,v){
    if(a==="up")keys.ArrowUp=v; else if(a==="down")keys.ArrowDown=v;
    else if(a==="left")keys.ArrowLeft=v; else if(a==="right")keys.ArrowRight=v;
    else if(a==="shoot")actions.shoot=v; else if(a==="thrust")actions.thrust=v;
    else if(a==="shield")actions.shield=v; else if(a==="pause"&&v)paused=!paused;
  }

    // Game state
  const state = {
    score:0, lives:3, wave:1,
    ship:{visible: true, x:canvas.width/2,y:canvas.height/2,angle:-Math.PI/2,vx:0,vy:0,size:16,thrust:0.14,drag:0.995,cooldown:0,inv:0},
    bullets:[], enemies:[], particles:[]
  };
state.waveTransition = 0; // countdown before next wave
state.respawnDelay = 0;   // countdown before ship respawn
  // Background stars
  const stars = Array.from({length:100},()=>({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    speed:0.2+Math.random()*0.5,
    size:Math.random()<0.1?2:1
  }));

  function resetShip(){ state.ship.visible = true; state.ship.x=canvas.width/2; state.ship.y=canvas.height/2; state.ship.vx=0; state.ship.updatevy=0; state.ship.angle=-Math.PI/2; state.ship.inv=120; }
function spawnWave(n = 6 + state.wave) {
  state.enemies = [];
  for (let i = 0; i < n; i++) {
    state.enemies.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() * 3 - 2) * 2.0,
      vy: (Math.random() * 3 - 2) * 2.0,
      size: 16 + Math.random() * 12,
      hp: 1,
      rotation: 0,
      rotationSpeed: (Math.random() - 0.5) * 0.05 // slow spin
    });
  }
}
  function rand(a,b){ return Math.random()*(b-a)+a; }
  function wrap(v,max){ return v<0?v+max:v>=max?v-max:v; }
    function shoot(){
    if(state.ship.cooldown>0)return;
    const s=state.ship.size;
    const noseX=state.ship.x+Math.cos(state.ship.angle)*s*2;
    const noseY=state.ship.y+Math.sin(state.ship.angle)*s*2;
 state.bullets.push({
  x: state.ship.x,
  y: state.ship.y,
  vx: Math.cos(state.ship.angle) * 8,
  vy: Math.sin(state.ship.angle) * 8,
  life: 60,
  size: 6 // bigger than before (default was ~2–4)
});

 
    state.ship.cooldown=5;
  }
  function updateHUD(){
  $score.textContent = state.score;
  $lives.textContent = state.lives;
  $wave.textContent = state.wave;
}
  function addParticles(x,y,n=8,color='rgba(180,220,255,0.8)'){
    for(let i=0;i<n;i++){ state.particles.push({x,y,vx:rand(-2,2),vy:rand(-2,2),life:rand(20,40),color}); }
    if(state.particles.length>200) state.particles.splice(0,state.particles.length-200); // cap
  }

 window.addEventListener("DOMContentLoaded", () => {
  const joystick = document.getElementById("joystick");
  const stick = document.getElementById("stick");
  let joyActive = false;

  joystick.addEventListener("touchstart", e => {
    joyActive = true;
  });

  joystick.addEventListener("touchend", e => {
    joyActive = false;
    // Reset stick position
    stick.style.transform = "translate(-50%, -50%)";
    // Reset keys
    keys.ArrowUp = keys.ArrowLeft = keys.ArrowRight = false;
  });

  joystick.addEventListener("touchmove", e => {
    if (!joyActive) return;
    const rect = joystick.getBoundingClientRect();
    const touch = e.touches[0];
    const dx = touch.clientX - (rect.left + rect.width / 2);
    const dy = touch.clientY - (rect.top + rect.height / 2);

    // Limit stick movement
    const max = rect.width / 2;
    const dist = Math.min(Math.hypot(dx, dy), max);

    stick.style.transform = `translate(${dx}px, ${dy}px)`;

    // Map movement to keys
    keys.ArrowUp = dy < -20;    // thrust
    keys.ArrowLeft = dx < -20;  // rotate left
    keys.ArrowRight = dx > 20;  // rotate right
  });
}); 
function update(dt){
  if (paused || gameState !== "playing") return;

  // --- Wave transition countdown ---
  if (state.waveTransition > 0) {
    state.waveTransition -= dt;
    if (state.waveTransition <= 0) {spawnWave(); 
        state.ship.inv = 120; // invulnerability frames
    };
  }

  // --- Ship respawn countdown ---
  if (state.respawnDelay > 0) {
    state.respawnDelay -= dt;
    if (state.respawnDelay <= 0) {
      Object.assign(state.ship, {
        x: canvas.width/2,
        y: canvas.height/2,
        vx: 0, vy: 0,
        angle: -Math.PI/2
      });
      state.ship.inv = 120; // invulnerability frames
      state.ship.visible = true;
    }
  } else {
// --- Ship update ---
const ship = state.ship;
if(keys.ArrowLeft) ship.angle -= 0.06 * dt;
if(keys.ArrowRight) ship.angle += 0.06 * dt;

if(keys.ArrowUp || actions.thrust){
  ship.vx += Math.cos(ship.angle) * ship.thrust * dt;
  ship.vy += Math.sin(ship.angle) * ship.thrust * dt;

  // Ship trail particle (only when thrusting)
  state.particles.push({
    x: ship.x - Math.cos(ship.angle) * ship.size,
    y: ship.y - Math.sin(ship.angle) * ship.size,
    startSize: ship.size * 1,
    size: ship.size * 1,
    maxLife: 120,
    life: 120,
    color: "rgba(120,200,255,0.4)", // bluish glow
    shape: "square",
    rotation: ship.angle,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4
  });
}

ship.vx *= ship.drag;
ship.vy *= ship.drag;
ship.x = wrap(ship.x + ship.vx * dt, canvas.width);
ship.y = wrap(ship.y + ship.vy * dt, canvas.height);
  if(ship.cooldown > 0) ship.cooldown -= dt;
  if(ship.inv > 0) ship.inv -= dt;
  if(keys.Space || actions.shoot) shoot();
  }

  // --- Bullets update ---
  state.bullets.forEach(b => {
    b.x = wrap(b.x + b.vx * dt, canvas.width);
    b.y = wrap(b.y + b.vy * dt, canvas.height);
    b.life -= dt;
  });
  state.bullets = state.bullets.filter(b => b.life > 0);

  // --- Enemies update ---
  if (state.waveTransition <= 0) {
    state.enemies.forEach(e => {
      e.x = wrap(e.x + e.vx * dt, canvas.width);
      e.y = wrap(e.y + e.vy * dt, canvas.height);
      e.rotation += e.rotationSpeed * dt;
      // Enemy trail particle
      state.particles.push({
        x: e.x, y: e.y,
        startSize: e.size, size: 3,
        maxLife: 30, life: 30,
        color: "rgba(255,150,150,0.6)",
        rotation: e.rotation,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      });
    });
  }

  // --- Collisions ---
  if (state.waveTransition <= 0 && state.respawnDelay <= 0) {
    // Bullet vs Enemy
    for (let i = state.enemies.length - 1; i >= 0; i--) {
      const e = state.enemies[i];
      for (let j = state.bullets.length - 1; j >= 0; j--) {
        const b = state.bullets[j];
        if (
          b.x > e.x - e.size/2 &&
          b.x < e.x + e.size/2 &&
          b.y > e.y - e.size/2 &&
          b.y < e.y + e.size/2
        ) {
          state.bullets.splice(j, 1);
          state.score += 10;
          // Enemy explosion burst
          for (let p = 0; p < 40; p++) {
            state.particles.push({
              x: e.x, y: e.y,
              startSize: 8 + Math.random() * 8,
              size: 8 + Math.random() * 8,
              maxLife: 70, life: 70,
              color: 'rgba(255,120,60,1.0)',
              rotation: Math.random() * Math.PI,
              vx: (Math.random() - 0.5) * 12,
              vy: (Math.random() - 0.5) * 12
            });
          }
          state.enemies.splice(i, 1);
          break;
        }
      }
    }
    // Enemy vs Ship
    state.enemies.forEach(e => {
      if (Math.hypot(state.ship.x - e.x, state.ship.y - e.y) < state.ship.size + e.size && state.ship.inv <= 0) {
        state.lives--;
        // Ship explosion burst
        for (let p = 0; p < 50; p++) {
          state.particles.push({
            x: state.ship.x, y: state.ship.y,
            startSize: 10 + Math.random() * 10,
            size: 10 + Math.random() * 10,
            maxLife: 80, life: 80,
            color: 'rgba(120,200,255,1.0)',
            rotation: Math.random() * Math.PI,
            vx: (Math.random() - 0.5) * 14,
            vy: (Math.random() - 0.5) * 14
          });
        }
        state.ship.visible = false;
        state.respawnDelay = 90; // delay before respawn
        if (state.lives <= 0) gameState = "gameover";
      }
    });
    updateHUD();
  }

  // --- Particle update (always runs) ---
  state.particles.forEach(p => {
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.life -= dt;
    p.size = (p.life / p.maxLife) * p.startSize;
    p.rotation = (p.rotation || 0) + 0.05 * dt;
  });
  state.particles = state.particles.filter(p => p.life > 0);

  // --- Next wave check ---
  if (state.enemies.length === 0 && state.waveTransition <= 0) {
    state.wave++;
    state.waveTransition = 120; // 2s delay before next wave
  }

}
    function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Background stars (optimized drift)
    stars.forEach(s=>{
      s.y+=s.speed;
      if(s.y>canvas.height){ s.y=0; s.x=Math.random()*canvas.width; }
      ctx.fillStyle='rgba(200,220,255,0.8)';
      ctx.fillRect(s.x,s.y,s.size,s.size);
    });

    // Start screen
    if(gameState==="start"){
      ctx.fillStyle="#cfe8ff";
      ctx.font="700 32px system-ui";
      ctx.textAlign="center";
      ctx.fillText("🚀 QFT Space Defender 🚀", canvas.width/2, canvas.height/2-40);
      ctx.font="20px system-ui";
      ctx.fillText("Press SPACE or Tap to Start", canvas.width/2, canvas.height/2+20);
      return;
    }

    // Game over screen
    if(gameState==="gameover"){
      ctx.fillStyle="rgba(10,15,20,0.85)";
      ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle="#ffb3b3";
      ctx.font="700 28px system-ui";
      ctx.textAlign="center";
      ctx.fillText("💀 Game Over 💀", canvas.width/2, canvas.height/2-40);
      ctx.fillStyle="#cfe8ff";
      ctx.font="20px system-ui";
      ctx.fillText(`Final Score: ${state.score}`, canvas.width/2, canvas.height/2);
      ctx.fillText("Press SPACE or Tap to Restart", canvas.width/2, canvas.height/2+40);
      return;
    }
    
    if(state.waveTransition > 0){
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.font = "28px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Wave " + state.wave, canvas.width/2, canvas.height/2);
}

if(state.respawnDelay > 0){
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = "20px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Respawning...", canvas.width/2, canvas.height/2 + 40);
}


// --- Wave transition text ---
if(state.waveTransition > 0){
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.font = "28px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Wave " + state.wave, canvas.width/2, canvas.height/2);
}

// --- Respawn delay indicator ---
if(state.respawnDelay > 0){
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = "20px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Respawning...", canvas.width/2, canvas.height/2 + 40);
}
    // Ship (triangle vector)
if (state.ship.visible && state.respawnDelay <= 0) {
    const ship=state.ship;
ctx.save();
ctx.translate(ship.x, ship.y);
ctx.rotate(ship.angle);
ctx.shadowColor = 'rgba(180,220,255,0.9)';
ctx.shadowBlur = 20;
const s = ship.size;
ctx.beginPath();
ctx.moveTo(s * 1.4, 0);          // nose
ctx.lineTo(-s, -s * 0.6);        // upper rear
ctx.lineTo(-s * 0.6, 0);         // inward point at bottom center
ctx.lineTo(-s, s * 0.6);         // lower rear
ctx.closePath();
ctx.lineWidth = 2;
ctx.strokeStyle = ship.inv>0 ? 'rgba(255,240,180,0.9)' : 'rgba(180,220,255,0.9)';
ctx.fillStyle = 'rgba(60,120,180,0.25)';
ctx.stroke();
ctx.fill();
ctx.restore();
};
    // Bullets
state.bullets.forEach(b => {
  ctx.save();
  ctx.translate(b.x, b.y);

  // Glow settings
  ctx.shadowColor = "yellow";
  ctx.shadowBlur = 20;

  ctx.fillStyle = "rgba(255,255,100,1)";
  ctx.beginPath();
  ctx.arc(0, 0, b.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
});

// Enemies (rotating red squares with glow)
state.enemies.forEach(e => {
  ctx.save();
  ctx.translate(e.x, e.y);
  ctx.rotate(e.rotation);
  ctx.shadowColor = 'rgba(255, 138, 29, 0.8)';
  ctx.shadowBlur = 20;
  ctx.fillStyle = 'rgba(255, 138, 29, 0.35)';
  ctx.strokeStyle = 'rgba(255, 206, 29, 0.9)';
  ctx.lineWidth = 2;
  ctx.strokeRect(-e.size/2, -e.size/2, e.size, e.size);
  ctx.fillRect(-e.size/2, -e.size/2, e.size, e.size);
  ctx.restore();
});


// Particles (rotating square outlines, more transparent)
state.particles.forEach(p => {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.globalAlpha = Math.max(p.life / p.maxLife, 0.4); // more transparent
  ctx.strokeStyle = p.color;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(-p.size/2, -p.size/2, p.size, p.size);
  ctx.restore();
});
ctx.globalAlpha = 1;
  }
    function restart(){
    state.score=0; state.lives=3; state.wave=1;
    $score.textContent=0; $lives.textContent=3; $wave.textContent=1;
    state.bullets=[]; state.enemies=[]; state.particles=[];
    resetShip(); spawnWave(); paused=false;
  }

  // Main loop with delta time
  let last=performance.now();
  function loop(now){
    const dt=(now-last)/16.67; // normalize to ~60fps
    last=now;
    update(dt);
    draw();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();