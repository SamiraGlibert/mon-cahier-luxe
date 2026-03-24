import React, { useState } from 'react';
import NoteEditor from '../src/components/NoteEditor';

const FAMILY_CODES = ['FAM-SAMIRA-01', 'FAM-MARI-02', 'FAM-FILS-03', 'FAM-FILLE-04'];
const CLIENT_CODES = ['SAG-ADM-0000', 'SAG-2024-A1B2']; // Tu pourras en ajouter d'autres plus tard

export default function Home() {
  const [isLocked, setIsLocked] = useState(true);
  const [activationCode, setActivationCode] = useState('');
  const [error, setError] = useState('');

  const handleUnlock = () => {
    if (FAMILY_CODES.includes(activationCode) || CLIENT_CODES.includes(activationCode)) {
      setIsLocked(false);
    } else {
      setError('Code invalide. Veuillez contacter l\'administrateur.');
    }
  };

  if (isLocked) {
    return (
      <div style={{
        backgroundColor: '#0f0e0c',
        color: '#d4af37',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'serif'
      }}>
        <img src="/icon.png" alt="Plume" style={{ width: '100px', marginBottom: '20px' }} />
        <h1 style={{ fontSize: '2rem', marginBottom: '30px', textAlign: 'center' }}>MON CAHIER INTELLIGENT</h1>
        <div style={{ border: '1px solid #d4af37', padding: '40px', borderRadius: '10px', textAlign: 'center' }}>
          <h3>Activation requise</h3>
          <input 
            type="text" 
            placeholder="Entrez votre code"
            value={activationCode}
            onChange={(e) => setActivationCode(e.target.value)}
            style={{ padding: '10px', width: '250px', marginTop: '10px', backgroundColor: '#1a1a1a', color: '#fff', border: '1px solid #d4af37' }}
          />
          <br />
          <button 
            onClick={handleUnlock}
            style={{ marginTop: '20px', padding: '10px 30px', backgroundColor: '#d4af37', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
          >
            ENTRER
          </button>
          {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
        </div>
      </div>
    );
  }

  return <NoteEditor />;
}
