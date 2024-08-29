import React from 'react'

const Home = () => {
  return (
    <div className='min-h-screen bg-red-950 flex flex-col items-center space-y-10'>
      <div className='text-6xl font-bold mt-10 text-white'>
        Quest World
      </div>
      <div className='card-containers'>
        <div className='card'>
          <span>Chapter - 1</span>
          <h3>Sword</h3>
          <span>Chapter - 1</span>
        </div>
      </div>
    </div>
  )
}

export default Home