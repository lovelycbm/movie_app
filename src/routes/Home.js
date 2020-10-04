import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import './Home.css';


export default function Home() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState({ moives: [] });
    // const getMovies = async () => {
    //   const {
    //     data: {
    //       data: { movies },
    //     },
    //   } = await axios.get(
    //     'https://yts.mx/api/v2/list_movies.json?sort_by=rating',
    //   );
    //   setMovies(movies);
    //   setLoading(false);      
    // };
    
    useEffect(()=>{
      async function getMovies(){
        const {
          data: {
            data: { movies },
          },
        } = await axios.get(
          'https://yts.mx/api/v2/list_movies.json?sort_by=rating',
        );        
        setMovies(movies);
        setLoading(false);
      }
      getMovies();            
    }, []);

    return (
        <section className="container">
        {loading ? (
            <div className="loader">
            <span className="loader__text">Loading...</span>
            </div>
        ) : (
            <div className="movies">
            {movies.map((movie) => (
                <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
                />
            ))}
            </div>
        )}
        </section>
    );

}