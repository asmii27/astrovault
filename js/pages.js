/* ══════════════════════════════════════════════════════════
   INTRO CINEMATIC
══════════════════════════════════════════════════════════ */
function showIntro() {
  const overlay = document.createElement('div');
  overlay.id = 'intro-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:9000;background:#000;display:flex;align-items:center;justify-content:center;overflow:hidden;';

  const lines = [
    { text: 'YEAR 2157.', delay: 0,    color: '#e9e6f8', size: '28px' },
    { text: "Earth's economy has collapsed.", delay: 1200, color: '#aba9ba', size: '18px' },
    { text: 'Humanity scattered across 6 planets.', delay: 2600, color: '#aba9ba', size: '18px' },
    { text: 'Each world: its own economy. Its own rules.', delay: 4200, color: '#aba9ba', size: '18px' },
    { text: '', delay: 5800 },
    { text: 'You are a broke interstellar merchant.', delay: 6400, color: '#6cb2ff', size: '20px' },
    { text: 'One damaged ship. 500 Galactic Credits.', delay: 8000, color: '#6cb2ff', size: '20px' },
    { text: 'Zero knowledge of finance.', delay: 9600, color: '#ff716c', size: '20px' },
    { text: '', delay: 11000 },
    { text: 'YOUR MISSION:', delay: 11600, color: '#cdff5a', size: '22px' },
    { text: 'Achieve Financial Freedom across the galaxy.', delay: 13000, color: '#cdff5a', size: '18px' },
    { text: '', delay: 14500 },
    { text: 'Every trade teaches you real finance.', delay: 15200, color: '#757484', size: '14px' },
    { text: 'Every planet is a financial concept.', delay: 16400, color: '#757484', size: '14px' },
    { text: 'Every decision builds real-world knowledge.', delay: 17600, color: '#757484', size: '14px' },
  ];

  overlay.innerHTML = `
    <!-- Starfield canvas -->
    <canvas id="intro-canvas" style="position:absolute;inset:0;width:100%;height:100%"></canvas>

    <!-- Scanline -->
    <div style="position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.15) 2px,rgba(0,0,0,.15) 4px);pointer-events:none;opacity:.5;z-index:1"></div>

    <!-- Content -->
    <div style="position:relative;z-index:2;text-align:center;max-width:680px;padding:40px">
      <!-- Logo -->
      <div id="intro-logo" style="opacity:0;margin-bottom:40px;transition:opacity 1s ease">
        <div style="font-family:'Space Grotesk',sans-serif;font-size:42px;font-weight:700;letter-spacing:6px;background:linear-gradient(135deg,#6cb2ff,#ad89ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">ASTRO VAULT</div>
        <div style="font-family:'Space Mono',monospace;font-size:10px;letter-spacing:4px;color:#474655;margin-top:6px">> INTERSTELLAR FINANCE TERMINAL v2.1.57</div>
      </div>

      <!-- Story lines -->
      <div id="intro-lines" style="min-height:280px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px"></div>

      <!-- Skip -->
      <div id="intro-skip" style="opacity:0;margin-top:40px;transition:opacity 1s ease">
        <button onclick="skipIntro()" style="background:none;border:1px solid rgba(108,178,255,.3);color:#6cb2ff;font-family:'Space Grotesk',sans-serif;font-size:12px;font-weight:700;letter-spacing:2px;padding:10px 28px;border-radius:6px;cursor:pointer;transition:all .2s" onmouseenter="this.style.borderColor='#6cb2ff';this.style.background='rgba(108,178,255,.08)'" onmouseleave="this.style.borderColor='rgba(108,178,255,.3)';this.style.background='none'">
          BEGIN MISSION →
        </button>
        <div style="font-size:10px;color:#474655;font-family:'Space Mono',monospace;margin-top:8px;letter-spacing:1px">OR PRESS SPACE TO SKIP</div>
      </div>
    </div>`;

  document.body.appendChild(overlay);

  // Draw intro starfield
  const canvas = document.getElementById('intro-canvas');
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Stars
    for (let i = 0; i < 300; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = Math.random() * 1.2 + .1;
      const op = .3 + Math.random() * .7;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(200,210,255,${op})`; ctx.fill();
    }
    // Nebula
    const neb = ctx.createRadialGradient(canvas.width*.6, canvas.height*.4, 0, canvas.width*.6, canvas.height*.4, 300);
    neb.addColorStop(0, 'rgba(108,178,255,0.04)'); neb.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = neb; ctx.fillRect(0,0,canvas.width,canvas.height);
    // Shooting star
    ctx.beginPath(); ctx.moveTo(canvas.width*.05, canvas.height*.1); ctx.lineTo(canvas.width*.2, canvas.height*.15);
    const sg = ctx.createLinearGradient(canvas.width*.05,canvas.height*.1,canvas.width*.2,canvas.height*.15);
    sg.addColorStop(0,'rgba(255,255,255,0)'); sg.addColorStop(1,'rgba(255,255,255,.5)');
    ctx.strokeStyle=sg; ctx.lineWidth=1; ctx.stroke();
  }

  // Animate logo
  setTimeout(() => {
    const logo = document.getElementById('intro-logo');
    if (logo) logo.style.opacity = '1';
  }, 300);

  // Animate lines
  const linesEl = document.getElementById('intro-lines');
  lines.forEach(line => {
    setTimeout(() => {
      if (!linesEl || !document.getElementById('intro-overlay')) return;
      if (!line.text) return;
      const div = document.createElement('div');
      div.style.cssText = `opacity:0;transform:translateY(10px);transition:all .6s ease;font-family:${line.size>'16px'?'\'Space Grotesk\',sans-serif':'\'Space Mono\',monospace'};font-size:${line.size||'16px'};color:${line.color||'#aba9ba'};letter-spacing:${line.size>'20px'?'2':'1'}px;line-height:1.4`;
      div.textContent = line.text;
      linesEl.appendChild(div);
      setTimeout(() => { div.style.opacity='1'; div.style.transform='none'; }, 50);
    }, line.delay);
  });

  // Show skip button
  setTimeout(() => {
    const skip = document.getElementById('intro-skip');
    if (skip) skip.style.opacity = '1';
  }, 18500);

  // Auto-complete after 22s
  setTimeout(() => skipIntro(), 22000);

  // Space key to skip
  const spaceHandler = (e) => {
    if (e.code === 'Space') { skipIntro(); document.removeEventListener('keydown', spaceHandler); }
  };
  document.addEventListener('keydown', spaceHandler);
}

function skipIntro() {
  const overlay = document.getElementById('intro-overlay');
  if (!overlay) return;
  overlay.style.transition = 'opacity 0.8s ease';
  overlay.style.opacity = '0';
  setTimeout(() => { if (overlay.parentNode) overlay.remove(); }, 800);
}



/* ═══════════════════════════════════════════════════════════
   ASTRO VAULT — ALL PAGES
   ═══════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════
   GALAXY MAP — Main Hub
══════════════════════════════════════════════════════════ */
function initGalaxy() {
  const s = AV.state;
  const done = AV.donePlanets();

  document.getElementById('screen-galaxy').innerHTML = `
    ${UI.buildTicker()}
    <div class="topbar">
      <div>
        <div class="topbar-sub">> NAV_SYNC: ACTIVE · SEKTOR 07-GAMMA // SUBGRID 4</div>
        <div class="topbar-title">GALAXY MAP</div>
      </div>
      <div style="display:flex;align-items:center;gap:16px">
        <div style="text-align:right">
          <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono);letter-spacing:1px">SYSTEM LIQUIDITY</div>
          <div style="font-family:var(--f-mono);font-size:18px;font-weight:700;color:var(--gain)">${AV.formatCR(AV.netWorth())}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono);letter-spacing:1px">PILOT STATUS</div>
          <div style="font-size:12px;font-weight:700;color:var(--primary);font-family:var(--f-display);letter-spacing:1px">LEVEL ${s.level} ${s.rank.toUpperCase()}</div>
        </div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 320px;gap:18px;height:calc(100vh - 190px)">

      <!-- GALAXY CANVAS AREA -->
      <div style="position:relative;border-radius:var(--r-xl);overflow:hidden;border:1px solid var(--ghost)">
        <!-- Deep space canvas background -->
        <canvas id="galaxy-canvas" style="position:absolute;inset:0;width:100%;height:100%"></canvas>

        <!-- Orbital ring overlays (SVG) -->
        <svg style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none" id="orbit-svg">
          <defs>
            <radialGradient id="nebula1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#6cb2ff" stop-opacity="0.06"/>
              <stop offset="100%" stop-color="#6cb2ff" stop-opacity="0"/>
            </radialGradient>
            <radialGradient id="nebula2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#ad89ff" stop-opacity="0.04"/>
              <stop offset="100%" stop-color="#ad89ff" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <!-- Nebula clouds -->
          <ellipse cx="40%" cy="40%" rx="200" ry="150" fill="url(#nebula1)"/>
          <ellipse cx="65%" cy="60%" rx="160" ry="120" fill="url(#nebula2)"/>
          <!-- Orbital rings -->
          <circle id="ring1" cx="50%" cy="50%" r="120" fill="none" stroke="rgba(108,178,255,0.08)" stroke-width="1" stroke-dasharray="4 8"/>
          <circle id="ring2" cx="50%" cy="50%" r="210" fill="none" stroke="rgba(108,178,255,0.06)" stroke-width="1" stroke-dasharray="4 12"/>
          <circle id="ring3" cx="50%" cy="50%" r="300" fill="none" stroke="rgba(108,178,255,0.04)" stroke-width="1" stroke-dasharray="4 16"/>
          <!-- Trade route lines (drawn by JS) -->
          <g id="trade-routes"></g>
        </svg>

        <!-- Planet nodes (absolutely positioned) -->
        <div id="planet-nodes" style="position:absolute;inset:0"></div>

        <!-- System telemetry overlay -->
        <div style="position:absolute;top:16px;left:16px;font-family:var(--f-mono);font-size:10px;color:var(--text-3);line-height:1.9;background:rgba(0,0,0,.4);padding:10px 14px;border-radius:var(--r-md);border:1px solid var(--ghost);backdrop-filter:blur(10px)">
          <div style="color:var(--primary);margin-bottom:2px">● LIVE TELEMETRY</div>
          <div>> NAV_SYNC: SYNCHRONISED [0.0MS]</div>
          <div>> GRID_DENSITY: 0.04% [OPTIMAL]</div>
          <div>> SECTORS_CLEARED: ${done}/6</div>
          <div>> PILOT: ${s.name.toUpperCase()}</div>
        </div>

        <!-- Bottom objective bar -->
        <div style="position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,.7);backdrop-filter:blur(12px);border-top:1px solid var(--ghost);padding:12px 20px;display:flex;align-items:center;gap:14px">
          <div style="width:36px;height:36px;border-radius:8px;background:rgba(108,178,255,.15);border:1px solid var(--ghost-2);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">📋</div>
          <div style="flex:1">
            <div style="font-size:9px;color:var(--primary);font-family:var(--f-mono);letter-spacing:1px">PRIMARY OBJECTIVE</div>
            <div style="font-family:var(--f-display);font-size:14px;font-weight:700;letter-spacing:.5px;margin-top:1px">${STORY_CHAPTERS[Math.min(s.storyChapter, STORY_CHAPTERS.length-1)]?.title || 'GALAXY MASTERED'}</div>
          </div>
          <div style="text-align:right">
            <div style="font-family:var(--f-mono);font-size:12px;font-weight:700;color:var(--gain)">${Math.round((done/6)*100)}% COMPLETE</div>
            <div style="width:120px;margin-top:4px">${UI.bar({pct:(done/6)*100,cls:'fill-primary',h:3})}</div>
          </div>
        </div>
      </div>

      <!-- SIDE PANEL -->
      <div style="display:flex;flex-direction:column;gap:12px;overflow-y:auto">
        <!-- Planet info card -->
        <div class="card" style="padding:18px;flex-shrink:0" id="planet-info-card">
          <div style="font-size:9px;color:var(--text-2);font-family:var(--f-mono);letter-spacing:1px;margin-bottom:8px">SECTOR IDENTIFICATION</div>
          <div style="font-family:var(--f-display);font-size:20px;font-weight:700;margin-bottom:3px">Select a sector</div>
          <div style="font-size:11px;color:var(--text-2)">Click any planet node on the map to dock</div>
        </div>

        <!-- Asset index -->
        <div class="card" style="padding:16px;flex-shrink:0">
          <div style="font-size:9px;color:var(--primary);font-family:var(--f-mono);letter-spacing:1px;margin-bottom:10px">● ASSET BLOOMBERG INDEX</div>
          ${ASSETS.slice(0,5).map(a => {
            const chg = (((_prices[a.symbol] - a.basePrice) / a.basePrice)*100).toFixed(2);
            return `<div style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid var(--ghost)">
              <div style="display:flex;align-items:center;gap:8px">
                <span style="font-size:14px">${a.icon}</span>
                <div>
                  <div style="font-family:var(--f-mono);font-size:10px;font-weight:700;color:var(--primary)">${a.symbol}</div>
                  <div style="font-size:9px;color:var(--text-3)">${a.name}</div>
                </div>
              </div>
              <div style="text-align:right">
                <div style="font-family:var(--f-mono);font-size:11px;color:var(--text-0)">${(_prices[a.symbol]||a.basePrice).toLocaleString()}</div>
                <div style="font-family:var(--f-mono);font-size:10px;font-weight:700;color:${chg>=0?'var(--gain)':'var(--loss)'}">${chg>=0?'▲':'▼'} ${Math.abs(chg)}%</div>
              </div>
            </div>`;
          }).join('')}
        </div>

        <!-- Quick actions -->
        <div class="card" style="padding:16px;flex-shrink:0">
          <div style="font-size:9px;color:var(--text-2);font-family:var(--f-mono);letter-spacing:1px;margin-bottom:10px">QUICK ACTIONS</div>
          <div style="display:flex;flex-direction:column;gap:7px">
            <button class="btn btn-primary" style="width:100%;justify-content:space-between" onclick="goPage('trade')">
              <span>OPEN TRADE NODE</span><span>📊</span>
            </button>
            <button class="btn btn-ghost" style="width:100%;justify-content:space-between" onclick="goPage('knowledge')">
              <span>KNOWLEDGE BATTLE</span><span>🧠</span>
            </button>
            <button class="btn btn-ghost" style="width:100%;justify-content:space-between" onclick="goPage('missions')">
              <span>MISSION BOARD</span><span>⚡</span>
            </button>
          </div>
        </div>
      </div>
    </div>`;

  // Draw the galaxy
  _drawGalaxyCanvas();
  _drawPlanetNodes();
  selectPlanet('terra');
}

function _drawGalaxyCanvas() {
  const canvas = document.getElementById('galaxy-canvas');
  if (!canvas) return;
  const parent = canvas.parentElement;
  canvas.width  = (parent && parent.offsetWidth)  || 800;
  canvas.height = (parent && parent.offsetHeight) || 600;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;

  // Deep space background
  const bg = ctx.createRadialGradient(w*.5, h*.5, 0, w*.5, h*.5, Math.max(w,h)*.7);
  bg.addColorStop(0,   'rgba(15,15,35,1)');
  bg.addColorStop(0.5, 'rgba(8,8,20,1)');
  bg.addColorStop(1,   'rgba(0,0,0,1)');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Stars — three layers for depth
  const starLayers = [
    { count:200, minSize:.3, maxSize:.8, opacity:.6 },
    { count:80,  minSize:.8, maxSize:1.5, opacity:.8 },
    { count:20,  minSize:1.5, maxSize:2.5, opacity:1 },
  ];
  starLayers.forEach(layer => {
    for (let i = 0; i < layer.count; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = layer.minSize + Math.random() * (layer.maxSize - layer.minSize);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI*2);
      const brightness = Math.random();
      ctx.fillStyle = `rgba(${Math.round(180+brightness*75)},${Math.round(180+brightness*75)},${Math.round(220+brightness*35)},${layer.opacity * (.4 + brightness*.6)})`;
      ctx.fill();
    }
  });

  // Milky way band
  const milkyGrad = ctx.createLinearGradient(0, h*.2, w, h*.8);
  milkyGrad.addColorStop(0,   'rgba(108,178,255,0)');
  milkyGrad.addColorStop(0.3, 'rgba(108,178,255,0.025)');
  milkyGrad.addColorStop(0.5, 'rgba(173,137,255,0.04)');
  milkyGrad.addColorStop(0.7, 'rgba(108,178,255,0.025)');
  milkyGrad.addColorStop(1,   'rgba(108,178,255,0)');
  ctx.fillStyle = milkyGrad;
  ctx.fillRect(0, 0, w, h);

  // Nebula blobs
  const nebulas = [
    { x:.2, y:.3, rx:120, ry:80,  color:'rgba(108,178,255,0.04)' },
    { x:.75, y:.25, rx:100, ry:70,  color:'rgba(173,137,255,0.035)' },
    { x:.6, y:.7,  rx:140, ry:90,  color:'rgba(205,255,90,0.02)' },
    { x:.15, y:.75, rx:90,  ry:60,  color:'rgba(255,113,108,0.025)' },
  ];
  nebulas.forEach(n => {
    const grad = ctx.createRadialGradient(n.x*w, n.y*h, 0, n.x*w, n.y*h, Math.max(n.rx,n.ry));
    grad.addColorStop(0, n.color);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.save();
    ctx.scale(n.rx/Math.max(n.rx,n.ry), n.ry/Math.max(n.rx,n.ry));
    ctx.beginPath();
    ctx.arc(n.x*w * Math.max(n.rx,n.ry)/n.rx, n.y*h * Math.max(n.rx,n.ry)/n.ry, Math.max(n.rx,n.ry), 0, Math.PI*2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();
  });

  // Shooting star
  ctx.beginPath();
  ctx.moveTo(w*.1, h*.15);
  ctx.lineTo(w*.25, h*.18);
  const shootGrad = ctx.createLinearGradient(w*.1,h*.15,w*.25,h*.18);
  shootGrad.addColorStop(0,'rgba(255,255,255,0)');
  shootGrad.addColorStop(1,'rgba(255,255,255,0.4)');
  ctx.strokeStyle = shootGrad;
  ctx.lineWidth = 1;
  ctx.stroke();
}

function _drawPlanetNodes() {
  const container = document.getElementById('planet-nodes');
  if (!container) return;
  const parent = container.parentElement;
  const W = (parent && parent.offsetWidth) || 800;
  const H = (parent && parent.offsetHeight) || 600;
  const cx = W/2, cy = H/2;

  // Planet positions: center + 5 around 2 orbits
  const positions = [
    { cx: cx,      cy: cy-130, planet: PLANETS[0] }, // Terra - top
    { cx: cx+180,  cy: cy-60,  planet: PLANETS[1] }, // Mars - right top
    { cx: cx+160,  cy: cy+110, planet: PLANETS[2] }, // Jupiter - right bottom
    { cx: cx-60,   cy: cy+170, planet: PLANETS[3] }, // Europa - bottom
    { cx: cx-190,  cy: cy+60,  planet: PLANETS[4] }, // Saturn - left
    { cx: cx-80,   cy: cy-160, planet: PLANETS[5] }, // Void - top left
  ];

  // Draw trade routes on SVG
  const svg = document.getElementById('trade-routes');
  if (svg) {
    const routes = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,0],[0,2],[1,3]];
    svg.innerHTML = routes.map(([a,b]) => {
      const pa = positions[a], pb = positions[b];
      const done = AV.state.planetsDone[pa.planet.id]?.completed && AV.state.planetsDone[pb.planet.id]?.completed;
      return `<line x1="${pa.cx}" y1="${pa.cy}" x2="${pb.cx}" y2="${pb.cy}"
        stroke="${done?'rgba(108,178,255,0.2)':'rgba(108,178,255,0.06)'}"
        stroke-width="${done?1:.5}" stroke-dasharray="${done?'':'6 10'}"/>`;
    }).join('');
  }

  container.innerHTML = '';
  positions.forEach(({ cx: px, cy: py, planet: p }, i) => {
    const pdone  = AV.state.planetsDone[p.id]?.completed;
    const punlocked = i === 0 || AV.state.planetsDone[PLANETS[Math.max(0,i-1)].id]?.completed;

    // Sizes by orbit
    const size = i === 0 ? 72 : i <= 2 ? 64 : i <= 4 ? 58 : 52;

    const node = document.createElement('div');
    node.style.cssText = `
      position:absolute;
      left:${px - size/2}px; top:${py - size/2}px;
      width:${size}px; height:${size}px;
      cursor:${punlocked?'pointer':'not-allowed'};
      z-index:3;
    `;

    // Build SVG planet
    const colors = {
      terra:   { main:'#6cb2ff', dark:'#1a3a5c', glow:'rgba(108,178,255,0.5)' },
      mars:    { main:'#ff716c', dark:'#5c1a1a', glow:'rgba(255,113,108,0.5)' },
      jupiter: { main:'#ffd234', dark:'#5c4a1a', glow:'rgba(255,210,52,0.5)'  },
      europa:  { main:'#ad89ff', dark:'#2a1a5c', glow:'rgba(173,137,255,0.5)' },
      saturn:  { main:'#cdff5a', dark:'#2a5c1a', glow:'rgba(205,255,90,0.5)'  },
      void:    { main:'#6cb2ff', dark:'#0a0a1a', glow:'rgba(108,178,255,0.3)' },
    }[p.id] || { main:'#6cb2ff', dark:'#1a3a5c', glow:'rgba(108,178,255,0.5)' };

    const r = size/2;
    const locked = !punlocked;

    node.innerHTML = `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" style="overflow:visible">
        <defs>
          <radialGradient id="pg${i}" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stop-color="${colors.main}" stop-opacity="${locked?.3:.9}"/>
            <stop offset="60%" stop-color="${colors.dark}" stop-opacity="${locked?.2:.8}"/>
            <stop offset="100%" stop-color="#000" stop-opacity="1"/>
          </radialGradient>
          <radialGradient id="glow${i}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="${colors.main}" stop-opacity="${pdone?.4:punlocked?.25:0}"/>
            <stop offset="100%" stop-color="${colors.main}" stop-opacity="0"/>
          </radialGradient>
          <clipPath id="clip${i}"><circle cx="${r}" cy="${r}" r="${r-1}"/></clipPath>
        </defs>
        <!-- Outer glow -->
        <circle cx="${r}" cy="${r}" r="${r+8}" fill="url(#glow${i})"/>
        <!-- Planet body -->
        <circle cx="${r}" cy="${r}" r="${r-1}" fill="url(#pg${i})"/>
        <!-- Surface detail lines (atmosphere bands) -->
        ${!locked ? `
        <g clip-path="url(#clip${i})" opacity="0.15">
          <ellipse cx="${r}" cy="${r*.6}" rx="${r*.9}" ry="${r*.08}" fill="${colors.main}"/>
          <ellipse cx="${r}" cy="${r*1.1}" rx="${r*.7}" ry="${r*.06}" fill="${colors.main}"/>
          <ellipse cx="${r}" cy="${r*1.5}" rx="${r*.5}" ry="${r*.05}" fill="${colors.main}"/>
        </g>` : ''}
        <!-- Rings for Saturn -->
        ${p.id==='saturn'&&!locked ? `
        <ellipse cx="${r}" cy="${r}" rx="${r*1.5}" ry="${r*.2}" fill="none" stroke="${colors.main}" stroke-width="2" stroke-opacity=".4"/>
        <ellipse cx="${r}" cy="${r}" rx="${r*1.7}" ry="${r*.25}" fill="none" stroke="${colors.main}" stroke-width="1" stroke-opacity=".2"/>` : ''}
        <!-- Shine highlight -->
        ${!locked ? `<ellipse cx="${r*.6}" cy="${r*.45}" rx="${r*.22}" ry="${r*.14}" fill="white" opacity=".12"/>` : ''}
        <!-- Lock overlay -->
        ${locked ? `<circle cx="${r}" cy="${r}" r="${r-1}" fill="rgba(0,0,0,.65)"/><text x="${r}" y="${r+5}" text-anchor="middle" font-size="16" fill="rgba(255,255,255,.3)">🔒</text>` : ''}
        <!-- Completion checkmark -->
        ${pdone ? `<circle cx="${r+r*.4}" cy="${r-r*.4}" r="8" fill="#cdff5a"/><text x="${r+r*.4}" y="${r-r*.4+4}" text-anchor="middle" font-size="10" fill="#000">✓</text>` : ''}
        <!-- Pulse ring for current planet -->
        ${p.id===AV.state.currentPlanet ? `<circle cx="${r}" cy="${r}" r="${r+3}" fill="none" stroke="${colors.main}" stroke-width="1.5" stroke-opacity=".6" style="animation:pulse 2s ease infinite"/>` : ''}
      </svg>
      <div style="position:absolute;top:${size+6}px;left:50%;transform:translateX(-50%);white-space:nowrap;text-align:center">
        <div style="font-family:var(--f-display);font-size:10px;font-weight:700;letter-spacing:1px;color:${punlocked?colors.main:'var(--text-3)'}">${p.name}</div>
        <div style="font-family:var(--f-mono);font-size:8px;letter-spacing:1px;color:${punlocked?colors.main+'99':'var(--text-3)'}opacity:.7">${p.status}</div>
      </div>`;

    if (punlocked) {
      node.addEventListener('click', () => selectPlanet(p.id));
      node.addEventListener('mouseenter', () => { node.style.transform = 'scale(1.12)'; node.style.transition = 'transform .2s'; });
      node.addEventListener('mouseleave', () => { node.style.transform = 'scale(1)'; });
    } else {
      node.addEventListener('click', () => UI.toast('Complete previous sector to unlock!', 'loss'));
    }
    container.appendChild(node);
  });
}



function selectPlanet(id) {
  const p = PLANETS.find(x => x.id === id);
  if (!p) return;
  const card = document.getElementById('planet-info-card');
  if (!card) return;
  const pdone = AV.state.planetsDone[p.id]?.completed;
  const unlocked = id === 'terra' || AV.state.planetsDone[PLANETS[Math.max(0,PLANETS.findIndex(x=>x.id===id)-1)]?.id]?.completed;

  card.innerHTML = `
    <div style="font-size:9px;color:var(--text-2);font-family:var(--f-mono);letter-spacing:1px;margin-bottom:8px">SECTOR IDENTIFICATION</div>
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
      <span style="font-size:32px">${p.emoji}</span>
      <div>
        <div style="font-family:var(--f-display);font-size:18px;font-weight:700;color:${p.color}">${p.name}</div>
        <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono)">STATUS: <span style="color:${p.statusColor}">${p.status}</span></div>
      </div>
    </div>
    <div style="font-size:12px;color:var(--text-1);line-height:1.6;margin-bottom:14px">${p.desc}</div>
    <div style="background:var(--s-mid);border-radius:var(--r-sm);padding:10px;margin-bottom:14px">
      <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono);margin-bottom:3px">REAL FINANCIAL CONCEPT</div>
      <div style="font-size:12px;font-weight:600;color:${p.color}">${p.realConcept}</div>
    </div>
    ${pdone ? `<div style="background:rgba(205,255,90,.08);border:1px solid rgba(205,255,90,.2);border-radius:var(--r-md);padding:10px;margin-bottom:14px;text-align:center"><span style="color:var(--gain);font-family:var(--f-display);font-size:13px">✓ SECTOR CLEARED</span></div>` : ''}
    ${unlocked
      ? `<button class="btn btn-primary" style="width:100%;padding:12px" onclick="openPlanetModal('${id}')">DOCK AT STATION →</button>`
      : `<div style="text-align:center;padding:12px;background:rgba(255,113,108,.08);border-radius:var(--r-md);border:1px solid rgba(255,113,108,.2);font-size:12px;color:var(--loss)">🔒 SECTOR LOCKED — Complete previous mission</div>`
    }`;
}

/* ══════════════════════════════════════════════════════════
   PLANET MISSION MODAL
══════════════════════════════════════════════════════════ */
let _qIdx = 0, _qScore = 0, _qSel = null, _qTimer = null;

function openPlanetModal(id) {
  const p = PLANETS.find(x => x.id === id);
  const prog = AV.state.planetsDone[id] || {};
  UI.openModal({
    accent: p.color, wide: true,
    content: el => renderPlanetModal(id, prog.lessonRead && !prog.completed ? 'quiz' : prog.completed ? 'done' : 'lesson', el)
  });
}

function renderPlanetModal(id, view, container) {
  const p = PLANETS.find(x => x.id === id);
  const prog = AV.state.planetsDone[id] || {};
  if (!container) container = document.getElementById('modal-inner');
  if (!container) return;

  const header = `
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px">
      <div style="width:54px;height:54px;border-radius:14px;background:${p.color}22;border:1px solid ${p.color}44;display:flex;align-items:center;justify-content:center;font-size:28px">${p.emoji}</div>
      <div style="flex:1">
        <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono);letter-spacing:1px">${p.realConcept.toUpperCase()}</div>
        <div style="font-family:var(--f-display);font-size:22px;font-weight:700;color:${p.color};letter-spacing:.5px">${p.name}</div>
      </div>
      <div style="display:flex;gap:6px">
        <button onclick="renderPlanetModal('${id}','lesson')" style="padding:6px 14px;border-radius:var(--r-pill);border:1px solid ${view==='lesson'?p.color:'var(--ghost)'};background:${view==='lesson'?p.color+'22':'transparent'};color:${view==='lesson'?p.color:'var(--text-2)'};font-size:11px;font-weight:700;cursor:pointer;font-family:var(--f-display)">LESSON</button>
        <button id="quiz-tab" style="padding:6px 14px;border-radius:var(--r-pill);border:1px solid ${view==='quiz'?p.color:'var(--ghost)'};background:${view==='quiz'?p.color+'22':'transparent'};color:${view==='quiz'?p.color:'var(--text-2)'};font-size:11px;font-weight:700;cursor:pointer;opacity:${prog.lessonRead?1:.4};font-family:var(--f-display)" data-id="${id}" data-lr="${prog.lessonRead?1:0}">QUIZ</button>
      </div>
    </div>`;

  if (view === 'done') {
    container.innerHTML = header + `
      <div style="text-align:center;padding:24px 0">
        <div style="font-size:60px;margin-bottom:14px">🏆</div>
        <div style="font-family:var(--f-display);font-size:24px;color:${p.color};margin-bottom:8px;letter-spacing:1px">SECTOR CLEARED!</div>
        <div style="color:var(--text-2);margin-bottom:24px">Mission accomplished. Pilot rank increased.</div>
        <button class="btn btn-primary" onclick="UI.closeModal()">CONTINUE MISSION →</button>
      </div>`;
    return;
  }

  if (view === 'lesson') {
    AV.markLessonRead(id);
    container.innerHTML = header + `
      <div style="background:${p.color}0d;border:1px solid ${p.color}22;border-radius:var(--r-md);padding:16px;margin-bottom:16px;font-size:13.5px;line-height:1.75;color:var(--text-0)">${p.lesson}</div>
      <div style="font-size:9px;color:var(--text-2);font-family:var(--f-mono);letter-spacing:2px;margin-bottom:10px">MISSION BRIEFING — KEY INTELLIGENCE</div>
      <div style="display:flex;flex-direction:column;gap:7px;margin-bottom:22px">
        ${p.keyPoints.map(kp=>`
          <div style="display:flex;gap:10px;padding:10px 14px;background:var(--s-mid);border-radius:var(--r-md);font-size:12.5px;line-height:1.5;border:1px solid var(--ghost)">
            <span style="color:${p.color};font-weight:700;flex-shrink:0;font-family:var(--f-mono)">▶</span><span>${kp}</span>
          </div>`).join('')}
      </div>
      <div style="background:var(--s-mid);border-radius:var(--r-md);padding:14px;margin-bottom:20px;border:1px solid var(--ghost)">
        <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono);margin-bottom:5px">FINANCE MASTER — ${p.master.toUpperCase()}</div>
        <div style="font-size:12.5px;color:var(--text-1);font-style:italic">${p.masterQuote}</div>
      </div>
      <button class="btn btn-primary btn-lg" style="width:100%" onclick="renderPlanetModal('${id}','quiz')">
        PROCEED TO KNOWLEDGE BATTLE →
      </button>`;
    setTimeout(() => {
      const qt = document.getElementById('quiz-tab');
      if (qt) qt.onclick = () => renderPlanetModal(id, 'quiz');
    }, 10);
    return;
  }

  if (view === 'quiz') {
    _qIdx = 0; _qScore = 0; _qSel = null;
    renderQuizQuestion(id, container, header);
  }
}

function renderQuizQuestion(id, container, header) {
  const p = PLANETS.find(x => x.id === id);
  const q = p.quiz[_qIdx];
  if (!container) container = document.getElementById('modal-inner');
  if (!container) return;

  container.innerHTML = header + `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
      <div style="font-family:var(--f-mono);font-size:10px;color:var(--text-3)">QUESTION ${_qIdx+1} / ${p.quiz.length}</div>
      ${UI.bar({pct:(_qIdx/p.quiz.length)*100,cls:'fill-primary',h:3})}
    </div>
    <div style="font-family:var(--f-display);font-size:20px;font-weight:700;margin-bottom:20px;line-height:1.3;letter-spacing:.3px">${q.q}</div>
    <div id="quiz-opts">
      ${q.opts.map((opt,i)=>`
        <button id="qo-${i}" onclick="handleQuizAnswer('${id}',${i},${q.a})"
          style="width:100%;display:block;text-align:left;padding:13px 16px;background:var(--s-mid);border:1px solid var(--ghost);border-radius:var(--r-md);color:var(--text-0);font-size:13px;font-weight:500;cursor:pointer;transition:all .15s;margin-bottom:8px;font-family:var(--f-body)">
          <span style="font-family:var(--f-mono);color:${p.color};margin-right:10px;font-size:11px">${String.fromCharCode(65+i)}.</span>${opt}
        </button>`).join('')}
    </div>`;
}

function handleQuizAnswer(id, chosen, correct) {
  if (_qSel !== null) return;
  _qSel = chosen;
  const p = PLANETS.find(x => x.id === id);
  if (chosen === correct) _qScore++;
  for (let i = 0; i < p.quiz[_qIdx].opts.length; i++) {
    const btn = document.getElementById(`qo-${i}`);
    if (!btn) continue;
    if (i === correct) { btn.style.background='rgba(205,255,90,.15)'; btn.style.borderColor='var(--gain)'; btn.style.color='var(--gain)'; }
    else if (i === chosen) { btn.style.background='rgba(255,113,108,.15)'; btn.style.borderColor='var(--loss)'; btn.style.color='var(--loss)'; }
    btn.disabled = true;
  }
  setTimeout(() => {
    _qSel = null;
    if (_qIdx < p.quiz.length - 1) { _qIdx++; renderQuizQuestion(id, document.getElementById('modal-inner'), getModalHeader(id)); }
    else showQuizResult(id);
  }, 900);
}

function getModalHeader(id) {
  const p = PLANETS.find(x => x.id === id);
  return `<div style="display:flex;align-items:center;gap:14px;margin-bottom:20px">
    <div style="width:54px;height:54px;border-radius:14px;background:${p.color}22;border:1px solid ${p.color}44;display:flex;align-items:center;justify-content:center;font-size:28px">${p.emoji}</div>
    <div><div style="font-family:var(--f-display);font-size:22px;font-weight:700;color:${p.color}">${p.name}</div></div>
  </div>`;
}

function showQuizResult(id) {
  const p = PLANETS.find(x => x.id === id);
  const perfect = _qScore === p.quiz.length;
  const c = document.getElementById('modal-inner');
  if (!c) return;
  c.innerHTML = `
    <div style="text-align:center;padding:24px 0">
      <div style="font-size:64px;margin-bottom:14px">${perfect?'🏆':_qScore>0?'⭐':'💪'}</div>
      <div style="font-family:var(--f-display);font-size:26px;font-weight:700;letter-spacing:2px;color:${p.color};margin-bottom:6px">
        ${perfect?'MISSION SUCCESS':_qScore>0?'OBJECTIVE MET':'KEEP TRAINING'}
      </div>
      <div style="color:var(--text-2);margin-bottom:24px;font-family:var(--f-mono);font-size:12px">${_qScore}/${p.quiz.length} CORRECT · ACCURACY: ${Math.round(_qScore/p.quiz.length*100)}%</div>
      <div style="display:flex;justify-content:center;gap:16px;margin-bottom:28px">
        <div style="padding:16px 24px;background:rgba(205,255,90,.08);border:1px solid rgba(205,255,90,.2);border-radius:var(--r-md);text-align:center">
          <div style="font-family:var(--f-mono);font-size:28px;font-weight:700;color:var(--gain)">+${p.xp}</div>
          <div style="font-size:10px;color:var(--text-3);font-family:var(--f-mono);margin-top:3px">XP EARNED</div>
        </div>
        <div style="padding:16px 24px;background:rgba(108,178,255,.08);border:1px solid rgba(108,178,255,.2);border-radius:var(--r-md);text-align:center">
          <div style="font-family:var(--f-mono);font-size:28px;font-weight:700;color:var(--primary)">+${p.credits}</div>
          <div style="font-size:10px;color:var(--text-3);font-family:var(--f-mono);margin-top:3px">CREDITS</div>
        </div>
      </div>
      <button class="btn btn-primary btn-lg" style="width:100%" onclick="AV.completePlanet('${id}',${p.xp},${p.credits});UI.closeModal()">
        CLAIM REWARDS & DOCK ✓
      </button>
    </div>`;
}

/* ══════════════════════════════════════════════════════════
   TRADE — Mars Exchange
══════════════════════════════════════════════════════════ */
function initTrade() {
  if (_priceInterval) clearInterval(_priceInterval);
  initPrices();
  const s = AV.state;
  const holdings = s.portfolio.holdings;
  const totalVal = holdings.reduce((a,h)=>a+(_prices[h.symbol]||0)*h.qty,0);
  const costVal  = holdings.reduce((a,h)=>a+h.avgPrice*h.qty,0);
  const pnl = Math.round(totalVal - costVal);

  document.getElementById('screen-trade').innerHTML = `
    ${UI.buildTicker()}
    <div class="topbar">
      <div>
        <div class="topbar-sub">● MARS EXCHANGE / SECTOR 7G · LIVE NEURAL FEED</div>
        <div class="topbar-title">TRADE NODE</div>
      </div>
      <div style="text-align:right">
        <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono)">AVAILABLE CREDIT</div>
        <div style="font-family:var(--f-mono);font-size:20px;font-weight:700;color:var(--gain)">${s.credits.toLocaleString()} CR</div>
      </div>
    </div>

    <!-- Portfolio hero -->
    <div class="card" style="padding:20px;margin-bottom:20px;background:linear-gradient(135deg,var(--s-low),var(--s-mid))">
      <div class="grid-4">
        <div style="text-align:center">
          <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono);margin-bottom:6px">CASH</div>
          <div style="font-family:var(--f-mono);font-size:20px;font-weight:700;color:var(--gain)">${AV.formatCR(s.credits)}</div>
        </div>
        <div style="text-align:center">
          <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono);margin-bottom:6px">HOLDINGS VALUE</div>
          <div style="font-family:var(--f-mono);font-size:20px;font-weight:700;color:var(--primary)">${AV.formatCR(Math.round(totalVal))}</div>
        </div>
        <div style="text-align:center">
          <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono);margin-bottom:6px">TOTAL NET WORTH</div>
          <div style="font-family:var(--f-mono);font-size:20px;font-weight:700;color:var(--text-0)">${AV.formatCR(AV.netWorth())}</div>
        </div>
        <div style="text-align:center">
          <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono);margin-bottom:6px">UNREALISED P&L</div>
          <div class="pnl ${pnl>=0?'pos':'neg'}" id="live-pnl" style="font-size:20px">${pnl>=0?'+':''}${pnl.toLocaleString()} CR</div>
        </div>
      </div>
    </div>

    <div class="grid-2" style="gap:20px">
      <!-- Market -->
      <div>
        <div style="font-size:9px;color:var(--primary);font-family:var(--f-mono);letter-spacing:2px;margin-bottom:12px">● LIVE MARKET — NSE SIMULATED</div>
        <div class="card" style="padding:0;overflow:hidden">
          <div style="padding:12px 16px;border-bottom:1px solid var(--ghost);display:grid;grid-template-columns:1fr 90px 70px 80px 80px;gap:8px">
            ${['ASSET','PRICE','24H','ACTIVITY','ACTION'].map(h=>`<div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono)">${h}</div>`).join('')}
          </div>
          ${ASSETS.map(a => {
            const chg = ((((_prices[a.symbol]||a.basePrice) - a.basePrice) / a.basePrice)*100).toFixed(2);
            return `
              <div style="padding:12px 16px;border-bottom:1px solid var(--ghost);display:grid;grid-template-columns:1fr 90px 70px 80px 80px;gap:8px;align-items:center;transition:background .15s;cursor:pointer" onmouseenter="this.style.background='var(--s-mid)'" onmouseleave="this.style.background=''" onclick="openBuyModal('${a.symbol}')">
                <div style="display:flex;align-items:center;gap:8px">
                  <span style="font-size:16px">${a.icon}</span>
                  <div>
                    <div style="font-family:var(--f-mono);font-size:11px;font-weight:700;color:var(--primary)">${a.symbol}</div>
                    <div style="font-size:10px;color:var(--text-3)">${a.name}</div>
                  </div>
                </div>
                <div class="trade-price" id="price-${a.symbol}" data-prev="${_prices[a.symbol]}" style="font-family:var(--f-mono);font-size:13px;font-weight:700">${(_prices[a.symbol]||a.basePrice).toLocaleString()}</div>
                <div class="trade-change ${chg>=0?'up':'dn'}" id="chg-${a.symbol}">${chg>=0?'+':''}${chg}%</div>
                <canvas id="spark-${a.symbol}" width="80" height="30" style="width:80px;height:30px"></canvas>
                <button onclick="event.stopPropagation();openBuyModal('${a.symbol}')" class="btn btn-ghost btn-sm" style="font-size:10px">BUY</button>
              </div>`;
          }).join('')}
        </div>
        <!-- Broker NPC -->
        <div class="card" style="padding:16px;margin-top:14px;background:rgba(108,178,255,.04)">
          <div style="font-size:9px;color:var(--primary);font-family:var(--f-mono);letter-spacing:1px;margin-bottom:8px">BROKER X-47 PROTOCOL · EXPERT ADVISORY</div>
          <div style="font-size:12px;color:var(--text-1);line-height:1.6;font-style:italic">"Commander, the market rewards the patient. Buy quality assets at good prices and hold. Ignore the noise. The dip is not your enemy — panic is."</div>
        </div>
      </div>

      <!-- Portfolio + History -->
      <div>
        <div style="font-size:9px;color:var(--text-2);font-family:var(--f-mono);letter-spacing:2px;margin-bottom:12px">CARGO MANIFEST</div>
        <div id="holdings-section" style="margin-bottom:16px"></div>
        <div style="font-size:9px;color:var(--text-2);font-family:var(--f-mono);letter-spacing:2px;margin-bottom:12px">TRADE HISTORY</div>
        <div id="trade-history-section" style="max-height:300px;overflow-y:auto"></div>
      </div>
    </div>`;

  // Draw sparklines
  setTimeout(() => {
    ASSETS.forEach(a => drawSpark('spark-'+a.symbol, _priceHistory[a.symbol]));
    renderHoldings();
    renderTradeHistory();
  }, 50);

  // Start live prices
  _priceInterval = setInterval(tickPrices, 2000);
}

function renderHoldings() {
  const el = document.getElementById('holdings-section');
  if (!el) return;
  const holdings = AV.state.portfolio.holdings;
  if (holdings.length === 0) {
    el.innerHTML = `<div style="padding:24px;text-align:center;background:var(--s-mid);border-radius:var(--r-lg);border:2px dashed var(--ghost)">
      <div style="font-size:32px;margin-bottom:8px">📊</div>
      <div style="font-family:var(--f-display);font-size:14px;letter-spacing:1px;color:var(--text-2)">NO HOLDINGS YET</div>
      <div style="font-size:11px;color:var(--text-3);margin-top:4px">Select an asset and execute your first trade</div>
    </div>`;
    return;
  }
  el.innerHTML = holdings.map(h => {
    const cur = _prices[h.symbol] || h.avgPrice;
    const pnl = Math.round((cur - h.avgPrice) * h.qty);
    const pct = ((pnl / (h.avgPrice * h.qty)) * 100).toFixed(1);
    return `<div class="card" style="padding:14px;margin-bottom:8px;border-color:${pnl>=0?'rgba(205,255,90,.2)':'rgba(255,113,108,.2)'}">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <div>
          <span style="font-family:var(--f-mono);font-weight:700;color:var(--primary)">${h.symbol}</span>
          <span style="font-size:10px;color:var(--text-3);margin-left:8px;font-family:var(--f-mono)">×${h.qty} units</span>
        </div>
        <div class="pnl ${pnl>=0?'pos':'neg'}" style="font-size:18px">${pnl>=0?'+':''}${pnl.toLocaleString()} CR</div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text-3);font-family:var(--f-mono);margin-bottom:10px">
        <span>AVG BUY: ${h.avgPrice.toLocaleString()}</span>
        <span>CURRENT: ${cur.toLocaleString()}</span>
        <span style="color:${pnl>=0?'var(--gain)':'var(--loss)'}">${pnl>=0?'+':''}${pct}%</span>
      </div>
      <button onclick="openSellModal('${h.symbol}')" class="btn btn-loss btn-sm" style="width:100%">SELL ${h.symbol}</button>
    </div>`;
  }).join('');
}

function renderTradeHistory() {
  const el = document.getElementById('trade-history-section');
  if (!el) return;
  const hist = AV.state.portfolio.tradeHistory;
  if (hist.length === 0) {
    el.innerHTML = `<div style="font-size:11px;color:var(--text-3);font-family:var(--f-mono);text-align:center;padding:12px">NO TRADES EXECUTED</div>`;
    return;
  }
  el.innerHTML = hist.slice(0,12).map(UI.txItem).join('');
}

function openBuyModal(symbol) {
  const a = ASSETS.find(x=>x.symbol===symbol);
  if (!a) return;
  const cur = _prices[symbol] || a.basePrice;
  const cash = AV.state.credits;
  const maxQty = Math.floor(cash / cur);

  UI.openModal({ accent:'var(--primary)', content: el => {
    el.innerHTML = `
      <div style="font-family:var(--f-display);font-size:24px;font-weight:700;color:var(--primary);margin-bottom:2px">${a.symbol}</div>
      <div style="font-size:12px;color:var(--text-2);margin-bottom:20px">${a.name} · ${a.sector}</div>
      <div class="grid-3" style="margin-bottom:18px">
        <div style="padding:14px;background:var(--s-mid);border-radius:var(--r-md);text-align:center">
          <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono)">LIVE PRICE</div>
          <div style="font-family:var(--f-mono);font-size:22px;font-weight:700;color:var(--primary);margin-top:4px">${cur.toLocaleString()}</div>
        </div>
        <div style="padding:14px;background:var(--s-mid);border-radius:var(--r-md);text-align:center">
          <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono)">YOUR CASH</div>
          <div style="font-family:var(--f-mono);font-size:22px;font-weight:700;color:var(--gain);margin-top:4px">${AV.formatCR(cash)}</div>
        </div>
        <div style="padding:14px;background:var(--s-mid);border-radius:var(--r-md);text-align:center">
          <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono)">MAX BUY</div>
          <div style="font-family:var(--f-mono);font-size:22px;font-weight:700;color:var(--secondary);margin-top:4px">${maxQty}</div>
        </div>
      </div>
      <div style="display:flex;gap:6px;margin-bottom:8px">
        ${[1,Math.max(1,Math.floor(maxQty*.25)),Math.max(1,Math.floor(maxQty*.5)),maxQty].filter((v,i,a)=>a.indexOf(v)===i&&v>0).map(q=>`<button class="btn btn-ghost btn-sm" onclick="document.getElementById('buy-qty').value=${q};updateBuyTotal(${cur})">×${q}</button>`).join('')}
      </div>
      <input id="buy-qty" class="input" type="number" min="1" max="${maxQty}" value="1" style="margin-bottom:6px" oninput="updateBuyTotal(${cur})"/>
      <div id="buy-total" style="font-family:var(--f-mono);font-size:12px;color:var(--primary);margin-bottom:18px">Total: ${cur.toLocaleString()} CR</div>
      <button class="btn btn-primary btn-lg" style="width:100%" onclick="executeBuy('${symbol}',${cur})">
        EXECUTE BUY ORDER →
      </button>`;
  }});
}

function updateBuyTotal(price) {
  const q = parseInt(document.getElementById('buy-qty')?.value)||0;
  const el = document.getElementById('buy-total');
  if (el) el.textContent = `Total: ${(q*price).toLocaleString()} CR · Remaining: ${(AV.state.credits - q*price).toLocaleString()} CR`;
}

function executeBuy(symbol, price) {
  const qty = parseInt(document.getElementById('buy-qty')?.value)||0;
  if (qty <= 0) { UI.toast('Enter quantity','loss'); return; }
  if (AV.buy(symbol, qty, price)) {
    UI.closeModal();
    UI.toast(`📈 BOUGHT ${qty}× ${symbol}`, 'gain');
    UI.creditsBurst(20);
    setTimeout(()=>{ renderHoldings(); renderTradeHistory(); }, 100);
  } else { UI.toast('INSUFFICIENT CREDITS','loss'); }
}

function openSellModal(symbol) {
  const a = ASSETS.find(x=>x.symbol===symbol);
  const h = AV.state.portfolio.holdings.find(x=>x.symbol===symbol);
  if (!a||!h) return;
  const cur = _prices[symbol]||a.basePrice;
  const pnl = Math.round((cur-h.avgPrice)*h.qty);
  UI.openModal({ accent: pnl>=0?'var(--gain)':'var(--loss)', content: el => {
    el.innerHTML = `
      <div style="font-family:var(--f-display);font-size:24px;font-weight:700;color:var(--loss);margin-bottom:16px">SELL ${symbol}</div>
      <div style="padding:16px;background:var(--s-mid);border-radius:var(--r-lg);border:1px solid ${pnl>=0?'rgba(205,255,90,.2)':'rgba(255,113,108,.2)'};margin-bottom:18px">
        <div class="grid-3" style="text-align:center">
          <div><div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono)">HOLDING</div><div style="font-family:var(--f-mono);font-size:20px;font-weight:700;color:var(--primary);margin-top:4px">${h.qty}</div></div>
          <div><div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono)">P&L</div><div class="pnl ${pnl>=0?'pos':'neg'}" style="font-size:20px;margin-top:4px">${pnl>=0?'+':''}${pnl.toLocaleString()}</div></div>
          <div><div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono)">RETURN</div><div style="font-family:var(--f-mono);font-size:20px;font-weight:700;color:${pnl>=0?'var(--gain)':'var(--loss)'};margin-top:4px">${((pnl/h.avgPrice/h.qty)*100).toFixed(1)}%</div></div>
        </div>
      </div>
      <input id="sell-qty" class="input" type="number" min="1" max="${h.qty}" value="${h.qty}" style="margin-bottom:18px"/>
      <button class="btn btn-loss btn-lg" style="width:100%" onclick="executeSell('${symbol}',${cur})">CONFIRM SELL ORDER</button>`;
  }});
}

function executeSell(symbol, price) {
  const qty = parseInt(document.getElementById('sell-qty')?.value)||0;
  const h = AV.state.portfolio.holdings.find(x=>x.symbol===symbol);
  if (!h||qty<=0||qty>h.qty) { UI.toast('Invalid quantity','loss'); return; }
  const result = AV.sell(symbol, qty, price);
  if (result) {
    UI.closeModal();
    if (result.pnl >= 0) { UI.toast(`✅ PROFIT: +${Math.round(result.pnl).toLocaleString()} CR`, 'gain'); UI.creditsBurst(30); }
    else { UI.toast(`SOLD AT LOSS: ${Math.round(result.pnl).toLocaleString()} CR`, 'loss'); }
    setTimeout(()=>{ renderHoldings(); renderTradeHistory(); }, 100);
  }
}


/* ══════════════════════════════════════════════════════════
   SHIP GARAGE
══════════════════════════════════════════════════════════ */
function initShip() {
  const s = AV.state;
  const ship = s.ship;

  document.getElementById('screen-ship').innerHTML = `
    <div class="topbar">
      <div>
        <div class="topbar-sub">ORBITAL COMMAND · VESSEL REGISTRY · HANGAR BAY 7</div>
        <div class="topbar-title">HANGAR</div>
      </div>
      <div style="background:rgba(108,178,255,.08);border:1px solid var(--ghost-2);border-radius:var(--r-md);padding:8px 16px;text-align:right">
        <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono)">STATUS</div>
        <div style="font-size:12px;font-weight:700;color:var(--gain);font-family:var(--f-display);letter-spacing:1px">${ship.tier < 3 ? 'OPERATIONAL' : ship.tier < 5 ? 'COMBAT READY' : 'FLAGSHIP STATUS'}</div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 340px;gap:20px">

      <!-- LEFT: Ship visual + stats -->
      <div>
        <div class="card" style="padding:0;overflow:hidden;margin-bottom:16px">
          <!-- Ship header -->
          <div style="padding:20px 24px 0;display:flex;justify-content:space-between;align-items:flex-start">
            <div>
              <div style="font-size:9px;color:var(--primary);font-family:var(--f-mono);letter-spacing:2px">TIER ${ship.tier} VESSEL</div>
              <div style="font-family:var(--f-display);font-size:26px;font-weight:700;letter-spacing:1px;margin-top:4px">
                LEVEL <span style="color:var(--primary)">${s.level}</span> ${ship.name.toUpperCase()}
              </div>
              <div style="font-size:10px;color:var(--text-3);font-family:var(--f-mono);margin-top:3px">REGISTRY ID: AV-${String(s.level).padStart(4,'0')}-DELTA · CLASS: ${['','SCOUT','FREIGHTER','CRUISER','BATTLESHIP','FLAGSHIP'][ship.tier]}</div>
            </div>
          </div>

          <!-- Ship SVG display -->
          <div style="position:relative;height:280px;background:radial-gradient(ellipse at 50% 60%,rgba(10,15,35,1) 0%,rgba(0,0,0,1) 100%);overflow:hidden">
            <!-- Space background stars -->
            <div id="ship-starfield" style="position:absolute;inset:0"></div>
            <!-- Ship SVG centered -->
            <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">
              ${_buildShipSVG(ship.tier)}
            </div>
            <!-- Tooltip badges -->
            <div style="position:absolute;top:20px;right:20px;background:rgba(0,0,0,.7);border:1px solid var(--ghost-2);padding:6px 12px;border-radius:var(--r-sm);backdrop-filter:blur(8px)">
              <div style="font-size:9px;color:var(--primary);font-family:var(--f-mono)">HYPER-DRIVE MODULE V${ship.tier}</div>
            </div>
            <div style="position:absolute;bottom:20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.7);border:1px solid var(--ghost-2);padding:5px 14px;border-radius:var(--r-sm);backdrop-filter:blur(8px)">
              <div style="font-size:9px;color:var(--text-1);font-family:var(--f-mono)">REINFORCED CARGO BAY 0${ship.tier}</div>
            </div>
          </div>

          <!-- Ship stats -->
          <div style="padding:20px 24px 24px">
            ${[
              {label:'ENGINE POWER', key:'engine', color:'var(--primary)', real:'Income generating ability'},
              {label:'CARGO HOLD',   key:'cargo',  color:'var(--gain)',    real:'Investment capacity & diversification'},
              {label:'SHIELDS',      key:'shields', color:'var(--secondary)', real:'Emergency fund & risk protection'},
              {label:'NAVIGATION',   key:'navigation', color:'var(--warn)', real:'Financial literacy & IQ score'},
            ].map(stat=>`
              <div style="margin-bottom:16px">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                  <div>
                    <span style="font-family:var(--f-mono);font-size:10px;letter-spacing:1px;color:${stat.color};font-weight:700">${stat.label}</span>
                    <span style="font-size:10px;color:var(--text-3);margin-left:8px">${stat.real}</span>
                  </div>
                  <span style="font-family:var(--f-mono);font-size:12px;font-weight:700;color:${stat.color}">${ship[stat.key]}%</span>
                </div>
                <div class="track" style="height:8px">
                  <div class="fill" style="width:${ship[stat.key]}%;height:100%;background:linear-gradient(90deg,${stat.color}99,${stat.color})"></div>
                </div>
              </div>`).join('')}
          </div>
        </div>
      </div>

      <!-- RIGHT: Evolution + upgrades -->
      <div style="display:flex;flex-direction:column;gap:14px">

        <!-- Evolution path -->
        <div class="card" style="padding:20px">
          <div style="font-size:9px;color:var(--primary);font-family:var(--f-mono);letter-spacing:2px;margin-bottom:20px">SHIP EVOLUTION PATH</div>
          <div style="display:flex;align-items:center;justify-content:space-between;position:relative;padding:0 8px">
            <!-- Progress line -->
            <div style="position:absolute;top:28px;left:8px;right:8px;height:2px;background:var(--s-high)"></div>
            <div style="position:absolute;top:28px;left:8px;height:2px;width:${Math.max(0,(ship.tier-1)/4*100)}%;background:linear-gradient(90deg,var(--primary),var(--secondary));transition:width 1s ease"></div>
            ${['Broken\nShuttle','Patched\nFreighter','Merchant\nCruiser','Trade\nBattleship','Galaxy\nFlagship'].map((name,i)=>`
              <div style="display:flex;flex-direction:column;align-items:center;z-index:1;width:52px">
                <div style="width:56px;height:56px;border-radius:50%;
                  background:${i<ship.tier-1?'linear-gradient(135deg,var(--primary),var(--secondary))':i===ship.tier-1?'linear-gradient(135deg,rgba(108,178,255,.3),rgba(173,137,255,.2))':'var(--s-high)'};
                  border:2px solid ${i===ship.tier-1?'var(--primary)':i<ship.tier-1?'rgba(108,178,255,.5)':'var(--ghost)'};
                  display:flex;align-items:center;justify-content:center;font-size:18px;
                  box-shadow:${i===ship.tier-1?'0 0 20px rgba(108,178,255,.4)':'none'};
                  transition:all .3s">
                  ${i<ship.tier-1?'✓':['🛸','🚀','✈️','⚔️','👑'][i]}
                </div>
                <div style="font-size:8px;font-family:var(--f-mono);color:${i===ship.tier-1?'var(--primary)':'var(--text-3)'};margin-top:6px;text-align:center;line-height:1.3">${name.replace('\n','<br/>')}</div>
                ${i===ship.tier-1?`<div style="font-size:7px;color:var(--gain);font-family:var(--f-mono);margin-top:2px">ACTIVE</div>`:''}
              </div>`).join('')}
          </div>
        </div>

        <!-- Next upgrade -->
        <div class="card" style="padding:20px;background:rgba(108,178,255,.04)">
          <div style="font-size:9px;color:var(--primary);font-family:var(--f-mono);letter-spacing:1px;margin-bottom:12px">UPGRADE REQUIREMENT</div>
          ${ship.tier < 5 ? `
            <div style="font-family:var(--f-display);font-size:18px;font-weight:700;letter-spacing:.5px;margin-bottom:6px">${['','','MERCHANT CRUISER','TRADE BATTLESHIP','GALAXY FLAGSHIP'][ship.tier]}</div>
            <div style="font-size:11px;color:var(--text-2);margin-bottom:12px;line-height:1.6">Reach Commander Level ${ship.tier * 3 + 1}.<br/>Complete ${ship.tier} planet missions.</div>
            ${UI.bar({pct:(s.level/(ship.tier*3+1))*100,cls:'fill-primary',h:6})}
            <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono);margin-top:6px">LVL ${s.level} / ${ship.tier*3+1} REQUIRED</div>
          ` : `
            <div style="font-family:var(--f-display);font-size:18px;color:var(--gain)">MAXIMUM TIER ACHIEVED</div>
            <div style="font-size:11px;color:var(--text-2);margin-top:6px">Galaxy Flagship — the pinnacle of interstellar command vessels.</div>
          `}
        </div>

        <!-- Finance mapping -->
        <div class="card" style="padding:20px">
          <div style="font-size:9px;color:var(--text-2);font-family:var(--f-mono);letter-spacing:1px;margin-bottom:12px">WHAT YOUR SHIP STATS MEAN</div>
          ${[
            { icon:'⚡', stat:'Engine',    meaning:'Your income-generating ability. Better engine = more profitable trades.' },
            { icon:'📦', stat:'Cargo Hold', meaning:'How much you can invest at once. Bigger hold = more diversified portfolio.' },
            { icon:'🛡️', stat:'Shields',   meaning:'Your emergency fund strength. Better shields = survive any market crash.' },
            { icon:'🧭', stat:'Navigation', meaning:'Your financial knowledge score. Higher = better decisions, better returns.' },
          ].map(x=>`
            <div style="display:flex;gap:10px;padding:9px 0;border-bottom:1px solid var(--ghost)">
              <span style="font-size:16px;flex-shrink:0;margin-top:1px">${x.icon}</span>
              <div><strong style="font-size:11px;color:var(--text-0)">${x.stat}</strong>
              <div style="font-size:10px;color:var(--text-2);margin-top:2px">${x.meaning}</div></div>
            </div>`).join('')}
        </div>
      </div>
    </div>`;

  // Draw starfield in ship view
  _buildShipStarfield();
}

function _buildShipSVG(tier) {
  const ships = {
    1: `<!-- Broken Shuttle: small, battered, asymmetric -->
