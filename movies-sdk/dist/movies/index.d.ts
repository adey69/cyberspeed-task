import { Base } from '../base';
import { IMoviesList } from './types';
export declare class Movies extends Base {
    getPosts(): Promise<IMoviesList>;
}
