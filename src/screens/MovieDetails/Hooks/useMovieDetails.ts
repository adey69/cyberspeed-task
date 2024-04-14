import { useLayoutEffect, useMemo } from 'react';
import {
  selectedMovieActorsSelector,
  selectedMovieKeywordsSelector,
  selectedMovieSelector,
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

  return {
    selectedMovie,
    isLoading,
    movieActors,
    movieKeywords,
  };
};
