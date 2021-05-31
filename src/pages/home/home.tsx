import axios from "axios";
import React, { useEffect, useState } from "react";
import FeaturedMovies from "../../components/featured-movies/featured-movies";
import Header from "../../components/header/header";
import Spinner from "../../components/spinner/spinner";
import request from "../../helpers/request";
import { MovieInfo } from "../../interfaces/movie";
import './home.scss';

function Home() {
    const [movies, setMovies] = useState<MovieInfo[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        let unmounted = false;
        let source = axios.CancelToken.source();

        setLoading(true);
        Promise.all([
            request.get("?i=tt1243957&plot=full"),
            request.get("?i=tt0268978&plot=full"),
        ])
            .then(res => res.map(res => res.data))
            .then(res => {
                if (!unmounted) {
                    setMovies(res)
                }
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false))

        return function () {
            unmounted = true;
            source.cancel('Cancelling in cleanup');
        };
    }, [])

    return (
        <>
            {loading && (
                <Spinner />
            )}
            {!loading && !error && movies && (
                <div className="home">
                    <div className="home__header">
                        <Header />
                    </div>
                    <div className="home__movies">
                        {movies && (
                            <FeaturedMovies movies={movies} />
                        )}
                    </div>
                </div>
            )}
            {error && (
                <div className="error">Opps! We could not find the movie. Try again.</div>
            )}
        </>
    )
}

export default Home;