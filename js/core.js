/* ═══════════════════════════════════════════════════════════
   ASTRO VAULT — CORE STATE ENGINE
   ═══════════════════════════════════════════════════════════ */

const AV = (() => {

  const DEFAULT = {
    // Pilot
    name: 'CDR. NOVA',
    avatar: '🧑‍🚀',
    credits: 500,
    xp: 0,
    level: 1,
    rank: 'Space Cadet',
    currentPlanet: 'terra',

    // Progress
    planetsDone: {},      // { planetId: { lessonRead, quizScore, completed } }
    crashesSurvived: 0,
    totalTrades: 0,
    badges: ['first_light'],

    // Ship stats (0-100)
    ship: {
      tier: 1,
      name: 'Broken Shuttle',
      engine: 20,
      cargo: 20,
      shields: 20,
      navigation: 20,
    },

    // Portfolio
    portfolio: {
      holdings: [],    // { symbol, qty, avgPrice }
      tradeHistory: [],
      netWorthHistory: [500],
    },

    // Missions
    dailyProgress: {},
    storyChapter: 0,

    // Quiz
    financeIQ: 100,
  };

  function load() {
    try {
      const s = localStorage.getItem('av_state');
      if (s) {
        const p = JSON.parse(s);
        return {
          ...DEFAULT, ...p,
          ship: { ...DEFAULT.ship, ...p.ship },
          portfolio: { ...DEFAULT.portfolio, ...p.portfolio },
        };
      }
    } catch(e) {}
    return { ...DEFAULT };
  }

  function save() {
    try { localStorage.setItem('av_state', JSON.stringify(state)); } catch(e) {}
  }

  let state = load();

  /* ── CREDITS & XP ── */
  function addCredits(n, reason) {
    state.credits += n;
    save();
    emit('credits', { amount: n, reason, total: state.credits });
    checkBadges();
  }

  function addXP(n) {
    state.xp += n;
    state.financeIQ = Math.min(200, state.financeIQ + Math.floor(n/10));
    const newLevel = Math.floor(state.xp / 300) + 1;
    if (newLevel > state.level) {
      state.level = newLevel;
      state.rank = RANKS[Math.min(newLevel - 1, RANKS.length - 1)];
      emit('levelup', { level: newLevel, rank: state.rank });
      upgradeShip(newLevel);
    }
    save();
    emit('xp', { amount: n, total: state.xp });
  }

  function upgradeShip(level) {
    const tiers = [
      { tier:1, name:'Broken Shuttle',    engine:20, cargo:20, shields:20, navigation:20 },
      { tier:2, name:'Patched Freighter', engine:40, cargo:35, shields:35, navigation:40 },
      { tier:3, name:'Merchant Cruiser',  engine:60, cargo:55, shields:55, navigation:60 },
      { tier:4, name:'Trade Battleship',  engine:78, cargo:72, shields:72, navigation:78 },
      { tier:5, name:'Galaxy Flagship',   engine:95, cargo:92, shields:92, navigation:95 },
    ];
    const newTier = Math.min(Math.floor(level / 3) + 1, 5);
    if (newTier > state.ship.tier) {
      state.ship = { ...tiers[newTier - 1] };
      save();
      emit('ship_upgrade', state.ship);
    }
  }

  /* ── PLANET / LESSON ── */
  function markLessonRead(planetId) {
    if (!state.planetsDone[planetId]) state.planetsDone[planetId] = {};
    state.planetsDone[planetId].lessonRead = true;
    state.ship.navigation = Math.min(100, state.ship.navigation + 5);
    save();
  }

  function completePlanet(planetId, xp, credits) {
    if (!state.planetsDone[planetId]) state.planetsDone[planetId] = {};
    state.planetsDone[planetId].completed = true;
    addXP(xp);
    addCredits(credits, 'mission complete');
    const done = Object.values(state.planetsDone).filter(p => p.completed).length;
    if (done >= 1) unlockBadge('first_mission');
    if (done >= 3) unlockBadge('tri_sector');
    if (done >= 6) unlockBadge('galaxy_master');
    save();
    emit('planet_complete', { planetId, xp, credits });
  }

  /* ── TRADING ── */
  function buy(symbol, qty, price) {
    const cost = qty * price;
    if (cost > state.credits) return false;
    state.credits -= cost;
    const h = state.portfolio.holdings.find(x => x.symbol === symbol);
    if (h) {
      h.avgPrice = ((h.avgPrice * h.qty) + cost) / (h.qty + qty);
      h.qty += qty;
    } else {
      state.portfolio.holdings.push({ symbol, qty, avgPrice: price });
    }
    state.portfolio.tradeHistory.unshift({ type:'buy', symbol, qty, price, date: today() });
    state.totalTrades++;
    state.ship.cargo = Math.min(100, state.ship.cargo + 2);
    if (state.totalTrades >= 1)  unlockBadge('first_trade');
    if (state.totalTrades >= 10) unlockBadge('active_trader');
    if (state.totalTrades >= 50) unlockBadge('market_veteran');
    updateNetWorth();
    save();
    emit('portfolio', state.portfolio);
    return true;
  }

  function sell(symbol, qty, price) {
    const h = state.portfolio.holdings.find(x => x.symbol === symbol);
    if (!h || h.qty < qty) return false;
    h.qty -= qty;
    if (h.qty === 0) state.portfolio.holdings = state.portfolio.holdings.filter(x => x.symbol !== symbol);
    const proceeds = qty * price;
    const cost = qty * h.avgPrice;
    const pnl = proceeds - cost;
    state.credits += proceeds;
    state.portfolio.tradeHistory.unshift({ type:'sell', symbol, qty, price, pnl, date: today() });
    state.totalTrades++;
    state.ship.engine = Math.min(100, state.ship.engine + 2);
    if (pnl > 0) unlockBadge('profitable_exit');
    updateNetWorth();
    save();
    emit('portfolio', state.portfolio);
    return { pnl, proceeds };
  }

  function updateNetWorth() {
    const total = netWorth();
    const hist = state.portfolio.netWorthHistory;
    if (hist[hist.length - 1] !== total) {
      hist.push(total);
      if (hist.length > 50) hist.shift();
    }
  }

  /* ── CRASH EVENT ── */
  function surviveCrash(choice) {
    state.crashesSurvived++;
    state.ship.shields = Math.min(100, state.ship.shields + 8);
    if (choice !== 'panic') unlockBadge('crash_survivor');
    if (state.crashesSurvived >= 3) unlockBadge('void_hardened');
    const outcome = CRASH_OUTCOMES[choice];
    // Apply crash impact to holdings
    if (choice === 'panic') {
      // Sell everything at -35%
      state.portfolio.holdings = [];
      state.credits = Math.round(state.credits * 0.65);
    } else if (choice === 'buy') {
      addCredits(Math.round(state.credits * 0.15), 'bought the dip');
    } else if (choice === 'safe') {
      // -5% loss, move to stable
      state.credits = Math.round(state.credits * 0.95);
    }
    // Hold: no change
    addXP(outcome.xp);
    save();
    return outcome;
  }

  /* ── BADGES ── */
  function unlockBadge(id) {
    if (state.badges.includes(id)) return;
    state.badges.push(id);
    save();
    const badge = BADGES.find(b => b.id === id);
    if (badge) emit('badge', badge);
  }

  function checkBadges() {
    if (state.credits >= 1000)  unlockBadge('kilocredit');
    if (state.credits >= 5000)  unlockBadge('five_k');
    if (state.credits >= 10000) unlockBadge('ten_k');
  }

  /* ── EVENT BUS ── */
  const _listeners = {};
  function on(e, fn)  { if (!_listeners[e]) _listeners[e] = []; _listeners[e].push(fn); }
  function emit(e, d) { (_listeners[e] || []).forEach(fn => fn(d)); }

  /* ── HELPERS ── */
  function today() { return new Date().toISOString().split('T')[0]; }

  function netWorth() {
    const stockVal = state.portfolio.holdings.reduce((a, h) => {
      const s = ASSETS.find(x => x.symbol === h.symbol);
      return a + (s ? _prices[h.symbol] * h.qty : 0);
    }, 0);
    return Math.round(state.credits + stockVal);
  }

  function xpPct()    { return ((state.xp % 300) / 300) * 100; }
  function xpToNext() { return 300 - (state.xp % 300); }
  function donePlanets() { return Object.values(state.planetsDone).filter(p => p.completed).length; }

  function formatCR(n) {
    if (n >= 1000000) return (n/1000000).toFixed(2) + 'M CR';
    if (n >= 1000)    return (n/1000).toFixed(1) + 'K CR';
    return n.toLocaleString() + ' CR';
  }

  return {
    get state() { return state; },
    save, addCredits, addXP, markLessonRead, completePlanet,
    buy, sell, surviveCrash, unlockBadge,
    on, emit, formatCR, netWorth, xpPct, xpToNext, donePlanets,
  };
})();

