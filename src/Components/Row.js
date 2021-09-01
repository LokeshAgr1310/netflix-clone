import axios from '../api';
import React, { useState, useEffect } from 'react';
import '../Components-Styling/Row.css';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

function Row({ title, fetchUrl, isLargeRow }) {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(() => {

        async function fetchMovies() {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            return request;
        }

        fetchMovies();
    }, [fetchUrl])

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.title || movie?.original_name || "")
                .then((url) => {
                    if (url) {
                        const urlParams = new URLSearchParams(new URL(url).search)
                        setTrailerUrl(urlParams.get('v'));
                    } else {
                        setTrailerUrl('')
                    }
                })
        }
    }

    const opts = {
        heigt: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className='row__posters'>
                {movies.map(movie => (
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${isLargeRow && "row__posterLarge"} `}
                        src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                        alt={movie.name}
                    />
                ))}
            </div>
            {trailerUrl.length > 0 && <Youtube videoId={trailerUrl} opts={opts} />}

        </div>
    )
}

export default Row
