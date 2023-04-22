'use client'

import { create } from "domain";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import React, { FormEvent, useCallback, useState } from "react";

function Search() {
const [search, setSearch] = useState('');
const pathname = usePathname();
const searchParams = useSearchParams();
const router = useRouter();


const createQueryString = useCallback(
  (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    
    return params.toString();
  },
  [searchParams],
  );
  
  
  const handleSearch = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setSearch("");
    router.push(`/search/${search}`);
  };
  
  return (
    <>
      <>
  <p>Sort By</p>

  <button 
    onClick={() => {
      //<pathname>?sort=asc
      router.push(pathname + '?' + createQueryString('sort', 'asc'))
    }}
    >
        ASC
        </button>
        
        <Link
            href={
              //<pathname>?sort= desc
              pathname + '?' + createQueryString('sort', 'desc')
            }
            >
              DESC
            </Link>
          </>
       <form onSubmit={handleSearch}>

           
       
          <input 
          type="text"
          value={search}
          placeholder="Enter the searchterm"
          onChange={(e) => setSearch(e.target.value)}
          />
      <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 mx-2 rounded-lg">
      Search  
      </button>
      </form>  </>
  );
}

export default Search


