import Link from 'next/link'
import React from 'react'

export default function Header() {
 
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
        <p className="font-bold text-white my-3">I am a header</p>
        <Link href="/" className="text-blue-500" style={linkStyle}>Home</Link>
        <Link href="/search" className="text-blue-500" style={linkStyle}>Search</Link>
        <Link href="/todos" className="text-green-700" style={linkStyle}>Todos</Link>
        <Link href="/heroes" className="text-red-700" style={linkStyle}>Heroes</Link>

    </header> 
  )
}
