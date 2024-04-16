import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MoviesApi } from '../api';

const INITIAL_STATE: IMoviesState = {
  randomMovies: [],
  genres: [],
  selectedMovie: undefined,
  searchedMovies: [],
};

const MoviesSlice = createSlice({
  name: 'Movies',
  initialState: INITIAL_STATE,
  reducers: {
    setSelectedMovie: (
      state,
      { payload }: PayloadAction<IMovie | undefined>,
    ) => {
      state.selectedMovie = payload;
    },
    setSelectedMovieActors: (state, { payload }: PayloadAction<IActor[]>) => {
      state.selectedMovie = { ...state.selectedMovie!, actors: payload };
    },
    setSelectedMovieKeywords: (
      state,
      { payload }: PayloadAction<IKeyword[]>,
    ) => {
      state.selectedMovie = {
        ...state.selectedMovie!,
        keywords: payload?.map(keyword => keyword.name),
      };
    },
    setSelectedMovieReviews: (state, { payload }: PayloadAction<IReview[]>) => {
      state.selectedMovie = {
        ...state.selectedMovie!,
        reviews: payload ?? [],
      };
    },
    setMovieGenres: (state, { payload }: PayloadAction<IGenre[]>) => {
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
  },
  extraReducers: builder => {
    builder.addMatcher(
      MoviesApi.endpoints.getRandomMovies.matchFulfilled,
      (state, { payload }) => {
        state.randomMovies = payload ?? [];
      },
    );
    builder.addMatcher(
      MoviesApi.endpoints.searchMovies.matchFulfilled,
      (state, { payload }) => {
        const results = payload
          ? payload?.map(movie => {
              let genres: string[] = [];
              state.genres.forEach(genre => {
                if (movie.genre_ids?.includes(genre.id)) {
                  genres.push(genre.name);
                }
              });
              return {
                ...movie,
                genres: genres,
              };
            })
          : [];
        state.searchedMovies = [...results];
      },
    );
  },
});

export default MoviesSlice.actions;

export const { reducer } = MoviesSlice;
