import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import HeroList from "../HeroesList";
import { Hero } from "../../../../typings/typings";
import { Md5 } from "ts-md5";
import { getHeroes, getHero, ts,hash } from "../../../utilities/heroService";
import HeroCard from "../../../../component/HeroCard";

type PageProps = {
  params: {
    heroId: string;
  };
  comics: any[];
};

const CharactersComics = ({ comics }: PageProps) => {
  return (
    <div>
      {Array.isArray(comics) &&
        comics.map((comic) => (
          <div key={comic.name}>{comic.name}</div>
        ))}
    </div>
  );
};

async function HeroPage({ params: { heroId } }: PageProps) {
  const hero = await getHero(heroId);

  if (!hero.id) return notFound();
  console.log(hero);
  const { name, description, thumbnail, comics } = hero;

  return (
    <div className="p-10 bg-green-200 border-2 m-2 shadow-lg">
      <h3>{name}</h3>
      <Image alt={`${name}`} src={`${thumbnail.path}.jpg`} height="300" />
      <p>{description} </p>
      <h4>Character's comics</h4>
      {/* <CharactersComics comics={comics} /> */}
    </div>
  );
}

export default HeroPage;

export async function generateStaticParams() {
  const res = await fetch(
    `https://gateway.marvel.com/v1/public/characters?ts=${ts}&orderBy=name&apikey=${process.env.NEXT_PUBLIC_PUBKEY}&hash=${hash}`
  );
  const data = await res.json();
  const heroes: Hero[] = data?.data?.results ?? [];

  // this is to avoid being rate limited by the API

  const trimmedHeroes = heroes.slice(0, 10);

  function renderHeroCards() {
    if (!trimmedHeroes || !trimmedHeroes.length) {
      return null;
    }

    return trimmedHeroes.map((hero) => (
      <HeroCard params={{
            Hero: undefined
        }} key={hero.id} {...hero} />
    ));
  }

  return {
    paths: [
      {
        params: {
          heroId: "1",
        },
      },
    ],
    fallback: true,
  };
}