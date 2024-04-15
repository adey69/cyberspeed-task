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

interface IUseHomeParams {
  searching: boolean;
}

export default ({ searching }: IUseHomeParams) => {
  const navigation = useNavigation<PrimaryStackNavigationProp>();
  const config = useAppSelector(configurationSelector);
  const moviesSelector = useAppSelector(randomMoviesSelector);
  const genres = useAppSelector(genresSelector);
  const dispatch = useAppDispatch();

  const { isError, isLoading: isLoadingMovies } = useGetRandomMoviesQuery({});
  const { isLoading: isLoadingConfig } = useGetConfigurationQuery({});
  const { isLoading: isLoadingGenres } = useGetGenreListQuery({});

  const isLoading = useMemo(
    () => isLoadingMovies || isLoadingConfig || isLoadingGenres || searching,
    [isLoadingConfig, isLoadingMovies, isLoadingGenres, searching],
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
