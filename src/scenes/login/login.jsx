import './login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setLogin } from '../../features/users/userSlice';
import { useState } from 'react';


export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loggedInResponse = await fetch('https://film-finder-api.adaptable.app/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailInput,
                password: passwordInput
            })
        });

        const loggedIn = await loggedInResponse.json();
        setEmailInput('');
        setPasswordInput('');
        if (loggedIn && !loggedIn.error) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
        } else {
            alert(loggedIn.error);
        };
    }

    return (
        <div className='signIn-container'>
            <h1>Sign In:</h1>
            <form onSubmit={handleSubmit}>
                <div className="signIn-row">
                    <div className="col">
                        <label>
                            <span>Email:</span>
                        </label>
                        <label>
                            <span>Password:</span>
                        </label>
                    </div>
                    <div className="col">
                        <input type="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} name='email' autoComplete="off" required />
                        <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} name='password' autoComplete="off" required />
                    </div>
                </div>
                <button type='submit' disabled={!emailInput || !passwordInput}>Submit</button>
            </form>
            <p>
                Don't have an account?
                <Link to='/register'>
                    Register
                </Link>
            </p>
        </div>
    )

}
