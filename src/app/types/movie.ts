import { Genre } from './genre';

export interface Movie {
  id: number;
  poster_path: string;
  backdrop_path: string;
  original_title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  runtime: string;
  genres: Genre[];
}
