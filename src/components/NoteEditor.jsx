import React, { useState, useEffect, useRef } from 'react';

// ─── STORAGE HELPERS ────────────────────────────────────────────────────────
const load = (key, fallback) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
};
const save = (key, val) => {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
};

// ─── FONTS ──────────────────────────────────────────────────────────────────
const FONT_LINK = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Mono:wght@400;500&display=swap';

// ─── ICONS ──────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const ICONS = {
  notes:    'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
  agenda:   'M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
  tools:    'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
  settings: 'M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z M12 2v2 M12 20v2 M4.93 4.93l1.41 1.41 M17.66 17.66l1.41 1.41 M2 12h2 M20 12h2 M4.93 19.07l1.41-1.41 M17.66 6.34l1.41-1.41',
  mic:      'M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v4 M8 23h8',
  trash:    'M3 6h18 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6 M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
  plus:     'M12 5v14 M5 12h14',
  check:    'M20 6L9 17l-5-5',
  copy:     'M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z',
  download: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3',
};

// ─── TABS CONFIG ─────────────────────────────────────────────────────────────
const TABS = [
  { id: 'Notes',    label: 'NOTES',    icon: ICONS.notes   },
  { id: 'Agenda',   label: 'AGENDA',   icon: ICONS.agenda  },
  { id: 'Outils',   label: 'OUTILS',   icon: ICONS.tools   },
  { id: 'Réglages', label: 'OPTIONS',  icon: ICONS.settings},
];

