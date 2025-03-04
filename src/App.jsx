/**
 * REQUERIMIENTOS BÁSICOS CUMPLIDOS:
 * 1. README.md: Contiene enlace a la app en funcionamiento (https://juan1969gudrul.github.io/pig-game-react/)
 * 2. Programa funcional: La aplicación está completamente operativa
 * 3. Commits: El repositorio tiene 3 commits descriptivos
 * 4. Código comentado: Incluye documentación JSDoc y comentarios explicativos
 * 5. Script build/deploy: Implementado con Vite (minificación automática)
 * 
 * @fileoverview Implementación del juego de dados Pig Game en React
 * @version 1.0.0
 */

import { useState } from "react";
import "./App.css";

/**
 * @component DiceGame
 * @description Un juego de dados para dos jugadores donde cada jugador tira un dado y acumula puntos.
 * Si sale 1, pierde todos los puntos acumulados en ese turno. El primer jugador en llegar a 100 puntos gana.
 * Reglas del juego:
 * 1. Los jugadores tiran un dado por turnos
 * 2. En cada turno, el jugador puede:
 *    - Tirar el dado: suma el número al puntaje actual
 *    - Mantener: guarda el puntaje actual y pasa el turno
 * 3. Si sale 1, pierde el puntaje actual y pasa el turno
 * 4. Gana el primer jugador en llegar a 100 puntos
 * @returns {JSX.Element} El componente del juego de dados
 */
const DiceGame = () => {
  // Estado que guarda las puntuaciones de ambos jugadores
  const [score, setScore] = useState([0, 0]);

  // Estado que guarda la puntuación actual del jugador activo
  const [currentScore, setCurrentScore] = useState(0);

  // Estado para identificar al jugador activo (0 o 1)
  const [activePlayer, setActivePlayer] = useState(0);

  // Estado que guarda el número de la cara del dado
  const [diceNumber, setDiceNumber] = useState(null);

  // Estado que indica si hay un ganador (0 o 1), o `null` si no hay ganador
  const [winner, setWinner] = useState(null);

  // Función para reiniciar el estado del juego a sus valores iniciales
  const initData = () => {
    setScore([0, 0]); // Reinicia las puntuaciones totales
    setCurrentScore(0); // Reinicia la puntuación actual
    setActivePlayer(0); // Establece al jugador 1 como el jugador activo
    setDiceNumber(null); // Oculta el dado
    setWinner(null); // Elimina cualquier estado de ganador
  };

  // Función para tirar el dado
  const throwDice = () => {
    const newDiceNumber = Math.trunc(Math.random() * 6) + 1; // Genera un número aleatorio entre 1 y 6
    setDiceNumber(newDiceNumber); // Muestra la cara correspondiente del dado

    if (newDiceNumber !== 1) {
      // Si el número es distinto de 1, se suma a la puntuación actual
      setCurrentScore(currentScore + newDiceNumber);
    } else {
      // Si el número es 1, cambia al jugador siguiente
      switchPlayer();
    }
  };

  // Función para cambiar al jugador siguiente
  const switchPlayer = () => {
    setCurrentScore(0); // Reinicia la puntuación actual
    setActivePlayer(activePlayer === 0 ? 1 : 0); // Cambia al jugador activo
  };

  // Función para mantener la puntuación del jugador actual
  const holdScore = () => {
    const newScore = [...score]; // Copia el estado de las puntuaciones
    newScore[activePlayer] += currentScore; // Añade la puntuación actual al total del jugador activo
    setScore(newScore); // Actualiza las puntuaciones

    // Si la puntuación del jugador alcanza o supera 100, declara un ganador
    if (newScore[activePlayer] >= 100) {
      setWinner(activePlayer); // Declara al jugador activo como ganador
      setDiceNumber(null); // Oculta el dado
    } else {
      // Si no hay ganador, cambia al jugador siguiente
      switchPlayer();
    }
  };

  return (
    <main>
      {/* Sección del Jugador 1 */}
      <section
        className={`player player--0 ${
          activePlayer === 0 ? "player--active" : ""
        } ${winner === 0 ? "player--winner" : ""}`}
      >
        <h2 className="name">Player 1</h2>
        <p className="score">{score[0]}</p>
        <div className="current">
          <p className="current-label">Current</p>
          <p className="current-score">
            {activePlayer === 0 ? currentScore : 0}
          </p>
        </div>
      </section>

      {/* Sección del Jugador 2 */}
      <section
        className={`player player--1 ${
          activePlayer === 1 ? "player--active" : ""
        } ${winner === 1 ? "player--winner" : ""}`}
      >
        <h2 className="name">Player 2</h2>
        <p className="score">{score[1]}</p>
        <div className="current">
          <p className="current-label">Current</p>
          <p className="current-score">
            {activePlayer === 1 ? currentScore : 0}
          </p>
        </div>
      </section>

      {/* Muestra el dado solo si se ha lanzado */}
      {diceNumber && (
        <img
          src={`dice-${diceNumber}.png`}
          alt="Playing dice"
          className="dice"
        />
      )}

      {/* Botón para iniciar un nuevo juego */}
      <button className="btn btn--new" onClick={initData}>
        New game
      </button>

      {/* Botón para tirar el dado (deshabilitado si hay un ganador) */}
      <button
        className="btn btn--roll"
        onClick={throwDice}
        disabled={winner !== null}
      >
        Roll dice
      </button>

      {/* Botón para mantener la puntuación (deshabilitado si hay un ganador) */}
      <button
        className="btn btn--hold"
        onClick={holdScore}
        disabled={winner !== null}
      >
        Hold
      </button>
    </main>
  );
};

export default DiceGame;
