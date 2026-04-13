import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

/**
 * Decode a JWT payload without verifying the signature.
 * Safe to use on the client because we only READ the payload — the server
 * validates the signature before acting on any protected request.
 */
function decodeToken(token) {
    try {
        const base64Payload = token.split('.')[1];
        const json = atob(base64Payload.replace(/-/g, '+').replace(/_/g, '/'));
        return JSON.parse(json);
    } catch {
        return null;
    }
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Hydrate from localStorage on first load
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const payload = decodeToken(token);
            if (payload && payload.exp * 1000 > Date.now()) {
                setUser({ id: payload.id, username: payload.username });
                setRole(payload.role || 'user');
                setIsLoggedIn(true);
            } else {
                // Token expired — clean up
                localStorage.removeItem('token');
            }
        }
    }, []);

    /** Call this after a successful /auth/login response */
    const login = (token) => {
        localStorage.setItem('token', token);
        const payload = decodeToken(token);
        if (payload) {
            setUser({ id: payload.id, username: payload.username });
            setRole(payload.role || 'user');
            setIsLoggedIn(true);
        }
        window.dispatchEvent(new Event('auth-change'));
    };

    /** Call this to log out */
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setRole(null);
        setIsLoggedIn(false);
        window.dispatchEvent(new Event('auth-change'));
    };

    return (
        <AuthContext.Provider value={{ user, role, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

/** Convenience hook */
export function useAuth() {
    return useContext(AuthContext);
}
