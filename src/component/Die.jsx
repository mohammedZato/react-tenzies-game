import React, { useState } from "react"
import { nanoid } from 'nanoid'
import DieElt from ".";
import Confetti from "react-confetti";

export default function Die() {
    const [dice, setDice] = useState(allNewDice());
    const [tenzies, setTenzies] = useState(false);
    const [count, setCount] = useState(0);

    React.useEffect(() => {
        if (dice.every(die => die.isHeld && dice[0].value === die.value)) {
            setTenzies(true)
            console.log("YOU WON");
        }
    }, [dice])

    function allNewDice() {
        const newDice = [];
        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: Math.floor(Math.random() * 6) + 1,
                isHeld: false,
                id: nanoid()
            });
        }
        return newDice
    }
    
    function holdDice(id) {
        setDice(prevOldDice => prevOldDice.map(die => {
            return die.id === id ? 
            {
                ...die,
                isHeld: !die.isHeld
            } :
            die
        }));
    }
    
    function rollDice() {
        setDice(prevOldDice => prevOldDice.map(die => {
            return die.isHeld ? die : 
            {
                value: Math.floor(Math.random() * 6) + 1,
                isHeld: false,
                id: nanoid()
            }
        }));
        setCount(prevCount => prevCount + 1);
        if (tenzies) {
            setDice(allNewDice())
            setTenzies(false)
        }
    }
    
    const diceElements = dice.map(die => {
        return <DieElt 
            value={die.value} 
            isHeld={die.isHeld}
            holdDice={holdDice}
            id={die.id}
        />
    })
    
    return (
        <main className="main-div flex flex-col justify-center items-center">
            <h1 class="font-bold text-black text-4xl">{tenzies ? "YOU WON!!" : "Tenzies"}</h1>
            {
                tenzies ? 
                    <div class="font-medium text-black text-lg mt-2">No of Die Rolls: {count}</div> : 
                    <p class="text-center p-2 text-lg text-black font-medium">Roll until all dice are the same. 
                    Click each die to freeze it at its current value between rolls.</p>
            }
            {tenzies && <Confetti />}
            <div class="grid grid-cols-5 gap-4 py-6">
                {diceElements}
            </div>
            <button onClick={rollDice} class="mt-8 mb-2 rounded-lg focus:outline-none cursor-pointer bg-sky-800 px-10 py-3 hover:bg-sky-700 hover:scale-105 transition-transform duration-700 text-white text-lg font-medium">
            {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}