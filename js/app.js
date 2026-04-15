/* ═══════════════════════════════════════════════════════════
   ASTRO VAULT — APP ROUTER & BOOT
   ═══════════════════════════════════════════════════════════ */

const PAGES = {
  galaxy:    { init: initGalaxy },
  trade:     { init: initTrade },
  ship:      { init: initShip },
  portfolio: { init: initPortfolio },
  missions:  { init: initMissions },
  knowledge: { init: initKnowledge },
  profile:   { init: initProfile },
};

let currentPage = 'galaxy';

function goPage(page) {
  if (!PAGES[page]) return;

  // Stop trade interval when leaving trade
  if (currentPage === 'trade' && page !== 'trade') {
    if (_priceInterval) { clearInterval(_priceInterval); _priceInterval = null; }
  }

  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const screen = document.getElementById(`screen-${page}`);
  if (screen) screen.classList.add('active');

  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(n => { if (n.dataset.page === page) n.classList.add('active'); });

  currentPage = page;
  PAGES[page].init();

  const main = document.getElementById('main');
  if (main && main.scrollTo) main.scrollTo({ top: 0, behavior: 'smooth' });
}

// Nav clicks
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => goPage(item.dataset.page));
});

// Sidebar updater
function updateSidebar() {
  const s = AV.state;
  const el = id => document.getElementById(id);
  if (el('sb-name'))    el('sb-name').textContent = s.name.toUpperCase();
  if (el('sb-rank'))    el('sb-rank').textContent = s.rank.toUpperCase();
  if (el('sb-credits')) el('sb-credits').textContent = AV.formatCR(s.credits);
  if (el('sb-xp-fill')) el('sb-xp-fill').style.width = AV.xpPct() + '%';
  if (el('sb-xp-lbl'))  el('sb-xp-lbl').textContent = s.xp + ' XP';
  if (el('sb-xp-nxt'))  el('sb-xp-nxt').textContent = AV.xpToNext() + ' to next';
  if (el('sb-avatar'))  el('sb-avatar').textContent = s.avatar;
  if (el('sb-level'))   el('sb-level').textContent = 'LEVEL ' + s.level;
}

// Event listeners
AV.on('credits',       () => updateSidebar());
AV.on('xp',            () => updateSidebar());
AV.on('levelup',       data => { UI.toastLevelUp(data.level, data.rank); updateSidebar(); });
AV.on('planet_complete', data => {
  UI.toastCredits(data.credits);
  UI.toastXP(data.xp);
  updateSidebar();
  // Advance story chapter
  const planet = PLANETS.find(p => p.id === data.planetId);
  if (planet) {
    const idx = PLANETS.findIndex(p => p.id === data.planetId);
    AV.state.storyChapter = Math.max(AV.state.storyChapter, idx + 1);
    // Unlock next planet
    if (PLANETS[idx + 1]) PLANETS[idx + 1].unlocked = true;
    AV.save();
  }
  if (currentPage === 'galaxy') setTimeout(initGalaxy, 200);
  if (currentPage === 'missions') setTimeout(initMissions, 200);
});
AV.on('portfolio',     () => { if (currentPage === 'trade') { setTimeout(renderHoldings, 100); setTimeout(renderTradeHistory, 100); } });
AV.on('badge',         badge => UI.toastBadge(badge));
AV.on('ship_upgrade',  ship => UI.toast(`🚀 SHIP UPGRADED: ${ship.name.toUpperCase()}`, 'primary', 4000));

// Random crash events
let _crashScheduled = false;
function scheduleCrash() {
  if (_crashScheduled) return;
  _crashScheduled = true;
  const delay = 90000 + Math.random() * 120000; // 1.5–3.5 min
  setTimeout(() => {
    _crashScheduled = false;
    if (AV.state.totalTrades > 0 || AV.donePlanets() > 0) {
      triggerCrash();
      scheduleCrash();
    } else {
      scheduleCrash();
    }
  }, delay);
}

// Boot
function boot() {
  UI.createStarfield();
  initPrices();
  updateSidebar();
  initGalaxy();

  // Show intro on first visit, toast on return
  const firstVisit = !localStorage.getItem('av_visited');
  if (firstVisit) {
    localStorage.setItem('av_visited', '1');
    setTimeout(showIntro, 600);
  } else {
    setTimeout(() => {
      UI.toast(`Welcome back, ${AV.state.name}. The galaxy awaits.`, 'primary', 4000);
    }, 1000);
  }

  // Schedule crash events
  scheduleCrash();

  console.log('%cASTRO VAULT loaded ✓', 'color:#6cb2ff;font-weight:bold;font-size:14px;font-family:monospace');
}

document.addEventListener('DOMContentLoaded', boot);