<svg width="280" height="160" viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 0 20px rgba(108,178,255,0.3))">
  <defs>
    <linearGradient id="hull1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2a3a5c"/><stop offset="100%" stop-color="#0a0f1e"/></linearGradient>
    <linearGradient id="eng1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#6cb2ff" stop-opacity="0.8"/><stop offset="100%" stop-color="#6cb2ff" stop-opacity="0"/></linearGradient>
  </defs>
  <!-- Engine glow -->
  <ellipse cx="42" cy="80" rx="28" ry="12" fill="#6cb2ff" opacity="0.15" style="animation:pulse 1.5s ease infinite"/>
  <!-- Main hull -->
  <path d="M60,55 L220,68 L240,80 L220,92 L60,105 L40,80 Z" fill="url(#hull1)" stroke="#3a5a8c" stroke-width="1"/>
  <!-- Cockpit -->
  <ellipse cx="210" cy="80" rx="22" ry="14" fill="#1a2a4a" stroke="#6cb2ff" stroke-width="1" stroke-opacity="0.5"/>
  <ellipse cx="212" cy="79" rx="14" ry="9" fill="#0d1f3a" stroke="#6cb2ff" stroke-width="0.5" stroke-opacity="0.4"/>
  <!-- Wing -->
  <path d="M120,68 L140,45 L160,68" fill="#1a2a4a" stroke="#3a5a8c" stroke-width="1"/>
  <path d="M120,92 L140,115 L160,92" fill="#1a2a4a" stroke="#3a5a8c" stroke-width="1"/>
  <!-- Engine -->
  <rect x="38" y="70" width="28" height="20" rx="4" fill="#0d1a30" stroke="#3a5a8c" stroke-width="1"/>
  <rect x="32" y="74" width="10" height="12" rx="2" fill="#6cb2ff" opacity="0.6"/>
  <!-- Engine exhaust -->
  <rect x="20" y="73" width="14" height="4" rx="2" fill="url(#eng1)" style="animation:pulse 0.8s ease infinite"/>
  <rect x="18" y="80" width="16" height="3" rx="2" fill="url(#eng1)" opacity="0.7" style="animation:pulse 1s ease infinite 0.2s"/>
  <rect x="20" y="85" width="14" height="3" rx="2" fill="url(#eng1)" opacity="0.5" style="animation:pulse 1.2s ease infinite 0.4s"/>
  <!-- Damage marks -->
  <line x1="85" y1="60" x2="95" y2="72" stroke="#ff716c" stroke-width="1" stroke-opacity="0.4"/>
  <line x1="150" y1="88" x2="165" y2="95" stroke="#ff716c" stroke-width="1" stroke-opacity="0.3"/>
  <!-- Detail lines -->
  <line x1="80" y1="70" x2="180" y2="72" stroke="#6cb2ff" stroke-width="0.5" stroke-opacity="0.2"/>
  <line x1="80" y1="90" x2="180" y2="88" stroke="#6cb2ff" stroke-width="0.5" stroke-opacity="0.2"/>
  <!-- Lights -->
  <circle cx="235" cy="75" r="2" fill="#6cb2ff" style="animation:pulse 2s ease infinite"/>
  <circle cx="235" cy="85" r="2" fill="#ff716c" style="animation:pulse 2s ease infinite 1s"/>
