import { useEffect, useState } from "react";
import shuffle from "lodash.shuffle";
//import toast css
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import "./App.css";
import CorrectWordsList from "./components/CorrectWordsList";
import GameBoard from "./components/GameBoard";
import Tab from "react-bootstrap/Tab";
import { Tabs } from "react-bootstrap";
import { gameWords1, gameWords2, gameWords3 } from "./words/gameWordsConfig";
import { Word } from "./models/Word";

function App() {

  const [mistakesRemaining, setMistakesRemaining] = useState(4);
  const [words, setWords] = useState<Word[]>();
  const [selectedWords, setSelectedWords] = useState<Word[]>([]);
  const [correctWords, setCorrectWords] = useState<Word[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState("");
  const [selectedTab, setSelectedTab] = useState("game1");

  useEffect(() => {
    setWords(shuffle(gameWords1));
    setSelectedTab("game1");
  }, []);

  const handleShuffle = () => {
    setWords(shuffle(words));
  };

  const handleChangeWords = (e: string | null) => {
    if (e === "game1") {
      setWords(shuffle(gameWords1));
      setSelectedTab("game1");
    } else if (e === "game2") {
      handleRestart();
      setWords(shuffle(gameWords2));
      setSelectedTab("game2");
    } else if (e === "game3") {
      setWords(shuffle(gameWords3));
      setSelectedTab("game3");
    }
  };

  const handleDeselect = (word: Word) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(
        selectedWords.filter((selectedWord) => selectedWord !== word)
      );
    }
  };

  const checkIfWordsMatch = () => {
    const selectedWordsCategories = selectedWords.map((word) => word.category);
    const uniqueCategories = new Set(selectedWordsCategories);
    if (uniqueCategories.size === 1) {
      toast.success("Correct!");
      setCorrectWords([...correctWords, ...selectedWords]);
      setWords(words?.filter((word) => !selectedWords.includes(word)));
      setSelectedWords([]);
      if (words?.length === 4) {
        toast.success("You have completed the game!");
        setGameOver(true);
        setGameResult("won");
      }
    } else {
      setMistakesRemaining(mistakesRemaining - 1);
      toast.error("Incorrect!");
      setSelectedWords([]);
      if (mistakesRemaining === 1) {
        toast.error("Game over. You ran out of mistakes :(");
        setGameOver(true);
        setGameResult("lost");
      }
    }
  };

  const handleRestart = () => {
    setMistakesRemaining(4);
    setWords(shuffle(gameWords1));
    setSelectedWords([]);
    setCorrectWords([]);
    setGameOver(false);
    setGameResult("");
  };

  return (
    <div
      className={`vh-100 vw-100 ${
        gameResult === "won"
          ? "bg-success"
          : gameResult === "lost"
          ? "bg-danger"
          : "bg-regular"
      }`}
    >
      <div className="container h-100 d-flex flex-column align-items-center">
        {gameOver ? (
          <div
            className={`row ${
              gameResult === "won"
                ? "bg-success"
                : gameResult === "lost"
                ? "bg-danger"
                : "bg-regular"
            }`}
          >
            <div className="col-12">
              <h1 className="text-light text-center mb-4 mt-5">
                <b>
                  {gameResult === "won"
                    ? "Congratulations! You won!"
                    : " You lost :( Try again!"}
                </b>
              </h1>
              <h4 className="text-center text-light">Correct Answers:</h4>
              <CorrectWordsList
                correctWords={
                  selectedTab === "game1"
                    ? gameWords1
                    : selectedTab === "game2"
                    ? gameWords2
                    : gameWords3
                }
                bgColour="bg-dark"
                textColour="text-light"
                badgeColour="success"
              />
              <button
                className="btn btn-light btn-lg w-100"
                onClick={handleRestart}
              >
                <b>Play Again</b>
              </button>
            </div>
          </div>
        ) : (
          <div className="">
            <h1 className="text-light font-bold mt-5 text-center">
              <b>Connections </b>
            </h1>
            <h4 className="text-light mb-5 text-center">(if it was good)</h4>
            <Tabs
              defaultActiveKey="game1"
              id="justify-tab-example"
              className="mb-3"
              onSelect={(e) => handleChangeWords(e)}
              variant="pills"
              justify
            >
              <Tab eventKey="game1" title="Game 1">
                <GameBoard
                  words={words}
                  correctWords={correctWords}
                  selectedWords={selectedWords}
                  setSelectedWords={setSelectedWords}
                  handleDeselect={handleDeselect}
                  handleShuffle={handleShuffle}
                  checkIfWordsMatch={checkIfWordsMatch}
                  mistakesRemaining={mistakesRemaining}
                />
              </Tab>
              <Tab eventKey="game2" title="Game 2">
                <GameBoard
                  words={words}
                  correctWords={correctWords}
                  selectedWords={selectedWords}
                  setSelectedWords={setSelectedWords}
                  handleDeselect={handleDeselect}
                  handleShuffle={handleShuffle}
                  checkIfWordsMatch={checkIfWordsMatch}
                  mistakesRemaining={mistakesRemaining}
                />
              </Tab>
              <Tab eventKey="game3" title="Game 3">
                <GameBoard
                  words={words}
                  correctWords={correctWords}
                  selectedWords={selectedWords}
                  setSelectedWords={setSelectedWords}
                  handleDeselect={handleDeselect}
                  handleShuffle={handleShuffle}
                  checkIfWordsMatch={checkIfWordsMatch}
                  mistakesRemaining={mistakesRemaining}
                />
              </Tab>
            </Tabs>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
