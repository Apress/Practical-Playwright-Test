import React, { createContext, useState, useEffect } from 'react';

interface User {
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  signup: (username: string, password: string) => boolean;
  isHydrated: boolean;
  getUserCount: () => number;
  getUsernames: () => string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded users for demo
const initialUsers = {
  admin: { password: 'admin123', role: 'admin' },
  user: { password: 'user123', role: 'user' },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState(initialUsers);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Prevent hydration mismatch by only checking localStorage after mount
    setIsHydrated(true);

    // Load users from localStorage or use initial users
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      try {
        setUsers(JSON.parse(storedUsers));
      } catch (error) {
        // Clear invalid stored users data
        localStorage.removeItem('users');
        console.warn('Invalid users data in localStorage, cleared');
      }
    } else {
      // Save initial users to localStorage
      localStorage.setItem('users', JSON.stringify(initialUsers));
    }

    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        // Clear invalid stored user data
        localStorage.removeItem('user');
        console.warn('Invalid user data in localStorage, cleared');
      }
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const userData = users[username as keyof typeof users];
    if (userData && userData.password === password) {
      const user = { username, role: userData.role };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const signup = (username: string, password: string): boolean => {
    // Check if username already exists
    if (!username || !password) {
      return false;
    }

    if (users[username as keyof typeof users]) {
      return false; // User already exists
    }

    // Create new user with default role 'user'
    const newUser = { password, role: 'user' };
    const updatedUsers = { ...users, [username]: newUser };
    setUsers(updatedUsers);

    // Persist updated users to localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    console.log(`User created: ${username} with role: user`);
    return true;
  };

  const getUserCount = (): number => {
    return Object.keys(users).length;
  };

  const getUsernames = (): string[] => {
    return Object.keys(users);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        isHydrated,
        getUserCount,
        getUsernames,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
