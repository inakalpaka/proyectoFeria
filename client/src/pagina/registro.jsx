import React, { useState } from 'react';
import { Busqueda, Boton, Carta } from '../componentes';

export function Registro({ onGuardar }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');

  const guardar = () => {
    onGuardar(nombre, apellido, telefono);
    setNombre('');
    setApellido('');
    setTelefono('');
  };

  return (
    <Carta>
      <h2>Crear nuevo contacto</h2>
      <Busqueda 
        placeholder="Nombre" 
        value={nombre} 
        onChange={(e) => setNombre(e.target.value)} 
      />
      <Busqueda 
        placeholder="Apellido" 
        value={apellido} 
        onChange={(e) => setApellido(e.target.value)} 
      />
      <Busqueda 
        placeholder="Teléfono (+ seguido de 12 dígitos)" 
        value={telefono} 
        onChange={(e) => setTelefono(e.target.value)} 
      />
      <Boton onClick={guardar}>guardar datos</Boton>
    </Carta>
  );
}
