import Header from './Header'
import '../styles/globals.css'
import { getHeroes, getRandomHero } from './utilities/heroService'

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode,
}) {
  
    return (
      <html>
        <head>
          <title>Oris' Website</title>
        </head>
        <body>
          <Header />
          {children}
        </body>
      </html>
    );
}
