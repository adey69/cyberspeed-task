import { Movies } from './movies';
import {
  IMovie as IMovieType,
  IConfiguration,
  IGenre as IGenreType,
  IKeyword as IKeywordType,
} from './movies/types';

export type IMovie = IMovieType;
export type IGenre = IGenreType;
export type IKeyword = IKeywordType;
export type IImagesConfiguration = IConfiguration;
export default Movies;
