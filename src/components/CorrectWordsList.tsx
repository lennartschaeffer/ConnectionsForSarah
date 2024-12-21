import React from "react";
import { Badge } from "react-bootstrap";
import { Word } from "../models/Word";

interface CorrectWordsListProps {
  correctWords: Word[];
  textColour: string;
}

const getBgColor = (difficulty: number) => {
  switch (difficulty) {
    case 1:
      return "bg-info";
    case 2:
      return "bg-primary";
    case 3:
      return "bg-warning";
    case 4:
      return "bg-dark";
    default:
      return "bg-secondary";
  }
};

const CorrectWordsList: React.FC<CorrectWordsListProps> = ({
  correctWords,
  textColour,
}) => {
  const sortedCategories = Array.from(
    new Set(correctWords.map((word) => word.category))
  )
    .map((category) => ({
      category,
      difficulty:
        correctWords.find((word) => word.category === category)?.difficulty ||
        0,
    }))
    .sort((a, b) => a.difficulty - b.difficulty);

  return (
    <div className="col-12 mb-2">
      {sortedCategories.map(({ category, difficulty }, index) => (
        <div
          key={index}
          className={`col-12 ${getBgColor(
            difficulty
          )} rounded mb-3 p-2 overflow-auto`}
        >
          <h5 className={`text-center mb-4 ${textColour}`}>
            <b>{category}</b>
          </h5>
          <div className="d-flex flex-column flex-md-row justify-content-center gap-2">
            {correctWords
              .filter((word) => word.category === category)
              .map((word, wordIndex) => (
                <Badge
                  pill
                  bg={difficulty === 4 ? "light" : "dark"}
                  key={wordIndex}
                  className="mb-2 mb-md-0"
                  style={{ color: difficulty === 4 ? "black" : "white" }}
                >
                  {word.word}
                </Badge>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CorrectWordsList;
