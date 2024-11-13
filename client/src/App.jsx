import React, { useState, useEffect } from 'react';
import { Registro } from './pagina/registro';
import { Registrados } from './pagina/registrados';
import { Descargar } from './pagina/descargar';

import './App.css';

function App() {
  const [datosGuardados, setDatosGuardados] = useState([]);

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem('usuarios')) || [];
    console.log('Datos cargados desde localStorage:', datos);
    setDatosGuardados(datos);
  }, []);

  const guardarDatos = (nombre, apellido, telefono) => {
    if (nombre.length < 5 || nombre.length > 100) {
      alert('El nombre debe tener entre 5 y 100 caracteres.');
      return;
    }

    if (apellido.length < 5 || apellido.length > 100) {
      alert('El apellido debe tener entre 5 y 100 caracteres.');
      return;
    }

    const regexTelefono = /^\+\d{12}$/;
    if (!regexTelefono.test(telefono)) {
      alert('El número de teléfono debe empezar en + seguido de 12 números.');
      return;
    }

    const usuarioExistente = datosGuardados.find(usuario => usuario.nombre === nombre);
    if (usuarioExistente) {
      if (usuarioExistente.telefono !== telefono) {
        const modificar = window.confirm('El nombre ya existe con otro número de teléfono. ¿Deseas modificar los datos?');
        if (modificar) {
          const nuevosDatosGuardados = datosGuardados.map(usuario =>
            usuario.nombre === nombre ? { nombre, apellido, telefono } : usuario
          );
          setDatosGuardados(nuevosDatosGuardados);
          localStorage.setItem('usuarios', JSON.stringify(nuevosDatosGuardados));
          console.log('Datos modificados:', nuevosDatosGuardados);
          alert('Datos modificados con éxito.');
        } else {
          alert('El nombre ya existe.');
        }
      } else {
        alert('El nombre y número de teléfono ya existen.');
      }
      return;
    }

    const nuevoUsuario = { nombre, apellido, telefono };
    const nuevosDatosGuardados = [...datosGuardados, nuevoUsuario];

    setDatosGuardados(nuevosDatosGuardados);
    localStorage.setItem('usuarios', JSON.stringify(nuevosDatosGuardados));
    console.log('Datos guardados:', nuevosDatosGuardados);
  };

  const eliminarUsuario = (nombre) => {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (confirmacion) {
      const nuevosDatosGuardados = datosGuardados.filter(usuario => usuario.nombre !== nombre);
      setDatosGuardados(nuevosDatosGuardados);
      localStorage.setItem('usuarios', JSON.stringify(nuevosDatosGuardados));
      console.log('Usuario eliminado:', nuevosDatosGuardados);
      alert('Usuario eliminado con éxito.');
    }
  };

  return (
    <div className="contenedor">
      <img src="./public/logo.png" alt="LOGO" />
      <Registro onGuardar={guardarDatos} />
      <Registrados datos={datosGuardados} onEliminar={eliminarUsuario} />
      <Descargar datos={datosGuardados} />
    </div>
  );
}

export default App;
