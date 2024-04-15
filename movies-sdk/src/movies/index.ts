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
} from './types';

export class Movies extends Base {
  async getRandomMovies(): Promise<IMovie[]> {
    const movies = await this.request<IMoviesList>(`movie/popular`);
    return movies?.results?.slice(0, 10);
  }

  async getConfiguration(): Promise<IConfiguration> {
    const config = await this.request<IConfiguration>(`configuration`);
    return config;
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

    return movies.results;
  }
}
