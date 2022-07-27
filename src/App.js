//MUST HAVE THE FOLLOWING LINE IN ORDER TO USE useState AND useEffect
import {useState, useEffect} from 'react';

//IMPORTING THE STYLES FROM THE APP.CSS FILE
import './App.css';
import SearchIcon from './search.svg';

//IMPORTING IN COMPONENTS
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com?apikey=790bff7a';

const movie1 = {
  Poster: "https://m.media-amazon.com/images/M/MV5BYzE5MjY1ZDgtMTkyNC00MTMyLThhMjAtZGI5OTE1NzFlZGJjXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  Title: "Deadpool",
  Type: "movie",
  Year: "2016",
  imdbID: "tt1431045"
};

function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  //SETS UP THE ASYNCHRONOUS FETCHING OF DATA FROM THE API
  const searchMovies = async (title) => {
    const responses = await fetch(`${API_URL}&s=${title}`);
    const data = await responses.json();

    setMovies(data.Search);
  };

  //useEffect CAUSES THE INCLUDED FUNCTION TO TRIGGER IMMEDIATELY
  useEffect(() => {
    searchMovies('deadpool');
  }, []);

  return(
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
        type="text"
        placeholder='Search for movies'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} />

        <img
        src={SearchIcon}
        alt="search"
        onClick={() => searchMovies(searchTerm)}/>
      </div>

      {
        movies?.length > 0
          ? (
            <div className="container">
              {movies.map((movie) => {
                return <MovieCard movie={movie}/>
              })}
            </div>
          ) : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )
      }

      
    </div>
  );
}

export default App;
