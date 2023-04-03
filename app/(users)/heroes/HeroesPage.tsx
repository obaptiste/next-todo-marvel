import Link from "next/link";
import React from "react";
import Hero from "../../../typings/typings";
import getHeroes from '../../utilities/heroService'

type PageProps = {
    params: {
        heroId: string;
    };
};

async function HeroesPage({params: {heroId}}: PageProps) {
    const hero = await getHeroes
}