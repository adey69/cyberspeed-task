import { Movies } from './movies';
import {
  IMovie as IMovieType,
  IConfiguration,
  IGenre as IGenreType,
  IKeyword as IKeywordType,
  IReview as IReviewType,
  IActor as IActorType,
} from './movies/types';

export type IMovie = IMovieType;
export type IGenre = IGenreType;
export type IKeyword = IKeywordType;
export type IReview = IReviewType;
export type IActor = IActorType;
export type IImagesConfiguration = IConfiguration;
export default Movies;
