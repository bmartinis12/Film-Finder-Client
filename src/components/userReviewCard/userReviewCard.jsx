import './userReviewCard.scss';
import { Link } from 'react-router-dom';

export default function UserReviewCard(props) {
    let review = props;
    review = review.review;

    return (
        <div className='user-review-container'>
            <Link to={`/detail/${review.imdbID}`} className="user-review-card">
                <h4>{review.title}</h4>
                <div className="row">
                    <img src={review.poster} alt={review.title} />
                    <div className="user-review-rating">
                        <div className='star-ratings'>
                            {[...Array(review.rating)].map((star, index) => {
                                index += 1;
                                return (
                                    <span key={`${index}-${review.rating}`} className="star"><i className='fa fa-star gold'></i></span>
                                );
                            })}
                            {[...Array(5-review.rating)].map((star, index) => {
                                index += 1;
                                return (
                                    <span key={index} className="star"><i className='fa fa-star'></i></span>
                                );
                            })}
                        </div>
                        {review.text !== '' && (
                            <p  className='no-review'>{review.text}</p>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    )
}