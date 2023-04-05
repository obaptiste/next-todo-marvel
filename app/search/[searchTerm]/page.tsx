import React from "react";
import { Md5 } from "ts-md5";
import Image from "next/image";
import Link from "next/link";

type PageProps = {
  params: {
    searchTerm: string;
  };
};
const ts = Date.now();
const hash = Md5.hashStr(
  `${ts}${process.env.PVTKEY}${process.env.NEXT_PUBLIC_PUBKEY}`
);

const search = async (searchTerm: string) => {
  const res = await fetch(
    `https://gateway.marvel.com/v1/public/characters?ts=${ts}&nameStartsWith=${searchTerm}&orderBy=name&apikey=${process.env.NEXT_PUBLIC_PUBKEY}&hash=${hash}`
  );
  const data = await res.json();
  return data?.data;
};

async function SearchResults({ params: { searchTerm } }: PageProps) {
  const searchResults = await search(searchTerm);
  console.log(searchResults);

  return (
    <div>
      <p className="text-gray-500 text-sm">You searched for: {searchTerm}</p>

      <ol className="space-y-5 p-5">
        {searchResults &&
          searchResults?.results.map(
            (result: {
              id: React.Key | null | undefined;
              name:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
              description:
                | string
                | number
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
              thumbnail: {
                path: string;
                extension: string;
              };

              resourceURI: string;
              comics: {
                available: number;
                collectionURI: string;
                items: {
                  resourceURI: string;
                  name: string;
                }[];
              };
              urls: {
                type: string;
                url: string;
              }[];
            }) => (
              <li key={result.id} className="list-decimal">
                <>
                <Link href={`/heroes/${result.id}`}>
                  <p className="font-bold">{result.name}</p>
                  <span>
                    <Image
                      src={`${result.thumbnail.path}.jpg`}
                      alt={`${result.name!}`}
                      height="200"
                      width="150"
                    />
                  </span>
                  <p>{result.description}</p>
                  </Link>

                  {Array.isArray(result.comics.items) &&
                    result.comics.items.map((comic) => {                    
                        return (
                          <>
                            <h3>Comics Featured in</h3>
                            <p key={comic.name}>{comic.name}</p>
                          </>
                        );
                      })}
                    
                </>
              </li>
            )
          )}
      </ol>
    </div>
  );
}

export default SearchResults;
