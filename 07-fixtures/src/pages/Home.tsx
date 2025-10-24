import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { user, logout, isHydrated } = useAuth();

  // Show loading state during hydration to prevent hydration mismatch
  if (!isHydrated) {
    return (
      <>
        <nav>
          <Link to="/">Home</Link>
        </nav>
        <div className="content">
          <h1>Loading...</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        {user?.role === 'admin' && <Link to="/settings">Settings</Link>}
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>

      <div className="content">
        <h1>Welcome to the App!</h1>
        {user ? (
          <div>
            {user.role === 'admin' ? (
              <h2>Hello admin.</h2>
            ) : (
              <h2>Hi {user.username}! 👋</h2>
            )}
            <p>
              You are logged in as: <strong>{user.username}</strong>
            </p>
            <p>
              Role: <strong>{user.role}</strong>
            </p>
          </div>
        ) : (
          <div>
            <p>Please sign in to access the full features.</p>
            <Link to="/signin">
              <button>Sign In</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
