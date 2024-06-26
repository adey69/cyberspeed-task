import { createSelector } from '@reduxjs/toolkit';
import { IRootState } from '../setup';

export const randomMoviesSelector = createSelector(
  (state: IRootState) => state.movies,
  state => state.randomMovies,
);

export const searchedMoviesSelector = createSelector(
  (state: IRootState) => state.movies,
  state => state.searchedMovies,
);

export const selectedMovieSelector = createSelector(
  (state: IRootState) => state.movies,
  state => state.selectedMovie,
);

export const genresSelector = createSelector(
  (state: IRootState) => state.movies,
  state => state.genres,
);

export const selectedMovieActorsSelector = createSelector(
  (state: IRootState) => state.movies.selectedMovie,
  state => state?.actors?.slice(0, 5) ?? [],
);

export const selectedMovieKeywordsSelector = createSelector(
  (state: IRootState) => state.movies.selectedMovie,
  state => state?.keywords ?? [],
);

export const selectedMovieReviewsSelector = createSelector(
  (state: IRootState) => state.movies.selectedMovie,
  state => state?.reviews ?? [],
);
