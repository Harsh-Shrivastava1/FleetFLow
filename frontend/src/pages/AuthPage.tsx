import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const MOCK_USERS = [
    { email: "manager@test.com", password: "1234", role: "Manager" },
    { email: "dispatcher@test.com", password: "1234", role: "Dispatcher" }
];

export function AuthPage() {
    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState('manager@test.com');
    const [loginPassword, setLoginPassword] = useState('1234');
    const [loginRole, setLoginRole] = useState('Manager');
    const [loginError, setLoginError] = useState('');

    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [regRole, setRegRole] = useState('Dispatcher');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError('');

        const user = MOCK_USERS.find(
            u => u.email === loginEmail && u.password === loginPassword && u.role === loginRole
        );

        if (user) {
            navigate('/dashboard');
        } else {
            setLoginError('Invalid credentials (check email, password, or role)');
        }
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        // Just mock functionality for now
        alert(`Mock Register Success for ${regName} as ${regRole}`);
        navigate('/dashboard');
    };

    return (
        <div className="flex min-h-screen bg-white text-gray-900 font-sans">

            {/* Left Side: Login */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-16 border-r border-gray-100">
                <div className="w-full max-w-sm space-y-8">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-semibold tracking-tight">Welcome Back</h1>
                        <p className="text-sm text-gray-500">Enter your credentials to access the command center.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Role</label>
                            <select
                                value={loginRole}
                                onChange={(e) => setLoginRole(e.target.value)}
                                className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-black"
                            >
                                <option value="Manager">Manager</option>
                                <option value="Dispatcher">Dispatcher</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Email</label>
                            <Input
                                type="email"
                                required
                                placeholder="manager@test.com"
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Password</label>
                            <Input
                                type="password"
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>

                        {loginError && <p className="text-sm text-red-600 font-medium">{loginError}</p>}

                        <Button type="submit" className="w-full">Sign In</Button>
                    </form>

                    <div className="text-center text-xs text-gray-500">
                        <p>Hint: Use manager@test.com / 1234 / Manager</p>
                    </div>
                </div>
            </div>


            {/* Right Side: Register */}
            <div className="flex-1 bg-gray-50 flex flex-col items-center justify-center p-8 lg:p-16">
                <div className="w-full max-w-sm space-y-8">
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-semibold tracking-tight">Create Account</h1>
                        <p className="text-sm text-gray-500">Register a new profile for fleet access.</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Full Name</label>
                            <Input
                                required
                                placeholder="John Doe"
                                value={regName}
                                onChange={(e) => setRegName(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Email</label>
                            <Input
                                type="email"
                                required
                                placeholder="you@example.com"
                                value={regEmail}
                                onChange={(e) => setRegEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Password</label>
                            <Input
                                type="password"
                                required
                                value={regPassword}
                                onChange={(e) => setRegPassword(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Role Request</label>
                            <select
                                value={regRole}
                                onChange={(e) => setRegRole(e.target.value)}
                                className="flex h-9 w-full rounded-md border border-gray-200 bg-white px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-black"
                            >
                                <option value="Manager">Manager</option>
                                <option value="Dispatcher">Dispatcher</option>
                            </select>
                        </div>

                        <Button type="submit" variant="outline" className="w-full">Register Account</Button>
                    </form>
                </div>
            </div>

        </div>
    );
}
