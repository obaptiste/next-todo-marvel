import { notFound } from "next/navigation";
import React from "react";
import { Md5 } from "ts-md5";
import { Hero, HeroResult, HeroesResult, ComicsResult, Heroes } from "../../typings/typings";



type PageProps = {
  params: {
    heroId: string;
    offset?:number;
    options?:{
      key:string,
      value:any
    } 
  getHeroes:() => Promise<Heroes>;
  getHero: () => Promise<HeroResult>;
};
}

export const ts = Date.now();
export const hash = Md5.hashStr(
  `${ts}${process.env.PVTKEY}${process.env.NEXT_PUBLIC_PUBKEY}`
);

let randomOffset = Math.floor(Math.random() * 250) 


    export async function getHeroes(offset?: number, options?:{}) {
  if (!offset)
    offset = randomOffset;


  const res = await fetch(
    `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${process.env.NEXT_PUBLIC_PUBKEY}&hash=${hash}&offset=${offset}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch heroes");
  }

  const data = await res.json();
  const heroes = data?.data?.results;
  return heroes;
}

  export const getHero = async (heroId: string) => {
    const res = await fetch(
      `https://gateway.marvel.com/v1/public/characters/${heroId}?ts=${ts}&apikey=${process.env.NEXT_PUBLIC_PUBKEY}&hash=${hash}`,
      {
      next: {
        revalidate:25,
      },
    });
    
    if (!res.ok) {
      throw new Error("Failed to fetch a single hero");
    }

    const data = await res.json();
    const hero: Hero = data?.data?.results[0];
    console.log("hero",hero)
    return hero;
  };


  export async function getRandomHero() {
  const res = await fetch(
    `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${process.env.NEXT_PUBLIC_PUBKEY}&hash=${hash}&offset=${randomOffset}`,
    {next : {revalidate: 20}}
  );

  if (!res.ok) {
    throw new Error("Failed to fetch heroes");
  }

  const data = await res.json();
  const heroes = data?.data?.results;
  const heroIndex = heroes.length;
  const randomHeroIndex = Math.floor(Math.random() * heroIndex);
  return heroes[randomHeroIndex];
}

  export const getComics = async (heroId: string): Promise<ComicsResult> => {
    const res = await fetch(`https://gateway.marvel.com/v1/public/characters/${heroId}/comics`);
    if (!res.ok){
        throw new Error(`Failed to get comic books for ${heroId}`, onmessage= notFound())
    }
    const data = await res.json();
    const comics = data?.data;
    return comics;
  };

  export const getAllComics = async (): Promise<ComicsResult> => {
    const res = await fetch(`https://gateway.marvel.com/v1/public/comics`);
    if (!res.ok){
        throw new Error("Failed to get comic books", onmessage= notFound())
    }
    const data = await res.json();
    const [{items}] = data?.data;
    return items;
  };

export default {getHero, getHeroes, getRandomHero, getComics, getAllComics};
