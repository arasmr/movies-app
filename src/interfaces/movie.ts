export interface MovieInfo {
    Title: string;
    Year: string;
    Type: string;
    Rated: string;
    Released: string;
    Genre: string;
    Director: string;
    Actors: string; 
    Plot: string;
    Language: string;
    Poster: string;
    Awards: string;
    imdbRating: number;
    imdbID: string;
    Writer: string;
}

export interface SearchMovieResult {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export enum PlotOptions {
    short = 'short',
    full = 'full'
}