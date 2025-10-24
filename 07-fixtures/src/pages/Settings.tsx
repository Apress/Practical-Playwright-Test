import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';

const Settings: React.FC = () => {
  const { user, isHydrated, getUserCount, getUsernames, logout } =
    useAuth();

  // Show loading during hydration
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

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (user.role !== 'admin') {
    return (
      <div className="content">
        <h1>Access Denied</h1>
        <p>You don't have permission to access this page.</p>
        <p>Only administrators can access the settings.</p>
        <Link to="/">
          <button>Back to Home</button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <button onClick={logout}>Logout</button>
      </nav>

      <div className="content">
        <h1>Settings</h1>
        <p>Welcome to the admin settings page, {user.username}!</p>

        <div className="settings-section">
          <h2>Application Settings</h2>
          <div className="settings-panel">
            <h3>User Management</h3>
            <p>Total registered users: {getUserCount()}</p>
            <p>Usernames: {getUsernames().join(', ')}</p>

            <h3>System Configuration</h3>
            <ul>
              <li>App Version: 1.0.0</li>
              <li>Environment: Development</li>
              <li>Authentication: Local (Hardcoded)</li>
            </ul>

            <h3>Feature Flags</h3>
            <div className="checkbox-group">
              <label>
                <input type="checkbox" defaultChecked /> Enable user
                registration
              </label>
              <label>
                <input type="checkbox" defaultChecked /> Enable password
                reset
              </label>
              <label>
                <input type="checkbox" /> Enable two-factor authentication
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
