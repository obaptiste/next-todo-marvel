import React from 'react';
import { notFound } from "next/navigation";
import Image from 'next/image';
import HeroList from "../HeroesList";
import {Hero} from "../../../../typings/typings";
import {Md5} from 'ts-md5'
// import Comics from './comics'


type PageProps = {
    params: {
        heroId: string;
    };
};

const ts = Date.now();
const hash = Md5.hashStr(`${ts}${process.env.PVTKEY}${process.env.NEXT_PUBLIC_PUBKEY}`); 


const getHero = async (heroId:string) => {
    const res = await fetch(`https://gateway.marvel.com/v1/public/characters/${heroId}?ts=${ts}&orderBy=name&apikey=${process.env.NEXT_PUBLIC_PUBKEY}&hash=${hash}`);
    
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    const data = await res.json();
    const hero: Hero = data?.data;
    return hero
};

async function HeroPage({params: {heroId}}: PageProps) {
    const hero = await getHero(heroId);

    if(!hero) return notFound();
    console.log(hero)
    const {name, description, thumbnail, comics} = hero;
    
  return (
    <div className="p-10 bg-green-200 border-2 m-2 shadow-lg">
        <p>
            <h3>{name}</h3>
            <Image alt={`${name}`} src={`${thumbnail.path}.jpg`} height="300" />
       </p>
        <p>{description} </p>
        <h4>Character's comics</h4>
        <p>{Array.isArray(comics) && comics.map((comic) => {
            const [{items}] = comic;
            return(
            <p>{comic.name}</p>
            )
        }) }
        </p>
    </div>
  );
}

export default HeroPage

export async function generateStaticParams() {
    const res = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&orderBy=name&apikey=${process.env.NEXT_PUBLIC_PUBKEY}&hash=${hash}`);
    const data = await res.json();
    const heroes:Hero[] = data?.data;

    // this is to avoid being rate limited by the API

    const trimmedHeroes = heroes.slice(0, 10);

    return trimmedHeroes.map((hero) => ({
        heroId: hero.id?.toString(),            
    }));
}