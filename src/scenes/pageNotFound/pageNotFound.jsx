import { Link } from 'react-router-dom';
import './pageNotFound.scss';

export default function PageNotFound() {
    return (
        <div className="pnf-container">
            <h4>Page Not Found</h4>
            <i className="fa-regular fa-face-frown"></i>
            <Link to='/'>
                <p>Return Home!</p>
            </Link>
        </div>
    )
}