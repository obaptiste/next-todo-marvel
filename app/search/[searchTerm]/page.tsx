import React from "react";
import {Md5} from 'ts-md5';


type PageProps = {
  params: {
    searchTerm: string;
  };
};
const ts = Date.now();
const hash = Md5.hashStr(`${ts} + ${process.env.PVTKEY} + ${process.env.PUBKEY}`); 

const search = async (searchTerm: string) => {
  const res = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&name=${searchTerm}&orderBy=name&apikey=${process.env.PUBKEY}&hash=${hash}`);
  const data = await res.json();
  console.log(data);
  return data;
};


async function SearchResults({ params: { searchTerm } }: PageProps) {
    console.log(process.env.PUBKEY);
    console.log(ts);
    console.log(hash);

  const searchResults = await search(searchTerm);
  console.log(searchResults);

  return (
    <div>
      <p className="text-gray-500 text-sm">You searched for: {searchTerm}</p>

      <ol className="space-y-5 p-5">
        {searchResults.results.map(
          (result: {
            position: React.Key | null | undefined;
            title:
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
            snippet:
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
          }) => (
            <li key={result.position} className="list-decimal">
              <p className="font-bold">{result.title}</p>
              <p>{result.snippet}</p>
            </li>
          )
        )}
      </ol>
    </div>
  );
}

export default SearchResults;
