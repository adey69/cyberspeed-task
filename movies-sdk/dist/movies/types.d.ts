export interface IMovie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
}
export interface IMoviesList {
    results: IMovie[];
}