/* ═══════════════════════════════════════════════════════════
   LIVE PRICE ENGINE
   ═══════════════════════════════════════════════════════════ */
const _prices = {};
const _priceHistory = {};
let _priceInterval = null;

function initPrices() {
  ASSETS.forEach(a => {
    _prices[a.symbol] = a.basePrice;
    _priceHistory[a.symbol] = Array(20).fill(a.basePrice).map((p, i) => Math.round(p * (1 + (Math.random()-.5)*.05)));
  });
}

function tickPrices() {
  ASSETS.forEach(a => {
    const vol = a.volatility || 0.008;
    const drift = (Math.random() - 0.47) * vol;
    _prices[a.symbol] = Math.max(1, Math.round(_prices[a.symbol] * (1 + drift)));
    if (_priceHistory[a.symbol].length > 40) _priceHistory[a.symbol].shift();
    _priceHistory[a.symbol].push(_prices[a.symbol]);
    // Flash DOM
    const el = document.getElementById('price-' + a.symbol);
    if (el) {
      const prev = parseFloat(el.dataset.prev || _prices[a.symbol]);
      const now  = _prices[a.symbol];
      el.textContent = now.toLocaleString();
      el.dataset.prev = now;
      el.className = 'trade-price ' + (now > prev ? 'price-flash-up' : now < prev ? 'price-flash-dn' : '');
      setTimeout(() => { if (el) el.className = 'trade-price'; }, 500);
      // change %
      const chgEl = document.getElementById('chg-' + a.symbol);
      if (chgEl) {
        const chg = (((now - a.basePrice) / a.basePrice) * 100).toFixed(2);
        chgEl.textContent = (chg >= 0 ? '+' : '') + chg + '%';
        chgEl.className = 'trade-change ' + (chg >= 0 ? 'up' : 'dn');
      }
      drawSpark('spark-' + a.symbol, _priceHistory[a.symbol]);
    }
  });
  // Update portfolio P&L
  const pnlEl = document.getElementById('live-pnl');
  if (pnlEl) {
    const holdings = AV.state.portfolio.holdings;
    if (holdings.length > 0) {
      const curVal  = holdings.reduce((a,h)=>a+(_prices[h.symbol]||0)*h.qty, 0);
      const costVal = holdings.reduce((a,h)=>a+h.avgPrice*h.qty, 0);
      const pnl = Math.round(curVal - costVal);
      pnlEl.textContent = (pnl >= 0 ? '+' : '') + pnl.toLocaleString() + ' CR';
      pnlEl.className = 'pnl ' + (pnl >= 0 ? 'pos' : 'neg');
    }
  }
}

