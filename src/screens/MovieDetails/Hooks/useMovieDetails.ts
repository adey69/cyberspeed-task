import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {
  MoviesSliceActions,
  selectedMovieActorsSelector,
  selectedMovieKeywordsSelector,
  selectedMovieReviewsSelector,
  selectedMovieSelector,
  useAppDispatch,
  useAppSelector,
  useGetMovieActorsQuery,
  useGetMovieKeywordsQuery,
  useGetMovieReviewsQuery,
} from '../../../rtk';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';

export default () => {
  const selectedMovie = useAppSelector(selectedMovieSelector);
  const movieKeywords = useAppSelector(selectedMovieKeywordsSelector);
  const movieActors = useAppSelector(selectedMovieActorsSelector);
  const movieReviews = useAppSelector(selectedMovieReviewsSelector);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigation = useNavigation<PrimaryStackNavigationProp>();

  const dispatch = useAppDispatch();

  const {
    isLoading: isKeywordsLoading,
    data: keywords,
    error: keywordsError,
  } = useGetMovieKeywordsQuery(selectedMovie?.id!);
  const {
    isLoading: isActorsLoading,
    data: actors,
    error: actorsError,
  } = useGetMovieActorsQuery(selectedMovie?.id!);
  const {
    isLoading: isReviewsLoading,
    data: reviews,
    error: reviewsError,
  } = useGetMovieReviewsQuery(selectedMovie?.id!);

  const isLoading = useMemo(
    () => isKeywordsLoading || isActorsLoading || isReviewsLoading,
    [isKeywordsLoading, isActorsLoading, isReviewsLoading],
  );

  const errorMessage = useMemo(
    () => keywordsError ?? actorsError ?? reviewsError ?? undefined,
    [keywordsError, actorsError, reviewsError],
  );

  const handleLinkPress = async (url: string) => {
    const canOpenUrl = await Linking.canOpenURL(url);
    if (canOpenUrl) {
      Linking.openURL(url);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: selectedMovie?.title ?? 'Movie Details',
    });
  });

  useEffect(() => {
    if (actors) {
      dispatch(MoviesSliceActions.setSelectedMovieActors(actors));
    }
  }, [actors]);

  useEffect(() => {
    if (keywords) {
      dispatch(MoviesSliceActions.setSelectedMovieKeywords(keywords));
    }
  }, [keywords]);

  useEffect(() => {
    if (reviews) {
      dispatch(MoviesSliceActions.setSelectedMovieReviews(reviews));
    }
  }, [reviews]);

  useEffect(() => {
    setShowErrorModal(!!errorMessage);
  }, [errorMessage]);

  return {
    selectedMovie,
    isLoading,
    movieActors,
    movieKeywords,
    movieReviews,
    errorMessage,
    showErrorModal,
    setShowErrorModal,
    handleLinkPress,
  };
};
