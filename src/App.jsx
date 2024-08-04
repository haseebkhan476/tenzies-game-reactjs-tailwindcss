import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  
  // States
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  function generateNewDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    }
  }

  function allNewDice() {
     const newDice = [];
     
     for(let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
     }

     return newDice;
  }


  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
              die :
              generateNewDie();
      }));
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id == id ?
            {...die, isHeld: !(die.isHeld)} :
            die;
    }));
  }

  const diceElements = dice.map(die => 
    <Die key={die.id} value={die.value} isHeld={die.isHeld} id={dice.id} holdDice={() => holdDice(die.id)} />
  );

  return (
    <main className="bg-slate-50 flex justify-center items-center h-screen">
      { tenzies && <Confetti /> }
      <div className="bg-white max-w-xl h-fit rounded-3xl shadow text-center p-14 relative overflow-hidden">
        <h1 className="mb-4 text-4xl font-bold">Tenzies</h1>
        <p className="mb-8 text-lg">Roll until all dice are the same. Click each die to freeze it at its current value betweem rolls.</p>
        <div className="w-full grid grid-cols-5 gap-y-6">
          { diceElements }
        </div>
        <button onClick={ rollDice } className="mt-14 py-3 bg-black text-white ease duration-300 rounded-full text-lg block w-full font-semibold">Roll</button>
        
        { tenzies && 
        <div className="absolute inset-0 z-10 flex flex-col justify-center items-center bg-white bg-opacity-75 backdrop-blur-md">
          <h1 className="text-4xl font-bold px-16">Fantastic! You've clinched the victory!</h1>
          <button onClick={ rollDice } className="w-fit px-20 py-4 mt-14 rounded-full bg-black text-white font-semibold">New Game!</button>
        </div>
        }
        
      </div>
    </main>
  );
}

export default App;