function drawSpark(canvasId, prices) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  if (prices.length < 2) return;
  const min = Math.min(...prices), max = Math.max(...prices);
  const range = max - min || 1;
  const isUp = prices[prices.length-1] >= prices[0];
  const color = isUp ? '#cdff5a' : '#ff716c';
  ctx.beginPath();
  prices.forEach((p, i) => {
    const x = (i / (prices.length - 1)) * w;
    const y = h - ((p - min) / range) * (h - 4) - 2;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.stroke();
  ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, isUp ? 'rgba(205,255,90,.25)' : 'rgba(255,113,108,.25)');
  grad.addColorStop(1, 'transparent');
  ctx.fillStyle = grad; ctx.fill();
}

function drawDonut(canvasId, slices) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const cx = w/2, cy = h/2, r = Math.min(w,h)/2 - 8;
  ctx.clearRect(0,0,w,h);
  let start = -Math.PI/2;
  slices.forEach(s => {
    const angle = (s.pct/100) * Math.PI * 2;
    ctx.beginPath(); ctx.moveTo(cx,cy);
    ctx.arc(cx,cy,r,start,start+angle);
    ctx.closePath();
    ctx.fillStyle = s.color; ctx.fill();
    start += angle;
  });
  // Hole
  ctx.beginPath(); ctx.arc(cx,cy,r*.6,0,Math.PI*2);
  ctx.fillStyle = '#1e1e2f'; ctx.fill();
}

