"use client"; // Ensure this is a Client Component

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import AceEditor from "react-ace";

// Import Ace editor modes and themes
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";

const ChapterPage = () => {
  const params = useParams();
  const router = useRouter();
  const { chapter } = params;

  const [showSettings, setShowSettings] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(chapter);
  const [narrativeIndex, setNarrativeIndex] = useState(0)
  const [codeInput, setCodeInput] = useState("");

  const handleBackNarrative = () => {
    setNarrativeIndex(narrativeIndex - 1)
  }

  const handleNextNarrative = () => {
    setNarrativeIndex(narrativeIndex + 1)
  }

  const handleCodeInput = (event) => {
    setCodeInput(event.target.value)
    console.log(selectedChapter)
    if (selectedChapter == 1) {
        localStorage.setItem("code", codeInput)
    }
  }

  const chapterDetails = {
    1: {
      title: "Introduction",
      concept: "Variables",
      narrative:
        [
          "Welcome to Quest World, brave hero! Your mission is to defeat the ultimate boss and bring peace to our land. But to do that, you'll need to grow stronger, gather powerful items such as swords, shields and potions. My name is Chris and I'll be by your side, helping you understand the magic of coding that will make you unstoppable. Now lets first pick your character!",
          "The objective of this chapter is to learn about variables. Let's start by picking the characters you want! First you need to initialize a variable and assign it to the characters you want! Start by typing: character = \"Bob\". Feel free to choose these different characters: Bob, Gia, and Nua",
        ],
      objective: "Learn about variables",
      guidance:
        "First you need to initialize a variable and assign it to the characters you want!",
    },
    2: {
      title: "The First Encounter",
      concept: "Variables and Simple Conditionals",
      narrative: "Your first challenge...",
      objective: "Use if statements",
      guidance: "Check the conditions...",
    },
    3: {
      title: "The Potion of Power",
      concept: "Conditionals and Variables",
      narrative: "You find a potion...",
      objective: "Combine variables and conditionals",
      guidance: "Experiment with the code...",
    },
    4: {
      title: "The Bridge of Loops",
      concept: "For Loops",
      narrative: "You must cross a bridge...",
      objective: "Use for loops",
      guidance: "Loop through the items...",
    },
    5: {
      title: "The Green Potion and the Great Leap",
      concept: "While Loops and Conditionals",
      narrative: "A green potion awaits...",
      objective: "Implement while loops",
      guidance: "Handle the loop conditions...",
    },
    6: {
      title: "The Shield of Protection",
      concept: "If Statements and Variables",
      narrative: "A shield blocks your path...",
      objective: "Use if statements effectively",
      guidance: "Protect yourself from enemies...",
    },
    7: {
      title: "The Final Battle",
      concept: "Advanced Use of Loops and Conditionals",
      narrative: "The final showdown...",
      objective: "Combine all concepts",
      guidance: "Prepare for the final test...",
    },
  };

  const environments = {
    1: {
      rowSize: 1,
      colSize: 2,
      sword: false,
      redPotion: 0,
      greenPotion: 0,
      shield: false,
      demons: { row: 0, col: 0, death: false },
      adventurer: { startRow: 1, startCol: 1 },
    },
    2: {
      rowSize: 1,
      colSize: 2,
      sword: true,
      redPotion: 0,
      greenPotion: 0,
      shield: false,
      demons: { row: 1, col: 2, death: false },
      adventurer: { startRow: 1, startCol: 1 },
    },
    3: {
      rowSize: 1,
      colSize: 5,
      sword: true,
      redPotion: 0,
      greenPotion: 0,
      shield: false,
      demons: { row: 1, col: 5, death: false },
      adventurer: { startRow: 1, startCol: 1 },
    },
    4: {
      rowSize: 5,
      colSize: 5,
      sword: true,
      redPotion: 0,
      greenPotion: 0,
      shield: false,
      demons: { row: 1, col: 2, death: false },
      adventurer: { startRow: 1, startCol: 1 },
    },
    5: {
      rowSize: 1,
      colSize: 2,
      sword: true,
      redPotion: 0,
      greenPotion: 0,
      shield: false,
      demons: { row: 1, col: 2, death: false },
      adventurer: { startRow: 1, startCol: 1 },
    },
  };

  const handleChapterChange = (event) => {
    const newChapter = event.target.value;
    setSelectedChapter(newChapter);
    router.push(`/chapter/${newChapter}`); // Navigate to the new chapter
  };

  const chapterInfo = chapterDetails[selectedChapter] || chapterDetails[1]; // Default to chapter 1 if not found
  const environment = environments[selectedChapter] || environments[1];

  // Generate grid based on environment size
  const generateGrid = () => {
    let grid = [];
    for (let row = 1; row <= environment.rowSize; row++) {
      let rowCells = [];
      for (let col = 1; col <= environment.colSize; col++) {
        let cellContent = null;

        // Check for adventurer position
        if (
          environment.adventurer.startRow === row &&
          environment.adventurer.startCol === col
        ) {
          cellContent = (
            // <img
            //   src="/images/adventurer.png"
            //   alt="Adventurer"
            //   className="w-full h-auto"
            // />
            <img
              src={`/images/${"femaleAdventurer" || "adventurer" || "demon"}.png`}
              alt="Adventurer"
              className="w-full h-auto"
            />
          );
        }

        // Check for demon position
        if (
          environment.demons.row === row &&
          environment.demons.col === col &&
          !environment.demons.death
        ) {
          cellContent = (
            <img
              src="/images/demon.png"
              alt="Demon"
              className="w-full h-auto"
            />
          );
        }

        // Add cell to row
        rowCells.push(
          <div
            key={`${row}-${col}`}
            className="border border-gray-700 p-2 w-[100px] h-[100px] flex items-center justify-center"
          >
            {cellContent}
          </div>
        );
      }
      // Add row to grid
      grid.push(
        <div key={`row-${row}`} className="flex">
          {rowCells}
        </div>
      );
    }
    return grid;
  };

  return (
    <div className="min-h-screen p-10">
      <div className="flex flex-col md:flex-row">
        {/* Narrative Section with NPC Image */}
        <div className="flex-1 p-4 bg-black rounded-lg shadow-lg flex">
          <div className="flex-shrink-0 w-2/12 pr-4 flex items-center">
            <img
              src="/images/sam.png"
              alt="NPC"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="flex-1 space-y-2 h-48 relative">
            {/* <h1 className="text-2xl font-bold text-white">
              {chapterInfo.title}
            </h1> */}
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-white">Narrative</h2>
              <p className="text-white">{chapterInfo.narrative[narrativeIndex]}</p>
            </div>
            <div className="flex gap-2 absolute bottom-1">
              {narrativeIndex > 0 && (
                <button className="button bg-blue-700 px-6 py-1" onClick={handleBackNarrative}>Back</button>
              )}
              {narrativeIndex < chapterInfo.narrative.length - 1 && (
                <button className="button bg-blue-700 px-6 py-1" onClick={handleNextNarrative}>Next</button>
              )}
            </div>
          </div>
        </div>

        {/* Inventory and Dropdown Options */}
        <div className="flex flex-col md:flex-row md:ml-4 space-y-4 md:space-y-0 md:space-x-4 w-4/12">
          {/* Inventory Section */}
          <div className="bg-black p-4 rounded-lg shadow-lg flex-1">
            <h2 className="text-xl font-semibold text-white">Inventory</h2>
            <ul className="text-white">
              {environment.sword && <li>Sword (1)</li>}
              {environment.redPotion > 0 && (
                <li>Red Potion ({environment.redPotion})</li>
              )}
              {environment.greenPotion > 0 && (
                <li>Green Potion ({environment.greenPotion})</li>
              )}
              {environment.shield && <li>Shield (1)</li>}
            </ul>
          </div>

          {/* Dropdown and Buttons */}
          <div className="flex flex-col space-y-4">
            <select
              value={selectedChapter}
              onChange={handleChapterChange}
              className="p-2 border text-black border-gray-300 rounded-lg"
            >
              {Object.keys(chapterDetails).map((chap) => (
                <option key={chap} value={chap}>
                  Chapter {chap}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className="button bg-blue-700 p-2"
            >
              Settings
            </button>

            <button
              onClick={() => setShowHint(!showHint)}
              className="button bg-orange-700 p-2"
            >
              Hint
            </button>

            {/* Back to Home Button */}
            <Link href="/" className="button p-2 bg-green-700">
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Coding Input and Adventurer */}
      <div className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        {/* Coding Input */}
        <div className="flex-1 p-4 bg-black rounded-lg shadow-lg border border-gray-700 h-[19rem] flex flex-col">
          <h2 className="text-xl font-semibold text-white">
            Python Coding Input
          </h2>
          <AceEditor
            mode="python"
            theme="github"
            name="python_editor"
            editorProps={{ $blockScrolling: true }}
            className="flex-1"
            placeholder="Write your Python code here..."
            onChange={handleCodeInput}
            value={newValue}
          />
        </div>

        {/* Adventurer Grid */}
        <div className="md:w-7/12 flex-shrink-0 p-4 bg-black rounded-lg shadow-lg border border-gray-700">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2 text-white">
              Adventurer
            </h2>
            <div className="w-full bg-gray-300 rounded flex flex-col items-center justify-center">
              {generateGrid()}
            </div>
          </div>
        </div>
      </div>

      {/* Settings Popup */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-black p-4 rounded-lg">
            <h2 className="text-xl font-semibold">Settings</h2>
            <button
              onClick={() => setShowSettings(false)}
              className="mt-4 bg-blue-500 text-white p-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Hint Popup */}
      {showHint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-black p-4 rounded-lg">
            <h2 className="text-xl font-semibold">Hint</h2>
            <button
              onClick={() => setShowHint(false)}
              className="mt-4 bg-blue-500 text-white p-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterPage;
