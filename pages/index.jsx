import React from 'react';
import NoteEditor from '../src/components/NoteEditor';

export default function Home() {
  return (
    <div style={{ backgroundColor: '#0f0e0c', minHeight: '100vh' }}>
      <NoteEditor />
    </div>
  );
}
