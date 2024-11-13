import React from "react";

export function Descargar({ datos }) {
  const descargarJson = () => {
    const blob = new Blob([JSON.stringify(datos, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement("a");
    enlace.href = url;
    enlace.download = "usuarios.json";
    enlace.click();
    URL.revokeObjectURL(url);
  };

  return <button onClick={descargarJson}>Descargar contactos</button>;
}