/* ═══════════════════════════════════════════════════════════
   GAME DATA
   ═══════════════════════════════════════════════════════════ */

const RANKS = [
  'Space Cadet','Cargo Runner','Market Navigator',
  'Trade Commander','Sector Governor','Fleet Master','Grand Admiral'
];

const PLANETS = [
  {
    id:'terra', name:'TERRA BASE', emoji:'🌍', color:'#6cb2ff', glowClass:'glow-blue',
    status:'STABLE', statusColor:'#6cb2ff', desc:'The core financial hub of the Inner Rim. Low risk, guaranteed returns.',
    realConcept:'Banking & Savings',
    master:'Commander Thrift', masterQuote:'"The first rule of wealth: protect what you have before you grow it."',
    unlocked: true,
    lesson:'In the galaxy of 2157, Terra Base serves as the financial bedrock of civilization. Every Commander begins here — not because it\'s exciting, but because it\'s essential. The Terra Central Vault offers Guaranteed Yield Bonds (GYBs) — the galactic equivalent of Fixed Deposits. Your credits are insured up to 50,000 CR by the Galactic Insurance Corp. The interest compounds automatically. It\'s boring. It\'s safe. And that\'s exactly the point. An emergency fund in the Terra Vault is your shield against every storm in the galaxy.',
    keyPoints:['Emergency fund = 3–6 months of living expenses in liquid form','Fixed Deposits give guaranteed returns regardless of market conditions','Compound interest: earn interest on your interest every cycle','Never invest what you cannot afford to lose — Terra Vault first','Galactic Insurance Corp protects deposits up to 50,000 CR per vault'],
    quiz:[
      { q:'What is the PRIMARY purpose of an emergency fund?', opts:['Maximum returns','Safety net for unexpected events','Investment vehicle','Tax savings'], a:1 },
      { q:'Compound interest means you earn interest on?', opts:['Only your principal','Principal + previously earned interest','Only previous interest','None of these'], a:1 },
      { q:'Terra Vault = Fixed Deposits. What is the risk level?', opts:['Very High','High','Medium','Very Low'], a:3 },
    ],
    xp:100, credits:200,
  },
  {
    id:'mars', name:'MARS EXCHANGE', emoji:'🔴', color:'#ff716c', glowClass:'glow-red',
    status:'VOLATILE', statusColor:'#ff716c', desc:'The galactic stock exchange. High reward, high turbulence.',
    realConcept:'Stock Market & Mutual Funds',
    master:'Broker X-47', masterQuote:'"The market is a device for transferring credits from the impatient to the patient."',
    unlocked: false,
    lesson:'Mars Exchange is the beating heart of galactic commerce. Thousands of vessels trade millions of asset units every cycle. Prices rise on good news, crash on bad. The key insight: in the short term, prices are random noise. In the long term, they track the growth of real galactic enterprises. The legendary commander who bought Nebula Prime stock at the founding of the exchange and held for 30 cycles turned 1,000 CR into 847,000 CR. Diversification is your armour — never put more than 10% in any single asset.',
    keyPoints:['Stocks = ownership in real galactic enterprises','P/E ratio: how much you pay for each unit of earnings','Diversify across sectors — never concentrate in one asset','Time in the market beats timing the market — always','Index funds track all Mars Exchange assets = instant diversification'],
    quiz:[
      { q:'Buying Mars Exchange stocks means you are?', opts:['Lending credits to a company','Owning part of a company','Gambling on prices','Depositing in a vault'], a:1 },
      { q:'Best strategy for long-term wealth building?', opts:['Trade every cycle','Follow tips','Buy index fund and hold','Sell on first profit'], a:2 },
      { q:'What does diversification protect against?', opts:['All losses','Single asset risk','Market crashes entirely','Inflation'], a:1 },
    ],
    xp:150, credits:300,
  },
  {
    id:'jupiter', name:'JUPITER DEPOT', emoji:'💛', color:'#ffd234', glowClass:'glow-yellow',
    status:'BULLISH', statusColor:'#ffd234', desc:'The commodities hub. Systematic accumulation, long-term wealth.',
    realConcept:'SIP & Commodities',
    master:'Elder Grain', masterQuote:'"Plant a credit today. Harvest a fortune in 20 cycles."',
    unlocked: false,
    lesson:'Jupiter Depot runs on the Systematic Accumulation Protocol — SAP. Every cycle, a fixed amount of credits automatically purchases commodity futures regardless of current prices. When prices are low, you buy more units. When prices are high, you buy fewer. Over time, your average buy price smooths out all the volatility — this is called Credit Cost Averaging. The most powerful fleet commanders in the galaxy built their fortunes not through genius trades but through relentless, boring, systematic accumulation. Set it. Forget it. Let compounding do the work.',
    keyPoints:['SAP (SIP) = fixed auto-investment every cycle, no manual decisions needed','Credit Cost Averaging: buy more when cheap, less when expensive — average out volatility','₹500/month at 12% for 20 years = ₹49.9 Lakhs. Patience is the edge.','Never stop SAP during market crashes — you\'re buying the dip automatically','Jupiter Depot = Nifty 50 Index Fund equivalent — diversified, low fee, proven'],
    quiz:[
      { q:'What is the main advantage of SAP (SIP)?', opts:['Maximum short-term returns','Removes need to time the market','Only works in bull markets','Requires expert knowledge'], a:1 },
      { q:'Credit Cost Averaging means you buy MORE when prices are?', opts:['High','Medium','Low','Stable'], a:2 },
      { q:'When should you STOP your SAP during a crash?', opts:['Immediately','After 10% drop','After 20% drop','Almost never'], a:3 },
    ],
    xp:200, credits:400,
  },
  {
    id:'europa', name:'EUROPA CHAIN', emoji:'⚪', color:'#ad89ff', glowClass:'glow-purple',
    status:'EXTREME', statusColor:'#ad89ff', desc:'Decentralized, volatile, unregulated. Handle with extreme care.',
    realConcept:'Cryptocurrency',
    master:'Ghost Node', masterQuote:'"The chain never lies. But it never forgives either."',
    unlocked: false,
    lesson:'Europa Chain operates outside the Galactic Central Bank. No regulator. No insurance. No mercy. Dark Matter tokens can surge 300% in a lunar cycle and crash 80% the next. Bitcoin — the original chain asset — has survived 5 galactic financial crises and come back stronger each time. But countless commanders have lost everything chasing the next big token. The Cardinal Rule of Europa: never risk more than 5% of your total portfolio here. Not because you lack courage, but because you lack the ability to predict what cannot be predicted.',
    keyPoints:['Crypto = high risk, high reward — treat as speculative, not investment','Never put more than 5% of your total portfolio in crypto','Bitcoin is most established — other tokens are exponentially riskier','In India: 30% flat tax on ALL crypto gains, 1% TDS on every trade','Hardware wallet for large holdings — not your keys, not your coins'],
    quiz:[
      { q:'Maximum recommended crypto allocation in portfolio?', opts:['50%','25%','10%','5%'], a:3 },
      { q:'What makes crypto fundamentally different from stocks?', opts:['Higher returns','No underlying business value or regulation','Easier to trade','Lower taxes'], a:1 },
      { q:'In India, crypto gains are taxed at?', opts:['0%','15%','20%','30% flat'], a:3 },
    ],
    xp:200, credits:400,
  },
  {
    id:'saturn', name:'SATURN VAULT', emoji:'🟣', color:'#b1e23c', glowClass:'glow-green',
    status:'LOCKED', statusColor:'#757484', desc:'Long-term wealth architecture. Real estate and structured assets.',
    realConcept:'Real Estate & Long-term Investing',
    master:'Architect Orion', masterQuote:'"The best time to plant a gravity tree was 20 cycles ago. The second best time is now."',
    unlocked: false,
    lesson:'Saturn Vault specializes in Gravity Assets — long-term, illiquid investments that compound silently over decades. Station lots, orbital platforms, deep space mining rights — these are the galactic equivalents of real estate. They don\'t fluctuate wildly like Mars Exchange. They generate passive income. They appreciate with the growth of civilization itself. The catch: they are illiquid. You cannot sell quickly in an emergency. This is why the Terra Emergency Vault must come first. But for a commander with a 10-20 cycle horizon, Saturn Vault assets form the bedrock of generational wealth.',
    keyPoints:['Real estate = illiquid but historically reliable long-term wealth','Rental yield = passive income without selling the asset','REITs let you invest in real estate with just ₹500 — no need to buy property','Long-term capital gains on real estate: more tax-efficient than short-term','Always have liquid assets before locking into illiquid investments'],
    quiz:[
      { q:'Real estate is described as "illiquid" because?', opts:['It generates no income','It cannot be sold quickly','It always loses value','It requires a license'], a:1 },
      { q:'REITs allow you to invest in real estate?', opts:['Only by buying full property','With very small amounts','Only in one location','Tax-free'], a:1 },
      { q:'When should you invest in long-term illiquid assets?', opts:['Before emergency fund','Before paying off debt','After securing liquid foundation','As first investment'], a:2 },
    ],
    xp:250, credits:500,
  },
  {
    id:'void', name:'VOID DEEP', emoji:'🌌', color:'#6cb2ff', glowClass:'glow-blue',
    status:'LOCKED', statusColor:'#757484', desc:'The final frontier. Portfolio mastery and financial freedom.',
    realConcept:'Portfolio Theory & Financial Freedom',
    master:'The Oracle', masterQuote:'"Financial freedom is not a number. It is the point where passive income exceeds expenses."',
    unlocked: false,
    lesson:'The Void Deep is not a place. It is a state of being. The commanders who reach it have mastered something that cannot be taught in a single lesson — the ability to build systems that generate wealth without their active participation. Their portfolio is diversified across all sectors. Their ship is fully upgraded. Their passive income from Terra Bonds, Mars dividends, Jupiter SAP, and Saturn rents exceeds their monthly burn rate. This is the definition of financial freedom — not having a large number in your vault, but having your credits work harder than you do.',
    keyPoints:['Financial freedom = passive income ≥ monthly expenses','Portfolio diversification: never have more than 40% in any one asset class','Rebalance portfolio every 6 months — trim winners, add to laggards','The 4% rule: withdraw 4% of total portfolio annually without depleting principal','Building multiple income streams is the final form of financial security'],
    quiz:[
      { q:'Financial freedom means?', opts:['Having 1 crore rupees','Passive income exceeds expenses','Being debt-free','Having a high salary'], a:1 },
      { q:'The 4% rule suggests you can annually withdraw what % safely?', opts:['1%','2%','4%','10%'], a:2 },
      { q:'Portfolio rebalancing means?', opts:['Selling everything and restarting','Trimming winners and adding to laggards periodically','Only buying new assets','Moving everything to cash'], a:1 },
    ],
    xp:300, credits:600,
  },
];

