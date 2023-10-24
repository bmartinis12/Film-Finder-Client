import { useState } from 'react';
import './register.scss';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassowrd] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const registerResponse = await fetch('https://film-finder-api.adaptable.app/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        });

        const registed = await registerResponse.json();
        setUsername('');
        setEmail('');
        setPassowrd('');
        if (registed && !registed.error) {
            navigate('/login');
        } else {
            alert(registed.error)
        }
    }

    return (
        <div className='register-container'>
            <h1>Register:</h1>
            <form onSubmit={handleSubmit}>
                <div className="register-row">
                    <div className="col">
                        <label>
                            <span>Username:</span>
                        </label>
                        <label>
                            <span>Email:</span>
                        </label>
                        <label>
                            <span>Password:</span>
                        </label>
                    </div>
                    <div className="col">
                        <input type="text" name='username' autoComplete="off" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <input type="email" name='email' autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" name='password' autoComplete="off" value={password} onChange={(e) => setPassowrd(e.target.value)} required />
                    </div>
                </div>
                <button type='submit' disabled={!email || !password || !username}>Submit</button>
            </form>
        </div>
    )
};
