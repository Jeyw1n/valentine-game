import { useState, useEffect } from 'react'
import './App.css'

const WINSCORE = 50;

function App() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [hearts, setHearts] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const heartInterval = setInterval(() => {
      const newHeart = {
        id: Math.random(),
        x: Math.random() * window.innerWidth,
        y: 0,
      };
      setHearts((prevHearts) => [...prevHearts, newHeart]);
    }, 300);

    return () => clearInterval(heartInterval);
  }, []);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setHearts((prevHearts) =>
        prevHearts.map((heart) => ({
          ...heart,
          y: heart.y + 5,
        }))
      );
    }, 10);
    return () => clearInterval(moveInterval);
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
     setGameOver(true);
    }
  }, [timeLeft]);

  const catchHeart = (id) => {
    setScore((prevScore) => prevScore + 1);
    setHearts((prevHearts) => prevHearts.filter((heart) => heart.id !== id));
  };

  useEffect(() => {
    if (score >= WINSCORE) {
      setGameOver(true);
    }
  }, [score]);

  return(
    <div className='App'>
      <p>Время: {timeLeft}</p>
      {gameOver ? (
        <div className='game-over'>
          <br />
          <br />
          <br />
          <br />
          <h2>{score >= WINSCORE ? "Ты выиграла мое сердце! 💖" : "Попробуй еще раз..."}</h2>
          <button onClick={() => window.location.reload()}>Играть снова</button>
        </div>
      ) : (
        <div className='game-area'>
          {hearts.map((heart) => (
            <div
              key={heart.id}
              className='heart'
              style={{ left: heart.x, top: heart.y }}
              onClick={() => catchHeart(heart.id)}
              width="42px"
              height="42px"
            >
             💖
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