const ASSETS = [
  { symbol:'ECRYST',  name:'Energy Crystals', icon:'⚡', planet:'mars',    basePrice:1452, volatility:0.012, sector:'Energy' },
  { symbol:'GRAIN',   name:'Space Grain',     icon:'🌾', planet:'jupiter', basePrice:82,   volatility:0.008, sector:'Commodity' },
  { symbol:'VOIDM',   name:'Void Matter',     icon:'💎', planet:'europa',  basePrice:2.45, volatility:0.035, sector:'Crypto' },
  { symbol:'STEELX',  name:'Steel Alloys',    icon:'🏗️', planet:'saturn',  basePrice:312,  volatility:0.006, sector:'Industrial' },
  { symbol:'DATACHIP',name:'Data Chips',      icon:'📡', planet:'mars',    basePrice:748,  volatility:0.018, sector:'Tech' },
  { symbol:'MEDPAK',  name:'MedPacks',        icon:'💊', planet:'terra',   basePrice:195,  volatility:0.004, sector:'Stable' },
  { symbol:'NEBPRIME',name:'Nebula Prime',    icon:'🌟', planet:'void',    basePrice:112,  volatility:0.022, sector:'Premium' },
  { symbol:'SOLFUEL', name:'Solar Fuel',      icon:'☀️', planet:'jupiter', basePrice:15,   volatility:0.009, sector:'Energy' },
];

