import React from 'react';

export function Boton({ onClick, children }) {
  return (
    <button 
      onClick={onClick} 
      style={{ display: 'block', marginTop: '10px', width: '100%' }}>
      {children}
    </button>
  );
}
