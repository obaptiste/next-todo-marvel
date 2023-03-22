import Link from 'next/link';
import React from 'react'
import {Todo} from "../../../typings";



type PageProps = {
    params: {
      todoId: string;
    };
  }
  
  // export type Todo = {
  //   userId: number;
  //   id: number;
  //   title: string;
  //   completed: boolean;
  // };
  
  
  const fetchTodos = async (todoId:string) => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos${todoId}`, {next: {revalidate: 60 } })
      const todo = await res.json();
      console.log('this is a server component', todo);
      return todo;
  };
  
  async function TodoPage({params: {todoId}}: PageProps) {
    const todo = await fetchTodos(todoId);
    return (
      <div className="p-10 bg-slate-100 border-2 m-2 shadow-lg">
        <p>
          #{todo.id}: {todo.title}
        </p>
        <p>Completed: {todo.completed ? "Yes": "No"}</p>
  
        <p className="border-t border-black mt-5 text-right">
          By User: {todo.userId}
        </p>
  
      </div>
  
    )
  
  }
  
  export default TodoPage;
  
  export async function generateStaticParams() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos${todoId}");
    const todos: Todo[] = await res.json();

    return todos.map(todo => ({
        todoId: todo.id.toString(),
    }))
  }
  
  