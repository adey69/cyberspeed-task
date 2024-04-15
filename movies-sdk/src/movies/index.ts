import { Base } from '../base';
import {
  IActor,
  IActorsList,
  IConfiguration,
  IGenre,
  IGenreList,
  IKeyword,
  IKeywordsList,
  IMovie,
  IMoviesList,
  IReview,
  IReviewsList,
} from './types';

export class Movies extends Base {
  private config: IConfiguration;

  async getConfiguration(): Promise<IConfiguration> {
    const config = await this.request<IConfiguration>(`configuration`);
    this.config = config;
    return config;
  }

  async getRandomMovies(): Promise<IMovie[]> {
    const movies = await this.request<IMoviesList>(`movie/popular`);
    const config = await this.getConfiguration();
    const transformedMovies = movies.results?.slice(0, 10).map(movie => ({
      ...movie,
      poster_path: `${config?.images?.secure_base_url}original${movie.poster_path}`,
    }));
    return transformedMovies;
  }

  async getGenreList(): Promise<IGenre[]> {
    const genreList = await this.request<IGenreList>('genre/movie/list');
    return genreList.genres;
  }

  async getKeywordsList(movieId: number): Promise<IKeyword[]> {
    const keywordsList = await this.request<IKeywordsList>(
      `movie/${movieId}/keywords`,
    );
    return keywordsList.keywords;
  }

  async getMovieActors(movieId: number): Promise<IActor[]> {
    const castList = await this.request<IActorsList>(
      `movie/${movieId}/credits`,
    );
    const actorsList = castList.cast.filter(
      cast => cast.known_for_department === 'Acting',
    );
    return actorsList;
  }

  async getSearchedMovies(title: string): Promise<IMovie[]> {
    const movies = await this.request<IMoviesList>(
      `search/movie?query=${title}`,
    );
    const transformedMovies = movies.results?.slice(0, 10).map(movie => ({
      ...movie,
      poster_path: `${this.config?.images?.secure_base_url}original${movie.poster_path}`,
    }));
    return transformedMovies;
  }

  async getMovieReviews(movieId: number): Promise<IReview[]> {
    const reviews = await this.request<IReviewsList>(
      `movie/${movieId}/reviews`,
    );
    return reviews.results?.slice(0, 10);
  }
}
