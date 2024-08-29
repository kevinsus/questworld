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
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {chapters.map((chapter) => (
          <Link href={`/chapter/${chapter.number}`} key={chapter.number}>
            <div className='card bg-white p-6 rounded-lg shadow-lg cursor-pointer'>
              <span>Chapter - {chapter.number}</span>
              <h3 className='font-bold text-xl'>{chapter.title}</h3>
              <span>{chapter.concept}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
