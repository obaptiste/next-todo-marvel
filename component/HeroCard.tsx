import React from 'react'
import {Hero} from '../typings/typings';
import Image from 'next/image'

type PageProps = {
    params: {
        Hero:any
    }
}

function HeroCard({params: {Hero}}: PageProps) {
  return (
    <div>
        <p>{Hero.name}</p>
        <Image src={`${Hero.thumbnail.path}.jpg`} alt={`${Hero.name}`} height="200" width="150"/>
        <p>{Hero.description}</p>
    </div>
  )
}

export default HeroCard