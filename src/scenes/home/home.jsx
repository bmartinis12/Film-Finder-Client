import { json, useLoaderData } from "react-router-dom";
import TrendingList from "../../components/trendingList/trendingList";
import './home.scss';


const Home = () => {
    const { trendingMovieData, trendingShowData } = useLoaderData();

    return (
        <div>
            <div className="film-wrapper">
                <h2>Trending Movies</h2>
                <div className="line"></div>
                <TrendingList trendingData={trendingMovieData} />
            </div>
            <div className="film-wrapper">
                <h2>Trending Shows</h2>
                <div className="line"></div>
                <TrendingList trendingData={trendingShowData} />
            </div>
        </div>
    )
};

const homeLoader = async () => {
    const [trendingMovieData, trendingShowData] = await Promise.all([
        fetch('https://film-finder-api.onrender.com/trending/movies')
            .then(response => response.json()),
        fetch('https://film-finder-api.onrender.com/trending/shows')
            .then(response => response.json())
    ]);
    return json({ trendingMovieData, trendingShowData });
}

export default Home;
export { homeLoader };