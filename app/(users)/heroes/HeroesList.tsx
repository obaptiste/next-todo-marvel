import React from "react";
import Link from "next/link";
import { Hero, Heroes } from "../../../typings/typings";
import TodosList from "../todos/TodosList";
import { getHeroes } from "../../utilities/heroService";
import Image from 'next/image';

async function HeroesList() {
  let randomOffset = Math.floor(Math.random() * 15 + 20) 
  randomOffset += 20;
  const heroes = await getHeroes(randomOffset);
  console.log("heroes",randomOffset);
  return (
    <div className="heroContainer">
      {heroes && heroes.map((hero: Hero) => (
        <p key={hero.id} className="heroCard">
          <Link href={`/heroes/${hero.id}`}><span className="text-center text-green-800 font-bold">{hero.name}</span>
          <Image
          className="backdrop-grayscale-0"
            src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`}
            alt={`${hero.name}`}
            width="250" 
            height="250"
          /></Link>
          <span>{hero.description}</span>
        </p>
      ))}
    </div>
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
