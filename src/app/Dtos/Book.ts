import {Author} from "./Author";
import {Genre} from "./Genre";
export interface Book{
    id: number;
    title: string;
    description: string;
    releaseDate: Date;
    isFavorited: boolean;
    author:Author[];
    genres:Genre[];
}