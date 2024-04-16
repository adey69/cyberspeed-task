type IMovie = import('../../../movies-sdk/src').IMovie;
type IGenre = import('../../../movies-sdk/src').IGenre;
type IReview = import('../../../movies-sdk/src').IReview;
type IKeyword = import('../../../movies-sdk/src').IKeyword;
type IActor = import('../../../movies-sdk/src').IActor;

interface IMoviesState {
  randomMovies: IMovie[];
  genres: IGenre[];
  selectedMovie?: IMovie;
  searchedMovies: IMovie[];
}
