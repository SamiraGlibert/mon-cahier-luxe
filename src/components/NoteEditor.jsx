import React, { useState } from 'react';

const NoteEditor = () => {
  const [activeTab, setActiveTab] = useState('Notes');
  const [notes, setNotes] = useState('');

  // Styles Modernes
  const gold = '#d4af37';
  const dark = '#121212';
  const card = '#1e1e1e';

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: dark, color: '#fff', fontFamily: 'sans-serif' }}>
      
      {/* SIDEBAR MODERNE */}
      <div style={{ width: '220px', backgroundColor: '#000', padding: '30px 15px', borderRight: `1px solid ${gold}44` }}>
        <h2 style={{ color: gold, fontSize: '1.2rem', textAlign: 'center', marginBottom: '40px', letterSpacing: '3px' }}>LUXE NOTE</h2>
        {['Notes', 'Agenda', 'Outils'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '8px', border: 'none', cursor: 'pointer',
            backgroundColor: activeTab === tab ? gold : 'transparent',
            color: activeTab === tab ? '#000' : gold,
            fontWeight: 'bold', transition: '0.3s', textAlign: 'left', paddingLeft: '20px'
          }}> {tab.toUpperCase()} </button>
        ))}
      </div>

      {/* CONTENU PRINCIPAL */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        
        {activeTab === 'Notes' && (
          <div style={{ animation: 'fadeIn 0.5s' }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ color: gold }}>Mes Notes</h1>
                <button style={{ backgroundColor: gold, border: 'none', padding: '10px 20px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' }}>🎤 Dicter</button>
             </div>
             <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Commencez à rédiger..." 
               style={{ width: '100%', height: '70vh', backgroundColor: card, color: '#eee', border: `1px solid ${gold}33`, borderRadius: '15px', padding: '25px', fontSize: '1.1rem', outline: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }} />
          </div>
        )}

        {activeTab === 'Agenda' && (
          <div style={{ animation: 'fadeIn 0.5s' }}>
            <h1 style={{ color: gold, marginBottom: '30px' }}>Agenda Intelligent</h1>
            <div style={{ backgroundColor: card, padding: '25px', borderRadius: '15px', border: `1px solid ${gold}44` }}>
              <p style={{ marginBottom: '15px' }}>Planifier un événement :</p>
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <input type="date" style={{ padding: '10px', borderRadius: '8px', border: 'none' }} />
                <select style={{ padding: '10px', borderRadius: '8px', backgroundColor: '#333', color: gold, border: 'none' }}>
                  <option>Examen</option>
                  <option>Dépôt de cours</option>
                  <option>Rappel</option>
                </select>
                <button style={{ backgroundColor: gold, padding: '10px 20px', borderRadius: '8px', border: 'none', fontWeight: 'bold' }}>Enregistrer</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Outils' && (
          <div style={{ animation: 'fadeIn 0.5s' }}>
            <h1 style={{ color: gold, marginBottom: '30px' }}>Widgets</h1>
            <div style={{ display: 'flex', gap: '30px' }}>
              <div style={{ backgroundColor: card, padding: '20px', borderRadius: '15px', border: `1px solid ${gold}44`, width: '250px' }}>
                <h3 style={{ color: gold }}>Calculatrice</h3>
                <div style={{ background: '#000', height: '40px', marginBottom: '10px', borderRadius: '5px' }}></div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px' }}>
                  {[1,2,3,'+',4,5,6,'-',7,8,9,'*',0,'C','=','/'].map(n => (
                    <button key={n} style={{ padding: '10px', background: '#333', color: gold, border: 'none', borderRadius: '5px' }}>{n}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default NoteEditor;
