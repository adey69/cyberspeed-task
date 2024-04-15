import { useNavigation } from '@react-navigation/native';
import {
  MoviesSliceActions,
  configurationSelector,
  genresSelector,
  randomMoviesSelector,
  useAppDispatch,
  useAppSelector,
  useGetGenreListQuery,
  useGetRandomMoviesQuery,
} from '../../../rtk';
import { useEffect, useMemo } from 'react';

interface IUseHomeParams {
  searching: boolean;
}

export default ({ searching }: IUseHomeParams) => {
  const navigation = useNavigation<PrimaryStackNavigationProp>();
  const config = useAppSelector(configurationSelector);
  const randomMovies = useAppSelector(randomMoviesSelector);
  const genres = useAppSelector(genresSelector);
  const dispatch = useAppDispatch();

  const { isError, isLoading: isLoadingMovies } = useGetRandomMoviesQuery({});
  const { isLoading: isLoadingGenres, data: genreList } = useGetGenreListQuery(
    {},
  );

  const isLoading = useMemo(
    () => isLoadingMovies || isLoadingGenres || searching,
    [isLoadingMovies, isLoadingGenres, searching],
  );

  const navigateToDetails = () => {
    navigation.navigate('MovieDetails');
  };

  const handleMovieSelection = (movie: IMovie) => {
    dispatch(MoviesSliceActions.setSelectedMovie(movie));
    navigateToDetails();
  };

  useEffect(() => {
    if (genreList) {
      dispatch(MoviesSliceActions.setMovieGenres(genreList));
    }
  }, [randomMovies.length]);

  return {
    isLoading,
    isError,
    config,
    genres,
    randomMovies,
    handleMovieSelection,
  };
};
