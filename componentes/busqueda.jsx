import React from 'react';

export function Busqueda({ placeholder, value, onChange }) {
  return (
    <input 
      type="text" 
      placeholder={placeholder} 
      value={value} 
      onChange={onChange} 
      style={{ display: 'block', marginBottom: '10px' }}
    />
  );
}
