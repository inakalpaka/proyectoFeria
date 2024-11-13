import React, { useState, useEffect } from "react";
import { Filas, Carta } from "../componentes";
import { Instala } from "./instala";

export function Registrados({ datos, onEliminar }) {
  const [busqueda, setBusqueda] = useState("");
  const [contactos, setContacto] = useState(datos);
  const [contactoEditando, setContactoEditando] = useState(null);
  const [nombreEditando, setNombreEditando] = useState("");
  const [apellidoEditando, setApellidoEditando] = useState("");
  const [telefonoEditando, setTelefonoEditando] = useState("");

  useEffect(() => {
    setContacto(datos);
  }, [datos]);

  const contactosFiltrados = contactos.filter((contacto) =>
    contacto.nombre.toLowerCase().startsWith(busqueda.toLowerCase()),
  );

  const handleAgregarContactos = (newContacts) => {
    setContacto((prevContacts) => [...prevContacts, ...newContacts]);
  };

  const handleEditarContacto = (contacto) => {
    setContactoEditando(contacto);
    setNombreEditando(contacto.nombre);
    setApellidoEditando(contacto.apellido);
    setTelefonoEditando(contacto.telefono);
  };

  const handleGuardarEdicion = () => {
    const contactoActualizados = contactos.map((contacto) =>
      contacto.nombre === contactoEditando.nombre
        ? {
            nombre: nombreEditando,
            apellido: apellidoEditando,
            telefono: telefonoEditando,
          }
        : contacto,
    );

    setContacto(contactoActualizados);
    localStorage.setItem("usuarios", JSON.stringify(contactoActualizados));
    setContactoEditando(null);
  };

  return (
    <Carta>
      <h2>Contactos agendados</h2>

      <input
        type="text"
        placeholder="Nombre de la persona"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="barra-busqueda"
      />

      <Instala onAgregarUsuarios={handleAgregarContactos} />

      {busqueda && contactosFiltrados.length > 0 && (
        <div className="tabla-usuarios">
          <div className="fila-usuario">
            <span>Nombre</span>
            <span>Apellido</span>
            <span>Teléfono</span>
            <span>Editar</span>
            <span>Eliminar</span>
          </div>
          {contactosFiltrados.map((contacto, index) => (
            <Filas
              key={index}
              nombre={contacto.nombre}
              apellido={contacto.apellido}
              telefono={contacto.telefono}
              onEliminar={() => onEliminar(contacto.nombre)}
              onEditar={() => handleEditarContacto(contacto)}
            />
          ))}
        </div>
      )}

      {contactoEditando && (
        <div className="modal-edicion">
          <h3>Editar contacto</h3>
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
          <button onClick={() => setContactoEditando(null)}>Cancelar</button>
        </div>
      )}
    </Carta>
  );
}
