import Slider from 'react-slick';
import { settings } from '../../common/settings';
import FilmCard from '../filmCard/filmCard';
import './trendingList.scss';

export default function TrendingList(props) {
    let renderTrending = '';

    const { trendingData } = props;

    renderTrending = trendingData.length > 0 ? (
        trendingData.map((film, index) => {
            return <FilmCard key={index} data={film} />;
        })
    ):(
        [
            <h3 className='film-error' key='error-film'>Sorry, nothing is trending</h3>
        ]
    );

    return (
        <div className="trending-container">
            <Slider {...settings}>
                {renderTrending}
            </Slider>
        </div>
    )
};