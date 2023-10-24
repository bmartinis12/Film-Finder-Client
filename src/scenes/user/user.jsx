import './user.scss';
import userLogo from '../../images/user.png';
import { useDispatch, useSelector } from 'react-redux';
import TrendingList from '../../components/trendingList/trendingList';
import { useEffect } from 'react';
import { updateReviews, updateSaved } from '../../features/users/userSlice';
import UserReviewCard from '../../components/userReviewCard/userReviewCard';
import { useLocation } from 'react-router-dom';

export default function UserScreen() {
    const componentDidMount = (urlHash) => {
        if (urlHash.length) {
            const element = document.getElementById(urlHash.substring(1));
            if (element) {
                element.scrollIntoView();
            }
        }
    }

    const user = useSelector(state => state.user.user);
    const token = useSelector(state => state.user.token);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        getUser();
        componentDidMount(window.location.hash);
    }, [location]);

    const getUser = async () => {
        const response = await fetch(`https://film-finder-api.adaptable.app/user/current/${user._id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        const userData = await response.json();
        dispatch(updateSaved(userData.saved));
        dispatch(updateReviews(userData.reviews));
    }

    const bucket = [];

    for (let i = 0; i < user.saved.length; i += 8) {
        bucket.push(user.saved.slice(i, i + 8));
    };

    return (
        <div className='profile-wrapper' id='profile'>
            <div className="user-container">
                <img src={userLogo} alt="user" />
                <div className="user-info">
                    <h3>{user.username}</h3>
                    <p>Email: {user.email}</p>
                </div>
            </div>
            <div className="saved-container" id='saved'>
                <h2>Saved Films</h2>
                <div className="line"></div>
                {user.saved.length > 0 ? (
                    bucket.map((arr, i) => {
                        return <TrendingList key={`${i}-${user.username}-saved`} trendingData={arr} />
                    })
                ) : (
                    <p className='no-saved-data' >No saved films</p>
                )}
            </div>
            <div className="review-container" id='reviews'>
                <h2>Reviews</h2>
                <div className="line"></div>
                {user.reviews.length > 0 ? (
                    user.reviews.map((review, i) => {
                        return <UserReviewCard key={`${i}-${review.imdbID}`} review={review} />
                    })
                ) : (
                    <p className='no-review-data' >No reviews</p>
                )}
            </div>
        </div>
    );
};
