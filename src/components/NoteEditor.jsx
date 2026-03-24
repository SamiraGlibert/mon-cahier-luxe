import React, { useState, useEffect, useRef } from 'react';

// ─── STORAGE HELPERS ────────────────────────────────────────────────────────
const load = (key, fallback) => {
  if (typeof window === 'undefined') return fallback;
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
};
const save = (key, val) => {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
};

// ─── FONTS & ICONS ──────────────────────────────────────────────────────────
const FONT_LINK = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Mono:wght@400;500&display=swap';

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

const PALETTES = {
  gold:   { accent: '#d4af37', bg: '#0a0a0a', panel: '#111', border: '#2a2510', text: '#f0e6c8' },
  teal:   { accent: '#2dd4bf', bg: '#030f0e', panel: '#0a1a18', border: '#0d2e2a', text: '#ccfaf6' },
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
const NoteEditor = () => {
  const [activeTab, setActiveTab] = useState('Notes');
  const [palette] = useState('gold');
  const [fontSize] = useState(16);
  const [fontFam] = useState('DM Mono');
  const C = PALETTES[palette];

  const rootStyle = {
    '--acc':    C.accent,
    '--bg':      C.bg,
    '--panel':   C.panel,
    '--border':  C.border,
    '--txt':     C.text,
    '--muted':   '#666',
    fontFamily: `'${fontFam}', monospace`,
    fontSize:    fontSize + 'px',
  };

  return (
    <>
      <link rel="stylesheet" href={FONT_LINK} />
      <style>{css}</style>
      <div className="ne-root" style={rootStyle}>
        
        <div className="ne-spine">
          <div className="ne-spine-title">
            {['N','O','T','E','S'].map((c,i) => <span key={i}>{c}</span>)}
          </div>
          {[
            { id: 'Notes', icon: ICONS.notes, label: 'NOTES' },
            { id: 'Agenda', icon: ICONS.agenda, label: 'AGENDA' },
            { id: 'Outils', icon: ICONS.tools, label: 'OUTILS' },
            { id: 'Réglages', icon: ICONS.settings, label: 'OPTIONS' }
          ].map(tab => (
            <button key={tab.id} className={`ne-tab ${activeTab === tab.id ? 'ne-tab--active' : ''}`} onClick={() => setActiveTab(tab.id)}>
              <Icon d={tab.icon} size={16} />
              <span className="ne-tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="ne-book">
          <div className="ne-binding" />
          <div className="ne-page">
            {activeTab === 'Notes' && <NotesTab fontSize={fontSize} fontFam={fontFam} />}
            {activeTab === 'Agenda' && <AgendaTab />}
            {activeTab === 'Outils' && <OutilsTab />}
            {activeTab === 'Réglages' && <div className="ne-section"><h1>Réglages</h1><p>Bientôt disponible...</p></div>}
          </div>
        </div>
      </div>
    </>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// NOTES TAB (DICTÉE CORRIGÉE)
// ═══════════════════════════════════════════════════════════════════════════
const NotesTab = ({ fontSize, fontFam }) => {
  const [notes, setNotes] = useState(() => load('ne_notes', ''));
  const [listening, setListen] = useState(false);
  const recRef = useRef(null);

  const autoSave = (val) => { setNotes(val); save('ne_notes', val); };

  const startVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return alert('Non supporté');
    if (listening) { recRef.current?.stop(); return; }
    const rec = new SR();
    rec.lang = 'fr-FR'; rec.continuous = true;
    rec.onstart = () => setListen(true);
    rec.onend = () => setListen(false);
    rec.onresult = (e) => {
      const t = Array.from(e.results).map(r => r[0].transcript).join(' ');
      autoSave(notes + ' ' + t);
    };
    recRef.current = rec;
    rec.start();
  };

  return (
    <div className="ne-section">
      <div className="ne-header">
        <h1 className="ne-title">Notes</h1>
        <button className="ne-btn" onClick={startVoice} style={{ backgroundColor: listening ? '#ff4444' : 'var(--acc)' }}>
          <Icon d={ICONS.mic} size={14} /> {listening ? 'Arrêter' : 'Dicter'}
        </button>
      </div>
      <textarea className="ne-textarea" value={notes} onChange={e => autoSave(e.target.value)} placeholder="Écrivez..." />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// OUTILS TAB (CALCULATRICE & RÈGLE CORRIGÉES)
// ═══════════════════════════════════════════════════════════════════════════
const OutilsTab = () => {
  const [display, setDisplay] = useState('0');
  const [ruler, setRuler] = useState(15);

  const calc = (val) => {
    if (val === 'C') return setDisplay('0');
    if (val === '=') {
      try { 
        const result = eval(display.replace('×', '*').replace('÷', '/'));
        return setDisplay(String(result));
      } catch { return setDisplay('Erreur'); }
    }
    setDisplay(d => d === '0' ? val : d + val);
  };

  return (
    <div className="ne-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
      <div>
        <h2 className="ne-subtitle">Calculatrice</h2>
        <div className="ne-calc">
          <div className="ne-calc-display"><span className="ne-calc-main">{display}</span></div>
          {[ ['7','8','9','÷'], ['4','5','6','×'], ['1','2','3','-'], ['C','0','=','+'] ].map((row, i) => (
            <div key={i} className="ne-calc-row">
              {row.map(b => <button key={b} className="ne-calc-btn" onClick={() => calc(b)}>{b}</button>)}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="ne-subtitle">Règle virtuelle ({ruler} cm)</h2>
        <div className="ne-ruler-wrap">
          <div className="ne-ruler">
            {[...Array(ruler + 1)].map((_, i) => (
              <div key={i} className="ne-ruler-tick" style={{ left: `${(i / ruler) * 100}%` }}>
                <div className="ne-ruler-mark" style={{ height: i % 5 === 0 ? 18 : 10 }} />
                {i % 5 === 0 && <span className="ne-ruler-num">{i}</span>}
              </div>
            ))}
          </div>
        </div>
        <input type="range" min={5} max={30} value={ruler} onChange={e => setRuler(+e.target.value)} className="ne-slider" style={{width:'100%', marginTop:'20px'}} />
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// AGENDA TAB
// ═══════════════════════════════════════════════════════════════════════════
const AgendaTab = () => {
  const [events, setEvents] = useState(() => load('ne_events', []));
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const add = () => {
    if (!title || !date) return;
    const newEv = [...events, { title, date, id: Date.now() }];
    setEvents(newEv); save('ne_events', newEv);
    setTitle(''); setDate('');
  };

  return (
    <div className="ne-section">
      <h1 className="ne-title">Agenda</h1>
      <div className="ne-card">
        <input className="ne-input" placeholder="Titre" value={title} onChange={e => setTitle(e.target.value)} />
        <input className="ne-input" type="date" value={date} onChange={e => setDate(
