import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import request from "../../helpers/request";
import { MovieInfo, SearchMovieResult } from "../../interfaces/movie";
import Header from '../../components/header/header';
import Movie from "../../components/movie/movie";
import './movies.scss';
import Spinner from "../../components/spinner/spinner";

interface ParamTypes {
    title: string;
    plot: string;
}

function Search() {
    const [searchResult, setSearchResult] = useState<SearchMovieResult[] | null>(null);
    const [movies, setMovies] = useState<MovieInfo[] | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const { title, plot } = useParams<ParamTypes>();

    useEffect(() => {
        setError(false);
        let unmounted = false;
        let source = axios.CancelToken.source();

        if (!title || !plot) {
            setError(true);
            return;
        }

        setLoading(true);
        request.get(`?s=${title}`)
            .then(res => {
                if (!res.data.Error && !unmounted) {
                    setSearchResult(res.data.Search);
                } else {
                    setError(true)
                }
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false))

        return function () {
            unmounted = true;
            source.cancel('Cancelling in cleanup');
        };
    }, [title, plot])

    useEffect(() => {
        let unmounted = false;
        let source = axios.CancelToken.source();

        setLoading(true);
        if (searchResult) {
            Promise.all(searchResult.slice(0, 5).map(result => request.get(`?i=${result.imdbID}&plot=${plot}`).then((res => res.data))))
                .then(res => {
                    if(!unmounted) setMovies(res);
                })
                .catch(err => setError(true))
                .finally(() => setLoading(false))
        }

        return function () {
            unmounted = true;
            source.cancel('Cancelling in cleanup');
        };
    }, [searchResult, plot, title])

    return (
        <div className="movies">
            <Header />
            {isLoading && (
                <Spinner/>
            )}
            {!isLoading && !error && movies && (
                movies.map((movie, index) => (
                    <div key={index} className="movies__item">
                        <Movie movie={movie} />
                    </div>
                ))
            )}
            {error && (
                <div className="error">Opps!We could not find the movie!</div>
            )}
        </div>
    )
}

export default Search;