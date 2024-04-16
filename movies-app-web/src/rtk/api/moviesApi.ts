import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { client } from '../../network';

const MoviesApi = createApi({
  reducerPath: 'MoviesRTK',
  baseQuery: fakeBaseQuery(),
  endpoints: builder => ({
    getRandomMovies: builder.query({
      queryFn: async () => {
        try {
          const movies = await client.getRandomMovies();
          return { data: movies };
        } catch (error) {
          return { error };
        }
      },
    }),
    getGenreList: builder.query({
      queryFn: async () => {
        try {
          const genreList = await client.getGenreList();
          return { data: genreList };
        } catch (error) {
          return { error };
        }
      },
    }),
    getMovieKeywords: builder.query({
      queryFn: async (id: number) => {
        try {
          const keywords = await client.getKeywordsList(id);
          return { data: keywords };
        } catch (error) {
          return { error };
        }
      },
    }),
    getMovieActors: builder.query({
      queryFn: async (id: number) => {
        try {
          const actors = await client.getMovieActors(id);
          return { data: actors };
        } catch (error) {
          return { error };
        }
      },
    }),
    searchMovies: builder.query({
      queryFn: async (title: string) => {
        try {
          const searchedMovies = await client.getSearchedMovies(title);
          return { data: searchedMovies };
        } catch (error) {
          return { error };
        }
      },
    }),
    getMovieReviews: builder.query({
      queryFn: async (id: number) => {
        try {
          const reviews = await client.getMovieReviews(id);
          return { data: reviews };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});
export default MoviesApi;
export const {
  useGetRandomMoviesQuery,
  useGetGenreListQuery,
  useGetMovieKeywordsQuery,
  useGetMovieActorsQuery,
  useLazySearchMoviesQuery,
  useLazyGetMovieActorsQuery,
  useLazyGetMovieKeywordsQuery,
  useGetMovieReviewsQuery,
} = MoviesApi;
