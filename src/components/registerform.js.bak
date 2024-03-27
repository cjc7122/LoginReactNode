import React, { useState } from 'react';

function RegistrationForm({ onBackToLogin, onRegister }) {
	const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
	
    const handleRegister = () => {
        if (!username || !password1 || !password2) {
            setError('Please enter all fields');
            return;
        }
		
		if (password1 !== password2) {
			setError('Passwords different');
			return;
		}

        register(username, password1);
    };
	
	const register = async (username, password1) => {
        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password1 })
            });
            const data = await response.json();
            if (response.ok) {
                // Login successful, perform necessary actions
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setError('An unexpected error occurred');
        }
    };

    return (
        <div id="registration-popup" className="popup">
            <h2>Register</h2>
            <div className="rowholder">
                <label htmlFor="email">Email:</label>
                <input type="email" id="username" name="username" className="username-input" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="rowholder">
                <label htmlFor="password1">Password:</label>
                <input type="password" id="password1" name="password1" className="password-input" value={password1} onChange={(e) => setPassword1(e.target.value)} required />
            </div>
            <div className="rowholder">
                <label htmlFor="password2">2x Password:</label>
                <input type="password" id="password2" name="password2" className="password-input" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
            </div>

            <button type="button" id="pop-up-register" onClick={handleRegister}>Register</button>
            <label id="pop-up-switch" onClick={onBackToLogin}>Have an account? Login here!</label>
			
			<br />
            <label id="ErrorMSG">{error}</label>
        </div>
    );
}

export default RegistrationForm;
