import React from 'react';

export function Instala({ onAgregarUsuarios }) {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const newUsers = JSON.parse(event.target.result);
          if (onAgregarUsuarios) {
            onAgregarUsuarios(newUsers);
          }
        } catch (error) {
          console.error('Error al cargar el archivo:', error);
        }
      };
      reader.readAsText(file);
    } else {
      alert('Por favor, selecciona un archivo JSON válido.');
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept=".json" 
        onChange={handleFileUpload} 
        className="cargar-archivo"
      />
    </div>
  );
}
