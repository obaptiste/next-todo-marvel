import React, { Suspense } from 'react'
import TodoList from './(users)/todos/TodosList';

function Home() {
  return (
    <div id="todoContainer" className="flex frog flex-col space-y-10">

     <Suspense fallback={<p className="text-red-500">Loading the Todos...</p>}>
    
    <div className="flex space-x-2">
      {/* @ts-ignore */}
      <TodoList/>
    </div>
    </Suspense>

<Suspense fallback={<p className="text-blue-500">Loading the Shopping Trolly...</p>}>
    <div className="flex space-x-2">
      
    {/* @ts-ignore */}
    <TodoList delayed/>
    </div>
    </Suspense>
    </div>
  )
}

export default Home