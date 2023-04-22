import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import HeroList from "../HeroesList";
import { Hero } from "../../../../typings/typings";

import { getHeroes, getHero } from "../../../utilities/heroService";
import HeroCard from "../../../../component/HeroCard";

type PageProps = {
  params: {
    heroId: string;
  };
};

async function HeroPage({ params: { heroId } }: PageProps) {
  const hero = await getHero(heroId);
  const { id, name, description, thumbnail, comics } = hero;

  if (!id) {
    return notFound();
  }

  const renderComics = () => {
    return (
      <>
        {comics.items.map((comic) => (
          <p key={comic.name}>{comic.name}</p>
        ))}
      </>
    );
  };

  return (
    <div className="heroPage p-10 bg-green-200 border-2 m-2 shadow-lg">
      <h3 className="text-center font-bold">{name}</h3>
      <Image
        className="heroImage"
        alt={`${name}`}
        src={`${thumbnail.path}.jpg`}
        height="250"
        width="200"
      />
      <p>{description} </p>
      <h4 className="font-bold my-1">Comics Featured in</h4>
      <div className="comicsContainer">
        {Array.isArray(comics.items) && renderComics()}
      </div>
    </div>
  );
}

export default HeroPage;

export async function generateStaticParams() {
  const heroes: [Hero] = await getHeroes();

  const trimmedHeroes = heroes.slice(0, 20);

  const staticHeroParams = trimmedHeroes.map((hero) => ({
    params: {
      heroId: hero?.id?.toString(),
    },
  }));

  return staticHeroParams;
}
