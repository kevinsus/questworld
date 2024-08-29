import React from 'react';
import Link from 'next/link';

const Home = () => {
  const chapters = [
    { number: 1, title: "Introduction", concept: "Variables" },
    { number: 2, title: "The First Encounter", concept: "Variables and Simple Conditionals (if statements)" },
    { number: 3, title: "The Potion of Power", concept: "Conditionals and Variables" },
    { number: 4, title: "The Bridge of Loops", concept: "For Loops" },
    { number: 5, title: "The Green Potion and the Great Leap", concept: "While Loops and Conditionals" },
    { number: 6, title: "The Shield of Protection", concept: "If Statements and Variables" },
    { number: 7, title: "The Final Battle", concept: "Advanced Use of Loops and Conditionals" },
  ];

  return (
    <div className='min-h-screen bg-red-950 flex flex-col items-center space-y-10 px-10 p-10'>
      <div className='text-6xl font-bold mt-10 text-white'>
        Quest World
      </div>
      <div className='card-container'>
        {chapters.map((chapter) => (
          <Link href={`/chapter/${chapter.number}`} key={chapter.number}>
            <div className='card'>
              <div>Chapter - {chapter.number}</div>
              <div>
                <div className='font-bold text-xl'>{chapter.title}</div>
                <div>{chapter.concept}</div>
              </div>
              <button className='rounded-lg w-full bg-black p-2 text-white'>Play</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
