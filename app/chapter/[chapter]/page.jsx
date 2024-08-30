"use client"; // Ensure this is a Client Component

import React, { useState, useEffect } from "react";
import OpenAI from "openai";
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
  const [avatar, setAvatar] = useState("male")

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      let avatarType = localStorage.getItem('avatar');
      setAvatar(avatarType)
    }
  }, []);
  
  const handleAvatarChange = (event) => {
    setAvatar(event.target.value)
    localStorage.setItem("avatar", event.target.value)
  }

  const handleBackNarrative = () => {
    setNarrativeIndex(narrativeIndex - 1)
  }

  const handleNextNarrative = () => {
    setNarrativeIndex(narrativeIndex + 1)
  }

  const solutions = [
    ["character = Bob", "character = Gia", "character = Nua"],
    ["if has_sword and has_shield: attack_demon()"],
    ["for step in range(4): move_right()", "position = 1 while position < 5: move_right() position += 1"],
  ]

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
    narrative: [
      "Ah, brave adventurer! You have come a long way, but the challenges ahead are even greater. The demon before you is stronger than any you have faced. To defeat it, you must learn to use the power of conditions—specifically, the 'if' statement. Only with the proper equipment and knowledge can you hope to succeed.",
      "In this chapter, you must master the use of the 'if' statement. This powerful tool allows you to make decisions in your code, guiding your actions based on certain conditions. To defeat the demon, you must check if you have both a sword and a shield. Without these, you will not survive the encounter",
      "Here's how the 'if' statement works in Python: `if has_sword and has_shield: attack_demon()`",
      "Let me break it down for you. In this example, has_sword and has_shield are variables that represent whether you have a sword and a shield. These could be set to True or False.",
      "The line if has_sword and has_shield: checks if both conditions are met. The and keyword means both must be true for the code inside the 'if' block to run. If you have both a sword and a shield, the function attack_demon() is executed, allowing you to defeat the demon."
    ],
    objective: "Use if statements",
  },
  3: {
    title: "The Bridge of Loops",
    concept: "For / While Loops",
    narrative: 
      [
        "Greetings, brave adventurer! I see you have made it far on your journey to protect our world. Ahead lies a demon that threatens our lands, and it is up to you to vanquish it. But fear not, for I will guide you on how to harness the power of loops to reach and defeat the demon.",
        "For this challenge, you must learn to move with precision and purpose. Your task is to travel from your starting position at (1, 1) to the demon’s position at (1, 5). To do this efficiently, we will use something called a 'loop'.",
        "A loop is a powerful tool that allows you to repeat a set of instructions multiple times, which is essential when you need to perform the same action repeatedly. Let me show you two types of loops that will be helpful for your journey: the 'for' loop and the 'while' loop.",
        "The 'for' loop is perfect when you know exactly how many times you need to repeat an action. For example, if you know you need to move 4 steps to reach the demon, you can use a 'for' loop to do this. For example `for step in range(4): move_right()`",
        "This tells your code: 'Move to the right 4 times.' Simple, right? The 'for' loop counts the steps for you, starting at 0 and stopping before 4, which gives us 4 movements in total. Each time, it executes the command move_right().",
        "The 'while' loop is a bit different. It's used when you want to keep doing something until a certain condition is no longer true. For example, you can keep moving right until you reach the demon. Here's how you could do it.",
        "Intialise  a variable with starting value 1, for example `position = 1`. Next, is which we used ‘while’ : `while position < 5: move_right() position += 1`",
        "This loop says: 'As long as my position is less than 5, keep moving right.' Each time you move right, you also increase your position by 1. Once your position reaches 5, the loop stops because the condition position < 5 is no longer true.",
        "Now try to do it you self in the code input box below."
      ],
      objective: "Use for loops or while loop"
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
      shield: true,
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

  const hints = [
    "Try selecting the characters by typing: character = Bob",
    "Type this answer `if has_sword and has_shield: attack_demon()`",
    "Type this answer `for step in range(4): move_right()` or `position = 1 while position < 5: move_right() position += 1`",
    "A while loop is a ...",
    "A while loop is a ...",
    "A while loop is a ...",
  ]

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
                src={`/images/${avatar === "female" ? "femaleAdventurer" : avatar === "male" ? "adventurer" : "demon"}.png`}
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

  // Open AI for validation
  const [validation, setValidation] = useState(null);
  const [popUpValidation, setPopUpValidation] = useState(false);
  const [reasoning, setReasoning] = useState("")

  const handleTryAgain = () => {
    setValidation(null)
    setPopUpValidation(false)
  }

  const handleNextQuestion = () => {
    setValidation(null)
    setPopUpValidation(false)
  }

  const validate = (solution, answer) => {
    if (solution.includes(answer)) {
      return true
    } else {
      return false
    }
  }

  const validateAnswer = async () => {
    const result = validate(solutions[selectedChapter - 1], codeInput)
    setValidation(result);
    try {
      const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `The answer is :, now give an explaination about ${chapterDetails[selectedChapter].objective} and the correlation with the answer in 60 words`
          },
        ],
      });
      
      const reasoning_ai = completion.choices[0].message.content.trim();
      setReasoning(reasoning_ai)
      setPopUpValidation(true)
    } catch (error) {
      console.error("Error occurred during validation:", error);
      setValidation(null);
    }
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
          <div className="flex justify-between mb-3">
            <h2 className="text-xl font-semibold text-white">
              Python Coding Input
            </h2>
            <button className="button bg-green-700 p-1 px-4" onClick={validateAnswer}>Submit</button>
          </div>
          <AceEditor
            mode="python"
            theme="github"
            name="python_editor"
            editorProps={{ $blockScrolling: true }}
            className="flex-1"
            placeholder="Write your Python code here..."
            onChange={(codeInput) => setCodeInput(codeInput)}
            value={codeInput}
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
            <div className="bg-white p-10 text-black">
                Avatar:
                <select
                value={avatar}
                onChange={handleAvatarChange}
                className="p-2 border text-black border-gray-300 rounded-lg"
                >
                    <option key={"femaleAdventurer"} value={"female"}>
                        Female
                    </option>
                    <option key={"Adventurer"} value={"male"}>
                        Male
                    </option>
                    <option key={"demon"} value={"demon"}>
                        Demon
                    </option>
                </select>
            </div>
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
            <div className="bg-white p-10 text-black">
              <p>{hints[selectedChapter - 1]}</p>
            </div>
            <button
              onClick={() => setShowHint(false)}
              className="mt-4 bg-blue-500 text-white p-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Validation Popup */}
      {popUpValidation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="p-4 rounded-lg relative">
            {validation ? (
              <div className="bg-white p-10 text-black rounded-2xl px-10 w-[40rem] h-[22rem]">
                <h2 className="text-3xl font-semibold mb-2">Correct!</h2>
                
                {/* reasoning */}
                <h2 className="text-xl font-semibold mb-2">Reasoning:</h2>
                <p>{reasoning}</p>

                <Link href={`/chapter/${parseInt(selectedChapter) + 1}`} onClick={handleNextQuestion} className="absolute bottom-10 bg-blue-500 text-white p-2 rounded-lg">Next Question</Link>
              </div>
            ) : (
              <div className="bg-white p-10 text-black rounded-2xl px-10 w-[40rem] h-[22rem]">
                <h2 className="text-xl font-semibold mb-2">Incorrect!</h2>

                {/* reasoning */}
                <h2 className="text-xl font-semibold mb-2">Reasoning:</h2>
                <p>{reasoning}</p>

                <button className="mt-4 bg-blue-500 text-white p-2 rounded-lg absolute bottom-10" onClick={handleTryAgain}>Try again</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterPage;
