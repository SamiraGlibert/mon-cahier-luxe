import React, { useState, useEffect } from 'react';

const NoteEditor = () => {
  const [activeTab, setActiveTab] = useState('Notes');
  const [notes, setNotes] = useState('');
  const [agenda, setAgenda] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', type: 'Cours' });
  const [isListening, setIsListening] = useState(false);

  // FONCTION DICTÉE VOCALE
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Votre navigateur ne supporte pas la dictée vocale.");
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'fr-FR';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setNotes(prev => prev + " " + transcript);
    };
    recognition.start();
  };

  const addEvent = () => {
    if (newEvent.title && newEvent.date) {
      setAgenda([...agenda, newEvent]);
      setNewEvent({ title: '', date: '', type: 'Cours' });
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0f0e0c', color: '#d4af37', fontFamily: 'serif' }}>
      
      {/* BARRE LATÉRALE */}
      <div style={{ width: '180px', borderRight: '1px solid #d4af37', display: 'flex', flexDirection: 'column', padding: '20px 0', background: '#0a0a0a' }}>
        {['Notes', 'Agenda', 'Outils'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: '15px', backgroundColor: activeTab === tab ? '#d4af37' : 'transparent',
            color: activeTab === tab ? '#000' : '#d4af37', border: 'none', cursor: 'pointer', fontWeight: 'bold', marginBottom: '10px'
          }}> {tab.toUpperCase()} </button>
        ))}
      </div>

      {/* ZONE DE TRAVAIL */}
      <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
        
        {/* ONGLET NOTES + DICTÉE */}
        {activeTab === 'Notes' && (
          <div style={{ height: '90%' }}>
            <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
              <h2>PRISE DE NOTES</h2>
              <button onClick={startListening} style={{ 
                backgroundColor: isListening ? '#ff4444' : '#d4af37', 
                color: '#000', border: 'none', padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer', borderRadius: '5px' 
              }}>
                {isListening ? '🔴 ÉCOUTE EN COURS...' : '🎤 DICTÉE VOCALE'}
              </button>
            </div>
            <textarea 
              value={notes} onChange={(e) => setNotes(e.target.value)}
              placeholder="Dictez ou écrivez vos cours ici..." 
              style={{ width: '100%', height: '100%', backgroundColor: '#1a1a1a', color: '#fff', border: '1px solid #d4af37', padding: '20px', fontSize: '1.2rem' }}
            />
          </div>
        )}

        {/* ONGLET AGENDA INTELLIGENT */}
        {activeTab === 'Agenda' && (
          <div>
            <h2>AGENDA DES EXAMENS & COURS</h2>
            <div style={{ background: '#1a1a1a', padding: '20px', border: '1px solid #d4af37', marginTop: '20px' }}>
              <input type="text" placeholder="Nom du cours ou examen" value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} style={{ padding: '10px', marginRight: '10px' }} />
              <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({...newEvent, date: e.target.value})} style={{ padding: '10px', marginRight: '10px' }} />
              <select value={newEvent.type} onChange={(e) => setNewEvent({...newEvent, type: e.target.value})} style={{ padding: '10px', marginRight: '10px' }}>
                <option value="Examen">Date d'Examen</option>
                <option value="Dépôt">Date de Dépôt</option>
                <option value="Cours">Rappel de Cours</option>
              </select>
              <button onClick={addEvent} style={{ padding: '10px 20px', background: '#d4af37', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>AJOUTER</button>
            </div>
            <div style={{ marginTop: '30px' }}>
              {agenda.map((item, index) => (
                <div key={index} style={{ borderBottom: '1px solid #333', padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
                  <span><strong>{item.date}</strong> - {item.title}</span>
                  <span style={{ color: '#fff', background: '#d4af37', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', color: '#000' }}>{item.type}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteEditor;