</svg>`,
    2: `<!-- Patched Freighter: bulkier, more cargo containers -->
<svg width="320" height="170" viewBox="0 0 320 170" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 0 24px rgba(108,178,255,0.35))">
  <defs>
    <linearGradient id="hull2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#2a4a6c"/><stop offset="100%" stop-color="#0a1525"/></linearGradient>
    <linearGradient id="eng2" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#6cb2ff" stop-opacity="1"/><stop offset="100%" stop-color="#6cb2ff" stop-opacity="0"/></linearGradient>
  </defs>
  <ellipse cx="50" cy="85" rx="36" ry="16" fill="#6cb2ff" opacity="0.12" style="animation:pulse 1.5s ease infinite"/>
  <path d="M75,45 L255,60 L280,85 L255,110 L75,125 L48,85 Z" fill="url(#hull2)" stroke="#4a7aac" stroke-width="1.5"/>
  <!-- Cargo modules -->
  <rect x="100" y="55" width="60" height="22" rx="3" fill="#1a3050" stroke="#4a6a8c" stroke-width="1"/>
  <rect x="100" y="93" width="60" height="22" rx="3" fill="#1a3050" stroke="#4a6a8c" stroke-width="1"/>
  <rect x="170" y="58" width="50" height="18" rx="3" fill="#1a3050" stroke="#4a6a8c" stroke-width="1"/>
  <rect x="170" y="94" width="50" height="18" rx="3" fill="#1a3050" stroke="#4a6a8c" stroke-width="1"/>
  <!-- Cockpit -->
  <ellipse cx="265" cy="85" rx="24" ry="16" fill="#1a2a4a" stroke="#6cb2ff" stroke-width="1.5" stroke-opacity="0.6"/>
  <ellipse cx="267" cy="84" rx="16" ry="10" fill="#0d1f3a" stroke="#6cb2ff" stroke-width="0.8" stroke-opacity="0.5"/>
  <!-- Wings -->
  <path d="M130,60 L155,35 L180,60" fill="#1a3050" stroke="#4a7aac" stroke-width="1"/>
  <path d="M130,110 L155,135 L180,110" fill="#1a3050" stroke="#4a7aac" stroke-width="1"/>
  <!-- Engines -->
  <rect x="44" y="68" width="36" height="14" rx="4" fill="#0d1a30" stroke="#4a7aac" stroke-width="1"/>
  <rect x="44" y="88" width="36" height="14" rx="4" fill="#0d1a30" stroke="#4a7aac" stroke-width="1"/>
  <rect x="28" y="69" width="18" height="5" rx="2" fill="url(#eng2)" style="animation:pulse 0.8s ease infinite"/>
  <rect x="26" y="75" width="20" height="4" rx="2" fill="url(#eng2)" opacity="0.8"/>
  <rect x="28" y="89" width="18" height="5" rx="2" fill="url(#eng2)" opacity="0.9" style="animation:pulse 1s ease infinite 0.3s"/>
  <rect x="26" y="95" width="20" height="4" rx="2" fill="url(#eng2)" opacity="0.7"/>
  <line x1="90" y1="72" x2="240" y2="74" stroke="#6cb2ff" stroke-width="0.5" stroke-opacity="0.25"/>
  <line x1="90" y1="98" x2="240" y2="96" stroke="#6cb2ff" stroke-width="0.5" stroke-opacity="0.25"/>
  <circle cx="275" cy="80" r="2.5" fill="#6cb2ff" style="animation:pulse 2s ease infinite"/>
  <circle cx="275" cy="90" r="2.5" fill="#cdff5a" style="animation:pulse 2s ease infinite 0.7s"/>
