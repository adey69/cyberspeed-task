import { useNavigation } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
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

interface IUseHomeParams {
  searching: boolean;
}

export default ({ searching }: IUseHomeParams) => {
  const navigation = useNavigation<PrimaryStackNavigationProp>();
  const config = useAppSelector(configurationSelector);
  const randomMovies = useAppSelector(randomMoviesSelector);
  const genres = useAppSelector(genresSelector);
  const [isConnected, setIsConnected] = useState(false);
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

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? false);
    });

    return () => unsubscribe();
  }, []);

  return {
    isLoading,
    isError,
    config,
    genres,
    randomMovies,
    isConnected,
    handleMovieSelection,
  };
};
