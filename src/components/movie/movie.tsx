import { splitText } from "../../helpers/utils";
import { MovieInfo } from "../../interfaces/movie";
import Label from "../label/label";
import Plot from "../plot/plot";
import './movie.scss';

interface MovieProps {
    movie: MovieInfo;
}

function Movie({ movie }: MovieProps) {
    return (
        <div className="movie">
            <div className="movie__background" style={{ backgroundImage: `url(${movie.Poster})` }}></div>
            <div className="movie__content">
                <div className="movie__info">
                    <p className="movie__type">{movie.Type}</p>
                    <div className="movie__title">
                        <h2>{movie.Title}</h2>
                        <h3>{movie.imdbRating} / 10</h3>
                    </div>
                    <Plot text={movie.Plot} />
                    {movie.Director !== 'N/A' && (
                        <p>With {movie.Director}</p>
                    )}

                    {movie.Actors !== 'N/A' && (
                        <div className="movie__cast">
                            <span>Cast</span>
                            <ul>
                                {splitText(movie.Actors, ',').map((actor, index) => (
                                    <li key={index}>{actor}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {movie.Writer !== 'N/A' && (
                        <div className="movie__writer">
                            <span>Writers</span>
                            <ul>
                                {splitText(movie.Writer, ',').map((writer, index) => (
                                    <li key={index}>{writer}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div>{splitText(movie.Genre, ',').map((genre, index) => <Label key={index} label={genre} />)}</div>
                </div>
                <img className="movie__poster" src={movie.Poster} alt={movie.Title} />
            </div>
        </div>
    )
}

export default Movie;