</svg>`,
    3: `<!-- Merchant Cruiser: sleek, mid-sized, balanced -->
<svg width="360" height="180" viewBox="0 0 360 180" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 0 30px rgba(108,178,255,0.4))">
  <defs>
    <linearGradient id="hull3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#3a5a8c"/><stop offset="100%" stop-color="#0d1a30"/></linearGradient>
    <linearGradient id="eng3" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#6cb2ff"/><stop offset="100%" stop-color="transparent"/></linearGradient>
    <filter id="glow3"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <!-- Main engine glow -->
  <ellipse cx="52" cy="90" rx="44" ry="18" fill="#6cb2ff" opacity="0.1" style="animation:pulse 1.5s ease infinite"/>
  <!-- Main hull - more aerodynamic -->
  <path d="M80,50 L290,65 L320,90 L290,115 L80,130 L50,90 Z" fill="url(#hull3)" stroke="#5a8abc" stroke-width="1.5"/>
  <!-- Secondary hull detail -->
  <path d="M100,65 L260,72 L285,90 L260,108 L100,115 L75,90 Z" fill="#1a2f50" opacity="0.5" stroke="#4a7aac" stroke-width="0.5"/>
  <!-- Cockpit - elongated -->
  <path d="M285,72 L315,90 L285,108 Z" fill="#1a2a4a" stroke="#6cb2ff" stroke-width="1.5" stroke-opacity="0.8"/>
  <ellipse cx="300" cy="90" rx="12" ry="9" fill="#0d1f3a" stroke="#6cb2ff" stroke-width="1" stroke-opacity="0.6"/>
  <!-- Upper wing -->
  <path d="M160,65 L185,38 L210,50 L195,65" fill="#1e3a5c" stroke="#5a8abc" stroke-width="1.5"/>
  <!-- Lower wing -->
  <path d="M160,115 L185,142 L210,130 L195,115" fill="#1e3a5c" stroke="#5a8abc" stroke-width="1.5"/>
  <!-- Wing detail -->
  <line x1="168" y1="68" x2="200" y2="52" stroke="#6cb2ff" stroke-width="0.8" stroke-opacity="0.4"/>
  <line x1="168" y1="112" x2="200" y2="128" stroke="#6cb2ff" stroke-width="0.8" stroke-opacity="0.4"/>
  <!-- Triple engines -->
  <rect x="46" y="68" width="38" height="12" rx="4" fill="#0d1a30" stroke="#5a8abc" stroke-width="1"/>
  <rect x="46" y="83" width="38" height="14" rx="4" fill="#0d1a30" stroke="#5a8abc" stroke-width="1.5"/>
  <rect x="46" y="100" width="38" height="12" rx="4" fill="#0d1a30" stroke="#5a8abc" stroke-width="1"/>
  <rect x="24" y="70" width="24" height="5" rx="2" fill="url(#eng3)" style="animation:pulse 0.7s ease infinite"/>
  <rect x="22" y="85" width="26" height="6" rx="3" fill="url(#eng3)" style="animation:pulse 0.7s ease infinite 0.1s"/>
  <rect x="24" y="102" width="24" height="5" rx="2" fill="url(#eng3)" style="animation:pulse 0.7s ease infinite 0.2s"/>
  <!-- Hull detail lines -->
  <line x1="100" y1="75" x2="270" y2="78" stroke="#6cb2ff" stroke-width="0.8" stroke-opacity="0.3"/>
  <line x1="100" y1="90" x2="275" y2="90" stroke="#6cb2ff" stroke-width="0.5" stroke-opacity="0.15"/>
  <line x1="100" y1="105" x2="270" y2="102" stroke="#6cb2ff" stroke-width="0.8" stroke-opacity="0.3"/>
  <!-- Module on top -->
  <rect x="200" y="55" width="40" height="10" rx="3" fill="#1a3050" stroke="#4a7aac" stroke-width="1"/>
  <circle cx="220" cy="60" r="3" fill="#6cb2ff" opacity="0.6" style="animation:pulse 3s ease infinite"/>
  <!-- Lights -->
  <circle cx="312" cy="86" r="3" fill="#6cb2ff" filter="url(#glow3)" style="animation:pulse 2s ease infinite"/>
  <circle cx="312" cy="94" r="2" fill="#cdff5a" filter="url(#glow3)" style="animation:pulse 2s ease infinite 1s"/>
  <circle cx="185" cy="38" r="2" fill="#ff716c" style="animation:pulse 1.5s ease infinite"/>
