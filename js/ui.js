/* ═══════════════════════════════════════════════════════════
   ASTRO VAULT — UI COMPONENTS
   ═══════════════════════════════════════════════════════════ */

const UI = (() => {

  /* ── TOASTS ── */
  let _q = [], _active = false;
  function toast(msg, type='primary', dur=3000) { _q.push({msg,type,dur}); if(!_active)_next(); }
  function _next() {
    if(!_q.length){_active=false;return;} _active=true;
    const {msg,type,dur}=_q.shift();
    const icons={gain:'📈',loss:'📉',primary:'⚡',warn:'⚠️'};
    const el=document.createElement('div');
    el.className=`toast toast-${type}`;
    el.innerHTML=`<span>${icons[type]||'⚡'}</span><span>${msg}</span>`;
    document.body.appendChild(el);
    setTimeout(()=>{el.style.transition='all .3s ease';el.style.opacity='0';el.style.transform='translateX(120%)';setTimeout(()=>{el.remove();_next();},300);},dur);
  }
  function toastCredits(n)  { toast(`+${n.toLocaleString()} CR acquired`,'gain'); creditsBurst(n); }
  function toastXP(n)       { toast(`+${n} XP — Navigation enhanced`,'primary'); }
  function toastBadge(b)    { if(b) toast(`🏅 Achievement unlocked: "${b.name}"`, 'warn', 4500); }
  function toastLevelUp(n, rank) { showLevelUp(n, rank); }

  /* ── CREDITS BURST ── */
  function creditsBurst(amount) {
    const count = Math.min(10, Math.max(3, Math.floor(amount/50)));
    for(let i=0;i<count;i++) {
      setTimeout(()=>{
        const el=document.createElement('div');
        el.className='coin-burst';
        el.style.cssText=`position:fixed;pointer-events:none;z-index:7000;font-size:18px;left:${20+Math.random()*180}px;top:${window.innerHeight-80-Math.random()*160}px;animation:coinFloat ${.7+Math.random()*.5}s ease forwards`;
        el.textContent='💰';
        document.body.appendChild(el);
        setTimeout(()=>el.remove(),1200);
      },i*60);
    }
  }

  /* ── LEVEL UP OVERLAY ── */
  function showLevelUp(level, rank) {
    const el=document.createElement('div');
    el.className='levelup-overlay';
    el.innerHTML=`
      <div class="levelup-box">
        <div style="font-family:var(--f-mono);font-size:11px;letter-spacing:3px;color:var(--primary);margin-bottom:16px">RANK PROMOTION CONFIRMED</div>
        <div style="font-size:64px;margin-bottom:16px;animation:float 2s ease-in-out infinite">🚀</div>
        <div style="font-family:var(--f-display);font-size:13px;letter-spacing:3px;color:var(--text-2);margin-bottom:8px">COMMANDER LEVEL</div>
        <div style="font-family:var(--f-mono);font-size:72px;font-weight:700;color:var(--primary);line-height:1;margin-bottom:12px;text-shadow:0 0 40px rgba(108,178,255,.6)">${level}</div>
        <div style="font-family:var(--f-display);font-size:20px;font-weight:700;color:var(--text-0);margin-bottom:6px;letter-spacing:2px">${rank.toUpperCase()}</div>
        <div style="font-size:12px;color:var(--text-2);margin-bottom:32px">Your ship has been upgraded. New sectors unlocked.</div>
        <button class="btn btn-primary btn-lg" onclick="this.closest('.levelup-overlay').remove()">
          CONTINUE MISSION →
        </button>
      </div>`;
    document.body.appendChild(el);
    creditsBurst(80);
    el.addEventListener('click', e=>{ if(e.target===el) el.remove(); });
    setTimeout(()=>{ if(el.parentNode) el.remove(); }, 10000);
  }

  /* ── MODAL ── */
  function openModal({accent, content, wide}) {
    closeModal();
    const overlay=document.createElement('div');
    overlay.className='modal-overlay'; overlay.id='active-modal';
    overlay.innerHTML=`
      <div class="modal-box" style="${wide?'max-width:680px':''}">
        <div class="modal-stripe" style="background:${accent||'var(--primary)'}"></div>
        <button id="modal-x" style="position:absolute;top:14px;right:14px;background:var(--s-high);color:var(--text-2);border:1px solid var(--ghost);border-radius:8px;width:30px;height:30px;font-size:16px;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:10;transition:all .15s">×</button>
        <div id="modal-inner" style="padding:26px">${typeof content==='string'?content:''}</div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e=>{ if(e.target===overlay) closeModal(); });
    document.getElementById('modal-x').addEventListener('click', closeModal);
    if(typeof content==='function') content(document.getElementById('modal-inner'));
  }
  function closeModal() { const m=document.getElementById('active-modal'); if(m) m.remove(); }

  /* ── PROGRESS BAR ── */
  function bar({pct,cls='fill-primary',h=5}) {
    return `<div class="track" style="height:${h}px"><div class="fill ${cls}" style="width:${Math.min(100,pct)}%"></div></div>`;
  }

  /* ── STAT CARD ── */
  function statCard({label,value,sub,color,icon,delay=0}) {
    return `
      <div class="stat-card anim-up" style="animation-delay:${delay}s">
        <div class="icon-bg">${icon}</div>
        <div class="label" style="color:${color}">${label}</div>
        <div class="value" style="color:${color}">${value}</div>
        ${sub?`<div class="sub">${sub}</div>`:''}
        <div style="position:absolute;bottom:0;left:0;right:0;height:1px;background:${color};opacity:.3;border-radius:0 0 var(--r-lg) var(--r-lg)"></div>
      </div>`;
  }

  /* ── CHAT BUBBLES ── */
  function chatUser(text) {
    return `<div style="display:flex;justify-content:flex-end;margin-bottom:14px">
      <div style="background:linear-gradient(135deg,var(--primary-d),var(--primary));color:#000;font-weight:500;border-radius:14px 3px 14px 14px;padding:11px 16px;max-width:75%;font-size:13.5px;line-height:1.55">${text}</div>
    </div>`;
  }
  function chatAI(html) {
    return `<div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:14px">
      <div style="width:32px;height:32px;border-radius:8px;flex-shrink:0;background:linear-gradient(135deg,var(--s-high),var(--s-mid));border:1px solid var(--ghost-2);display:flex;align-items:center;justify-content:center;font-size:15px;margin-top:2px">🤖</div>
      <div style="background:var(--s-mid);border:1px solid var(--ghost);border-radius:3px 14px 14px 14px;padding:12px 16px;max-width:88%;font-size:13.5px;line-height:1.65">${html}</div>
    </div>`;
  }
  function chatTyping() {
    return chatAI(`<div style="display:flex;gap:5px;padding:2px 0">${[0,.2,.4].map(d=>`<div style="width:6px;height:6px;border-radius:50%;background:var(--primary);display:inline-block;animation:pulse 1.2s ease infinite;animation-delay:${d}s"></div>`).join('')}</div>`);
  }

  /* ── TX ITEM ── */
  function txItem(tx) {
    const isBuy = tx.type==='buy';
    return `<div class="trade-row" style="cursor:default">
      <div style="width:32px;height:32px;border-radius:8px;background:${isBuy?'rgba(108,178,255,.1)':'rgba(205,255,90,.1)'};display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0">${isBuy?'📈':'📉'}</div>
      <div style="flex:1">
        <div style="font-family:var(--f-display);font-size:12px;font-weight:600">${tx.type.toUpperCase()} ${tx.symbol}</div>
        <div style="font-size:10px;color:var(--text-3);font-family:var(--f-mono)">${tx.qty} units @ ${tx.price.toLocaleString()} CR · ${tx.date}</div>
      </div>
      <div style="font-family:var(--f-mono);font-size:12px;font-weight:700;color:${isBuy?'var(--loss)':'var(--gain)'}">
        ${isBuy?'-':'+'}${(tx.qty*tx.price).toLocaleString()} CR
      </div>
    </div>`;
  }

  /* ── BADGE CARD ── */
  function badgeCard(badge, earned) {
    const rc={common:'var(--text-2)',rare:'var(--primary)',legendary:'var(--gain)'}[badge.rarity]||'var(--text-2)';
    return `<div class="badge-card ${earned?'earned':'locked'}" style="${earned?`border-color:rgba(108,178,255,.2)`:''}">
      <div style="font-size:24px;margin-bottom:6px">${badge.emoji}</div>
      <div style="font-size:10px;font-weight:700;color:${earned?'var(--text-0)':'var(--text-3)'};font-family:var(--f-display);letter-spacing:.5px">${badge.name}</div>
      <div style="font-size:8px;color:${earned?rc:'var(--text-3)'};margin-top:3px;letter-spacing:1px;font-family:var(--f-mono)">${badge.rarity.toUpperCase()}</div>
    </div>`;
  }

  /* ── STARFIELD ── */
  function createStarfield() {
    const sf = document.getElementById('starfield');
    if (!sf) return;
    for (let i = 0; i < 120; i++) {
      const star = document.createElement('div');
      const size = Math.random() * 2 + 0.5;
      star.className = 'star';
      star.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random()*100}%; top:${Math.random()*100}%;
        --dur:${2+Math.random()*4}s; --delay:${Math.random()*4}s;
      `;
      sf.appendChild(star);
    }
  }

  /* ── TICKER HTML ── */
  function buildTicker() {
    const items = [...ASSETS, ...ASSETS].map(a => {
      const chg = (((_prices[a.symbol] - a.basePrice) / a.basePrice) * 100).toFixed(2);
      return `<div class="ticker-item">
        <span class="t-sym">${a.symbol}</span>
        <span class="t-price">${_prices[a.symbol]?.toLocaleString()||'—'}</span>
        <span class="t-chg ${chg>=0?'up':'dn'}">${chg>=0?'▲':'▼'} ${Math.abs(chg)}%</span>
        <span class="t-sep">|</span>
      </div>`;
    }).join('');
    return `<div class="ticker-tape"><div class="ticker-inner">${items}</div></div>`;
  }

  return {
    toast, toastCredits, toastXP, toastBadge, toastLevelUp, creditsBurst,
    openModal, closeModal, bar, statCard,
    chatUser, chatAI, chatTyping, txItem, badgeCard,
    createStarfield, buildTicker,
  };
})();
