import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { removeMoviesAndShows, fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice';
import './searchbar.scss';

export default function SearchBar() {
    const [term, setTerm] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSumbit = (e) => {
        e.preventDefault();
        if(!term || term === '') return;
        dispatch(removeMoviesAndShows());
        dispatch(fetchAsyncMovies(term));
        dispatch(fetchAsyncShows(term));
        setTerm('');
        navigate('/search');
    }
    return (
        <div className='search-bar'>
            <form onSubmit={handleSumbit}>
                <button type='submit' disabled={!term}><i className='fa fa-search'></i></button>
                <input type="text" name="search-input" id="search-input" value={term} onChange={(e) => setTerm(e.target.value)} placeholder='Search movies or shows' />
            </form>
        </div>
    )
}
