import Config from 'react-native-config';
import Movies from '../../movies-sdk/src';

const client = new Movies({
  baseUrl: Config.BASE_URL ?? '',
  authHeader: Config.AUTH_TOKEN ?? '',
});

export default client;
