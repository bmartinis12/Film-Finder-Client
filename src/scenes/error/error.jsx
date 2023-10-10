import { Link } from 'react-router-dom';
import './error.scss';

export default function ErrorPage() {
    return (
        <div className="error-container">
            <h4>An error has occured</h4>
            <i className="fa-regular fa-face-frown"></i>
            <Link to='/'>
                <p>Return Home!</p>
            </Link>
        </div>
    )
}