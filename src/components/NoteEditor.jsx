import React, { useState, useEffect } from 'react';

// --- FONCTIONS DE SAUVEGARDE ---
const load = (key, fallback) => {
  if (typeof window === 'undefined') return fallback;
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
};
const save = (key, val) => {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
};

const NoteEditor = () => {
  // ÉTATS DU CAHIER
  const [activeTab, setActiveTab] = useState('Notes');
  const [notes, setNotes] = useState(() => load('ne_notes', ''));
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [rulerSize, setRulerSize] = useState(15);
  
  // SAUVEGARDE AUTOMATIQUE DES NOTES
  useEffect(() => { save('ne_notes', notes); }, [notes]);

  // LOGIQUE DE LA CALCULATRICE (RÉPARÉE)
  const pressCalc = (btn) => {
    setCalcDisplay(prev => {
      if (btn === 'C') return '0';
      if (btn === '=') {
        try { 
          // On remplace les signes visuels par des signes mathématiques
          const expression = prev.replace('×', '*').replace('÷', '/');
          return eval(expression).toString(); 
        } catch { return 'Erreur'; }
      }
      if (prev === '0' || prev === 'Erreur') return btn;
      return prev + btn;
    });
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0a0a0a', color: '#f0e6c8', fontFamily: 'sans-serif' }}>
      
      {/* BARRE DE TRANCHE (SPINE) */}
      <div style={{ width: '70px', borderRight: '1px solid #2a2510', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0', background: '#111' }}>
        <div style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)', color: '#d4af37', fontWeight: 'bold', letterSpacing: '5px', marginBottom: '30px' }}>MON CAHIER</div>
        
        {['Notes', 'Agenda', 'Outils', 'Réglages'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            backgroundColor: activeTab === tab ? '#d4af37' : 'transparent',
            border: 'none', borderRadius: '8px', padding: '10px', marginBottom: '15px', cursor: 'pointer', color: activeTab === tab ? '#000' : '#d4af37'
          }}>
            {tab[0]}
          </button>
        ))}
      </div>

      {/* PAGE DU CAHIER */}
      <div style={{ flex: 1, padding: '30px', backgroundColor: '#111', margin: '15px', borderRadius: '15px', border: '1px solid #2a2510', overflowY: 'auto' }}>
        
        {activeTab === 'Notes' && (
          <div style={{ height: '100%' }}>
            <h1 style={{ color: '#d4af37', fontFamily: 'serif' }}>Notes</h1>
            <textarea 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Écrivez ici..."
              style={{ width: '100%', height: '80%', background: '#0a0a0a', color: '#fff', border: '1px solid #2a2510', padding: '20px', borderRadius: '10px', fontSize: '18px', outline: 'none' }}
            />
          </div>
        )}

        {activeTab === 'Outils' && (
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
            
            {/* CALCULATRICE QUI FONCTIONNE */}
            <div style={{ background: '#0a0a0a', padding: '20px', borderRadius: '15px', border: '1px solid #d4af37', width: '260px' }}>
              <h3 style={{ color: '#d4af37', marginTop: 0 }}>Calculatrice</h3>
              <div style={{ background: '#1a1a1a', padding: '15px', textAlign: 'right', fontSize: '24px', color: '#d4af37', marginBottom: '10px', borderRadius: '5px', border: '1px solid #333' }}>
                {calcDisplay}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {['7','8','9','÷','4','5','6','×','1','2','3','-','0','C','=','+'].map(b => (
                  <button key={b} onClick={() => pressCalc(b)} style={{
                    padding: '15px', background: b === '=' ? '#d4af37' : '#222', color: b === '=' ? '#000' : '#d4af37',
                    border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer'
                  }}>{b}</button>
                ))}
              </div>
            </div>

            {/* RÈGLE INTERACTIVE */}
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h3 style={{ color: '#d4af37' }}>Règle ({rulerSize} cm)</h3>
              <div style={{ width: '100%', height: '60px', background: 'linear-gradient(to bottom, #d4af37, #b8860b)', borderRadius: '5px', position: 'relative', marginTop: '10px' }}>
                {[...Array(rulerSize + 1)].map((_, i) => (
                  <div key={i} style={{ position: 'absolute', left: `${(i / rulerSize) * 100}%`, bottom: 0, width: '2px', height: i % 5 === 0 ? '30px' : '15px', backgroundColor: '#000' }}>
                    {i % 5 === 0 && <span style={{ position: 'absolute', top: '-25px', left: '-5px', fontWeight: 'bold', color: '#000', fontSize: '12px' }}>{i}</span>}
                  </div>
                ))}
              </div>
              <input type="range" min="5" max="30" value={rulerSize} onChange={(e) => setRulerSize(parseInt(e.target.value))} style={{ width: '100%', marginTop: '20px', accentColor: '#d4af37' }} />
            </div>

          </div>
        )}

        {activeTab === 'Agenda' && <h1 style={{ color: '#d4af37' }}>Agenda (Bientôt disponible)</h1>}
        {activeTab === 'Réglages' && <h1 style={{ color: '#d4af37' }}>Options</h1>}

      </div>
    </div>
  );
};

export default NoteEditor;