const BADGES = [
  { id:'first_light',    emoji:'🌅', name:'FIRST LIGHT',      desc:'Began your journey',           rarity:'common' },
  { id:'first_mission',  emoji:'🚀', name:'LAUNCHED',         desc:'Completed first planet',        rarity:'common' },
  { id:'first_trade',    emoji:'📊', name:'FIRST TRADE',      desc:'Made your first trade',         rarity:'common' },
  { id:'crash_survivor', emoji:'🛡️', name:'CRASH SURVIVOR',   desc:'Survived a market crash',       rarity:'rare' },
  { id:'void_hardened',  emoji:'⚡', name:'VOID HARDENED',    desc:'Survived 3 crashes',            rarity:'rare' },
  { id:'profitable_exit',emoji:'📈', name:'PROFITABLE EXIT',  desc:'Sold at a profit',              rarity:'common' },
  { id:'active_trader',  emoji:'🔄', name:'ACTIVE TRADER',    desc:'Made 10 trades',                rarity:'rare' },
  { id:'market_veteran', emoji:'🏆', name:'MARKET VETERAN',   desc:'Made 50 trades',                rarity:'legendary' },
  { id:'tri_sector',     emoji:'🌍', name:'TRI-SECTOR',       desc:'Mastered 3 planets',            rarity:'rare' },
  { id:'galaxy_master',  emoji:'👑', name:'GALAXY MASTER',    desc:'Mastered all 6 planets',        rarity:'legendary' },
  { id:'kilocredit',     emoji:'💰', name:'KILOCREDIT',       desc:'Reached 1,000 credits',         rarity:'common' },
  { id:'five_k',         emoji:'💎', name:'FIVE K',           desc:'Reached 5,000 credits',         rarity:'rare' },
  { id:'ten_k',          emoji:'🌌', name:'TEN K',            desc:'Reached 10,000 credits',        rarity:'legendary' },
];

