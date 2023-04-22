import React from 'react'
import Image from 'next/image'
import { getRandomHero } from '../app/utilities/heroService'

async function ImageComponent() {
    const {thumbnail, name} = await getRandomHero();
  
   
  return (
    <div>
        <Image
            src={`${thumbnail.path}.jpg`}
            alt={`${name}`}
            fill={true}
            priority={true}
            placeholder="blur"
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsX8lWDwAEjAGvL7dgkAAAAABJRU5ErkJggg=='
            />
    </div>
  )
}

export default ImageComponent;
