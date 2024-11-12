import { useState } from 'react';
import { useContext } from 'react';
import { context } from './context';

const movies = [
    "Cinema Paradiso",
    "Into the Wild",
    "Invictus",
    "Big Fish",
    "Forrest Gump",
    "The Proposal",
    "Top Gun",
    "Rocky",
    "Gran Torino",
    "ET"
];

function Movie({ name, onClick, isClicked }) {
    
    return (
        <div className="col-2 mx-3 my-2">
            <div
                className={`border rounded hover:bg-light p-2 d-flex flex-column ${isClicked ? 'border-primary border-2 bg-light' : 'border-dark'}`}
                onClick={onClick}
            >
                <h3 className="fs-5 text-center fw-semibold p-auto">{name}</h3>
            </div>
        </div>
    );
}

export default function ShowMovies() {
    const { setMovie } = useContext(context);
    const [clickedMovie, setClickedMovie] = useState(null);

    const handleClick = (index) => {
        setClickedMovie(clickedMovie === index ? null : index);
        setMovie(movies[index]);
    };

    return (
        <div className="container mt-4">
            <div className="row">
                {movies.map((movie, index) => (
                    <Movie 
                        key={index} 
                        name={movie} 
                        onClick={() => handleClick(index)}
                        isClicked={clickedMovie === index}
                    />
                ))}
            </div>
        </div>
    );
}