</svg>`,
    4: `<!-- Trade Battleship: large, imposing, military feel -->
<svg width="400" height="190" viewBox="0 0 400 190" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 0 35px rgba(108,178,255,0.45))">
  <defs>
    <linearGradient id="hull4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#4a6a9c"/><stop offset="100%" stop-color="#0d1a35"/></linearGradient>
    <linearGradient id="eng4" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#6cb2ff"/><stop offset="40%" stop-color="#ad89ff"/><stop offset="100%" stop-color="transparent"/></linearGradient>
    <filter id="glow4"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <ellipse cx="52" cy="95" rx="50" ry="22" fill="#6cb2ff" opacity="0.12" style="animation:pulse 1.5s ease infinite"/>
  <!-- Main hull -->
  <path d="M85,42 L320,55 L365,95 L320,135 L85,148 L48,95 Z" fill="url(#hull4)" stroke="#6a9acc" stroke-width="2"/>
  <!-- Armour plating -->
  <path d="M110,58 L290,65 L320,95 L290,125 L110,132 L80,95 Z" fill="#1a2f55" opacity="0.4" stroke="#5a8abc" stroke-width="0.5"/>
  <rect x="130" y="62" width="80" height="26" rx="4" fill="#1a3060" stroke="#5a8abc" stroke-width="1"/>
  <rect x="130" y="102" width="80" height="26" rx="4" fill="#1a3060" stroke="#5a8abc" stroke-width="1"/>
  <rect x="220" y="65" width="60" height="22" rx="3" fill="#1a3060" stroke="#5a8abc" stroke-width="1"/>
  <rect x="220" y="103" width="60" height="22" rx="3" fill="#1a3060" stroke="#5a8abc" stroke-width="1"/>
  <!-- Cockpit dome -->
  <ellipse cx="345" cy="95" rx="28" ry="20" fill="#1a2a4a" stroke="#6cb2ff" stroke-width="2" stroke-opacity="0.7"/>
  <ellipse cx="347" cy="94" rx="18" ry="13" fill="#0d1f3a" stroke="#6cb2ff" stroke-width="1" stroke-opacity="0.5"/>
  <!-- Large wings -->
  <path d="M170,62 L200,28 L240,42 L220,62" fill="#1e3a60" stroke="#6a9acc" stroke-width="2"/>
  <path d="M170,128 L200,162 L240,148 L220,128" fill="#1e3a60" stroke="#6a9acc" stroke-width="2"/>
  <!-- Wing guns -->
  <rect x="195" y="24" width="25" height="6" rx="2" fill="#2a4a70" stroke="#5a8abc" stroke-width="1"/>
  <rect x="195" y="160" width="25" height="6" rx="2" fill="#2a4a70" stroke="#5a8abc" stroke-width="1"/>
  <!-- 4 engines -->
  <rect x="44" y="62" width="42" height="13" rx="4" fill="#0d1a35" stroke="#6a9acc" stroke-width="1.5"/>
  <rect x="44" y="78" width="42" height="16" rx="4" fill="#0d1a35" stroke="#6a9acc" stroke-width="2"/>
  <rect x="44" y="97" width="42" height="16" rx="4" fill="#0d1a35" stroke="#6a9acc" stroke-width="2"/>
  <rect x="44" y="115" width="42" height="13" rx="4" fill="#0d1a35" stroke="#6a9acc" stroke-width="1.5"/>
  <rect x="18" y="64" width="28" height="6" rx="3" fill="url(#eng4)" style="animation:pulse 0.6s ease infinite"/>
  <rect x="16" y="80" width="30" height="7" rx="3" fill="url(#eng4)" style="animation:pulse 0.6s ease infinite 0.15s"/>
  <rect x="16" y="99" width="30" height="7" rx="3" fill="url(#eng4)" style="animation:pulse 0.6s ease infinite 0.3s"/>
  <rect x="18" y="117" width="28" height="6" rx="3" fill="url(#eng4)" style="animation:pulse 0.6s ease infinite 0.45s"/>
  <!-- Hull lines -->
  <line x1="105" y1="72" x2="300" y2="76" stroke="#6cb2ff" stroke-width="1" stroke-opacity="0.35"/>
  <line x1="105" y1="95" x2="310" y2="95" stroke="#6cb2ff" stroke-width="0.5" stroke-opacity="0.2"/>
  <line x1="105" y1="118" x2="300" y2="114" stroke="#6cb2ff" stroke-width="1" stroke-opacity="0.35"/>
  <!-- Lights -->
  <circle cx="358" cy="90" r="3.5" fill="#6cb2ff" filter="url(#glow4)" style="animation:pulse 2s ease infinite"/>
  <circle cx="358" cy="100" r="3" fill="#cdff5a" filter="url(#glow4)" style="animation:pulse 2s ease infinite 0.8s"/>
  <circle cx="200" cy="27" r="2.5" fill="#ff716c" style="animation:pulse 1.5s ease infinite"/>
  <circle cx="200" cy="163" r="2.5" fill="#ff716c" style="animation:pulse 1.5s ease infinite 0.5s"/>
</svg>`,
    5: `<!-- Galaxy Flagship: massive, majestic, alien-influenced -->
<svg width="440" height="200" viewBox="0 0 440 200" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 0 45px rgba(108,178,255,0.55))">
  <defs>
    <linearGradient id="hull5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#5a7aac"/><stop offset="50%" stop-color="#2a4a7c"/><stop offset="100%" stop-color="#0a1528"/></linearGradient>
    <linearGradient id="eng5" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#cdff5a"/><stop offset="30%" stop-color="#6cb2ff"/><stop offset="100%" stop-color="transparent"/></linearGradient>
    <linearGradient id="accent5" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#cdff5a" stop-opacity=".6"/><stop offset="100%" stop-color="#6cb2ff" stop-opacity=".2"/></linearGradient>
    <filter id="glow5"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <!-- Engine aura -->
  <ellipse cx="52" cy="100" rx="60" ry="28" fill="#cdff5a" opacity="0.08" style="animation:pulse 1.5s ease infinite"/>
  <ellipse cx="52" cy="100" rx="38" ry="18" fill="#6cb2ff" opacity="0.12" style="animation:pulse 1s ease infinite 0.3s"/>
  <!-- Main hull - swept back -->
  <path d="M88,35 L350,50 L405,100 L350,150 L88,165 L48,100 Z" fill="url(#hull5)" stroke="#7aaad0" stroke-width="2"/>
  <!-- Inner hull detail -->
  <path d="M115,52 L320,62 L358,100 L320,138 L115,148 L82,100 Z" fill="#1a2f5a" opacity="0.35" stroke="#5a8abc" stroke-width="0.5"/>
  <!-- Accent stripe -->
  <path d="M105,65 L335,72 L360,100 L335,128 L105,135" fill="none" stroke="url(#accent5)" stroke-width="1.5"/>
  <!-- Cargo / weapon modules -->
  <rect x="140" y="58" width="75" height="24" rx="5" fill="#1a3060" stroke="#5a9acc" stroke-width="1.5"/>
  <rect x="140" y="118" width="75" height="24" rx="5" fill="#1a3060" stroke="#5a9acc" stroke-width="1.5"/>
  <rect x="225" y="62" width="60" height="20" rx="4" fill="#1a3060" stroke="#5a9acc" stroke-width="1"/>
  <rect x="225" y="118" width="60" height="20" rx="4" fill="#1a3060" stroke="#5a9acc" stroke-width="1"/>
  <rect x="295" y="68" width="40" height="14" rx="3" fill="#1a3060" stroke="#4a7aac" stroke-width="1"/>
  <rect x="295" y="118" width="40" height="14" rx="3" fill="#1a3060" stroke="#4a7aac" stroke-width="1"/>
  <!-- Cockpit: elongated command bridge -->
  <path d="M348,60 L400,100 L348,140 L328,100 Z" fill="#1a2a4a" stroke="#6cb2ff" stroke-width="2" stroke-opacity="0.8"/>
  <ellipse cx="370" cy="100" rx="22" ry="16" fill="#0d1f3a" stroke="#6cb2ff" stroke-width="1.5" stroke-opacity="0.6"/>
  <ellipse cx="372" cy="99" rx="14" ry="10" fill="#061528" stroke="#6cb2ff" stroke-width="1" stroke-opacity="0.4"/>
  <!-- Sweeping wings -->
  <path d="M180,58 L215,18 L260,30 L250,58" fill="#1e3a64" stroke="#6aaace" stroke-width="2"/>
  <path d="M180,142 L215,182 L260,170 L250,142" fill="#1e3a64" stroke="#6aaace" stroke-width="2"/>
  <!-- Wing detail -->
  <line x1="195" y1="52" x2="245" y2="32" stroke="#cdff5a" stroke-width="1" stroke-opacity="0.35"/>
  <line x1="195" y1="148" x2="245" y2="168" stroke="#cdff5a" stroke-width="1" stroke-opacity="0.35"/>
  <!-- Wing weapon pods -->
  <rect x="208" y="14" width="28" height="7" rx="2.5" fill="#2a4a72" stroke="#5a9acc" stroke-width="1"/>
  <rect x="208" y="179" width="28" height="7" rx="2.5" fill="#2a4a72" stroke="#5a9acc" stroke-width="1"/>
  <circle cx="238" cy="17" r="3" fill="#cdff5a" opacity="0.8" style="animation:pulse 2s ease infinite"/>
  <circle cx="238" cy="183" r="3" fill="#cdff5a" opacity="0.8" style="animation:pulse 2s ease infinite 0.5s"/>
  <!-- 5 engines -->
  <rect x="44" y="54" width="46" height="14" rx="4" fill="#0d1a35" stroke="#6aaace" stroke-width="1.5"/>
  <rect x="44" y="71" width="46" height="16" rx="4" fill="#0d1a35" stroke="#6aaace" stroke-width="2"/>
  <rect x="44" y="92" width="46" height="18" rx="5" fill="#0d1a35" stroke="#7aaad0" stroke-width="2.5"/>
  <rect x="44" y="113" width="46" height="16" rx="4" fill="#0d1a35" stroke="#6aaace" stroke-width="2"/>
  <rect x="44" y="132" width="46" height="14" rx="4" fill="#0d1a35" stroke="#6aaace" stroke-width="1.5"/>
  <rect x="16" y="56" width="32" height="7" rx="3" fill="url(#eng5)" style="animation:pulse 0.5s ease infinite"/>
  <rect x="14" y="73" width="34" height="8" rx="4" fill="url(#eng5)" style="animation:pulse 0.5s ease infinite 0.1s"/>
  <rect x="12" y="94" width="36" height="10" rx="5" fill="url(#eng5)" style="animation:pulse 0.5s ease infinite 0.2s"/>
  <rect x="14" y="115" width="34" height="8" rx="4" fill="url(#eng5)" style="animation:pulse 0.5s ease infinite 0.3s"/>
  <rect x="16" y="134" width="32" height="7" rx="3" fill="url(#eng5)" style="animation:pulse 0.5s ease infinite 0.4s"/>
  <!-- Hull accent lines -->
  <line x1="108" y1="68" x2="328" y2="74" stroke="#cdff5a" stroke-width="0.8" stroke-opacity="0.3"/>
  <line x1="108" y1="100" x2="342" y2="100" stroke="#6cb2ff" stroke-width="0.6" stroke-opacity="0.2"/>
  <line x1="108" y1="132" x2="328" y2="126" stroke="#cdff5a" stroke-width="0.8" stroke-opacity="0.3"/>
  <!-- Command bridge lights -->
  <circle cx="392" cy="95" r="4" fill="#6cb2ff" filter="url(#glow5)" style="animation:pulse 2s ease infinite"/>
  <circle cx="392" cy="105" r="3.5" fill="#cdff5a" filter="url(#glow5)" style="animation:pulse 2s ease infinite 0.6s"/>
  <circle cx="216" cy="17" r="3" fill="#ff716c" style="animation:pulse 1.5s ease infinite"/>
  <circle cx="216" cy="183" r="3" fill="#ff716c" style="animation:pulse 1.5s ease infinite 0.5s"/>
  <!-- Top sensor array -->
  <rect x="240" y="45" width="50" height="8" rx="2" fill="#1a3060" stroke="#cdff5a" stroke-width="0.8" stroke-opacity="0.5"/>
  <circle cx="265" cy="49" r="3" fill="#cdff5a" opacity="0.7" style="animation:pulse 3s ease infinite"/>
