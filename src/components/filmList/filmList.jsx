import './filmList.scss';
import Slider from 'react-slick';
import { settings } from '../../common/settings';
import FilmCard from '../filmCard/filmCard';


export default function FilmList(props) {
    let renderFilm = '';

    const { filmData } = props;

    renderFilm = filmData.Response === 'True' ? (
        filmData.Search.map((film, index) => {
            return <FilmCard key={index} data={film} />;
        })
    ):(
        [
            <h3 className='film-error' key='error-film'>No match</h3>
        ]
    );

    return (
        <div className="film-container">
            <Slider {...settings}>
                {renderFilm}
            </Slider>
        </div>
    )
};
