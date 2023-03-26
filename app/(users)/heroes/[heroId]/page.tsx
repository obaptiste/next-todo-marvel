import React from 'react';
import { Todo } from '../../../../typings';
import { notFound } from "next/navigation";
import Image from 'next/image';
import TodoList from "../../../(users)/todos/TodosList";
import {Hero} from "../../../../typings";

type PageProps = {
    params: {
        heroId?: string;
    };
};

const callHeroes = async () => {
    const res = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&nameStartsWith=${searchTerm}&orderBy=name&apikey=${process.env.NEXT_PUBLIC_PUBKEY}&hash=${hash}`);
    const data = await res.json();
    return data?.data;
};

async function HeroPage() {
    const heroes = await callHeroes();

    if(!heroes.empty) return notFound();
    console.log(heroes)
    
  return (
    <div className="p-10 bg-yellow-200 border-2 m-2 shadow-lg">
        <p>#{heroes}: {heroes.map((hero:Hero) => {
            <><h3>{hero.name}</h3><Image alt={hero.name} src={hero.image}>{hero.image}</Image></>
        })}</p>
        <p>Completed: {heroes.completed ? "Yes": "No"}</p>
      <p className="border-t border-black mt-5 text-right">
        By User: {heroes.userId}
        </p>
    </div>

  );
}

export default HeroPage

export async function generateStaticParams() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/");
    const todos: Todo[] = await res.json();

    // this is to avoid being rate limited by the API

    const trimmedTodos = todos.slice(0, 10);

    return trimmedTodos.map((todo) => ({
        todoId: todo.id.toString(),
    }));;
}