const CRASH_EVENTS = [
  { id:'asteroid', title:'ASTEROID STORM', subtitle:'HITS MARS EXCHANGE', img:'☄️', severity:'LEVEL 3', impact:-38.5, lesson:'Market corrections are natural. Holding through them is what separates wealth builders from speculators.' },
  { id:'solarflare', title:'SOLAR FLARE', subtitle:'DISRUPTS EUROPA CHAIN', img:'🌟', severity:'LEVEL 4', impact:-52, lesson:'Crypto crashes hard and fast. This is why max 5% allocation is critical — you must be able to survive 80% drops.' },
  { id:'pirates', title:'PIRATE BLOCKADE', subtitle:'FREEZES JUPITER ROUTES', img:'🏴‍☠️', severity:'LEVEL 2', impact:-22, lesson:'Market disruptions are temporary. Your SAP kept buying through the blockade — you actually bought at discounts.' },
  { id:'bankrun', title:'TERRA BANK RUN', subtitle:'CREDITS CRISIS DETECTED', img:'🏦', severity:'LEVEL 5', impact:-65, lesson:'Even safe assets can suffer in a systemic crisis. Diversification across asset classes is your ultimate shield.' },
];

const CRASH_OUTCOMES = {
  panic:  { xp:0,   creditsEffect:-0.35, label:'Locked in losses. Market recovered 3 cycles later.',   lesson:'Panic selling is the most expensive mistake in investing.' },
  hold:   { xp:100, creditsEffect:0,     label:'Held firm. Portfolio recovered +12% after 5 cycles.',  lesson:'Time in the market beats timing the market. Always.' },
  buy:    { xp:150, creditsEffect:0.15,  label:'Bought the dip! Profit +15% on recovery.',             lesson:'Market crashes are sales. Great commanders buy when others panic.' },
  safe:   { xp:50,  creditsEffect:-0.05, label:'Protected most of your credits. Safe but cautious.',   lesson:'Moving to safe haven is valid — but you miss the recovery rally.' },
};

