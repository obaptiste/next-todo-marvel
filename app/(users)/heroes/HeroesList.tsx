import React from "react";
import Link from "next/link";
import { Hero, Heroes } from "../../../typings/typings";
import TodosList from "../todos/TodosList";
import { getHeroes } from "../../utilities/heroService";
import Image from 'next/image';

async function HeroesList() {
  const heroes = await getHeroes();
  console.log("heroes",heroes);
  return (
    <>
      {heroes && heroes.map((hero: Hero) => (
        <p key={hero.id} className="heroCard">
          <Link href={`/heroes/${hero.id}`}>Hero: {hero.name}</Link>
          <Image
            src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
            alt={`${hero.name}`}
            width="200" 
            height="250"
          />
          <span>{hero.description}</span>
        </p>
      ))}
    </>
  );
}

// function Todos() {
//   return (
//     <div>
//       {/* @ts-ignore */}
//       <TodosList />
//     </div>
//   );
// }

export default HeroesList;
