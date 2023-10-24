import './detail.scss';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom"
import { fetchAsyncDetail, fetchAsyncReviews, getReviews, getSelectedMovieOrShow, removeReviews, removeSelectedMovieOrShow, setReviews } from "../../features/movies/movieSlice";
import { useEffect, useState } from "react";
import noPoster from '../../images/noPoster.png';
import ReviewCard from '../../components/reviewCard/reviewCard';
import { updateSaved } from '../../features/users/userSlice';


export default function Detail() {
    const { imdbID } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const token = useSelector((state) => state.user.token);
    const isAuth = Boolean(useSelector((state) => state.user.token));
    const user = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchAsyncReviews(imdbID));
        dispatch(fetchAsyncDetail(imdbID));
        return () => {
            dispatch(removeSelectedMovieOrShow());
            dispatch(removeReviews());
        }
    }, [imdbID]);

    const filmData = useSelector(getSelectedMovieOrShow);
    const reviewData = useSelector(getReviews);

    const patchReview = async () => {
        const fullReview = {
            title: filmData.Title,
            poster: filmData.Poster,
            username: user.user.username,
            rating,
            text: review
        };
        const response = await fetch(`https://film-finder-api.adaptable.app/detail/${imdbID}/review`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                review: fullReview
            })
        });
        const updatedReviews = await response.json();
        dispatch(setReviews(updatedReviews));
        setRating(0);
        setHover(0);
        setReview('');
    };

    const patchSaved = async () => {
        const response = await fetch('https://film-finder-api.adaptable.app/user/saved', {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: user.user._id,
                film: {
                    imdbID,
                    Title: filmData.Title,
                    Poster: filmData.Poster,
                    Year: filmData.Year
                }
            })
        });

        const updatedSaved = await response.json();
        dispatch(updateSaved(updatedSaved.saved));
    }

    return (
        <div>
            <div className="detail-controlls">
                <i className="fa-solid fa-left-long" onClick={() => navigate(-1)}></i>
                {isAuth && (
                    user.user.saved.findIndex(data => data.imdbID === imdbID) !== -1 ? (
                        <i className="fa-solid fa-bookmark" style={{ color: '#DC143C' }} onClick={patchSaved}></i>
                    ) : (
                        <i className="fa-solid fa-bookmark" onClick={patchSaved}></i>
                    )
                )}
            </div>
            <div className='movie-section'>
                {Object.keys(filmData).length === 0 ?
                    (
                        <div className='loading'>
                            <i className="fa-solid fa-circle-notch"></i>
                            <h4>Loading...</h4>
                        </div>)
                    : (
                        <>
                            <div className='section-left'>
                                <div className='movie-title'>{filmData.Title}</div>
                                <div className='movie-rating'>
                                    <div>
                                        <span>IMDB Rating <i className='fa fa-star gold'></i> : </span>
                                        <span>{filmData.imdbRating}</span>
                                    </div>
                                    <div>
                                        <span>IMDB Votes <i className='fa fa-thumbs-up'></i> : </span>
                                        <span>{filmData.imdbVotes}</span>
                                    </div>
                                    <div>
                                        <span>Runtime <i className='fa fa-film'></i> : </span>
                                        <span>{filmData.Runtime}</span>
                                    </div>
                                    <div>
                                        <span>Year <i className='fa fa-calendar'></i> : </span>
                                        <span>{filmData.Year}</span>
                                    </div>
                                </div>
                                <div className='movie-plot'>{filmData.Plot} </div>
                                <div className='movie-info'>
                                    <div>
                                        <span>Director :</span>
                                        <span>{filmData.Director}</span>
                                    </div>
                                    <div>
                                        <span>Stars :</span>
                                        <span>{filmData.Actors}</span>
                                    </div>
                                    <div>
                                        <span>Generes :</span>
                                        <span>{filmData.Genre}</span>
                                    </div>
                                    <div>
                                        <span>Languages :</span>
                                        <span>{filmData.Language}</span>
                                    </div>
                                    <div>
                                        <span>Awards :</span>
                                        <span>{filmData.Awards}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='section-right'>
                                {
                                    filmData.Poster === 'N/A' ?
                                        (
                                            <img className='noPoster' src={noPoster} alt={filmData.Title} />
                                        ) : (
                                            <img src={filmData.Poster} alt={filmData.Title} />
                                        )
                                }
                            </div>
                        </>
                    )}
            </div>
            <div className="review-section">
                <div className="review-title">
                    <h2>Rate and Review</h2>
                </div>
                <div className="review-form">
                    {isAuth ? (
                        <div>
                            <div className="star-rating">
                                {[...Array(5)].map((star, index) => {
                                    index += 1;
                                    return (
                                        <button type="button" key={index} className={index <= hover ? "on" : "off"} onClick={() => setRating(index)} onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(rating)}>
                                            <span className="star"><i className='fa fa-star'></i></span>
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="input-and-submit">
                                <textarea name='review-input' maxLength={1000} value={review} onChange={(e) => setReview(e.target.value)} placeholder='What do you think about the film?' />
                                <button onClick={patchReview} disabled={!rating} >Add Review</button>
                            </div>
                        </div>
                    ) : (
                        <Link to='/login'>
                            <button>Login to add review</button>
                        </Link>
                    )}
                </div>
                <div className="reviews">
                    {reviewData.reviews === undefined || reviewData.reviews.length === 0 ? (
                        <p className='no-review'>No reviews</p>
                    ) : (
                        reviewData.reviews.map((review, i) => (
                            <ReviewCard key={`${i}-${review.username}`} reviewText={review.text} reviewRating={review.rating} username={review.username} />
                        ))
                    )
                    }
                </div>
            </div>
        </div>
    )
};
