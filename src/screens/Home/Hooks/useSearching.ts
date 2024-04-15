import { useMemo, useState } from 'react';
import { useLazySearchMoviesQuery } from '../../../rtk/api/moviesApi';
import {
  randomMoviesSelector,
  searchedMoviesSelector,
  useAppSelector,
} from '../../../rtk';

export default () => {
  const [searchInput, setSearchInput] = useState('');
  const [
    searchMovies,
    { isLoading: searchLoading, isFetching: searchFetching, isError },
  ] = useLazySearchMoviesQuery();
  const searchedMovies = useAppSelector(searchedMoviesSelector);

  const randomMovies = useAppSelector(randomMoviesSelector);

  const moviesToShow = useMemo(
    () => (searchInput.trim()?.length > 0 ? searchedMovies : randomMovies),
    [searchInput, searchedMovies, randomMovies],
  );

  const handleSearchInput = (text: string) => {
    setSearchInput(text);
    searchMovies(text);
  };

  const clearSearch = () => {
    setSearchInput('');
  };

  return {
    searchInput,
    moviesToShow,
    searching: searchFetching || searchLoading,
    handleSearchInput,
    clearSearch,
  };
};
