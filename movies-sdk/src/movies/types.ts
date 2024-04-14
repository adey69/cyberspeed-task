export interface IMovie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  genres?: string[];
  genre_ids?: number[];
  keywords?: string[];
  actors?: IActor[];
}

interface ICommonProps {
  id: number;
  name: string;
}

export interface IGenre extends ICommonProps {}

export interface IKeyword extends ICommonProps {}

export interface IActor extends ICommonProps {
  known_for_department: string;
}

export interface IMoviesList {
  results: IMovie[];
}

export interface IConfiguration {
  images: {
    secure_base_url: string;
    backdrop_sizes: string[];
  };
}

export interface IGenreList {
  genres: IGenre[];
}

export interface IKeywordsList {
  keywords: IKeyword[];
}

export interface IActorsList {
  cast: IActor[];
}
