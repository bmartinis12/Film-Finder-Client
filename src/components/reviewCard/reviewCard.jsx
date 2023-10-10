import './reviewCard.scss'

export default function ReviewCard(props) {
    const { reviewText, reviewRating, username } = props;

    return(
        <div className="reviewCard-container">
            <div className='reviewCard-row'>
                <h4><span className='red'>User:</span> {username}</h4>
                <div className='star-ratings'>
                    {[...Array(reviewRating)].map((star, index) => {
                        index += 1;
                        return (
                            <span key={`${index}-${reviewRating}`} className="star"><i className='fa fa-star gold'></i></span>
                        );
                    })}
                    {[...Array(5-reviewRating)].map((star, index) => {
                        index += 1;
                        return (
                            <span key={index} className="star"><i className='fa fa-star'></i></span>
                        );
                    })}
                </div>
            </div>
            { reviewText !== '' && (
                <p><i className="fa-solid fa-quote-left"></i> {reviewText} <i className="fa-solid fa-quote-right"></i> </p>
            ) }
        </div>
    )
}