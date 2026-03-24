import React, { useState } from 'react';

const NoteEditor = () => {
  const [activeTab, setActiveTab] = useState('Notes');
  const [calcInput, setCalcInput] = useState('');

  const tabs = ['Notes', 'Agenda', 'Outils', 'Réglages'];

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0f0e0c', color: '#d4af37', fontFamily: 'serif' }}>
      
      {/* BARRE DES INTERCALAIRES (À GAUCHE) */}
      <div style={{ width: '150px', borderRight: '1px solid #d4af37', display: 'flex', flexDirection: 'column', padding: '20px 0' }}>
        {tabs.map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '15px', backgroundColor: activeTab === tab ? '#d4af37' : 'transparent',
              color: activeTab === tab ? '#000' : '#d4af37', border: 'none', cursor: 'pointer',
              fontWeight: 'bold', textAlign: 'left', marginBottom: '10px'
            }}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* CONTENU PRINCIPAL */}
      <div style={{ flex: 1, padding: '40px', position: 'relative' }}>
        <h1 style={{ borderBottom: '2px solid #d4af37', paddingBottom: '10px' }}>{activeTab.toUpperCase()}</h1>
        
        {activeTab === 'Notes' && (
          <textarea 
            placeholder="Commencez à écrire dans votre cahier intelligent..."
            style={{ width: '100%', height: '70%', backgroundColor: '#1a1a1a', color: '#fff', border: '1px solid #d4af37', padding: '20px', fontSize: '1.2rem', marginTop: '20px' }}
          />
        )}

        {/* WIDGET CALCULATRICE (ACTIF DANS OUTILS) */}
        {activeTab === 'Outils' && (
          <div style={{ border: '1px solid #d4af37', padding: '20px', width: '250px', background: '#1a1a1a' }}>
            <h3>Calculatrice Rapide</h3>
            <input 
              value={calcInput} 
              onChange={(e) => setCalcInput(e.target.value)}
              style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
            />
            <button onClick={() => setCalcInput(eval(calcInput))} style={{ width: '100%', background: '#d4af37', border: 'none', fontWeight: 'bold' }}>CALCULER</button>
          </div>
        )}

        {activeTab === 'Agenda' && <p>L'agenda intelligent arrive ici...</p>}
      </div>
    </div>
  );
};

export default NoteEditor;
