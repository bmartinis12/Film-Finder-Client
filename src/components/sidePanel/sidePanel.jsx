import './sidePanel.scss';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import user from '../../images/user.png';
import { setLogout } from '../../features/users/userSlice';

export default function SidePanel() {
    const dispatch = useDispatch();
    const [menuToggled, setMenuToggled] = useState(false);
    const isMobileScreens = useMediaQuery('(max-width: 59.3em)');
    const isAuth = Boolean(useSelector((state) => state.user.token));

    return (
        <div className='mobile-wrapper'>
            { (isMobileScreens && menuToggled) || !isMobileScreens ? (
                <div className="side-panel">
                    <div className="sub-section">
                        { isAuth ? (
                            <div className='user-image'>
                                <Link to='/user/#profile' onClick={() => setMenuToggled(!menuToggled)}>
                                    <img src={user} alt='user' />
                                    <p>Account</p>
                                </Link>
                            </div>
                        ) : (
                            <Link to='/login' onClick={() => setMenuToggled(!menuToggled)} >
                                <i className="fa-regular fa-user"></i> 
                                <p>Login</p>
                            </Link>
                        )
                        }
                    </div>
                    { isAuth && (
                        <div className="sub-section">
                            <Link to='/' onClick={() => { dispatch(setLogout()); setMenuToggled(!menuToggled) }}>
                                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                                <p>Log Out</p>
                            </Link>
                        </div>
                    )}
                    <div className="sub-section">
                        <Link to={isAuth ? '/user/#saved' : '/login'} onClick={() => setMenuToggled(!menuToggled)} >
                            <i className="fa-solid fa-bookmark"></i>
                            <p>Saved</p>
                        </Link>
                    </div>
                    <div className="sub-section">
                        <Link to={isAuth ? '/user/#reviews' : '/login'} onClick={() => setMenuToggled(!menuToggled)} >
                            <i className="fa-solid fa-star white"></i>
                            <p>Reviews</p>
                        </Link>
                    </div>
                    <div className="sub-section">
                        <p className='copy-write' >©2023, Movie, Inc. or its affiliates</p>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
            <div className="mobile-pulldown">
                    { menuToggled ? (
                        <i className='fa-solid fa-chevron-up' onClick={() => setMenuToggled(!menuToggled)}></i>
                    ): (
                        <i className='fa-solid fa-chevron-down' onClick={() => setMenuToggled(!menuToggled)}></i>
                    )}
            </div>
        </div>
    )
};