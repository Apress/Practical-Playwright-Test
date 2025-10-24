import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, login, isHydrated } = useAuth();

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
      if (login(username, password)) {
        // Login successful - user will be redirected automatically
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="content">
      <div className="form-container">
        <h1>Sign In</h1>
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
          {error && <div className="error-message">{error}</div>}
          <button
            type="submit"
            className="form-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className="info-section">
          <p>Demo credentials:</p>
          <p>
            <strong>Admin:</strong> username: admin, password: admin123
          </p>
          <p>
            <strong>User:</strong> username: user, password: user123
          </p>
        </div>
        <div className="info-section">
          <Link to="/">Back to Home</Link>
          {' | '}
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
