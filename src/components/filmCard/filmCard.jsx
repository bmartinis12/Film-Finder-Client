import { Link } from "react-router-dom";
import './filmCard.scss';
import noPoster from '../../images/noPoster.png';

export default function FilmCard(props) {
    const { data } = props;
    return (
        <div className='card-item'>
            <Link to={`/detail/${data.imdbID}`}>
                <div className='card-inner'>
                    <div className='card-top'>
                        {
                        data.Poster === 'N/A'? 
                        (
                            <img src={noPoster} alt={data.Title} />
                        ) : (
                            <img src={data.Poster} alt={data.Title} />
                        )
                        }
                    </div>
                    <div className='card-bottom'>
                        <div className='card-info'>
                            <h4>{data.Title}</h4>
                            <p>{data.Year}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}