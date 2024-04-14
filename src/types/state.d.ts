type IMovie = import('../../movies-sdk/src').IMovie;
type IImagesConfiguration = import('../../movies-sdk/src').IImagesConfiguration;
type IGenre = import('../../movies-sdk/src').IGenre;

interface IMoviesState {
  randomMovies: IMovie[];
  imagesConfig?: IImagesConfiguration;
  genres: IGenre[];
  selectedMovie?: IMovie;
}
