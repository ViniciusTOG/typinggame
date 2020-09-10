import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const textBoxRef = useRef(null);
  const textBoxRef2 = useRef(null);

  function handleChange(e) {
    const { value } = e.target;
    setText(value);
  }

  function calculateWordCount(text) {
    const wordsArr = text.trim().split(" ");
    return wordsArr.filter((word) => word !== "").length;
  }

  function startGame() {
    if (timeRemaining > 0) {
      setIsTimeRunning(true);
      setText("");
      textBoxRef.current.disabled = false;
      textBoxRef.current.focus();
    } else {
      alert("You need to set the time");
      textBoxRef2.current.focus();
    }
  }

  function endGame() {
    setWordCount(calculateWordCount(text));
    setTimeRemaining(30);
    setIsTimeRunning(false);
    return wordCount;
  }

  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsTimeRunning(false);
    }
  }, [timeRemaining, isTimeRunning]);

  return (
    <div>
      <h1>How fast do you type?</h1>
      <textarea
        ref={textBoxRef}
        onChange={handleChange}
        value={text}
        disabled={!isTimeRunning}
      />
      <h4>
        Time remaining:{" "}
        <input
          value={timeRemaining}
          ref={textBoxRef2}
          disabled={isTimeRunning}
          onChange={(e) => {
            setTimeRemaining(e.target.value);
          }}
        />
      </h4>
      <button onClick={startGame} disabled={isTimeRunning}>
        Start
      </button>
      <h1>Word count: {timeRemaining === 0 ? endGame() : wordCount}</h1>
      <p>Created by Vinícius Torrubia</p>
    </div>
  );
}

export default App;