</svg>`,
  };
  return ships[Math.min(tier, 5)] || ships[1];
}

function _buildShipStarfield() {
  const sf = document.getElementById('ship-starfield');
  if (!sf) return;
  for (let i = 0; i < 80; i++) {
    const d = document.createElement('div');
    const sz = Math.random() * 1.5 + .3;
    d.style.cssText = `position:absolute;width:${sz}px;height:${sz}px;border-radius:50%;background:white;opacity:${.2+Math.random()*.6};left:${Math.random()*100}%;top:${Math.random()*100}%;animation:pulse ${2+Math.random()*3}s ease infinite;animation-delay:${Math.random()*3}s`;
    sf.appendChild(d);
  }
}




/* ══════════════════════════════════════════════════════════
   PORTFOLIO DASHBOARD
══════════════════════════════════════════════════════════ */
function initPortfolio() {
  const s = AV.state;
  const holdings = s.portfolio.holdings;
  const totalVal = holdings.reduce((a,h)=>a+(_prices[h.symbol]||h.avgPrice)*h.qty,0);
  const costVal  = holdings.reduce((a,h)=>a+h.avgPrice*h.qty,0);
  const pnl      = Math.round(totalVal - costVal);
  const pnlPct   = costVal > 0 ? ((pnl/costVal)*100).toFixed(1) : '0.0';
  const nw       = AV.netWorth();
  const hist     = s.portfolio.netWorthHistory;
  const allColors = ['#6cb2ff','#cdff5a','#ad89ff','#ff716c','#ffd234','#7ab888','#5ab4d4','#ff8c42'];

  const alloc = holdings.map((h,i) => ({
    symbol: h.symbol,
    name: ASSETS.find(a=>a.symbol===h.symbol)?.name || h.symbol,
    val: Math.round((_prices[h.symbol]||h.avgPrice)*h.qty),
    pct: totalVal>0 ? Math.round((_prices[h.symbol]||h.avgPrice)*h.qty/totalVal*100) : 0,
    color: allColors[i % allColors.length],
    icon: ASSETS.find(a=>a.symbol===h.symbol)?.icon || '📊',
  }));

  document.getElementById('screen-portfolio').innerHTML = `
    ${UI.buildTicker()}
    <div class="topbar">
      <div>
        <div class="topbar-sub">ASSET MANAGEMENT · FINANCIAL COMMAND CENTER</div>
        <div class="topbar-title">PORTFOLIO</div>
      </div>
      <div style="display:flex;gap:10px">
        <button class="btn btn-gain btn-sm" onclick="UI.toast('Rewards harvested! +50 CR','gain');AV.addCredits(50,'harvest')">HARVEST REWARDS</button>
        <button class="btn btn-ghost btn-sm" onclick="goPage('trade')">TRADE NODE →</button>
      </div>
    </div>

    <!-- NET WORTH HERO BANNER -->
    <div class="card" style="padding:24px;margin-bottom:20px;background:linear-gradient(135deg,rgba(18,25,42,1),rgba(13,13,25,1));position:relative;overflow:hidden">
      <!-- Background glow -->
      <div style="position:absolute;top:-40px;right:-40px;width:250px;height:250px;background:radial-gradient(circle,rgba(108,178,255,0.06),transparent);border-radius:50%;pointer-events:none"></div>
      <div style="position:absolute;bottom:-30px;left:30%;width:180px;height:180px;background:radial-gradient(circle,rgba(205,255,90,0.04),transparent);border-radius:50%;pointer-events:none"></div>

      <div style="display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:16px">
        <div>
          <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono);letter-spacing:2px;margin-bottom:8px">TOTAL COMBINED NET WORTH</div>
          <div style="display:flex;align-items:baseline;gap:12px">
            <div style="font-family:var(--f-mono);font-size:48px;font-weight:700;color:var(--text-0);letter-spacing:1px;line-height:1">${nw.toLocaleString()}</div>
            <div style="font-family:var(--f-display);font-size:22px;font-weight:700;color:var(--primary);letter-spacing:2px">CREDITS</div>
            <div style="background:${pnl>=0?'rgba(205,255,90,.12)':'rgba(255,113,108,.12)'};border:1px solid ${pnl>=0?'rgba(205,255,90,.3)':'rgba(255,113,108,.3)'};border-radius:var(--r-pill);padding:4px 12px">
              <span style="font-family:var(--f-mono);font-size:13px;font-weight:700;color:${pnl>=0?'var(--gain)':'var(--loss)'}">${pnl>=0?'▲':'▼'} ${Math.abs(pnlPct)}%</span>
            </div>
          </div>
          <div style="display:flex;gap:24px;margin-top:14px">
            <div>
              <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono)">CASH RESERVES</div>
              <div style="font-family:var(--f-mono);font-size:16px;font-weight:700;color:var(--gain);margin-top:2px">${AV.formatCR(s.credits)}</div>
            </div>
            <div>
              <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono)">HOLDINGS VALUE</div>
              <div style="font-family:var(--f-mono);font-size:16px;font-weight:700;color:var(--primary);margin-top:2px">${AV.formatCR(Math.round(totalVal))}</div>
            </div>
            <div>
              <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono)">UNREALISED P&L</div>
              <div class="pnl ${pnl>=0?'pos':'neg'}" style="font-size:16px;margin-top:2px">${pnl>=0?'+':''}${pnl.toLocaleString()} CR</div>
            </div>
            <div>
              <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono)">FINANCE IQ</div>
              <div style="font-family:var(--f-mono);font-size:16px;font-weight:700;color:var(--secondary);margin-top:2px">${s.financeIQ}</div>
            </div>
          </div>
        </div>
        <!-- Mini net worth sparkline -->
        <div style="flex-shrink:0">
          <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono);margin-bottom:6px">WEALTH TRAJECTORY</div>
          <canvas id="nw-mini" width="200" height="60" style="width:200px;height:60px;display:block"></canvas>
        </div>
      </div>
    </div>

    <!-- MAIN GRID -->
    <div class="grid-2" style="gap:18px;margin-bottom:18px">

      <!-- Asset allocation donut -->
      <div class="card" style="padding:20px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
          <div style="font-size:9px;color:var(--text-2);font-family:var(--f-mono);letter-spacing:1px">ASSET ALLOCATION</div>
          <button style="background:none;border:none;color:var(--primary);font-size:12px;cursor:pointer;font-family:var(--f-mono)" onclick="initPortfolio()">↻</button>
        </div>
        ${holdings.length > 0 ? `
          <div style="display:flex;gap:20px;align-items:center">
            <div style="position:relative;width:140px;height:140px;flex-shrink:0">
              <canvas id="donut-canvas" width="140" height="140" style="width:140px;height:140px"></canvas>
              <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center">
                <div style="font-family:var(--f-mono);font-size:22px;font-weight:700;color:var(--text-0)">${holdings.length}</div>
                <div style="font-size:8px;color:var(--text-3);font-family:var(--f-mono);letter-spacing:1px">ASSETS</div>
              </div>
            </div>
            <div style="flex:1">
              ${alloc.map(a=>`
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:9px;cursor:pointer" onclick="UI.toast('${a.name}: ${a.pct}% of portfolio','primary')">
                  <div style="width:10px;height:10px;border-radius:50%;background:${a.color};flex-shrink:0;box-shadow:0 0 6px ${a.color}66"></div>
                  <div style="flex:1">
                    <div style="font-family:var(--f-mono);font-size:11px;font-weight:700;color:${a.color}">${a.symbol}</div>
                    <div style="font-size:9px;color:var(--text-3)">${a.name}</div>
                  </div>
                  <div style="font-family:var(--f-mono);font-size:11px;font-weight:700;color:${a.color}">${a.pct}%</div>
                </div>`).join('')}
              <div style="margin-top:12px;padding-top:10px;border-top:1px solid var(--ghost)">
                <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono);margin-bottom:5px">DIVERSIFICATION SCORE</div>
                ${UI.bar({pct:Math.min(100,holdings.length*20),cls:'fill-primary',h:5})}
                <div style="font-family:var(--f-mono);font-size:11px;font-weight:700;color:var(--primary);margin-top:4px">${Math.min(100,holdings.length*20)}%</div>
              </div>
            </div>
          </div>` :
          `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 0;color:var(--text-3)">
            <div style="font-size:36px;margin-bottom:12px;opacity:.4">📊</div>
            <div style="font-family:var(--f-display);font-size:14px;letter-spacing:1px">NO ASSETS YET</div>
            <div style="font-size:11px;margin-top:6px">Visit Trade Node to build your portfolio</div>
            <button class="btn btn-primary btn-sm" style="margin-top:14px" onclick="goPage('trade')">OPEN TRADE →</button>
          </div>`}
      </div>

      <!-- Current holdings table -->
      <div class="card" style="padding:20px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <div style="font-size:9px;color:var(--text-2);font-family:var(--f-mono);letter-spacing:1px">CURRENT HOLDINGS</div>
          ${holdings.length > 0 ? `<div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono)">${holdings.length} POSITION${holdings.length>1?'S':''}</div>` : ''}
        </div>
        ${holdings.length > 0 ? `
          <div style="display:grid;grid-template-columns:auto 1fr 70px 70px 70px;gap:8px;padding-bottom:8px;border-bottom:1px solid var(--ghost)">
            ${['','ASSET','QTY','MKT VAL','P&L'].map(h=>`<div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono)">${h}</div>`).join('')}
          </div>
          ${holdings.map((h,i)=>{
            const cur=_prices[h.symbol]||h.avgPrice;
            const val=Math.round(cur*h.qty);
            const p=Math.round((cur-h.avgPrice)*h.qty);
            const pct=((p/Math.max(1,h.avgPrice*h.qty))*100).toFixed(1);
            return `<div style="display:grid;grid-template-columns:auto 1fr 70px 70px 70px;gap:8px;padding:10px 0;border-bottom:1px solid var(--ghost);align-items:center">
              <div style="width:8px;height:8px;border-radius:50%;background:${allColors[i%allColors.length]};box-shadow:0 0 6px ${allColors[i%allColors.length]}88"></div>
              <div>
                <div style="font-family:var(--f-mono);font-size:11px;font-weight:700;color:var(--primary)">${h.symbol}</div>
                <div style="font-size:9px;color:var(--text-3)">${ASSETS.find(a=>a.symbol===h.symbol)?.name||''}</div>
              </div>
              <div style="font-family:var(--f-mono);font-size:11px;color:var(--text-1)">${h.qty.toLocaleString()}</div>
              <div style="font-family:var(--f-mono);font-size:11px;color:var(--text-0)">${AV.formatCR(val)}</div>
              <div style="font-family:var(--f-mono);font-size:11px;font-weight:700;color:${p>=0?'var(--gain)':'var(--loss)'}">
                <div>${p>=0?'+':''}${pct}%</div>
                <div style="font-size:9px;opacity:.7">${p>=0?'+':''}${Math.abs(p).toLocaleString()}</div>
              </div>
            </div>`;
          }).join('')}
          <div style="margin-top:12px;padding:12px;background:var(--s-mid);border-radius:var(--r-md)">
            <div style="display:flex;justify-content:space-between;font-size:11px">
              <span style="color:var(--text-2)">Total invested</span>
              <span style="font-family:var(--f-mono);font-weight:700">${AV.formatCR(Math.round(costVal))}</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:11px;margin-top:5px">
              <span style="color:var(--text-2)">Current value</span>
              <span style="font-family:var(--f-mono);font-weight:700">${AV.formatCR(Math.round(totalVal))}</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:12px;margin-top:8px;padding-top:8px;border-top:1px solid var(--ghost)">
              <span style="color:var(--text-1);font-weight:600">Total P&L</span>
              <span class="pnl ${pnl>=0?'pos':'neg'}" style="font-size:14px">${pnl>=0?'+':''}${pnl.toLocaleString()} CR</span>
            </div>
          </div>` :
          `<div style="text-align:center;padding:32px;color:var(--text-3);font-size:11px">Start trading to see your positions here</div>`}
      </div>
    </div>

    <!-- PERFORMANCE MATRIX (full width chart) -->
    <div class="card" style="padding:20px;margin-bottom:18px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <div>
          <div style="font-size:9px;color:var(--text-2);font-family:var(--f-mono);letter-spacing:1px">PERFORMANCE MATRIX</div>
          <div style="font-size:12px;color:var(--text-1);margin-top:3px">Net worth history across all sectors</div>
        </div>
        <div style="display:flex;gap:6px">
          ${['1D','1W','1M','ALL'].map((t,i)=>`<button style="padding:4px 10px;border-radius:var(--r-pill);font-size:10px;font-family:var(--f-mono);cursor:pointer;border:1px solid ${i===2?'var(--primary)':'var(--ghost)'};background:${i===2?'rgba(108,178,255,.15)':'transparent'};color:${i===2?'var(--primary)':'var(--text-2)'}">${t}</button>`).join('')}
        </div>
      </div>
      <div style="position:relative">
        <canvas id="nw-chart" width="900" height="130" style="width:100%;height:130px;display:block"></canvas>
        ${hist.length > 1 ? `
          <div style="position:absolute;top:8px;right:8px;background:rgba(0,0,0,.6);border:1px solid var(--ghost);border-radius:var(--r-sm);padding:5px 10px;backdrop-filter:blur(8px)">
            <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono)">TRADE BOOM</div>
            <div style="font-family:var(--f-mono);font-size:11px;color:var(--gain)">+${Math.max(0,hist[hist.length-1]-hist[0]).toLocaleString()} CR</div>
          </div>` : ''}
      </div>
    </div>

    <!-- BOTTOM STATS ROW -->
    <div class="grid-4">
      ${[
        { label:'DIVERSIFICATION', val:`${Math.min(100,holdings.length*20)}%`, color:'var(--primary)', bar:Math.min(100,holdings.length*20), cls:'fill-primary' },
        { label:'FINANCE IQ',      val:s.financeIQ,  color:'var(--gain)',      bar:Math.min(100,s.financeIQ/2), cls:'fill-gain' },
        { label:'TOTAL TRADES',    val:s.totalTrades, color:'var(--secondary)', bar:Math.min(100,s.totalTrades*2), cls:'fill-secondary' },
        { label:'CRASHES SURVIVED',val:s.crashesSurvived, color:'var(--warn)', bar:Math.min(100,s.crashesSurvived*20), cls:'fill-primary' },
      ].map(x=>`
        <div class="card" style="padding:16px">
          <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono);letter-spacing:1px;margin-bottom:6px">${x.label}</div>
          <div style="font-family:var(--f-mono);font-size:22px;font-weight:700;color:${x.color};margin-bottom:8px">${x.val}</div>
          ${UI.bar({pct:x.bar,cls:x.cls,h:4})}
        </div>`).join('')}
    </div>`;

  setTimeout(() => {
    if (alloc.length > 0) drawDonut('donut-canvas', alloc);
    if (hist.length > 1) {
      drawSpark('nw-chart', hist);
      drawSpark('nw-mini', hist);
    }
  }, 50);
}



