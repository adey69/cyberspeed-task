import { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import {
  randomMoviesSelector,
  searchedMoviesSelector,
  useAppSelector,
  useLazySearchMoviesQuery,
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

  const debouncedSearch = useCallback(
    debounce(textParam => {
      searchMovies(textParam);
    }, 500),
    [],
  );

  const handleSearchInput = (text: string) => {
    setSearchInput(text);
  };

  const clearSearch = () => {
    setSearchInput('');
  };

  useEffect(() => {
    if (searchInput?.trim()?.length > 0) {
      debouncedSearch(searchInput);
    }
  }, [searchInput]);

  return {
    searchInput,
    moviesToShow,
    searching: searchFetching || searchLoading,
    handleSearchInput,
    clearSearch,
  };
};
