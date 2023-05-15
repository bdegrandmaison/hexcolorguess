import { useEffect, useState } from "react";
import "./App.css";

const hexDigitsArray = [...Array(10).keys()].map(String).concat([..."ABCDEF"]);
function getRandomDigit() {
  return hexDigitsArray[Math.floor(Math.random() * hexDigitsArray.length)];
}

function getRandomColor() {
  return `#${Array(6).fill(0).map(getRandomDigit).join("")}`;
}

function shuffleArray(array: string[]) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function App() {
  const [gameColor, setGameColor] = useState("");
  const [gameColorsArray, setGameColorsArray] = useState<string[]>([]);
  const [gameMessage, setGameMessage] = useState("");

  function colorSelect() {
    const newGameColor = getRandomColor();
    setGameColor(newGameColor);

    const newGameColorsArray = [
      newGameColor,
      getRandomColor(),
      getRandomColor(),
    ];
    setGameColorsArray(shuffleArray(newGameColorsArray));
  }

  useEffect(() => {
    if (!gameMessage || gameMessage === "Bravo !") {
      colorSelect();
    }
  }, [gameMessage]);

  return (
    <>
      <div id="color-display" style={{ backgroundColor: gameColor }}></div>
      <div id="button-container">
        {gameColorsArray.map((colorString) => (
          <button
            key={colorString}
            onClick={() => {
              if (colorString === gameColor) {
                setGameMessage("Bravo !");
                colorSelect();
              } else {
                setGameMessage("Oops !");
              }
            }}
          >
            {colorString}
          </button>
        ))}
      </div>
      <p>{gameMessage}</p>
    </>
  );
}

export default App;
