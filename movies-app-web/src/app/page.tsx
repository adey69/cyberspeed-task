'use client';
import { useEffect, useMemo, useState } from 'react';
import {
  MoviesSliceActions,
  randomMoviesSelector,
  searchedMoviesSelector,
  useAppDispatch,
  useAppSelector,
  useGetGenreListQuery,
  useGetRandomMoviesQuery,
} from '../rtk';
import { useLazySearchMoviesQuery } from '@/rtk/api/moviesApi';
import Link from 'next/link';
import debounce from 'lodash.debounce';

export default function Home() {
  const [searchInput, setSearchInput] = useState('');

  const randomMovies = useAppSelector(randomMoviesSelector);
  const searchedMovies = useAppSelector(searchedMoviesSelector);

  const {
    isError,
    isLoading: isLoadingMovies,
    error: moviesError,
  } = useGetRandomMoviesQuery({});

  const {
    isLoading: isLoadingGenres,
    data: genreList,
    error: genreListError,
  } = useGetGenreListQuery({});

  const [
    searchMovies,
    {
      isLoading: searchLoading,
      isFetching: searchFetching,
      isError: searchingError,
    },
  ] = useLazySearchMoviesQuery();

  const moviesToShow = useMemo(
    () => (searchInput.trim()?.length > 0 ? searchedMovies : randomMovies),
    [searchInput, searchedMovies, randomMovies],
  );

  const handleSearchInput = (text: string) => {
    setSearchInput(text);
    searchMovies(text);
  };

  const searching = useMemo(
    () => searchFetching || searchLoading,
    [searchFetching, searchLoading],
  );

  const dispatch = useAppDispatch();

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
  };

  useEffect(() => {
    if (genreList && !genreListError) {
      dispatch(MoviesSliceActions.setMovieGenres(genreList));
    }
  }, [randomMovies.length]);

  // useEffect(() => {
  //   setShowErrorModal(!!errorMessage);
  // }, [errorMessage]);

  const renderMovieCard = (movie: IMovie) => {
    return (
      <div className="movie-card">
        <Link
          href={`/movies/${movie.id}`}
          onClick={() => handleMovieSelection(movie)}>
          <img src={movie.poster_path} width={250} height={350} />
          <p>{movie?.title}</p>
          <span className="genre">
            {movie?.genres?.map((genre, index, arr) => {
              return `${genre}${index !== arr.length - 1 ? ', ' : ''}`;
            })}
          </span>
        </Link>
      </div>
    );
  };

  return (
    <main>
      <h1>Movies App</h1>
      <div className="search-field-container">
        <input
          placeholder="Search here..."
          className="search-field"
          onChange={e => handleSearchInput(e.target.value)}
          value={searchInput}
        />
      </div>
      <div className="movie-card-container">
        {moviesToShow?.map(movie => renderMovieCard(movie))}
      </div>
    </main>
  );
}
