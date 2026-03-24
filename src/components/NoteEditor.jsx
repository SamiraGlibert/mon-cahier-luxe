import React, { useState, useEffect } from 'react';

const NoteEditor = () => {
  const [activeTab, setActiveTab] = useState('Notes');
  const [notes, setNotes] = useState('');
  const [calcDisplay, setCalcDisplay] = useState('');
  const [isListening, setIsListening] = useState(false);

  // LOGIQUE CALCULATRICE
  const handleCalc = (val) => {
    if (val === '=') { try { setCalcDisplay(eval(calcDisplay).toString()); } catch { setCalcDisplay('Erreur'); } }
    else if (val === 'C') { setCalcDisplay(''); }
    else { setCalcDisplay(prev => prev + val); }
  };

  // LOGIQUE DICTÉE VOCALE
  const startVoice = () => {
    const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Speech) return alert("Micro non supporté");
    const rec = new Speech();
    rec.lang = 'fr-FR';
    rec.onstart = () => setIsListening(true);
    rec.onend = () => setIsListening(false);
    rec.onresult = (e) => setNotes(prev => prev + ' ' + e.results[0][0].transcript);
    rec.start();
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0a0a0a', padding: '20px', gap: '0' }}>
      
      {/* INTERCALAIRES PHYSIQUES (LOOK CLASSEUR) */}
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '50px' }}>
        {['Notes', 'Agenda', 'Outils', 'Réglages'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: '20px 10px', width: '120px', border: '1px solid #d4af37', borderRight: 'none',
            borderRadius: '15px 0 0 15px', backgroundColor: activeTab === tab ? '#d4af37' : '#1a1a1a',
            color: activeTab === tab ? '#000' : '#d4af37', cursor: 'pointer', fontWeight: 'bold',
            boxShadow: activeTab === tab ? '-5px 0 15px rgba(212,175,55,0.3)' : 'none', transition: '0.3s'
          }}> {tab.toUpperCase()} </button>
        ))}
      </div>

      {/* CORPS DU CAHIER */}
      <div style={{ 
        flex: 1, backgroundColor: '#1a1a1a', border: '3px solid #d4af37', borderRadius: '0 20px 20px 20px',
        boxShadow: '0 0 30px rgba(0,0,0,0.8)', padding: '30px', position: 'relative', overflow: 'hidden'
      }}>
        
        {/* ONGLET NOTES */}
        {activeTab === 'Notes' && (
          <div style={{ height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h1 style={{ color: '#d4af37', margin: 0, fontFamily: 'serif' }}>NOTES INTELLIGENTES</h1>
              <button onClick={startVoice} style={{ 
                backgroundColor: isListening ? '#ff4444' : '#d4af37', color: '#000', 
                border: 'none', padding: '10px 25px', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer'
              }}> {isListening ? '🔴 ÉCOUTE...' : '🎤 COMMANDE VOCALE'} </button>
            </div>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} 
              placeholder="Le papier numérique vous écoute..."
              style={{ 
                width: '100%', height: '80%', backgroundColor: '#000', color: '#fff', 
                border: '1px solid #333', borderRadius: '10px', padding: '20px', fontSize: '1.2rem', lineHeight: '1.6'
              }} 
            />
          </div>
        )}

        {/* ONGLET OUTILS (RÈGLE + CALC) */}
        {activeTab === 'Outils' && (
          <div>
            <h1 style={{ color: '#d4af37' }}>OUTILS DE PRÉCISION</h1>
            
            {/* RÈGLE DYNAMIQUE */}
            <div style={{ marginBottom: '50px' }}>
              <h3 style={{ color: '#aaa' }}>Règle de Mesure (CM)</h3>
              <div style={{ width: '100%', height: '60px', background: 'linear-gradient(to bottom, #d4af37, #b8860b)', borderRadius: '5px', position: 'relative' }}>
                {[...Array(21)].map((_, i) => (
                  <div key={i} style={{ position: 'absolute', left: `${i * 5}%`, bottom: 0, width: '2px', height: i % 5 === 0 ? '30px' : '15px', backgroundColor: '#000' }}>
                    {i % 5 === 0 && <span style={{ position: 'absolute', top: '-25px', left: '-5px', fontWeight: 'bold' }}>{i}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* CALCULATRICE RÉELLE */}
            <div style={{ width: '280px', background: '#000', padding: '20px', border: '2px solid #d4af37', borderRadius: '15px' }}>
              <div style={{ backgroundColor: '#111', color: '#d4af37', padding: '15px', textAlign: 'right', fontSize: '1.5rem', marginBottom: '15px', border: '1px solid #333' }}>
                {calcDisplay || '0'}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {['7','8','9','/','4','5','6','*','1','2','3','-','0','C','=','+'].map(b => (
                  <button key={b} onClick={() => handleCalc(b)} style={{
                    padding: '15px', backgroundColor: b === '=' ? '#d4af37' : '#222', 
                    color: b === '=' ? '#000' : '#d4af37', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer'
                  }}>{b}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AGENDA */}
        {activeTab === 'Agenda' && (
          <div>
            <h1 style={{ color: '#d4af37' }}>PLANIFICATION</h1>
            <div style={{ backgroundColor: '#000', padding: '20px', borderRadius: '10px', border: '1px solid #333' }}>
              <input type="date" style={{ padding: '10px', backgroundColor: '#1a1a1a', color: '#d4af37', border: '1px solid #d4af37' }} />
              <p style={{ marginTop: '20px', color: '#888' }}>Vos dates d'examens et de cours apparaîtront ici.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default NoteEditor;
