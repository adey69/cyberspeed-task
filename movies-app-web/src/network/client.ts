import { AUTH_TOKEN, BASE_URL } from '@/config';
import Movies from '../../../movies-sdk/src';

const client = new Movies({
  baseUrl: BASE_URL ?? '',
  authHeader: AUTH_TOKEN ?? '',
});

export default client;