const DAILY_MISSIONS = [
  { id:'d1', icon:'⚡', title:'MARKET SCAN',     desc:'Visit the Trade terminal',           xp:30,  cr:15,  type:'visit_trade' },
  { id:'d2', icon:'📖', title:'KNOWLEDGE SYNC',  desc:'Complete a planet lesson',           xp:60,  cr:30,  type:'lesson' },
  { id:'d3', icon:'💱', title:'EXECUTE TRADE',   desc:'Make 1 trade on any planet',         xp:50,  cr:25,  type:'trade' },
  { id:'d4', icon:'🛡️', title:'HULL CHECK',      desc:'Check your ship stats',              xp:20,  cr:10,  type:'visit_ship' },
  { id:'d5', icon:'🧠', title:'QUIZ BATTLE',     desc:'Answer a knowledge quiz',            xp:80,  cr:40,  type:'quiz' },
];

const STORY_CHAPTERS = [
  { id:0, title:'ESCAPE TERRA BASE',      desc:'Learn the basics. Build your emergency fund.',          planet:'terra',   done:false },
  { id:1, title:'SURVIVE THE MARS CRASH', desc:'Your first crash. Panic or hold?',                     planet:'mars',    done:false },
  { id:2, title:'THE JUPITER SAP PROTOCOL',desc:'Set up systematic investing. Let time do the work.',   planet:'jupiter', done:false },
  { id:3, title:'THE EUROPA GAMBLE',      desc:'Crypto calls. Will you resist?',                        planet:'europa',  done:false },
  { id:4, title:'SATURN ARCHITECTURE',    desc:'Build long-term wealth in illiquid assets.',             planet:'saturn',  done:false },
  { id:5, title:'BREACH THE VOID',        desc:'Financial freedom achieved. The galaxy is yours.',      planet:'void',    done:false },
];

const FINANCE_QUIZ_BANK = [
  { q:'What is compound interest?', opts:['Interest on principal only','Interest on principal + accumulated interest','A fixed monthly fee','Interest paid to the bank'], a:1, xp:50, lesson:'Compound interest is the 8th wonder of the world — Einstein said so. Your interest earns interest.' },
  { q:'What does SIP stand for in finance?', opts:['Systematic Interest Protocol','Simple Investment Plan','Systematic Investment Plan','Stock Index Platform'], a:2, xp:40, lesson:'SIP automates your investing. Fixed amount, fixed date, every month. Removes emotion from the equation.' },
  { q:'The 50/30/20 rule allocates what % to savings?', opts:['50%','30%','20%','10%'], a:2, xp:40, lesson:'50% needs, 30% wants, 20% savings & investment. The golden ratio of personal finance.' },
  { q:'P/E ratio measures?', opts:['Profit per employee','Price relative to earnings','Portfolio efficiency','Percentage of equity'], a:1, xp:60, lesson:'P/E ratio = how much you pay for ₹1 of earnings. Lower is generally cheaper. Average market P/E is 20-25.' },
  { q:'What is diversification?', opts:['Putting all money in one asset','Spreading investments to reduce risk','Trading frequently','Maximizing returns'], a:1, xp:50, lesson:"Don't put all your eggs in one basket. Diversification is the only free lunch in investing." },
  { q:'Emergency fund should cover?', opts:['1 week','1 month','3-6 months','12 months'], a:2, xp:40, lesson:'3-6 months of all expenses. In a liquid account. Before any investment. Non-negotiable.' },
  { q:'Rupee Cost Averaging means buying?', opts:['At the lowest price','Fixed amount regularly regardless of price','Only when prices fall','Once a year'], a:1, xp:60, lesson:'By investing a fixed amount regularly, you buy more units when cheap and fewer when expensive. Average cost reduces.' },
  { q:'What is a mutual fund?', opts:['A single company stock','Pooled investment managed by professionals','A government bond','A savings account'], a:1, xp:40, lesson:'Mutual funds pool money from many investors to buy a diversified portfolio. Managed by experts. SEBI regulated.' },
  { q:'Inflation means your money?', opts:['Grows over time','Stays the same','Loses purchasing power over time','Becomes more valuable'], a:2, xp:50, lesson:'₹100 today buys more than ₹100 in 10 years. That is why keeping money in cash is a guaranteed loss.' },
  { q:'Index fund vs active fund — index funds typically?', opts:['Always outperform','Have higher fees','Match market returns with lower fees','Require more skill'], a:2, xp:70, lesson:'Over 10+ years, 80-90% of active funds underperform index funds. Lower fees + market returns = powerful combination.' },
];
