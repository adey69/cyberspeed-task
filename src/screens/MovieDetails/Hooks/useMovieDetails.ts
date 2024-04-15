import { useEffect, useLayoutEffect, useMemo } from 'react';
import {
  MoviesSliceActions,
  selectedMovieActorsSelector,
  selectedMovieKeywordsSelector,
  selectedMovieSelector,
  useAppDispatch,
  useAppSelector,
  useGetMovieActorsQuery,
  useGetMovieKeywordsQuery,
} from '../../../rtk';
import { useNavigation } from '@react-navigation/native';

export default () => {
  const selectedMovie = useAppSelector(selectedMovieSelector);
  const movieKeywords = useAppSelector(selectedMovieKeywordsSelector);
  const movieActors = useAppSelector(selectedMovieActorsSelector);
  const navigation = useNavigation<PrimaryStackNavigationProp>();
  const dispatch = useAppDispatch();

  const { isLoading: isKeywordsLoading } = useGetMovieKeywordsQuery(
    selectedMovie?.id!,
  );
  const { isLoading: isActorsLoading } = useGetMovieActorsQuery(
    selectedMovie?.id!,
  );

  const isLoading = useMemo(
    () => isKeywordsLoading || isActorsLoading,
    [isKeywordsLoading, isActorsLoading],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: selectedMovie?.title ?? 'Movie Details',
    });
  });

  useEffect(() => {
    return () => {
      dispatch(MoviesSliceActions.setSelectedMovie(undefined));
    };
  }, []);

  return {
    selectedMovie,
    isLoading,
    movieActors,
    movieKeywords,
  };
};
