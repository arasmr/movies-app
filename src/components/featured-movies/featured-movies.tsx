import { useEffect, useState } from 'react';
import { MovieInfo } from '../../interfaces/movie';
import Plot from '../plot/plot';
import './featured-movies.scss';

interface FeaturedMoviesProps {
    movies: MovieInfo[];
}

function FeaturedMovies({ movies }: FeaturedMoviesProps) {
    const [displayedMovie, setDisplayedMovie] = useState<MovieInfo>(movies[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            return setDisplayedMovie(currentMovie => {
                const nextMovie = movies.find(movie => movie.imdbID !== currentMovie.imdbID);
                if (nextMovie) {
                    return nextMovie;
                }
                clearInterval(interval);
                return currentMovie;
            })
        }, 5000)

        return () => clearInterval(interval)
    }, [movies])
    
    return (
        <div className="featured-movie">
            <div className="featured-movie__background" style={{ backgroundImage: `url(${displayedMovie.Poster})` }}></div>
            <div className="featured-movie__content">
                <div className="featured-movie__info">
                    <h2 className="featured-movie__title">{displayedMovie.Title}</h2>
                    <p className="featured-movie__release">{displayedMovie.Released}</p>
                    <Plot text={displayedMovie.Plot} />
                    <p className="featured-movie__awards">{displayedMovie.Awards}</p>
                </div>
                <div className="featured-movie__poster">
                    <img src={displayedMovie.Poster} alt={displayedMovie.Title} />
                </div>
            </div>
        </div>
    )
}

export default FeaturedMovies;