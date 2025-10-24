import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, signup, isHydrated } = useAuth();

  // Show loading during hydration to prevent redirect flicker
  if (!isHydrated) {
    return (
      <div className="content">
        <div className="form-container">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent double submission

    setIsSubmitting(true);
    setError('');

    try {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }

      if (signup(username, password)) {
        setSuccess(true);
      } else {
        if (!username || !password) {
          setError('Username and password are required');
        } else {
          setError('Username already exists');
        }
      }
    } catch (err) {
      setError('An error occurred during signup');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="content">
        <div className="form-container center">
          <h1>Sign Up Successful!</h1>
          <p>Your account has been created successfully.</p>
          <p>Note: This is a demo, so the account won't persist.</p>
          <Link to="/signin">
            <button>Go to Sign In</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="content">
      <div className="form-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                required
              />
            </label>
          </div>
          <div className="form-field">
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
            </label>
          </div>
          <div className="form-field">
            <label>
              Confirm Password:
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form-input"
                required
              />
            </label>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button
            type="submit"
            className="form-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <div className="info-section">
          <Link to="/">Back to Home</Link>
          {' | '}
          <Link to="/signin">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
