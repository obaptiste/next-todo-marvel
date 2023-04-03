import Link from "next/link";
import React from "react";
import { Todo } from "../../../typings/typings";

const fetchTodo = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
  const todo = await res.json();
  return todo;
};

async function TodosList(delayed:boolean) {
  const todos = await fetchTodo();
  const timeout = Math.floor(Math.random() * 5 + 1) * 1000;

  if (delayed = true) {
    await new Promise((resolve) => setTimeout(resolve, timeout));
  };
  
  return (
    <>
      {todos.map((todo: Todo) => (
        <p key={todo.id} className="todoCard">
          <Link href={`/todos/${todo.id}`}>Todo: {todo.id}</Link>
        </p>
      ))}
    </>
  );
}

export default TodosList;
