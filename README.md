# 🕹️ El Gimnasio de Reflejos (Crono-Entrenamiento Arcade)

Aplicación web interactiva desarrollada en React enfocada en el entrenamiento mental y de reflejos mediante mecánicas de tiempo reactivo.

---

## 🚀 Demostración Técnica y Buenas Prácticas

* **Evasión de Fugas de Memoria (Memory Leaks):** Implementación de una función de limpieza de manual (*Cleanup Function*) mediante `return () => clearInterval(contador)` dentro del hook de sincronización. Esto garantiza que al desmontar el componente, pausar la partida o disparar el Game Over, el navegador destruya por completo los hilos de ejecución secundarios, consumiendo cero recursos de CPU de fondo.
* **Rotura de Dependencias Circulares (`prev`):** Uso estricto del patrón funcional callback `setTiempo((prev) => prev - 1)` dentro del bucle del reloj. Esto permite al estado leer el presente de la aplicación de forma aislada, evitando la necesidad de incluir la variable en el array de dependencias del `useEffect` y previniendo bucles infinitos de re-renderizado masivo.
* **Separación de Responsabilidades por Efectos:** Estructuración de la arquitectura en dos bloques de efectos independientes y aislados:
  * **Efecto 1:** Sincroniza en exclusiva el encendido y apagado del intervalo asíncrono monitorizando `[juego_activo]`.
  * **Efecto 2:** Actúa como vigilante de consecuencia escuchando únicamente a `[tiempo_restante]` para forzar la detención automatizada en el segundo cero.
* **Maquetación Modular & Adaptativa:** Modularización limpia de la botonera reactiva en un componente hijo (`BotonJuegoPulsar`) comunicado mediante callbacks. Interfaz visual responsive estilizada en CSS puro con estética Arcade Retro/Cyberpunk utilizando halos de neón dinámicos y Flexbox geométrico.

---

## 🛠️ Tecnologías Utilizadas

* **React (v18+)** & Vite como entorno de compilación ágil.
* **JavaScript Asíncrono:** Uso avanzado de `setInterval`, `clearInterval` y funciones de actualización de estado síncronas.
* **CSS3 Avanzado:** Diseño Mobile-First, Flexbox adaptativo, filtros de brillo con `text-shadow` / `box-shadow` e inyección de tipografías monoespaciadas.

---

## 📋 Estructura de Control de Estados

El núcleo lógico de la partida se sostiene sobre tres almacenes primitivos sincronizados en cascada:

```javascript
const [puntuacion, setPuntos] = useState(0);      // Contador de impactos exitosos
const [tiempo_restante, setTiempo] = useState(10); // Cronómetro regresivo síncrono
const [juego_activo, setActivo] = useState(false);  // Flag interruptor del temporizador
```

