import React, { useState } from 'react';

const NoteEditor = () => {
  const [activeTab, setActiveTab] = useState('Notes');
  const [notes, setNotes] = useState('');
  const [typeEvent, setTypeEvent] = useState('Examen'); // Le menu déroulant

  const startVoice = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'fr-FR';
    recognition.onresult = (e) => setNotes(prev => prev + ' ' + e.results[0][0].transcript);
    recognition.start();
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0f0e0c', color: '#d4af37', fontFamily: 'serif' }}>
      
      {/* MENU LATÉRAL */}
      <div style={{ width: '180px', borderRight: '1px solid #d4af37', padding: '20px 0', background: '#0a0a0a' }}>
        {['Notes', 'Agenda', 'Outils'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            width: '100%', padding: '15px', backgroundColor: activeTab === tab ? '#d4af37' : 'transparent',
            color: activeTab === tab ? '#000' : '#d4af37', border: 'none', cursor: 'pointer', fontWeight: 'bold', marginBottom: '10px'
          }}> {tab.toUpperCase()} </button>
        ))}
      </div>

      {/* CONTENU DYNAMIQUE */}
      <div style={{ flex: 1, padding: '40px' }}>
        
        {activeTab === 'Notes' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2>PRISE DE NOTES</h2>
              <button onClick={startVoice} style={{ backgroundColor: '#d4af37', color: '#000', border: 'none', padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer' }}>🎤 DICTÉE VOCALE</button>
            </div>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} style={{ width: '100%', height: '300px', backgroundColor: '#1a1a1a', color: '#fff', border: '1px solid #d4af37', padding: '20px' }} />
          </div>
        )}

        {activeTab === 'Agenda' && (
          <div>
            <h2>AGENDA INTELLIGENT</h2>
            <div style={{ marginTop: '20px', border: '1px solid #d4af37', padding: '20px', background: '#1a1a1a' }}>
              <label>Type d'événement : </label>
              {/* VOICI LE MENU DÉROULANT QUI FONCTIONNE */}
              <select value={typeEvent} onChange={(e) => setTypeEvent(e.target.value)} style={{ padding: '10px', background: '#000', color: '#d4af37', border: '1px solid #d4af37', marginLeft: '10px' }}>
                <option value="Examen">📅 Date d'Examen</option>
                <option value="Dépôt">📤 Date de Dépôt (Cours)</option>
                <option value="Révision">📖 Séance de Révision</option>
              </select>
              <p style={{ marginTop: '20px' }}>Vous avez sélectionné : <strong>{typeEvent}</strong></p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default NoteEditor;
