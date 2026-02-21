import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

export function RegisterPage() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Dispatcher');

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        // Setup Mock User Session and redirect
        localStorage.setItem('user', JSON.stringify({ email: email, role: role }));
        navigate('/dashboard');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-8 font-sans"
        >
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-4 hover:scale-[1.02] transition-transform">
                        <span className="text-white font-bold text-xl">F</span>
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Create Account</h1>
                    <p className="text-sm text-gray-500 mt-2">Set up your profile for unified fleet access.</p>
                </div>

                <Card className="border-gray-200 shadow-sm rounded-2xl">
                    <CardContent className="p-8 pt-8">
                        <form onSubmit={handleRegister} className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-900">Full Name</Label>
                                <Input
                                    required
                                    placeholder="John Doe"
                                    className="h-10 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 rounded-lg border-gray-200"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-900">Email Address</Label>
                                <Input
                                    type="email"
                                    required
                                    placeholder="name@company.com"
                                    className="h-10 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 rounded-lg border-gray-200"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-900">Password</Label>
                                <Input
                                    type="password"
                                    required
                                    className="h-10 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 rounded-lg border-gray-200"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-900">Requested Role</Label>
                                <Select value={role} onValueChange={setRole}>
                                    <SelectTrigger className="w-full focus:ring-2 focus:ring-black focus:ring-offset-1 rounded-lg">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-lg shadow-md border-gray-200">
                                        <SelectItem value="Manager" className="hover:bg-gray-100 transition-colors">Manager</SelectItem>
                                        <SelectItem value="Dispatcher" className="hover:bg-gray-100 transition-colors">Dispatcher</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button type="submit" className="w-full h-10 rounded-lg font-medium bg-black text-white hover:bg-gray-900 focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 transition-all mt-2">Create Account</Button>
                        </form>
                    </CardContent>
                </Card>

                <p className="text-center text-sm text-gray-600 mt-8 mb-4">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-gray-900 hover:text-black transition-colors hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </motion.div>
    );
}
