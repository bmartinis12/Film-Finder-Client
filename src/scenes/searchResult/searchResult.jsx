import { useSelector } from "react-redux"
import { getAllShows, getAllMovies } from "../../features/movies/movieSlice";
import FilmList from "../../components/filmList/filmList";


export default function SearchResult() {
    const searchedMovies = useSelector(getAllMovies);
    const searchedShows = useSelector(getAllShows);

    return (
        <div>
            <div className="film-wrapper">
                <h2>Movies</h2>
                <div className="line"></div>
                <FilmList filmData={searchedMovies} />
            </div>
            <div className="film-wrapper">
                <h2>Shows</h2>
                <div className="line"></div>
                <FilmList filmData={searchedShows} />
            </div>
        </div>
    )
};