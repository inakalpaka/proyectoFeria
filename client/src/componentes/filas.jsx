import React from 'react';

export function Filas({ nombre, apellido, telefono, onEliminar, onEditar }) {
  return (
    <div className="fila-usuario">
      <span>{nombre}</span>
      <span>{apellido}</span>
      <span>{telefono}</span>
      <span>
        <button onClick={onEditar}>Editar</button>
        <button onClick={onEliminar}>Eliminar</button>
      </span>
    </div>
  );
}
