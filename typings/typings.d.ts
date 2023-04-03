export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type Hero = {
  id: React.Key | null | undefined;
  name:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  description:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
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
};

export type HeroResult = Promise<Hero>;

export type Heroes = Array<Hero | HeroResult>;

export type HeroesResult = HeroResult[];

export type Comics = Array<{
  available: number;
  collectionURI: string;
  items: {
    resourceURI: string;
    name: string;
  }[];
}>;

export type ComicResult = Promise<Comic>;

export type ComicsResult = ComicResult[];