/* ══════════════════════════════════════════════════════════
   MISSIONS
══════════════════════════════════════════════════════════ */
let _missionTab = 'daily';

function initMissions() {
  const s = AV.state;
  document.getElementById('screen-missions').innerHTML = `
    <div style="background:linear-gradient(180deg,rgba(108,178,255,.05),transparent);margin:-24px -28px 0;padding:32px 28px 24px;border-bottom:1px solid var(--ghost);margin-bottom:24px">
      <div class="topbar-sub">LIVE OPERATIONS · SECTOR_LAT: 49.2° · SECTOR_LONG: -123.1°</div>
      <div class="topbar-title">MISSION BOARD</div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 300px;gap:20px">
      <div>
        <div style="display:flex;gap:8px;margin-bottom:20px">
          ${['daily','story','challenge'].map(t=>`
            <button class="btn ${_missionTab===t?'btn-primary':'btn-ghost'} btn-sm" onclick="setMissionTab('${t}')">
              ${{daily:'DAILY',story:'STORY',challenge:'CHALLENGE'}[t]}
            </button>`).join('')}
        </div>
        <div id="mission-content"></div>
      </div>

      <!-- Story progression -->
      <div>
        <div style="font-size:9px;color:var(--text-2);font-family:var(--f-mono);letter-spacing:1px;margin-bottom:14px">STORY PROGRESSION — CHAPTER ${s.storyChapter+1}/6</div>
        <div style="display:flex;flex-direction:column;gap:0">
          ${STORY_CHAPTERS.map((ch,i)=>{
            const isDone = i < s.storyChapter;
            const isActive = i === s.storyChapter;
            const isLocked = i > s.storyChapter;
            return `<div style="display:flex;gap:12px;padding:14px;border-left:2px solid ${isDone?'var(--gain)':isActive?'var(--primary)':'var(--ghost)'};margin-bottom:2px;background:${isActive?'rgba(108,178,255,.04)':''}">
              <div style="width:10px;height:10px;border-radius:50%;background:${isDone?'var(--gain)':isActive?'var(--primary)':'var(--ghost)'};margin-top:3px;flex-shrink:0;${isActive?'box-shadow:0 0 8px var(--primary)':''}"></div>
              <div>
                ${isDone?`<div style="font-size:9px;color:var(--gain);font-family:var(--f-mono)">SUCCESS // PHASE 0${i+1}</div>`:''}
                ${isActive?`<div style="font-size:9px;color:var(--primary);font-family:var(--f-mono)">ACTIVE MISSION</div>`:''}
                ${isLocked?`<div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono)">LOCKED PHASE</div>`:''}
                <div style="font-family:var(--f-display);font-size:14px;font-weight:700;color:${isDone?'var(--text-2)':isActive?'var(--text-0)':'var(--text-3)'};letter-spacing:.5px;margin-top:2px">${ch.title}</div>
                <div style="font-size:11px;color:var(--text-2);margin-top:3px">${ch.desc}</div>
                ${isActive?`<div style="margin-top:8px">${UI.bar({pct:(AV.donePlanets()/(s.storyChapter+1))*100,cls:'fill-primary',h:3})}</div>`:''}
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>`;
  renderMissions();
}

function setMissionTab(t) { _missionTab = t; initMissions(); }

function renderMissions() {
  const el = document.getElementById('mission-content');
  if (!el) return;
  if (_missionTab === 'daily') {
    el.innerHTML = `<div class="grid-2">
      ${DAILY_MISSIONS.map(m=>`
        <div class="card" style="padding:18px">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">
            <div style="width:42px;height:42px;border-radius:10px;background:var(--s-high);display:flex;align-items:center;justify-content:center;font-size:20px">${m.icon}</div>
            <div style="text-align:right">
              <div style="font-family:var(--f-mono);font-size:13px;font-weight:700;color:var(--gain)">+${m.cr} CR</div>
              <div style="font-size:10px;color:var(--text-3);font-family:var(--f-mono)">+${m.xp} XP</div>
            </div>
          </div>
          <div style="font-family:var(--f-display);font-size:15px;font-weight:700;letter-spacing:.5px;margin-bottom:4px">${m.title}</div>
          <div style="font-size:11px;color:var(--text-2);margin-bottom:12px">${m.desc}</div>
          <div style="margin-bottom:8px">${UI.bar({pct:Math.random()>0.5?Math.random()*100:0,cls:'fill-primary',h:4})}</div>
          <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono)">● IN PROGRESS</div>
        </div>`).join('')}
    </div>`;
  } else if (_missionTab === 'story') {
    el.innerHTML = STORY_CHAPTERS.map((ch,i)=>{
      const isDone = i < AV.state.storyChapter;
      const isActive = i === AV.state.storyChapter;
      return `<div class="card" style="padding:18px;margin-bottom:10px;border-color:${isActive?'var(--ghost-2)':isDone?'rgba(205,255,90,.15)':'var(--ghost)'}">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <div style="font-family:var(--f-display);font-size:16px;font-weight:700;color:${isDone?'var(--text-2)':isActive?'var(--primary)':'var(--text-3)'};letter-spacing:.5px">${ch.title}</div>
          ${isDone?`<span class="btn btn-gain btn-sm" style="pointer-events:none">COMPLETED</span>`:''}
          ${isActive?`<span class="btn btn-primary btn-sm" style="cursor:pointer" onclick="goPage('galaxy')">ACTIVE →</span>`:''}
          ${!isDone&&!isActive?`<span style="font-size:10px;color:var(--text-3);font-family:var(--f-mono)">🔒 LOCKED</span>`:''}
        </div>
        <div style="font-size:12px;color:var(--text-2)">${ch.desc}</div>
      </div>`;
    }).join('');
  } else {
    el.innerHTML = `<div style="text-align:center;padding:40px;color:var(--text-3)">
      <div style="font-size:32px;margin-bottom:12px">⚡</div>
      <div style="font-family:var(--f-display);font-size:16px;letter-spacing:1px">CHALLENGE MISSIONS</div>
      <div style="font-size:12px;margin-top:8px">Complete story missions to unlock challenge operations</div>
    </div>`;
  }
}

/* ══════════════════════════════════════════════════════════
   KNOWLEDGE BATTLE (Hyperspace Quiz)
══════════════════════════════════════════════════════════ */
let _kbIdx = 0, _kbTimer = null, _kbSel = null, _kbScore = 0, _kbQuestions = [];

function initKnowledge() {
  _kbScore = 0;
  _kbIdx = 0;
  _kbSel = null;
  _kbQuestions = [...FINANCE_QUIZ_BANK].sort(() => Math.random() - 0.5).slice(0, 5);

  document.getElementById('screen-knowledge').innerHTML = `
    <div style="position:relative;min-height:calc(100vh - 60px);display:flex;align-items:center;justify-content:center;overflow:hidden">
      <!-- Warp lines -->
      <div id="warp-bg" style="position:absolute;inset:0;overflow:hidden">
        ${Array.from({length:20},(_,i)=>`<div class="warp-line" style="top:${Math.random()*100}%;left:${Math.random()*20}%;width:${100+Math.random()*200}px;--dur:${0.5+Math.random()*.8}s;--delay:${Math.random()*.5}s"></div>`).join('')}
      </div>
      <div style="position:relative;z-index:1;width:100%;max-width:700px;padding:20px" id="quiz-arena"></div>
    </div>`;

  renderKBQuestion();
}

function renderKBQuestion() {
  const el = document.getElementById('quiz-arena');
  if (!el) return;
  if (_kbIdx >= _kbQuestions.length) { showKBResult(); return; }
  const q = _kbQuestions[_kbIdx];
  clearInterval(_kbTimer);
  let timeLeft = 15;

  el.innerHTML = `
    <div class="card" style="padding:28px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
        <div>
          <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono);letter-spacing:2px">SECTOR 06 // KNOWLEDGE BATTLE</div>
          <div style="font-family:var(--f-display);font-size:16px;letter-spacing:1px;margin-top:3px">QUESTION ${_kbIdx+1}/${_kbQuestions.length}</div>
        </div>
        <div class="timer-ring">
          <svg viewBox="0 0 64 64" width="64" height="64">
            <circle class="track-circle" cx="32" cy="32" r="28"/>
            <circle class="fill-circle" id="timer-circle" cx="32" cy="32" r="28" stroke-dasharray="${2*Math.PI*28}" stroke-dashoffset="0"/>
          </svg>
          <div class="timer-num" id="timer-num">15</div>
        </div>
      </div>

      <div style="font-family:var(--f-display);font-size:22px;font-weight:700;line-height:1.3;margin-bottom:24px;letter-spacing:.3px">
        ${q.q.includes('compound interest') || q.q.includes('SIP') || q.q.includes('fund')
          ? `What is <span style="color:var(--primary)">${q.q.toLowerCase().replace('what is ','').replace('?','')}</span>?`
          : q.q}
      </div>

      <div id="kb-opts">
        ${q.opts.map((opt,i)=>`
          <button id="kbo-${i}" onclick="handleKBAnswer(${i},${q.a})"
            style="width:100%;display:flex;align-items:center;gap:14px;text-align:left;padding:14px 18px;background:var(--s-mid);border:1px solid var(--ghost);border-radius:var(--r-md);color:var(--text-0);font-size:13px;font-weight:500;cursor:pointer;transition:all .15s;margin-bottom:8px;font-family:var(--f-body)"
            onmouseenter="if(!this.disabled)this.style.borderColor='var(--primary)'"
            onmouseleave="if(!this.disabled)this.style.borderColor='var(--ghost)'">
            <div style="width:28px;height:28px;border-radius:6px;background:var(--s-high);display:flex;align-items:center;justify-content:center;font-family:var(--f-mono);font-size:11px;color:var(--primary);font-weight:700;flex-shrink:0">${String.fromCharCode(65+i)}</div>
            ${opt}
          </button>`).join('')}
      </div>

      <div style="display:flex;justify-content:space-between;margin-top:16px;font-size:11px;font-family:var(--f-mono);color:var(--text-3)">
        <span>● REWARD: ${q.xp} XP</span>
        <span>⚡ STREAK: ×${Math.min(_kbScore+1,3).toFixed(1)}</span>
        <span>MISSION: FINANCIAL MASTERY ●</span>
      </div>
    </div>`;

  // Timer
  const circumference = 2 * Math.PI * 28;
  _kbTimer = setInterval(() => {
    timeLeft--;
    const num = document.getElementById('timer-num');
    const circle = document.getElementById('timer-circle');
    if (num) num.textContent = timeLeft;
    if (circle) {
      const offset = circumference * (1 - timeLeft/15);
      circle.style.strokeDashoffset = offset;
      if (timeLeft <= 5) circle.style.stroke = 'var(--loss)';
    }
    if (timeLeft <= 0) {
      clearInterval(_kbTimer);
      handleKBAnswer(-1, q.a); // timeout = wrong
    }
  }, 1000);
}

function handleKBAnswer(chosen, correct) {
  if (_kbSel !== null) return;
  _kbSel = chosen;
  clearInterval(_kbTimer);
  const q = _kbQuestions[_kbIdx];
  if (chosen === correct) { _kbScore++; AV.addXP(q.xp); }

  for (let i = 0; i < q.opts.length; i++) {
    const btn = document.getElementById(`kbo-${i}`);
    if (!btn) continue;
    if (i === correct) { btn.style.background='rgba(205,255,90,.15)'; btn.style.borderColor='var(--gain)'; btn.style.color='var(--gain)'; }
    else if (i === chosen) { btn.style.background='rgba(255,113,108,.15)'; btn.style.borderColor='var(--loss)'; btn.style.color='var(--loss)'; }
    btn.disabled = true;
  }

  // Show lesson
  const optsEl = document.getElementById('kb-opts');
  if (optsEl) {
    const lessonDiv = document.createElement('div');
    lessonDiv.style.cssText = 'margin-top:12px;padding:12px 16px;background:rgba(108,178,255,.08);border-radius:var(--r-md);border:1px solid var(--ghost-2);font-size:12px;color:var(--text-1);line-height:1.6';
    lessonDiv.innerHTML = `💡 <strong>Finance Intel:</strong> ${q.lesson}`;
    optsEl.appendChild(lessonDiv);
  }

  setTimeout(() => {
    _kbSel = null;
    _kbIdx++;
    renderKBQuestion();
  }, 2000);
}

function showKBResult() {
  const el = document.getElementById('quiz-arena');
  if (!el) return;
  const perfect = _kbScore === _kbQuestions.length;
  el.innerHTML = `
    <div class="card" style="padding:40px;text-align:center">
      <div style="font-size:64px;margin-bottom:16px">${perfect?'🏆':_kbScore>=3?'⭐':'💪'}</div>
      <div style="font-family:var(--f-display);font-size:28px;font-weight:700;letter-spacing:2px;color:${perfect?'var(--gain)':'var(--primary)'};margin-bottom:8px">
        ${perfect?'PERFECT SCORE':'MISSION COMPLETE'}
      </div>
      <div style="font-family:var(--f-mono);font-size:14px;color:var(--text-2);margin-bottom:24px">${_kbScore}/${_kbQuestions.length} CORRECT · ACCURACY: ${Math.round(_kbScore/_kbQuestions.length*100)}%</div>
      <div style="display:flex;justify-content:center;gap:16px;margin-bottom:32px">
        <div style="padding:16px 24px;background:rgba(108,178,255,.08);border:1px solid var(--ghost-2);border-radius:var(--r-md)">
          <div style="font-family:var(--f-mono);font-size:28px;font-weight:700;color:var(--primary)">+${_kbQuestions.slice(0,_kbScore).reduce((a,q)=>a+q.xp,0)}</div>
          <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono);margin-top:3px">XP EARNED</div>
        </div>
        <div style="padding:16px 24px;background:rgba(205,255,90,.08);border:1px solid rgba(205,255,90,.2);border-radius:var(--r-md)">
          <div style="font-family:var(--f-mono);font-size:28px;font-weight:700;color:var(--gain)">${AV.state.financeIQ}</div>
          <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono);margin-top:3px">FINANCE IQ</div>
        </div>
      </div>
      <div style="display:flex;gap:10px;justify-content:center">
        <button class="btn btn-primary btn-lg" onclick="initKnowledge()">PLAY AGAIN</button>
        <button class="btn btn-ghost btn-lg" onclick="goPage('galaxy')">GALAXY MAP</button>
      </div>
    </div>`;
}

/* ══════════════════════════════════════════════════════════
   PLAYER PROFILE
══════════════════════════════════════════════════════════ */
function initProfile() {
  const s = AV.state;
  const nw = AV.netWorth();

  document.getElementById('screen-profile').innerHTML = `
    <div class="topbar">
      <div>
        <div class="topbar-sub">ORBITAL COMMAND · COMMANDER DOSSIER</div>
        <div class="topbar-title">PROFILE</div>
      </div>
    </div>

    <div class="grid-2" style="gap:20px">
      <!-- Left -->
      <div>
        <!-- Commander card -->
        <div class="card" style="padding:24px;margin-bottom:16px">
          <div style="display:flex;gap:16px;align-items:flex-start;margin-bottom:20px">
            <div style="position:relative">
              <div style="width:72px;height:72px;border-radius:16px;background:linear-gradient(135deg,var(--s-high),var(--s-mid));border:2px solid var(--ghost-2);display:flex;align-items:center;justify-content:center;font-size:32px">${s.avatar}</div>
              <div style="position:absolute;bottom:-6px;right:-6px;background:var(--primary);border:2px solid var(--void);border-radius:6px;padding:2px 6px;font-family:var(--f-mono);font-size:10px;font-weight:700;color:#000">LV${s.level}</div>
            </div>
            <div style="flex:1">
              <div style="font-family:var(--f-display);font-size:20px;font-weight:700;letter-spacing:1px;margin-bottom:2px">${s.name.toUpperCase()}</div>
              <div style="font-size:9px;color:var(--primary);font-family:var(--f-mono);letter-spacing:1px;margin-bottom:10px">${s.rank.toUpperCase()}</div>
              <div style="display:flex;gap:10px">
                <div style="background:rgba(205,255,90,.08);border:1px solid rgba(205,255,90,.2);border-radius:var(--r-sm);padding:5px 10px;text-align:center">
                  <div style="font-family:var(--f-mono);font-size:13px;font-weight:700;color:var(--gain)">${nw.toLocaleString()}</div>
                  <div style="font-size:8px;color:var(--text-3);font-family:var(--f-mono)">NET WORTH</div>
                </div>
                <div style="background:rgba(108,178,255,.08);border:1px solid rgba(108,178,255,.2);border-radius:var(--r-sm);padding:5px 10px;text-align:center">
                  <div style="font-family:var(--f-mono);font-size:13px;font-weight:700;color:var(--primary)">${s.totalTrades}</div>
                  <div style="font-size:8px;color:var(--text-3);font-family:var(--f-mono)">TRADES</div>
                </div>
                <div style="background:rgba(173,137,255,.08);border:1px solid rgba(173,137,255,.2);border-radius:var(--r-sm);padding:5px 10px;text-align:center">
                  <div style="font-family:var(--f-mono);font-size:13px;font-weight:700;color:var(--secondary)">${s.financeIQ}</div>
                  <div style="font-size:8px;color:var(--text-3);font-family:var(--f-mono)">IQ SCORE</div>
                </div>
              </div>
            </div>
          </div>
          <!-- XP progress -->
          <div style="margin-bottom:4px">
            <div style="display:flex;justify-content:space-between;font-size:9px;color:var(--text-3);font-family:var(--f-mono);margin-bottom:5px">
              <span>COMMANDER XP: ${s.xp}</span><span>${AV.xpToNext()} TO NEXT RANK</span>
            </div>
            ${UI.bar({pct:AV.xpPct(),cls:'fill-primary',h:6})}
          </div>
          <div style="font-size:11px;color:var(--text-2);margin-top:8px">${AV.xpToNext()} XP until <strong style="color:var(--primary)">${RANKS[Math.min(s.level, RANKS.length-1)]}</strong> promotion</div>
        </div>

        <!-- Customize -->
        <div class="card" style="padding:20px;margin-bottom:16px">
          <div style="font-size:9px;color:var(--text-2);font-family:var(--f-mono);letter-spacing:1px;margin-bottom:12px">CUSTOMIZE COMMANDER</div>
          <div style="margin-bottom:10px">
            <div style="font-size:11px;color:var(--text-2);margin-bottom:5px">Callsign</div>
            <div style="display:flex;gap:8px">
              <input id="p-name" class="input" value="${s.name}" style="flex:1"/>
              <button class="btn btn-ghost btn-sm" onclick="const n=document.getElementById('p-name').value.trim();if(n){AV.state.name=n;AV.save();updateSidebar();UI.toast('Callsign updated','primary');}">SAVE</button>
            </div>
          </div>
          <div>
            <div style="font-size:11px;color:var(--text-2);margin-bottom:7px">Avatar</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${['🧑‍🚀','👨‍🚀','👩‍🚀','🤖','👾','🛸','⚡','🌟','🔥','💎'].map(av=>`
                <button style="width:38px;height:38px;border-radius:8px;font-size:18px;background:${s.avatar===av?'rgba(108,178,255,.15)':'var(--s-mid)'};border:1px solid ${s.avatar===av?'var(--primary)':'var(--ghost)'};cursor:pointer;transition:all .15s" class="av-b"
                  onclick="AV.state.avatar='${av}';AV.save();updateSidebar();document.querySelectorAll('.av-b').forEach(b=>{b.style.borderColor='var(--ghost)';b.style.background='var(--s-mid)'});this.style.borderColor='var(--primary)';this.style.background='rgba(108,178,255,.15)'">${av}</button>`).join('')}
            </div>
          </div>
        </div>

        <!-- Commander attributes -->
        <div class="card" style="padding:20px">
          <div style="font-size:9px;color:var(--text-2);font-family:var(--f-mono);letter-spacing:1px;margin-bottom:12px">COMMANDER ATTRIBUTES</div>
          <div class="grid-2" style="gap:10px">
            ${[
              {l:'NAVIGATION ACCURACY', v:s.ship.navigation+'%', c:'var(--primary)'},
              {l:'HOSTILE ENCOUNTERS', v:`${s.crashesSurvived} Survived`, c:'var(--loss)'},
              {l:'MARKET INFLUENCE', v:s.totalTrades>=50?'HIGH':s.totalTrades>=10?'MODERATE':'LOW', c:'var(--gain)'},
              {l:'FINANCE IQ', v:s.financeIQ, c:'var(--secondary)'},
              {l:'SECTORS CLEARED', v:`${AV.donePlanets()}/6`, c:'var(--warn)'},
              {l:'BADGES EARNED', v:`${s.badges.length}/${BADGES.length}`, c:'var(--primary)'},
            ].map(x=>`<div style="background:var(--s-mid);border-radius:var(--r-sm);padding:10px"><div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono)">${x.l}</div><div style="font-family:var(--f-mono);font-weight:700;color:${x.c};margin-top:3px">${x.v}</div></div>`).join('')}
          </div>
        </div>
      </div>

      <!-- Right -->
      <div>
        <!-- Badges -->
        <div class="card" style="padding:20px;margin-bottom:16px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
            <div style="font-size:9px;color:var(--text-2);font-family:var(--f-mono);letter-spacing:1px">ACHIEVEMENTS & DECORATIONS</div>
            <div style="font-size:9px;color:var(--primary);font-family:var(--f-mono)">${s.badges.length}/${BADGES.length} COLLECTED</div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">
            ${BADGES.map(b=>UI.badgeCard(b,s.badges.includes(b.id))).join('')}
          </div>
        </div>

        <!-- Leaderboard -->
        <div class="card" style="padding:20px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
            <div style="font-size:9px;color:var(--text-2);font-family:var(--f-mono);letter-spacing:1px">TOP OPERATIVES</div>
            <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono)">UPDATED: LIVE</div>
          </div>
          ${[
            {rank:1,name:'X_AE_GALAXY',   credits:412500, rank_title:'FLEET MASTER',      highlight:false},
            {rank:2,name:'ZERO_LIMIT',    credits:294100, rank_title:'GRAND ADMIRAL',     highlight:false},
            {rank:3,name:'NOVA_STRIDER',  credits:188000, rank_title:'SECTOR GOVERNOR',   highlight:false},
            {rank:'?',name:s.name.toUpperCase(), credits:AV.netWorth(), rank_title:s.rank.toUpperCase(), highlight:true},
          ].map(p=>`
            <div style="display:flex;align-items:center;gap:12px;padding:12px;background:${p.highlight?'rgba(108,178,255,.08)':'var(--s-mid)'};border-radius:var(--r-md);margin-bottom:6px;border:1px solid ${p.highlight?'var(--ghost-2)':'transparent'}">
              <div style="font-family:var(--f-mono);font-size:18px;font-weight:700;color:${p.rank===1?'var(--warn)':p.rank===2?'var(--text-1)':p.rank===3?'var(--secondary)':'var(--primary)'};width:24px">${p.rank}</div>
              <div style="flex:1">
                <div style="font-family:var(--f-display);font-size:13px;font-weight:700">${p.name}${p.highlight?' (YOU)':''}</div>
                <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono)">${p.rank_title}</div>
              </div>
              <div style="font-family:var(--f-mono);font-size:12px;font-weight:700;color:var(--gain)">${(p.credits/1000).toFixed(1)}K CR</div>
            </div>`).join('')}
        </div>
      </div>
    </div>`;
}

/* ══════════════════════════════════════════════════════════
   CRASH EVENT
══════════════════════════════════════════════════════════ */
let _crashInterval = null;

function triggerCrash() {
  if (document.getElementById('crash-overlay')) return;
  const ev = CRASH_EVENTS[Math.floor(Math.random() * CRASH_EVENTS.length)];
  let timeLeft = 30;

  const overlay = document.createElement('div');
  overlay.id = 'crash-overlay';
  overlay.className = 'crash-overlay';
  overlay.innerHTML = `
    <div class="crash-bg"></div>
    <div class="crash-border"></div>

    <!-- Left: dramatic title -->
    <div style="position:absolute;top:120px;left:40px;right:420px">
      <div style="font-family:var(--f-mono);font-size:11px;color:var(--loss);letter-spacing:2px;margin-bottom:12px;animation:pulse 1s ease infinite">⚠ SYSTEM CRITICAL: MARKET EVENT DETECTED</div>
      <div style="font-family:var(--f-display);font-size:clamp(40px,6vw,72px);font-weight:700;line-height:.95;letter-spacing:1px;color:var(--text-0)">${ev.title}</div>
      <div style="font-family:var(--f-display);font-size:clamp(30px,4vw,52px);font-weight:700;line-height:1;letter-spacing:1px;color:var(--loss);margin-top:8px">${ev.subtitle}</div>
      <div style="margin-top:28px;display:flex;gap:20px">
        <div style="background:rgba(0,0,0,.5);border:1px solid rgba(255,255,255,.1);padding:16px 20px;border-radius:var(--r-md)">
          <div style="font-size:10px;color:var(--text-3);font-family:var(--f-mono)">PREVIOUS PORTFOLIO</div>
          <div style="font-family:var(--f-mono);font-size:22px;font-weight:700;color:var(--text-0);margin-top:4px">${AV.netWorth().toLocaleString()} CR</div>
        </div>
        <div style="background:rgba(0,0,0,.5);border:1px solid rgba(255,113,108,.3);padding:16px 20px;border-radius:var(--r-md)">
          <div style="font-size:10px;color:var(--loss);font-family:var(--f-mono)">CURRENT IMPACT</div>
          <div style="font-family:var(--f-mono);font-size:22px;font-weight:700;color:var(--loss);margin-top:4px">${ev.impact}%</div>
        </div>
      </div>
      <!-- Finance Master NPC -->
      <div style="margin-top:24px;background:rgba(0,0,0,.6);border:1px solid rgba(255,255,255,.08);padding:16px 20px;border-radius:var(--r-lg);max-width:420px">
        <div style="font-size:9px;color:var(--primary);font-family:var(--f-mono);letter-spacing:1px;margin-bottom:6px">FINANCE MASTER NPC</div>
        <div style="font-size:12px;color:var(--text-1);line-height:1.6;font-style:italic">"The impact is catastrophic. Your positions are under pressure. Commander, the clock is ticking — choose your trajectory or the market will choose it for you."</div>
      </div>
    </div>

    <!-- Right: action panel -->
    <div style="width:360px;flex-shrink:0;position:relative;z-index:2">
      <div style="background:rgba(13,13,25,.95);border:1px solid rgba(255,255,255,.1);border-radius:var(--r-xl);padding:24px;backdrop-filter:blur(20px)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
          <div style="font-size:10px;color:var(--loss);font-family:var(--f-mono);letter-spacing:1px">⏱ ACTION WINDOW</div>
          <div id="crash-timer" style="font-family:var(--f-mono);font-size:24px;font-weight:700;color:var(--loss)">00:${String(timeLeft).padStart(2,'0')}</div>
        </div>
        ${UI.bar({pct:100,cls:'fill-loss',h:3})}
        <div style="height:16px"></div>
        ${[
          {key:'panic', label:'PANIC SELL', color:'var(--loss)', bg:'rgba(255,113,108,.15)', icon:'📉', desc:'Lock in losses immediately'},
          {key:'hold',  label:'HOLD',       color:'var(--primary)', bg:'rgba(108,178,255,.1)', icon:'⚓', desc:'Stay the course — trust the market'},
          {key:'buy',   label:'BUY THE DIP',color:'var(--gain)', bg:'rgba(205,255,90,.1)', icon:'🚀', desc:'Accumulate at discount prices'},
          {key:'safe',  label:'SAFE HAVEN', color:'var(--secondary)', bg:'rgba(173,137,255,.1)', icon:'🛡️', desc:'Move to stable Terra assets'},
        ].map(opt=>`
          <button onclick="resolveCrash('${opt.key}')"
            style="width:100%;display:flex;justify-content:space-between;align-items:center;padding:14px 16px;background:${opt.bg};border:1px solid ${opt.color}44;border-radius:var(--r-md);cursor:pointer;transition:all .2s;margin-bottom:8px;font-family:var(--f-display);font-size:13px;font-weight:700;color:${opt.color};letter-spacing:.5px"
            onmouseenter="this.style.borderColor='${opt.color}'" onmouseleave="this.style.borderColor='${opt.color}44'">
            <span>${opt.label}</span><span style="font-size:18px">${opt.icon}</span>
          </button>`).join('')}
        <div style="font-size:9px;color:var(--text-3);font-family:var(--f-mono);text-align:center;margin-top:8px">INACTION WILL RESULT IN AUTO-HOLD</div>
      </div>
    </div>`;

  document.body.appendChild(overlay);

  // Countdown
  _crashInterval = setInterval(() => {
    timeLeft--;
    const timerEl = document.getElementById('crash-timer');
    if (timerEl) timerEl.textContent = `00:${String(timeLeft).padStart(2,'0')}`;
    if (timeLeft <= 0) { clearInterval(_crashInterval); resolveCrash('hold'); }
  }, 1000);
}

function resolveCrash(choice) {
  clearInterval(_crashInterval);
  const overlay = document.getElementById('crash-overlay');
  if (overlay) overlay.remove();
  const outcome = AV.surviveCrash(choice);
  UI.toast(outcome.label, choice==='buy'||choice==='hold'?'gain':'loss', 5000);
  updateSidebar();
  setTimeout(() => {
    UI.openModal({ accent: choice==='panic'?'var(--loss)':'var(--gain)', content: el => {
      el.innerHTML = `
        <div style="text-align:center;padding:16px">
          <div style="font-size:52px;margin-bottom:12px">${choice==='buy'?'🚀':choice==='hold'?'⚓':choice==='safe'?'🛡️':'📉'}</div>
          <div style="font-family:var(--f-display);font-size:22px;font-weight:700;letter-spacing:1px;color:${choice==='panic'?'var(--loss)':'var(--gain)'};margin-bottom:8px">
            ${choice==='buy'?'SMART MOVE!':choice==='hold'?'STEADY COMMANDER':choice==='safe'?'CAUTIOUS PLAY':'COSTLY MISTAKE'}
          </div>
          <div style="font-size:13px;color:var(--text-1);margin-bottom:16px">${outcome.label}</div>
          <div style="background:var(--s-mid);border-radius:var(--r-md);padding:14px;margin-bottom:20px;border:1px solid var(--ghost)">
            <div style="font-size:9px;color:var(--primary);font-family:var(--f-mono);margin-bottom:6px">FINANCE MASTER DEBRIEF</div>
            <div style="font-size:12.5px;color:var(--text-1);line-height:1.6;font-style:italic">"${outcome.lesson}"</div>
          </div>
          <button class="btn btn-primary btn-lg" style="width:100%" onclick="UI.closeModal()">ACKNOWLEDGED →</button>
        </div>`;
    }});
  }, 300);
}
