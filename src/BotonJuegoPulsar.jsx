import { useState, useEffect } from "react";

export function BotonJuegoPulsar({
  accion_puntos,
  puntos_actuales,
  accion_tiempo_boton,
}) {
  return (
    <>
      <div className="contenedor_boton">
        <h3 className="puntos_actuales">Puntos actuales: {puntos_actuales}</h3>
        <button
          className="boton_juego_pulsar"
          onClick={() => {
            accion_puntos((prev) => prev + 1);
            accion_tiempo_boton((prev) => prev + 1);
          }}
        >
          ¡PÚLSAME!
        </button>
      </div>
    </>
  );
}
