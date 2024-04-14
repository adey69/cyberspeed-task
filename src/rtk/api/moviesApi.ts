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
    getConfiguration: builder.query({
      queryFn: async () => {
        try {
          const configuration = await client.getConfiguration();
          return { data: configuration };
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
  }),
});
export default MoviesApi;
export const {
  useGetRandomMoviesQuery,
  useGetConfigurationQuery,
  useGetGenreListQuery,
  useGetMovieKeywordsQuery,
  useGetMovieActorsQuery,
} = MoviesApi;
