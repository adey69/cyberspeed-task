'use client';

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
} from '@/rtk';
import { useEffect, useMemo, useState } from 'react';

const formatDate = (inputString: string) => {
  const date = new Date(inputString);

  // Format the date according to the desired format (dd/mm/yyyy)
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return formattedDate;
};

const MovieDetails = () => {
  const selectedMovie = useAppSelector(selectedMovieSelector);
  const movieKeywords = useAppSelector(selectedMovieKeywordsSelector);
  const movieActors = useAppSelector(selectedMovieActorsSelector);
  const movieReviews = useAppSelector(selectedMovieReviewsSelector);
  const [showErrorModal, setShowErrorModal] = useState(false);

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

  // useEffect(() => {
  //   setShowErrorModal(!!errorMessage);
  // }, [errorMessage]);

  if (!selectedMovie) {
    return (
      <div className="movie-details-page">
        <h2>Please select a movie from homepage.</h2>
      </div>
    );
  }

  return (
    <main className="movie-details-page">
      <div className="top-container">
        <img
          className="movie-poster"
          src={selectedMovie?.poster_path}
          alt={selectedMovie?.title + ' Poster'}
          width={250}
          height={350}
        />
        <div className="movie-info-container">
          <h2>{selectedMovie?.title}</h2>
          <p>{selectedMovie?.overview}</p>
          <p className="movie-actors">
            Actors:{' '}
            {movieActors?.map(
              (actor, index, arr) =>
                `${actor.name} ${index !== arr.length - 1 ? ', ' : ''}`,
            )}
          </p>
          <p className="movie-keywords">
            Keywords:{' '}
            {movieKeywords?.map(
              (keyword, index, arr) =>
                `${keyword} ${index !== arr.length - 1 ? ', ' : ''}`,
            )}
          </p>
        </div>
      </div>
      <div>
        <h4>Reviews</h4>
        {movieReviews?.length > 0 ? (
          movieReviews?.map(review => (
            <div>
              <p>
                <strong>{review?.author}</strong>{' '}
                <span className="review-date">
                  {formatDate(review?.updated_at)}
                </span>
              </p>
              <p className="review-content">{review?.content}</p>
            </div>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </div>
    </main>
  );
};

export default MovieDetails;
