import React from "react";
import {Md5} from 'ts-md5';
 


type PageProps = {
  params: {
    searchTerm: string;
  };
};
const ts = Date.now();
const hash = Md5.hashStr(`${ts}${process.env.PVTKEY}${process.env.NEXT_PUBLIC_PUBKEY}`); 

const search = async (searchTerm: string) => {
  const res = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&name=${searchTerm}&orderBy=name&apikey=${process.env.NEXT_PUBLIC_PUBKEY}&hash=${hash}`);
  const data = await res.json();
  console.log("1", data.data.results);
  return data?.data;
};


async function SearchResults({ params: { searchTerm } }: PageProps) {
    console.log(process.env.NEXT_PUBLIC_PUBKEY);
    console.log(ts);
    console.log(hash);

  const searchResults = await search(searchTerm);
  console.log(searchResults);

  return (
    <div>
      <p className="text-gray-500 text-sm">You searched for: {searchTerm}</p>

      <ol className="space-y-5 p-5">
        {searchResults && searchResults?.results.map(
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
              <p className="font-bold">{result.name}</p>
              <p>{result.description}</p>
            </li>
          )
        )}
      </ol>
    </div>
  );
}

export default SearchResults;