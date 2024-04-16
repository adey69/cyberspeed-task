'use client';
import { useMemo } from 'react';
import {
  randomMoviesSelector,
  useAppSelector,
  useGetGenreListQuery,
  useGetRandomMoviesQuery,
} from '../rtk';

export default function Home() {
  const {
    isError,
    isLoading: isLoadingMovies,
    error: moviesError,
  } = useGetRandomMoviesQuery({});

  const randomMovies = useAppSelector(randomMoviesSelector);

  const {
    isLoading: isLoadingGenres,
    data: genreList,
    error: genreListError,
  } = useGetGenreListQuery({});

  const isLoading = useMemo(
    () => isLoadingMovies || isLoadingGenres || searching,
    [isLoadingMovies, isLoadingGenres, searching],
  );

  const errorMessage = useMemo(
    () => moviesError ?? genreListError ?? undefined,
    [moviesError, genreListError],
  );

  const handleMovieSelection = (movie: IMovie) => {
    dispatch(MoviesSliceActions.setSelectedMovie(movie));
    navigateToDetails();
  };

  useEffect(() => {
    if (genreList && !genreListError) {
      dispatch(MoviesSliceActions.setMovieGenres(genreList));
    }
  }, [randomMovies.length]);

  useEffect(() => {
    setShowErrorModal(!!errorMessage);
  }, [errorMessage]);

  const renderMovieCard = (movie: IMovie) => {
    return (
      <div className="movie-card">
        <img src={movie.poster_path} width={250} height={350} />
        <p>{movie?.title}</p>
        <span>
          {movie?.genres?.map((genre, index, arr) => {
            return `${genre}${index !== arr.length - 1 ? ', ' : ''}`;
          })}
        </span>
      </div>
    );
  };

  return (
    <main>
      <h1>Movies App</h1>
      <div className="movie-card-container">
        {randomMovies?.map(movie => renderMovieCard(movie))}
      </div>
    </main>
  );
}
