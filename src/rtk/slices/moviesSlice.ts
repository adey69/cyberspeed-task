import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MoviesApi } from '../api';

const INITIAL_STATE: IMoviesState = {
  randomMovies: [],
  imagesConfig: undefined,
  genres: [],
  selectedMovie: undefined,
};

const MoviesSlice = createSlice({
  name: 'Movies',
  initialState: INITIAL_STATE,
  reducers: {
    setSelectedMovie: (state, { payload }: PayloadAction<IMovie>) => {
      state.selectedMovie = payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      MoviesApi.endpoints.getRandomMovies.matchFulfilled,
      (state, { payload }) => {
        state.randomMovies = payload ?? [];
      },
    );
    builder.addMatcher(
      MoviesApi.endpoints.getConfiguration.matchFulfilled,
      (state, { payload }) => {
        state.imagesConfig = payload;
      },
    );
    builder.addMatcher(
      MoviesApi.endpoints.getGenreList.matchFulfilled,
      (state, { payload }) => {
        state.genres = payload ?? [];
        state.randomMovies = state.randomMovies.map(movie => {
          const genres = payload?.filter(genre =>
            movie.genre_ids?.includes(genre.id),
          );
          return {
            ...movie,
            genres: genres?.map(genre => genre.name),
          };
        });
      },
    );
    builder.addMatcher(
      MoviesApi.endpoints.getMovieKeywords.matchFulfilled,
      (state, { payload }) => {
        state.selectedMovie = {
          ...state.selectedMovie!,
          keywords: payload?.map(keyword => keyword.name),
        };
      },
    );
    builder.addMatcher(
      MoviesApi.endpoints.getMovieActors.matchFulfilled,
      (state, { payload }) => {
        state.selectedMovie = {
          ...state.selectedMovie!,
          actors: payload ?? [],
        };
      },
    );
  },
});

export default MoviesSlice.actions;

export const { reducer } = MoviesSlice;
