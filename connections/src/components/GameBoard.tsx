import React from "react";
import { toast } from "react-toastify";
import CorrectWordsList from "./CorrectWordsList";
import { Word } from "../App";
import LowerBoardComponent from "./LowerBoardComponent";
import "./GameBoard.css";


interface GameBoardProps {
  words: Word[] | undefined;
  correctWords: Word[];
  selectedWords: Word[];
  setSelectedWords: React.Dispatch<React.SetStateAction<Word[]>>;
  handleDeselect: (word: Word) => void;
  handleShuffle: () => void;
  checkIfWordsMatch: () => void;
  mistakesRemaining: number;
}

const GameBoard: React.FC<GameBoardProps> = ({
  words,
  correctWords,
  selectedWords,
  setSelectedWords,
  handleDeselect,
  handleShuffle,
  checkIfWordsMatch,
  mistakesRemaining,
}) => {
  return (
    <div className="gameBoard ">
      
      <div className="row">
        {correctWords.length > 0 ? (
          <CorrectWordsList
            correctWords={correctWords}
            bgColour="bg-success"
            textColour="text-light"
            badgeColour="dark"
          />
        ) : (
          ""
        )}
        {words?.map((word, index) => (
          <div className="col-3 mb-2" key={index}>
            <div className="card h-100">
              <div
                className="card-body d-flex justify-content-center align-items-center"
                onClick={() => {
                  if (selectedWords.includes(word)) {
                    handleDeselect(word);
                    return;
                  } else if (selectedWords.length === 4) {
                    toast.error("You can only select 4 words");
                    setSelectedWords([]);
                    return;
                  } else {
                    setSelectedWords([...selectedWords, word]);
                  }
                }}
                style={{
                  cursor: "pointer",
                  backgroundColor: selectedWords.includes(word)
                    ? "#F0BB78"
                    : "#FFF0DC",
                }}
              >
                <div className="card-text text-center w-100">
                <b>{word.word}</b>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <LowerBoardComponent
        mistakesRemaining={mistakesRemaining}
        handleShuffle={handleShuffle}
        checkIfWordsMatch={checkIfWordsMatch}
      />
    </div>
  );
};

export default GameBoard;
