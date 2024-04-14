import { useNavigation } from '@react-navigation/native';
import {
  MoviesSliceActions,
  configurationSelector,
  genresSelector,
  randomMoviesSelector,
  useAppDispatch,
  useAppSelector,
  useGetConfigurationQuery,
  useGetGenreListQuery,
  useGetRandomMoviesQuery,
} from '../../../rtk';
import { useMemo } from 'react';

export default () => {
  const navigation = useNavigation<PrimaryStackNavigationProp>();
  const config = useAppSelector(configurationSelector);
  const moviesSelector = useAppSelector(randomMoviesSelector);
  const genres = useAppSelector(genresSelector);
  const dispatch = useAppDispatch();

  const { isError, isLoading: isLoadingMovies } = useGetRandomMoviesQuery({});
  const { isLoading: isLoadingConfig } = useGetConfigurationQuery({});
  const { isLoading: isLoadingGenres } = useGetGenreListQuery({});

  const isLoading = useMemo(
    () => isLoadingMovies || isLoadingConfig || isLoadingGenres,
    [isLoadingConfig, isLoadingMovies, isLoadingGenres],
  );

  const navigateToDetails = () => {
    navigation.navigate('MovieDetails');
  };

  const handleMovieSelection = (movie: IMovie) => {
    dispatch(MoviesSliceActions.setSelectedMovie(movie));
    navigateToDetails();
  };

  return {
    isLoading,
    isError,
    config,
    genres,
    randomMovies: moviesSelector,
    handleMovieSelection,
  };
};
