import { notFound } from "next/navigation";
import React from "react";
import { Md5 } from "ts-md5";
import { formatWithOptions } from "util";
import { Hero, HeroResult, HeroesResult, ComicsResult } from "../../typings/typings";



type PageProps = {
  params?: {
    heroId: string;
 
  getHeroes:() => Promise<HeroesResult>;
  getHero: () => Promise<HeroResult>;
};
}

const ts = Date.now();
const hash = Md5.hashStr(
  `${ts}${process.env.PVTKEY}${process.env.NEXT_PUBLIC_PUBKEY}`
);

// export function HeroService(params?:PageProps) {

    export const getHeroes = async ():Promise<HeroesResult> => {
    const res = await fetch(
      `https://gateway.marvel.com/v1/public/characters/?ts=${ts}&orderBy=name&apikey=${process.env.NEXT_PUBLIC_PUBKEY}&hash=${hash}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch heroes", onmessage = notFound());
    }

    const data = await res.json();
    const heroes = data?.data;
    return heroes;
  };

  export const getHero = async (heroId: string):Promise<HeroResult> => {
    const res = await fetch(
      `https://gateway.marvel.com/v1/public/characters/${heroId}?ts=${ts}&orderBy=name&apikey=${process.env.NEXT_PUBLIC_PUBKEY}&hash=${hash}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch a single hero", onmessage = notFound());
    }

    const data = await res.json();
    const hero: Hero = data?.data;
    return hero;
  };

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

export default {getHero, getHeroes, getComics, getAllComics};
