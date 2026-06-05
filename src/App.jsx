import { useState, useEffect } from "react";
import { BotonJuegoPulsar } from "./BotonJuegoPulsar";
import "./index.css";
function App() {
  const [puntuacion, setPuntos] = useState(0);
  const [tiempo_restante, setTiempo] = useState(10);
  const [juego_activo, setActivo] = useState(false);

  const funcion_reseteo = () => {
    //Inicializamos todos los estados a valor inicial, para volver a empezar a jugar
    setPuntos(0);
    setTiempo(10);
    setActivo(false);
  };
  //Useeffect encargado del reloj de juego
  useEffect(() => {
    //Empezado el juego, creamos el setInterval
    if (!juego_activo) {
      //Si el juego no esta activo , nos salimos del useeffect
      return;
    }
    //Si el juego esta activo, creamos el intervalo
    const contador = setInterval(() => {
      setTiempo((prev) => prev - 1);
    }, 1000);
    //Llama a la funcion tiempo_actual cada 1 seg
    return () => {
      //Cuando se actualice el estado, dejamos de jugar, se ejecuta la funcion de limpieza y se repinta todo otra vez, entrando en el if y saliendo del useffect
      clearInterval(contador);
    };
  }, [juego_activo]);

  //Useeffect encargado de estado del tiempo , viendo si gana o no
  useEffect(() => {
    if (tiempo_restante <= 0) {
      setActivo(false);
    }
  }, [tiempo_restante]);
  return (
    <>
      <div className="contenedor_juego">
        {!juego_activo && tiempo_restante <= 0 ? (
          <div className="contenedor_juego_terminado">
            <p className="texto_derrota">💥 GAME OVER</p>
            <h1 className="puntuacion_final">
              Puntuación Final : {puntuacion}
            </h1>
            <button
              className="boton_reiniciar"
              onClick={() => funcion_reseteo()}
            >
              Reinciar partida
            </button>
          </div>
        ) : (
          <div className="contenedor_boton_inicio">
            {!juego_activo && (
              <button
                onClick={() => setActivo((prev) => !prev)}
                className="boton_empezar_juego"
              >
                Iniciar Entrenamiento
              </button>
            )}
          </div>
        )}
        {juego_activo && (
          <div className="contenedor_juego_empezado">
            <p className="texto_juego">
              Pulsa lo más rapido que puedas
            </p>

            <h3 className="texto_contador">Tiempo: {tiempo_restante} </h3>
            <BotonJuegoPulsar
              accion_puntos={setPuntos}
              puntos_actuales={puntuacion}
              accion_tiempo_boton={setTiempo}
            ></BotonJuegoPulsar>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
