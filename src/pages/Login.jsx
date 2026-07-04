import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { login, register, resetPassword } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        try {
            if (isRegistering) {
                await register(username, password);
                navigate('/dashboard');
            } else if (isResetting) {
                if (newPassword !== confirmPassword) {
                    throw new Error('Passwords do not match');
                }
                await resetPassword(username, newPassword);
                setSuccess('Password reset successfully! Please login with your new password.');
                setIsResetting(false);
                setNewPassword('');
                setConfirmPassword('');
            } else {
                await login(username, password);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Java Study Tracker</h1>
                <p>
                    {isRegistering ? 'Create an account' : 
                     isResetting ? 'Reset your password' : 
                     'Login to your account'}
                </p>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    {!isResetting && (
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    )}
                    {isResetting && (
                        <>
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </>
                    )}
                    <button type="submit">
                        {isRegistering ? 'Register' : 
                         isResetting ? 'Reset Password' : 
                         'Login'}
                    </button>
                </form>
                <div className="auth-links">
                    {!isRegistering && !isResetting && (
                        <>
                            <button onClick={() => {
                                setIsRegistering(true);
                                setError('');
                                setSuccess('');
                            }}>
                                Need an account? Register
                            </button>
                            <button onClick={() => {
                                setIsResetting(true);
                                setError('');
                                setSuccess('');
                            }}>
                                Forgot password?
                            </button>
                        </>
                    )}
                    {(isRegistering || isResetting) && (
                        <button onClick={() => {
                            setIsRegistering(false);
                            setIsResetting(false);
                            setError('');
                            setSuccess('');
                            setPassword('');
                            setNewPassword('');
                            setConfirmPassword('');
                        }}>
                            Back to Login
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
