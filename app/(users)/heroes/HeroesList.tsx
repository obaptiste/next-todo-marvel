import React, { Fragment } from "react";
import Link from "next/link";
import {
  Hero,
  HeroesResult,
  ComicsResult,
  HeroResult,
  Heroes,
  ComicResult,
} from "../../../typings/typings";
import { getHeroes, getAllComics } from "../../utilities/heroService";

async function HeroesList() {
  const heroesData = await getHeroes();
  const comicsData = await getAllComics();

  const [heroes, comics] = await Promise.all([heroesData, comicsData]);



  return (
    <>
      {heroes &&
        heroes.map(async (hero, index) => (
          <div key={index} className="heroCardInner">
            <Link href={`/heroes/${(await hero).id}`}>
              <p>{(await hero).name}</p>
              <p>{(await hero).description}</p>
            </Link>
            <>
              <h3>Comics featured in..</h3>
              
            </>
          </div>
        ))}
    </>
  );
}

export default HeroesList;
