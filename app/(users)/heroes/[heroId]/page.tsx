import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import HeroList from "../HeroesList";
import { Hero } from "../../../../typings/typings";

import { getHeroes, getHero, ts,hash } from "../../../utilities/heroService";
import HeroCard from "../../../../component/HeroCard";

type PageProps = {
  params: {
    heroId: string;
  };
};

// const CharactersComics = ({ comics }: PageProps) => {
//   return (
//     <div>
//       {Array.isArray(comics) &&
//         comics.map((comic) => (
//           <div key={comic.name}>{comic.name}</div>
//         ))}
//     </div>
//   );
// };

async function HeroPage({ params: { heroId } }: PageProps) {
  const hero = await getHero(heroId);

  if (!hero.id) return notFound();
  console.log(hero);

  const { name, description, thumbnail, comics } = hero;

  return (
    <div className="heroPage p-10 bg-green-200 border-2 m-2 shadow-lg">
      <h3>{name}</h3>
      <Image alt={`${name}`} src={`${thumbnail.path}.jpg`} height="250" width="200"/>
      <p>{description} </p>
      {Array.isArray(comics.items) &&
                    comics.items.map((comic) => {                    
                        return (
                          <>
                            <h3 className="font-bold my-1">Comics Featured in</h3>
                            <p key={comic.name}>{comic.name}</p>
                          </>
                        );
                      })}
    </div>
  );
}

export default HeroPage;

export async function generateStaticParams() {

  const heroes: Hero[] = await getHeroes(0);

  // this is to avoid being rate limited by the API

  const trimmedHeroes = heroes.slice(0, 20);


    return trimmedHeroes.map((hero) => ({
    //   <HeroCard params={{
    //         Hero: undefined
    //     }} key={hero.id} {...hero} />
    // ));

    heroId: hero?.id?.toString(),
}));

  }

  