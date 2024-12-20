import React from "react";
import { FaRegCircle } from "react-icons/fa";

type LowerBoardComponentProps = {
  mistakesRemaining: number;
    handleShuffle: () => void;
    checkIfWordsMatch: () => void;
};

const LowerBoardComponent: React.FC<LowerBoardComponentProps> = ({
  mistakesRemaining,
  handleShuffle,
  checkIfWordsMatch,
}) => {
  return (
    <div className="row w-100 p-3" style={{backgroundColor: "#432E54"}}>
      <div className="col-12 d-flex justify-content-center align-items-center gap-2">
        <p className="text-light m-0">Mistakes Remaining:</p>
        {Array.from({ length: mistakesRemaining }).map((_, index) => (
          <FaRegCircle key={index} className="text-danger" />
        ))}
      </div>
      <div className="col-12 d-flex justify-content-center gap-2 mt-4">
        <button
          className="btn btn-outline-success btn-lg"
          onClick={checkIfWordsMatch}
        >
          Submit
        </button>
        <button
          className="btn btn-outline-primary btn-lg"
          onClick={handleShuffle}
        >
          Shuffle
        </button>
      </div>
    </div>
  );
};

export default LowerBoardComponent;
