import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                // Trigger an event so navbar can update without refresh
                window.dispatchEvent(new Event('auth-change'));
                navigate('/');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('Network error: Ensure backend is running.');
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[var(--color-surface)] border-4 border-[var(--color-border)] brutal-shadow p-8">
                <h2 className="text-4xl font-black uppercase tracking-tighter mb-6 text-center text-[var(--color-text-primary)]">Login</h2>
                {error && (
                    <div className="mb-4 p-3 bg-red-600 text-white font-bold border-4 border-black brutal-shadow uppercase text-sm">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-1">
                        <label className="font-bold uppercase text-lg text-[var(--color-text-primary)]">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-3 border-4 border-[var(--color-border)] bg-gray-50 text-black font-bold focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)] placeholder-gray-400 brutal-shadow-hover transition-shadow"
                            placeholder="YOUR EMAIL"
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label className="font-bold uppercase text-lg text-[var(--color-text-primary)]">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-3 border-4 border-[var(--color-border)] bg-gray-50 text-black font-bold focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)] placeholder-gray-400 brutal-shadow-hover transition-shadow"
                            placeholder="YOUR PASSWORD"
                        />
                    </div>
                    <button
                        type="submit"
                        className="mt-6 p-4 text-xl font-bold uppercase border-4 border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-text-light)] brutal-shadow hover:scale-[1.02] active:scale-[0.98] transition-transform cursor-pointer"
                    >
                        Sign In
                    </button>
                </form>
                <div className="mt-6 text-center font-bold text-lg text-[var(--color-text-primary)] uppercase">
                    No account? <Link to="/register" className="text-[var(--color-primary)] hover:underline ml-1 hover:text-blue-600 transition-colors">Register</Link>
                </div>
            </div>
        </div>
    );
}
