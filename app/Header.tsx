import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <header className="p-5 bg-teal-500">
        <p className="font-bold text-white">I am a header</p>
        <Link href="/" className="px-2 py-1 bg-white text-blue-500 rounded-lg">Home</Link>
    </header> 
  )
}
