'use client'; // Ensure this is a Client Component

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import AceEditor from 'react-ace';

// Import Ace editor modes and themes
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';

const ChapterPage = () => {
  const params = useParams();
  const router = useRouter();
  const { chapter } = params;

  const [showSettings, setShowSettings] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(chapter);

  const chapterDetails = {
    1: { title: "Introduction", concept: "Variables", narrative: "You begin your journey...", objective: "Learn about variables", guidance: "Use the provided code to..." },
    2: { title: "The First Encounter", concept: "Variables and Simple Conditionals", narrative: "Your first challenge...", objective: "Use if statements", guidance: "Check the conditions..." },
    3: { title: "The Potion of Power", concept: "Conditionals and Variables", narrative: "You find a potion...", objective: "Combine variables and conditionals", guidance: "Experiment with the code..." },
    4: { title: "The Bridge of Loops", concept: "For Loops", narrative: "You must cross a bridge...", objective: "Use for loops", guidance: "Loop through the items..." },
    5: { title: "The Green Potion and the Great Leap", concept: "While Loops and Conditionals", narrative: "A green potion awaits...", objective: "Implement while loops", guidance: "Handle the loop conditions..." },
    6: { title: "The Shield of Protection", concept: "If Statements and Variables", narrative: "A shield blocks your path...", objective: "Use if statements effectively", guidance: "Protect yourself from enemies..." },
    7: { title: "The Final Battle", concept: "Advanced Use of Loops and Conditionals", narrative: "The final showdown...", objective: "Combine all concepts", guidance: "Prepare for the final test..." },
  };

  const handleChapterChange = (event) => {
    const newChapter = event.target.value;
    setSelectedChapter(newChapter);
    router.push(`/chapter/${newChapter}`); // Navigate to the new chapter
  };

  const chapterInfo = chapterDetails[selectedChapter] || chapterDetails[1]; // Default to chapter 1 if not found

  return (
    <div className='min-h-screen p-10'>
        <div className='flex flex-col md:flex-row'>
            {/* Narrative Section */}
            <div className='flex-1 p-4 bg-black rounded-lg shadow-lg'>
                <h1 className='text-2xl font-bold text-white'>{chapterInfo.title}</h1>
                <div className='mt-4'>
                    <h2 className='text-xl font-semibold text-white'>Narrative</h2>
                    <p className='text-white'>{chapterInfo.narrative}</p>
                </div>
                <div className='mt-4'>
                    <h2 className='text-xl font-semibold text-white'>Objective</h2>
                    <p className='text-white'>{chapterInfo.objective}</p>
                </div>
                <div className='mt-4'>
                    <h2 className='text-xl font-semibold text-white'>Guidance</h2>
                    <p className='text-white'>{chapterInfo.guidance}</p>
                </div>
            </div>

            {/* Inventory and Dropdown Options */}
            <div className='flex flex-col md:flex-row md:ml-4 space-y-4 md:space-y-0 md:space-x-4'>
                {/* Inventory Section */}
                <div className='bg-black p-4 rounded-lg shadow-lg flex-1'>
                    <h2 className='text-xl font-semibold text-white'>Inventory</h2>
                    <ul className='text-white'>
                    <li>Sword (1)</li>
                    <li>Red Potion (2)</li>
                    <li>Green Potion (1)</li>
                    <li>Shield (1)</li>
                    </ul>
                </div>

                {/* Dropdown and Buttons */}
                <div className='flex flex-col space-y-4'>
                    <select
                    value={selectedChapter}
                    onChange={handleChapterChange}
                    className='p-2 border text-black border-gray-300 rounded-lg'
                    >
                    {Object.keys(chapterDetails).map((chap) => (
                        <option key={chap} value={chap}>
                        Chapter {chap}
                        </option>
                    ))}
                    </select>

                    <button
                    onClick={() => setShowSettings(!showSettings)}
                    className='bg-blue-500 text-black p-2 rounded-lg'
                    >
                    Settings
                    </button>

                    <button
                    onClick={() => setShowHint(!showHint)}
                    className='bg-yellow-500 text-black p-2 rounded-lg'
                    >
                    Hint
                    </button>
                </div>
            </div>
        </div>

        {/* Coding Input and Adventurer */}
        <div className='mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4'>
            {/* Coding Input */}
            <div className='flex-1 p-4 bg-black rounded-lg shadow-lg border border-gray-700'>
                <h2 className='text-xl font-semibold text-white'>Python Coding Input</h2>
                <AceEditor
                    mode="python"
                    theme="github"
                    name="python_editor"
                    editorProps={{ $blockScrolling: true }}
                    className='w-full h-80'
                    placeholder='Write your Python code here...'
                />
            </div>

            {/* Adventurer */}
            <div className='w-full md:w-2/3 flex-shrink-0 p-4 bg-black rounded-lg shadow-lg border border-gray-700 flex items-center justify-center'>
                <div className='text-center'>
                    <h2 className='text-xl font-semibold mb-2 text-white'>Adventurer</h2>
                    <div className='w-48 h-48 bg-gray-300 rounded-full flex items-center justify-center text-black font-bold'>
                    Adventurer
                    </div>
                </div>
            </div>
        </div>

        {/* Settings Popup */}
        {showSettings && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                <div className='bg-black p-4 rounded-lg'>
                    <h2 className='text-xl font-semibold'>Settings</h2>
                    <button onClick={() => setShowSettings(false)} className='mt-4 bg-blue-500 text-white p-2 rounded-lg'>
                    Close
                    </button>
                </div>
            </div>
        )}

        {/* Hint Popup */}
        {showHint && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                <div className='bg-black p-4 rounded-lg'>
                    <h2 className='text-xl font-semibold'>Hint</h2>
                    <button onClick={() => setShowHint(false)} className='mt-4 bg-blue-500 text-white p-2 rounded-lg'>
                    Close
                    </button>
                </div>
            </div>
        )}

        {/* Back to Home Button */}
        <div className='fixed bottom-4 right-4'>
            <Link href="/" className='bg-green-500 text-white p-2 rounded-lg'>
            Back to Home
            </Link>
        </div>
    </div>
  );
};

export default ChapterPage;
