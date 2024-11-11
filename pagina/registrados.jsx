import React, { useState, useEffect } from 'react';
import { Filas, Carta } from '../componentes';
import { Instala } from './instala';

export function Registrados({ datos, onEliminar }) {
  const [busqueda, setBusqueda] = useState('');
  const [usuarios, setUsuarios] = useState(datos);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [nombreEditando, setNombreEditando] = useState('');
  const [apellidoEditando, setApellidoEditando] = useState('');
  const [telefonoEditando, setTelefonoEditando] = useState('');

  useEffect(() => {
    setUsuarios(datos);
  }, [datos]);

  const usuariosFiltrados = usuarios.filter(usuario =>
    usuario.nombre.toLowerCase().startsWith(busqueda.toLowerCase())
  );

  const handleAgregarUsuarios = (newUsers) => {
    setUsuarios(prevUsuarios => [...prevUsuarios, ...newUsers]);
  };

  const handleEditarUsuario = (usuario) => {
    setUsuarioEditando(usuario);
    setNombreEditando(usuario.nombre);
    setApellidoEditando(usuario.apellido);
    setTelefonoEditando(usuario.telefono);
  };

  const handleGuardarEdicion = () => {
    const usuariosActualizados = usuarios.map(usuario =>
      usuario.nombre === usuarioEditando.nombre
        ? { nombre: nombreEditando, apellido: apellidoEditando, telefono: telefonoEditando }
        : usuario
    );

    setUsuarios(usuariosActualizados);
    localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
    setUsuarioEditando(null);
  };

  return (
    <Carta>
      <h2>Usuarios Registrados</h2>

      <input
        type="text"
        placeholder="nombre de la persona"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="barra-busqueda"
      />

      <Instala onAgregarUsuarios={handleAgregarUsuarios} />

      {busqueda && usuariosFiltrados.length > 0 && (
        <div className="tabla-usuarios">
          <div className="fila-usuario">
            <span>Nombre</span>
            <span>Apellido</span>
            <span>Teléfono</span>
            <span>Editar</span>
            <span>Eliminar</span>
          </div>
          {usuariosFiltrados.map((usuario, index) => (
            <Filas
              key={index}
              nombre={usuario.nombre}
              apellido={usuario.apellido}
              telefono={usuario.telefono}
              onEliminar={() => onEliminar(usuario.nombre)}
              onEditar={() => handleEditarUsuario(usuario)}
            />
          ))}
        </div>
      )}

      {usuarioEditando && (
        <div className="modal-edicion">
          <h3>Editar Usuario</h3>
          <input
            type="text"
            value={nombreEditando}
            onChange={(e) => setNombreEditando(e.target.value)}
          />
          <input
            type="text"
            value={apellidoEditando}
            onChange={(e) => setApellidoEditando(e.target.value)}
          />
          <input
            type="text"
            value={telefonoEditando}
            onChange={(e) => setTelefonoEditando(e.target.value)}
          />
          <button onClick={handleGuardarEdicion}>Guardar Cambios</button>
          <button onClick={() => setUsuarioEditando(null)}>Cancelar</button>
        </div>
      )}
    </Carta>
  );
}
