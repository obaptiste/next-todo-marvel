export type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};


export type Hero = {
    heroId: number;
    id: number;
    name:string;
    comics: string[];
    thumb: {any};
    image: string;
};