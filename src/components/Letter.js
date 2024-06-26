import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

function Letter({ letterPos, attemptVal }) {
  const { board, setDisabledLetters, currAttempt, correctWord } =
    useContext(AppContext);


  const letter = board[attemptVal][letterPos];
  const correct = correctWord.toUpperCase()[letterPos] === letter;
  const almost =
    !correct && letter !== "" && correctWord.toUpperCase().includes(letter);
  let almost2=false; //whether to be yellow depending on count of same letter
    if (almost){
      let countCorrect=0;
      let countCurr=0;
      let correctPos=0;
      for (let i=0;i<5;i++){
        let ch=correctWord.charAt(i);
        if (ch.toUpperCase()===letter) {countCorrect++; // count of current letter in correct word
        if (ch.toUpperCase()===board[attemptVal][i]) correctPos++;}
      }
      for (let i=0;i<=letterPos;i++){
        let ch=board[attemptVal][i];
        if (ch.toUpperCase()===letter) countCurr++; //count of current letter in current word
      }

      if (countCurr<=countCorrect-correctPos) almost2=true;

    }
  const letterState =
    currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost2 ? "almost" : "error");

  useEffect(() => {
    if (letter !== "" && !correct && !almost && !almost2) {
      console.log(letter);
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [currAttempt.attempt]);
  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
}

export default Letter;
