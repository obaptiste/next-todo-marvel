import Link from "next/link";
import React from "react";
import { Todo } from "../../typings";

const fetchTodo = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
  const todo = await res.json();
  return todo;
};

async function TodosList() {
  const todos = await fetchTodo();
  return (
    <>
      {todos.map((todo: Todo) => (
        <p key={todo.id}>
          <Link href={`/todos/${todo.id}`}>Todo: {todo.id}</Link>
        </p>
      ))}
    </>
  );
}

export default TodosList;
