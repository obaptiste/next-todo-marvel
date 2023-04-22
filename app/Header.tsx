import Link from "next/link";
import React from "react";
import { Hero } from "../typings/typings";
import { ts, hash } from "./utilities/heroService";
import ImageComponent from "../component/ImageComponent";

// export async function getHeroes() {
//   const offset = Math.floor(Math.random() * 250);
//   const res = await fetch(
//     `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${process.env.NEXT_PUBLIC_PUBKEY}&hash=${hash}&offset=${offset}`,
//     { next: { revalidate: 30 } }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch a heroes");
//   }

//   const data = await res.json();
//   const heroes = data?.data.results;
//   const {thumbnail} = heroes;
//   console.table("static params", thumbnail);
//   return heroes;
  
// }

// interface HeaderComp {
//   props: {
//     hero: Hero
//     }
// }

export default function Header() {
//   let {heroImage} = props;
//   let imgArray: Array<string>;
//  // let [headImages, setheadImages] = useState('');
//   async function getbackground() {
//     const heroes =  await getHeroes();
//     heroes.map((hero:Hero) => {
//       let heroImage = hero.thumbnail.path;
//       return heroImage;
//      // setheadImages(heroImage)
//     });
//   }
//   getbackground();



  const linkStyle = {
    padding: "0.5rem 1rem",
    backgroundColor: "white",
    color: "blue",
    borderRadius: "0.5rem",
    marginRight: "1rem",
    marginTop: "1rem",
    fontWeight: "bold",
  };


  return (
    <header className="p-5 bg-teal-500">
      {/* @ts-expect-error Server Component */}
      <ImageComponent/>
      <p className="font-bold text-white my-3">A Marvel Character Index</p>
      <Link href="/" className="text-blue-500" style={linkStyle}>
        Home
      </Link>
      <Link href="/search" className="text-blue-500" style={linkStyle}>
        Search
      </Link>
      <Link href="/todos" className="text-green-700" style={linkStyle}>
        Todos
      </Link>
      <Link href="/heroes" className="text-red-700" style={linkStyle}>
        Heroes
      </Link>
    </header>
  );
}

