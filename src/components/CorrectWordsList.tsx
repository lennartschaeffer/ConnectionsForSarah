import React from 'react';
import { Stack, Badge } from 'react-bootstrap';
import { Word } from '../models/Word';

interface CorrectWordsListProps {
  correctWords: Word[];
  bgColour: string;
  textColour: string;
  badgeColour: string;
}

const CorrectWordsList: React.FC<CorrectWordsListProps> = ({ correctWords, bgColour, textColour, badgeColour }) => {
  return (
    <div className="col-12 mb-2">
      {Array.from(new Set(correctWords.map((word) => word.category))).map((category, index) => (
        <div key={index} className={`col-12 ${bgColour} rounded mb-3 p-2 overflow-auto`}>
          <h5 className={`text-center mb-4 ${textColour}`}>
            <b>{category}</b>
          </h5>
          <div className="d-flex flex-column flex-md-row justify-content-center gap-1">
            {correctWords
              .filter((word) => word.category === category)
              .map((word, wordIndex) => (
                <Badge pill bg={badgeColour} key={wordIndex} className="mb-2 mb-md-0">
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