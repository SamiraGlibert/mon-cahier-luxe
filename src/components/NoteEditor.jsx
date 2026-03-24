import React, { useState } from 'react';

const NoteEditor = () => {
  const [note, setNote] = useState('');

  return (
    <div style={{ padding: '20px', backgroundColor: '#1a1a1a', minHeight: '100vh', color: '#d4af37' }}>
      <h2 style={{ borderBottom: '1px solid #d4af37', paddingBottom: '10px' }}>MON ÉDITEUR</h2>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Écrivez vos pensées ici..."
        style={{
          width: '100%',
          height: '400px',
          backgroundColor: '#0f0e0c',
          color: '#fff',
          border: '1px solid #d4af37',
          padding: '15px',
          fontSize: '1.1rem',
          fontFamily: 'serif',
          marginTop: '20px'
        }}
      />
      <button 
        onClick={() => alert('Note enregistrée !')}
        style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#d4af37', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
      >
        SAUVEGARDER
      </button>
    </div>
  );
};

export default NoteEditor;