// ─── PALETTE ─────────────────────────────────────────────────────────────────
const PALETTES = {
  gold:   { accent: '#d4af37', bg: '#0a0a0a', panel: '#111', border: '#2a2510', text: '#f0e6c8' },
  teal:   { accent: '#2dd4bf', bg: '#030f0e', panel: '#0a1a18', border: '#0d2e2a', text: '#ccfaf6' },
  rose:   { accent: '#fb7185', bg: '#0d0608', panel: '#1a0c10', border: '#2e1018', text: '#ffd6dc' },
  indigo: { accent: '#818cf8', bg: '#05050f', panel: '#0c0c1a', border: '#141428', text: '#d4d4ff' },
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
const NoteEditor = () => {
  const [activeTab, setActiveTab] = useState('Notes');
  const [palette, setPalette]     = useState(() => load('ne_palette', 'gold'));
  const [fontSize, setFontSize]   = useState(() => load('ne_fontSize', 16));
  const [fontFam, setFontFam]     = useState(() => load('ne_fontFam', 'DM Mono'));
  const [darkMode, setDarkMode]   = useState(() => load('ne_dark', true));
  const C = PALETTES[palette];

  // persist settings
  useEffect(() => { save('ne_palette', palette); }, [palette]);
  useEffect(() => { save('ne_fontSize', fontSize); }, [fontSize]);
  useEffect(() => { save('ne_fontFam', fontFam); }, [fontFam]);
  useEffect(() => { save('ne_dark', darkMode); }, [darkMode]);

  // dynamic CSS vars
  const rootStyle = {
    '--acc':    C.accent,
    '--bg':     darkMode ? C.bg    : '#f5f0e8',
    '--panel':  darkMode ? C.panel : '#fff',
    '--border': darkMode ? C.border: '#d8d0c0',
    '--txt':    darkMode ? C.text  : '#1a1a1a',
    '--muted':  darkMode ? '#666'  : '#888',
    fontFamily: `'${fontFam}', monospace`,
    fontSize:   fontSize + 'px',
  };

  return (
    <>
      <link rel="stylesheet" href={FONT_LINK} />
      <style>{css}</style>
      <div className="ne-root" style={rootStyle}>

        {/* SPINE */}
        <div className="ne-spine">
          <div className="ne-spine-title">
            {['N','O','T','E','S'].map((c,i) => <span key={i} style={{animationDelay: i*0.1+'s'}}>{c}</span>)}
          </div>
          {TABS.map(tab => (
            <button key={tab.id}
              className={`ne-tab ${activeTab === tab.id ? 'ne-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              title={tab.label}
            >
              <Icon d={tab.icon} size={16} />
              <span className="ne-tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* PAGES */}
        <div className="ne-book">
          <div className="ne-binding" />
          <div className="ne-page">
            {activeTab === 'Notes'    && <NotesTab    C={C} fontSize={fontSize} fontFam={fontFam} />}
            {activeTab === 'Agenda'   && <AgendaTab   C={C} />}
            {activeTab === 'Outils'   && <OutilsTab   C={C} />}
            {activeTab === 'Réglages' && <SettingsTab
              palette={palette} setPalette={setPalette}
              fontSize={fontSize} setFontSize={setFontSize}
              fontFam={fontFam} setFontFam={setFontFam}
              darkMode={darkMode} setDarkMode={setDarkMode}
              C={C}
            />}
          </div>
        </div>

      </div>
    </>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// NOTES TAB
// ═══════════════════════════════════════════════════════════════════════════
const NotesTab = ({ C, fontSize, fontFam }) => {
  const [notes, setNotes]       = useState(() => load('ne_notes', ''));
  const [listening, setListen]  = useState(false);
  const [saved, setSaved]       = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const recRef = useRef(null);

  useEffect(() => {
    const words = notes.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
  }, [notes]);

  const autoSave = (val) => { setNotes(val); save('ne_notes', val); };

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert('Dictée vocale non supportée par ce navigateur.'); return; }
    if (listening) { recRef.current?.stop(); return; }
    const rec = new SR();
    rec.lang = 'fr-FR'; rec.continuous = true; rec.interimResults = false;
    rec.onstart  = () => setListen(true);
    rec.onend    = () => setListen(false);
    rec.onerror  = () => setListen(false);
    rec.onresult = (e) => {
      const t = Array.from(e.results).map(r => r[0].transcript).join(' ');
      autoSave(notes + (notes ? ' ' : '') + t);
    };
    recRef.current = rec;
    rec.start();
  };

  const copyAll = () => { navigator.clipboard?.writeText(notes); setSaved(true); setTimeout(() => setSaved(false), 1500); };
  const download = () => {
    const blob = new Blob([notes], { type: 'text/plain' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = 'notes.txt'; a.click();
  };
  const clear = () => { if (confirm('Effacer toutes les notes ?')) autoSave(''); };

  return (
    <div className="ne-section">
      <div className="ne-header">
        <h1 className="ne-title">Notes</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="ne-btn" onClick={startVoice}
            style={{ backgroundColor: listening ? '#ff4444' : 'var(--acc)', color: '#000' }}>
            <Icon d={ICONS.mic} size={14} />
            {listening ? 'Arrêter' : 'Dicter'}
          </button>
          <button className="ne-btn ne-btn--ghost" onClick={copyAll} title="Copier">
            <Icon d={saved ? ICONS.check : ICONS.copy} size={14} />
          </button>
          <button className="ne-btn ne-btn--ghost" onClick={download} title="Télécharger">
            <Icon d={ICONS.download} size={14} />
          </button>
          <button className="ne-btn ne-btn--ghost ne-btn--danger" onClick={clear} title="Effacer">
            <Icon d={ICONS.trash} size={14} />
          </button>
        </div>
      </div>
      {listening && <div className="ne-listening-bar">🎤 Écoute en cours…</div>}
      <textarea
        className="ne-textarea"
        value={notes}
        onChange={e => autoSave(e.target.value)}
        placeholder="Commencez à écrire… vos notes sont sauvegardées automatiquement."
        style={{ fontSize: fontSize + 'px', fontFamily: `'${fontFam}', monospace` }}
      />
      <div className="ne-footer-bar">
        <span>{wordCount} mot{wordCount !== 1 ? 's' : ''}</span>
        <span>{notes.length} caractères</span>
        <span style={{ color: 'var(--acc)' }}>● Auto-sauvegardé</span>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// AGENDA TAB
// ═══════════════════════════════════════════════════════════════════════════
const AgendaTab = ({ C }) => {
  const [events, setEvents]   = useState(() => load('ne_events', []));
  const [date, setDate]       = useState('');
  const [time, setTime]       = useState('');
  const [title, setTitle]     = useState('');
  const [cat, setCat]         = useState('Cours');
  const [filter, setFilter]   = useState('Tous');

  const CATS = ['Cours', 'Examen', 'Devoir', 'Personnel'];
  const CAT_COLORS = { Cours: '#818cf8', Examen: '#fb7185', Devoir: '#2dd4bf', Personnel: '#fbbf24' };

  const saveEvents = (ev) => { setEvents(ev); save('ne_events', ev); };

  const addEvent = () => {
    if (!date || !title) return;
    const ev = { id: Date.now(), date, time, title, cat };
    saveEvents([...events, ev].sort((a,b) => a.date.localeCompare(b.date)));
    setDate(''); setTime(''); setTitle(''); setCat('Cours');
  };
  const deleteEvent = (id) => saveEvents(events.filter(e => e.id !== id));

  const today = new Date().toISOString().slice(0,10);
  const visible = events.filter(e => filter === 'Tous' || e.cat === filter);
  const upcoming = visible.filter(e => e.date >= today);
  const past     = visible.filter(e => e.date < today);

  const fmt = (d) => {
    const [y,m,day] = d.split('-');
    return `${day}/${m}/${y}`;
  };
  const daysUntil = (d) => {
    const diff = Math.ceil((new Date(d) - new Date(today)) / 86400000);
    if (diff === 0) return 'Aujourd\'hui';
    if (diff === 1) return 'Demain';
    if (diff < 0) return `Il y a ${-diff}j`;
    return `Dans ${diff}j`;
  };

  return (
    <div className="ne-section">
      <div className="ne-header">
        <h1 className="ne-title">Agenda</h1>
      </div>

      {/* ADD FORM */}
      <div className="ne-card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
          <input className="ne-input" type="text" placeholder="Titre de l'événement" value={title} onChange={e => setTitle(e.target.value)} />
          <select className="ne-input" value={cat} onChange={e => setCat(e.target.value)}>
            {CATS.map(c => <option key={c}>{c}</option>)}
          </select>
          <input className="ne-input" type="date" value={date} onChange={e => setDate(e.target.value)} />
          <input className="ne-input" type="time" value={time} onChange={e => setTime(e.target.value)} />
        </div>
        <button className="ne-btn ne-btn--full" onClick={addEvent} style={{ backgroundColor: 'var(--acc)', color: '#000' }}>
          <Icon d={ICONS.plus} size={14} /> Ajouter
        </button>
      </div>

      {/* FILTER */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
        {['Tous', ...CATS].map(f => (
          <button key={f} className={`ne-chip ${filter === f ? 'ne-chip--active' : ''}`} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      {/* UPCOMING */}
      {upcoming.length > 0 && (
        <>
          <p className="ne-section-label">À venir</p>
          {upcoming.map(ev => (
            <EventRow key={ev.id} ev={ev} CAT_COLORS={CAT_COLORS} fmt={fmt} daysUntil={daysUntil} onDelete={deleteEvent} />
          ))}
        </>
      )}

      {/* PAST */}
      {past.length > 0 && (
        <>
          <p className="ne-section-label" style={{ marginTop: 16 }}>Passés</p>
          {past.map(ev => (
            <EventRow key={ev.id} ev={ev} CAT_COLORS={CAT_COLORS} fmt={fmt} daysUntil={daysUntil} onDelete={deleteEvent} opacity={0.5} />
          ))}
        </>
      )}

      {visible.length === 0 && (
        <div className="ne-empty">Aucun événement. Ajoutez-en un ci-dessus.</div>
      )}
    </div>
  );
};

const EventRow = ({ ev, CAT_COLORS, fmt, daysUntil, onDelete, opacity = 1 }) => (
  <div className="ne-event-row" style={{ opacity }}>
    <div className="ne-event-dot" style={{ backgroundColor: CAT_COLORS[ev.cat] }} />
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 600, fontSize: '0.95em' }}>{ev.title}</div>
      <div style={{ fontSize: '0.8em', color: 'var(--muted)' }}>
        {fmt(ev.date)}{ev.time ? ` à ${ev.time}` : ''} — {ev.cat}
      </div>
    </div>
    <div className="ne-badge" style={{ backgroundColor: CAT_COLORS[ev.cat] + '22', color: CAT_COLORS[ev.cat] }}>
      {daysUntil(ev.date)}
    </div>
    <button className="ne-icon-btn" onClick={() => onDelete(ev.id)}>
      <Icon d={ICONS.trash} size={13} />
    </button>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// OUTILS TAB
// ═══════════════════════════════════════════════════════════════════════════
const OutilsTab = () => {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev]       = useState(null);
  const [op, setOp]           = useState(null);
  const [reset, setReset]     = useState(false);
  const [history, setHistory] = useState([]);
  const [ruler, setRuler]     = useState(10);

  const calc = (val) => {
    if (val === 'C') {
      setDisplay('0'); setPrev(null); setOp(null); setReset(false); return;
    }
    if (val === '⌫') {
      setDisplay(d => d.length > 1 ? d.slice(0,-1) : '0'); return;
    }
    if (val === '±') {
      setDisplay(d => d.startsWith('-') ? d.slice(1) : '-' + d); return;
    }
    if (val === '%') {
      setDisplay(d => String(parseFloat(d) / 100)); return;
    }
    if (['+','-','×','÷'].includes(val)) {
      setPrev(parseFloat(display));
      setOp(val);
      setReset(true);
      return;
    }
    if (val === '=') {
      if (prev === null || op === null) return;
      const a = prev, b = parseFloat(display);
      let r;
      if (op === '+') r = a + b;
      if (op === '-') r = a - b;
      if (op === '×') r = a * b;
      if (op === '÷') r = b !== 0 ? a / b : 'Erreur';
      const expr = `${a} ${op} ${b} = ${r}`;
      setHistory(h => [expr, ...h].slice(0, 10));
      setDisplay(String(r)); setPrev(null); setOp(null); setReset(true);
      return;
    }
    if (val === '.') {
      if (reset) { setDisplay('0.'); setReset(false); return; }
      if (!display.includes('.')) setDisplay(d => d + '.');
      return;
    }
    if (reset) { setDisplay(val); setReset(false); }
    else setDisplay(d => d === '0' ? val : d + val);
  };

  const BTNS = [
    ['C','±','%','÷'],
    ['7','8','9','×'],
    ['4','5','6','-'],
    ['1','2','3','+'],
    ['⌫','0','.','='],
  ];
  const isOp = v => ['÷','×','-','+','='].includes(v);
  const isGray = v => ['C','±','%'].includes(v);

  return (
    <div className="ne-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
      
      {/* CALCULATRICE */}
      <div>
        <h2 className="ne-subtitle">Calculatrice</h2>
        <div className="ne-calc">
          <div className="ne-calc-display">
            {op && <span className="ne-calc-op">{prev} {op}</span>}
            <span className="ne-calc-main">{parseFloat(display).toLocaleString('fr-FR', { maximumFractionDigits: 8 })}</span>
          </div>
          {BTNS.map((row, ri) => (
            <div key={ri} className="ne-calc-row">
              {row.map(b => (
                <button key={b} className={`ne-calc-btn ${isOp(b) ? 'ne-calc-btn--op' : ''} ${isGray(b) ? 'ne-calc-btn--gray' : ''} ${b==='0'?'ne-calc-btn--wide':''}`}
                  onClick={() => calc(b)}>{b}</button>
              ))}
            </div>
          ))}
        </div>
        {history.length > 0 && (
          <div className="ne-history">
            <p className="ne-section-label">Historique</p>
            {history.map((h,i) => <div key={i} className="ne-history-item">{h}</div>)}
          </div>
        )}
      </div>

      {/* OUTILS MESURE */}
      <div>
        <h2 className="ne-subtitle">Règle virtuelle</h2>
        <div className="ne-ruler-wrap">
          <div className="ne-ruler">
            {[...Array(ruler + 1)].map((_, i) => (
              <div key={i} className="ne-ruler-tick" style={{ left: `${(i / ruler) * 100}%` }}>
                <div className="ne-ruler-mark" style={{ height: i % 2 === 0 ? 18 : 10 }} />
                {i % 2 === 0 && <span className="ne-ruler-num">{i}</span>}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
          <input type="range" min={5} max={30} value={ruler} onChange={e => setRuler(+e.target.value)}
            className="ne-slider" />
          <span style={{ color: 'var(--acc)', fontWeight: 700 }}>{ruler} cm</span>
        </div>

        <h2 className="ne-subtitle" style={{ marginTop: 28 }}>Convertisseur</h2>
        <Converter />
      </div>
    </div>
  );
};

const Converter = () => {
  const [type, setType] = useState('Longueur');
  const [from, setFrom] = useState('');
  const [fromU, setFromU] = useState('m');
  const [toU, setToU] = useState('km');
  const [result, setResult] = useState(null);

  const UNITS = {
    Longueur: { m: 1, km: 0.001, cm: 100, mm: 1000, mi: 0.000621371, ft: 3.28084 },
    Masse:    { kg: 1, g: 1000, lb: 2.20462, oz: 35.274, t: 0.001 },
    Temp:     null,
  };

  const convert = () => {
    const v = parseFloat(from);
    if (isNaN(v)) { setResult('Valeur invalide'); return; }
    if (type === 'Temp') {
      let r;
      if (fromU === '°C' && toU === '°F') r = v*9/5+32;
      else if (fromU === '°F' && toU === '°C') r = (v-32)*5/9;
      else if (fromU === '°C' && toU === 'K')  r = v+273.15;
      else if (fromU === 'K'  && toU === '°C') r = v-273.15;
      else r = v;
      setResult(r.toFixed(4));
      return;
    }
    const base = v / UNITS[type][fromU];
    setResult((base * UNITS[type][toU]).toFixed(6).replace(/\.?0+$/, ''));
  };

  const unitKeys = type === 'Temp' ? ['°C','°F','K'] : Object.keys(UNITS[type] || {});

  return (
    <div className="ne-card">
      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
        {['Longueur','Masse','Temp'].map(t => (
          <button key={t} className={`ne-chip ${type===t?'ne-chip--active':''}`} onClick={() => { setType(t); setFromU(unitKeys[0]); setToU(unitKeys[1]); setResult(null); }}>{t}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 8, alignItems: 'center', marginBottom: 10 }}>
        <div>
          <input className="ne-input" type="number" value={from} onChange={e => setFrom(e.target.value)} placeholder="Valeur" />
          <select className="ne-input" style={{ marginTop: 4 }} value={fromU} onChange={e => setFromU(e.target.value)}>
            {unitKeys.map(u => <option key={u}>{u}</option>)}
          </select>
        </div>
        <span style={{ color: 'var(--acc)', fontSize: '1.4em' }}>→</span>
        <div>
          <input className="ne-input" value={result ?? ''} readOnly placeholder="Résultat" style={{ color: 'var(--acc)' }} />
          <select className="ne-input" style={{ marginTop: 4 }} value={toU} onChange={e => setToU(e.target.value)}>
            {unitKeys.map(u => <option key={u}>{u}</option>)}
          </select>
        </div>
      </div>
      <button className="ne-btn ne-btn--full" onClick={convert} style={{ backgroundColor: 'var(--acc)', color: '#000' }}>Convertir</button>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// SETTINGS TAB
// ═══════════════════════════════════════════════════════════════════════════
const SettingsTab = ({ palette, setPalette, fontSize, setFontSize, fontFam, setFontFam, darkMode, setDarkMode }) => {
  const FONTS = ['DM Mono', 'Playfair Display', 'Georgia', 'Courier New', 'Trebuchet MS'];
  const clearAll = () => {
    if (confirm('Effacer toutes les données sauvegardées ?')) {
      ['ne_notes','ne_events','ne_palette','ne_fontSize','ne_fontFam','ne_dark'].forEach(k => localStorage.removeItem(k));
      window.location.reload();
    }
  };

  return (
    <div className="ne-section">
      <div className="ne-header">
        <h1 className="ne-title">Réglages</h1>
      </div>

      <div className="ne-settings-grid">
        <SettingBlock label="Thème de couleur">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {Object.entries(PALETTES).map(([k, v]) => (
              <button key={k} onClick={() => setPalette(k)}
                className={`ne-color-swatch ${palette === k ? 'ne-color-swatch--active' : ''}`}
                style={{ backgroundColor: v.accent, outlineColor: v.accent }}>
              </button>
            ))}
          </div>
          <p style={{ color: 'var(--muted)', fontSize: '0.8em', marginTop: 6 }}>Actuel : {palette}</p>
        </SettingBlock>

        <SettingBlock label="Mode d'affichage">
          <div style={{ display: 'flex', gap: 8 }}>
            <button className={`ne-chip ${darkMode ? 'ne-chip--active' : ''}`} onClick={() => setDarkMode(true)}>🌙 Sombre</button>
            <button className={`ne-chip ${!darkMode ? 'ne-chip--active' : ''}`} onClick={() => setDarkMode(false)}>☀️ Clair</button>
          </div>
        </SettingBlock>

        <SettingBlock label={`Taille de police : ${fontSize}px`}>
          <input type="range" min={12} max={24} value={fontSize} onChange={e => setFontSize(+e.target.value)}
            className="ne-slider" style={{ width: '100%' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8em', color: 'var(--muted)' }}>
            <span>12px</span><span>24px</span>
          </div>
        </SettingBlock>

        <SettingBlock label="Police">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {FONTS.map(f => (
              <button key={f} className={`ne-chip ${fontFam === f ? 'ne-chip--active' : ''}`}
                style={{ fontFamily: f }} onClick={() => setFontFam(f)}>{f}</button>
            ))}
          </div>
        </SettingBlock>

        <SettingBlock label="Données">
          <button className="ne-btn ne-btn--danger" onClick={clearAll}>
            <Icon d={ICONS.trash} size={13} /> Effacer toutes les données
          </button>
        </SettingBlock>
      </div>
    </div>
  );
};

const SettingBlock = ({ label, children }) => (
  <div className="ne-setting-block">
    <p className="ne-section-label" style={{ marginBottom: 10 }}>{label}</p>
    {children}
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// CSS
// ═══════════════════════════════════════════════════════════════════════════
const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.ne-root {
  display: flex;
  height: 100vh;
  background: var(--bg);
  color: var(--txt);
  overflow: hidden;
}

/* SPINE */
.ne-spine {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 16px 8px;
  background: color-mix(in srgb, var(--bg) 60%, var(--acc) 5%);
  border-right: 1px solid var(--border);
  min-width: 64px;
}
.ne-spine-title {
  writing-mode: vertical-lr;
  text-orientation: mixed;
  transform: rotate(180deg);
  font-family: 'Playfair Display', serif;
  color: var(--acc);
  font-size: 1.1em;
  letter-spacing: 0.3em;
  font-weight: 700;
  padding: 12px 0;
  margin-bottom: 8px;
}
.ne-spine-title span { animation: fadeIn 0.6s both; }
@keyframes fadeIn { from { opacity:0; transform:translateY(4px); } to { opacity:1; transform:none; } }

.ne-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 6px;
  width: 52px;
  border: 1px solid transparent;
  border-radius: 10px;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.2s;
}
.ne-tab:hover { background: color-mix(in srgb, var(--acc) 10%, transparent); color: var(--acc); }
.ne-tab--active { background: color-mix(in srgb, var(--acc) 18%, transparent); color: var(--acc); border-color: color-mix(in srgb, var(--acc) 30%, transparent); }
.ne-tab-label { font-size: 0.55em; letter-spacing: 0.08em; font-weight: 700; }

/* BOOK */
.ne-book {
  flex: 1;
  display: flex;
  overflow: hidden;
}
.ne-binding {
  width: 24px;
  background: repeating-linear-gradient(180deg, var(--border) 0px, var(--border) 2px, transparent 2px, transparent 12px);
  border-right: 2px solid color-mix(in srgb, var(--acc) 20%, transparent);
  flex-shrink: 0;
}
.ne-page {
  flex: 1;
  overflow-y: auto;
  padding: 28px 32px;
  background: var(--panel);
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}
.ne-page::-webkit-scrollbar { width: 5px; }
.ne-page::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

/* SECTIONS */
.ne-section { height: 100%; display: flex; flex-direction: column; }
.ne-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.ne-title { font-family: 'Playfair Display', serif; font-size: 1.8em; color: var(--acc); letter-spacing: 0.02em; }
.ne-subtitle { font-family: 'Playfair Display', serif; font-size: 1.1em; color: var(--acc); margin-bottom: 12px; }
.ne-section-label { font-size: 0.7em; letter-spacing: 0.15em; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
.ne-footer-bar { display: flex; gap: 16px; font-size: 0.75em; color: var(--muted); margin-top: 8px; padding-top: 8px; border-top: 1px solid var(--border); }
.ne-empty { text-align: center; color: var(--muted); padding: 40px; font-size: 0.9em; }

/* BUTTONS */
.ne-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 14px; border: none; border-radius: 8px;
  font-size: 0.82em; font-weight: 600; cursor: pointer;
  transition: all 0.18s; letter-spacing: 0.04em;
  font-family: inherit;
  background: color-mix(in srgb, var(--acc) 15%, transparent);
  color: var(--acc);
}
.ne-btn:hover { filter: brightness(1.15); transform: translateY(-1px); }
.ne-btn--ghost { background: transparent; border: 1px solid var(--border); color: var(--muted); }
.ne-btn--ghost:hover { border-color: var(--acc); color: var(--acc); }
.ne-btn--danger { background: color-mix(in srgb, #ff4444 15%, transparent); color: #ff8888; }
.ne-btn--full { width: 100%; justify-content: center; }
.ne-icon-btn { background: none; border: none; cursor: pointer; color: var(--muted); padding: 4px; border-radius: 4px; display: flex; }
.ne-icon-btn:hover { color: #ff8888; }

/* INPUTS */
.ne-input {
  width: 100%; padding: 8px 12px; background: var(--bg); border: 1px solid var(--border);
  border-radius: 7px; color: var(--txt); font-family: inherit; font-size: 0.9em;
  outline: none; transition: border-color 0.2s;
}
.ne-input:focus { border-color: var(--acc); }
.ne-input option { background: var(--panel); }

/* TEXTAREA */
.ne-textarea {
  flex: 1; resize: none; background: var(--bg); color: var(--txt);
  border: 1px solid var(--border); border-radius: 10px; padding: 18px;
  line-height: 1.7; outline: none; transition: border-color 0.2s;
  font-family: inherit;
}
.ne-textarea:focus { border-color: color-mix(in srgb, var(--acc) 50%, transparent); }
.ne-textarea::placeholder { color: var(--muted); }

/* LISTENING BAR */
.ne-listening-bar {
  background: color-mix(in srgb, #ff4444 15%, transparent);
  border: 1px solid #ff4444;
  color: #ff8888;
  border-radius: 7px;
  padding: 8px 14px;
  font-size: 0.85em;
  margin-bottom: 10px;
  animation: pulse 1.2s ease-in-out infinite;
}
@keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.6; } }

/* CHIPS */
.ne-chip {
  padding: 5px 12px; border: 1px solid var(--border); border-radius: 20px;
  background: transparent; color: var(--muted); cursor: pointer; font-size: 0.8em;
  font-family: inherit; transition: all 0.18s;
}
.ne-chip:hover { border-color: var(--acc); color: var(--acc); }
.ne-chip--active { background: color-mix(in srgb, var(--acc) 20%, transparent); border-color: var(--acc); color: var(--acc); }

/* CARDS */
.ne-card {
  background: var(--bg); border: 1px solid var(--border);
  border-radius: 12px; padding: 16px;
}

/* EVENTS */
.ne-event-row {
  display: flex; align-items: center; gap: 10;
  padding: 10px 0; border-bottom: 1px solid var(--border);
}
.ne-event-dot {
  width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
}
.ne-badge {
  font-size: 0.72em; padding: 3px 8px; border-radius: 12px; font-weight: 600; white-space: nowrap;
}

/* CALCULATOR */
.ne-calc { background: var(--bg); border: 1px solid var(--border); border-radius: 16px; padding: 16px; }
.ne-calc-display {
  background: color-mix(in srgb, var(--acc) 8%, var(--bg));
  border: 1px solid var(--border); border-radius: 10px;
  padding: 12px 16px; margin-bottom: 12px; min-height: 64px;
  display: flex; flex-direction: column; align-items: flex-end; justify-content: flex-end;
}
.ne-calc-op { font-size: 0.75em; color: var(--muted); margin-bottom: 2px; }
.ne-calc-main { font-size: 1.7em; font-weight: 700; color: var(--acc); font-family: 'DM Mono', monospace; }
.ne-calc-row { display: flex; gap: 8px; margin-bottom: 8px; }
.ne-calc-btn {
  flex: 1; padding: 14px; border: none; border-radius: 9px;
  font-size: 1em; font-weight: 600; cursor: pointer; font-family: 'DM Mono', monospace;
  transition: all 0.15s;
  background: color-mix(in srgb, var(--txt) 8%, var(--bg));
  color: var(--txt);
}
.ne-calc-btn:hover { filter: brightness(1.3); transform: scale(1.03); }
.ne-calc-btn:active { transform: scale(0.97); }
.ne-calc-btn--op { background: color-mix(in srgb, var(--acc) 20%, var(--bg)); color: var(--acc); }
.ne-calc-btn--gray { background: color-mix(in srgb, var(--txt) 18%, var(--bg)); }
.ne-calc-btn--wide { flex: 2; }
.ne-history { margin-top: 14px; }
.ne-history-item { font-size: 0.78em; color: var(--muted); padding: 3px 0; border-bottom: 1px solid var(--border); font-family: 'DM Mono', monospace; }

/* RULER */
.ne-ruler-wrap { background: var(--bg); border-radius: 8px; padding: 12px; border: 1px solid var(--border); }
.ne-ruler {
  height: 50px; background: linear-gradient(to bottom, color-mix(in srgb, var(--acc) 60%, #b8860b), color-mix(in srgb, var(--acc) 40%, #7a5c00));
  border-radius: 4px; position: relative;
}
.ne-ruler-tick { position: absolute; bottom: 0; }
.ne-ruler-mark { width: 2px; background: rgba(0,0,0,0.7); }
.ne-ruler-num { position: absolute; top: -22px; left: -4px; font-size: 10px; font-weight: 700; color: rgba(0,0,0,0.8); }
.ne-slider {
  -webkit-appearance: none; height: 4px; border-radius: 2px;
  background: var(--border); outline: none; cursor: pointer;
}
.ne-slider::-webkit-slider-thumb {
  -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%;
  background: var(--acc); cursor: pointer;
}

/* SETTINGS */
.ne-settings-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.ne-setting-block { background: var(--bg); border: 1px solid var(--border); border-radius: 12px; padding: 18px; }
.ne-color-swatch {
  width: 36px; height: 36px; border-radius: 50%; border: 3px solid transparent;
  cursor: pointer; transition: all 0.2s;
}
.ne-color-swatch--active { outline: 3px solid; outline-offset: 3px; }
.ne-color-swatch:hover { transform: scale(1.1); }

@media (max-width: 700px) {
  .ne-settings-grid { grid-template-columns: 1fr; }
  .ne-section[style*="grid"] { grid-template-columns: 1fr !important; }
}
`;

export default NoteEditor;
