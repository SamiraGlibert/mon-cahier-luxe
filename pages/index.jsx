import React, { useState } from 'react';
import NoteEditor from '../src/components/NoteEditor';

const FAMILY_CODES = ['FAM-SAMIRA-01', 'FAM-MARI-02', 'FAM-FILS-03', 'FAM-FILLE-04'];
const CLIENT_CODES = ['SAG-ADM-0000', 'SAG-2024-A1B2'];

export default function Home() {
  const [isLocked, setIsLocked] = useState(true);
  const [activationCode, setActivationCode] = useState('');
  const [error, setError] = useState('');

  const handleUnlock = (e) => {
    // On empêche la page de se recharger
    if(e) e.preventDefault();
    
    // On vérifie le code
    if (FAMILY_CODES.includes(activationCode) || CLIENT_CODES.includes(activationCode)) {
      setIsLocked(false);
    } else {
      setError('Code invalide. Veuillez réessayer.');
    }
  };

  if (!isLocked) {
    return <NoteEditor />;
  }

  return (
    <div style={{ backgroundColor: '#0f0e0c', color: '#d4af37', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'serif' }}>
      <img src="icon.png" alt="Plume" style={{ width: '100px', marginBottom: '20px' }} />
      <h1 style={{ fontSize: '1.8rem', marginBottom: '30px', textAlign: 'center' }}>MON CAHIER INTELLIGENT</h1>
      <div style={{ border: '1px solid #d4af37', padding: '30px', borderRadius: '10px', textAlign: 'center', width: '300px' }}>
        <h3 style={{ marginBottom: '20px' }}>Activation</h3>
        <input 
          type="text" 
          placeholder="Votre code ici"
          value={activationCode}
          onChange={(e) => setActivationCode(e.target.value)}
          style={{ padding: '12px', width: '100%', backgroundColor: '#1a1a1a', color: '#fff', border: '1px solid #d4af37', marginBottom: '20px', textAlign: 'center' }}
        />
        <button 
          onClick={handleUnlock}
          style={{ width: '100%', padding: '12px', backgroundColor: '#d4af37', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
        >
          ENTRER
        </button>
        {error && <p style={{ color: '#ff4444', marginTop: '15px', fontSize: '0.9rem' }}>{error}</p>}
      </div>
    </div>
  );
}
