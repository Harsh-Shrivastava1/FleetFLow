import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';

export function LandingPage() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);

    // Check if user is already logged in
    const isLoggedIn = !!localStorage.getItem('user');

    const handleGetStarted = () => {
        if (isLoggedIn) {
            navigate('/dashboard');
        } else {
            setIsLogin(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleSecondaryAction = () => {
        if (isLoggedIn) {
            navigate('/dashboard');
        } else {
            setIsLogin(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 relative">
            {/* BRAND LOGO TOP LEFT */}
            <div className="absolute top-6 left-6 lg:top-8 lg:left-8 flex items-center gap-2 z-50">
                <span className="text-lg font-bold tracking-tight text-gray-900"></span>
            </div>

            {/* SECTION 1: HERO SECTION */}
            <section className="max-w-7xl mx-auto px-6 w-full min-h-[100dvh] grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-semibold tracking-tight text-gray-900 leading-tight">
                        Manage Your Fleet. <br />Optimize Every Mile.
                    </h1>
                    <p className="text-lg text-gray-500 max-w-lg leading-relaxed">
                        FleetFlow is a modular fleet and logistics management system designed to streamline operations, track performance, and improve decision-making.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <Button className="h-12 px-6 bg-black text-white hover:bg-gray-900 rounded-lg font-medium text-base shadow-sm focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 transition-all" onClick={handleGetStarted}>
                            {isLoggedIn ? 'Go to Dashboard' : 'Sign In'}
                        </Button>
                        <Button variant="outline" className="h-12 px-6 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium text-base focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 transition-all" onClick={handleSecondaryAction}>
                            {isLoggedIn ? 'View Dashboard' : 'Register Now'}
                        </Button>
                    </div>
                </motion.div>

                <motion.div
                    id="auth-section"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="relative w-full max-w-md mx-auto lg:ml-auto lg:mr-0 xl:max-w-lg perspective -mt-8"
                >
                    <div className={`relative w-full transition-transform duration-500 [transform-style:preserve-3d] min-h-[550px] ${isLogin ? "" : "rotate-y-180"}`}>

                        {/* FRONT (Login) */}
                        <div className="absolute top-0 left-0 w-full h-full backface-hidden z-10">
                            <div className="w-full relative [&>div]:min-h-[auto] [&>div]:bg-transparent [&>div]:p-0 [&>div]:sm:p-0">
                                <LoginPage onToggleView={() => setIsLogin(false)} />
                            </div>
                        </div>

                        {/* BACK (Register) */}
                        <div className="absolute top-0 left-0 w-full h-full rotate-y-180 backface-hidden pointer-events-auto">
                            <div className="w-full relative [&>div]:min-h-[auto] [&>div]:bg-transparent [&>div]:p-0 [&>div]:sm:p-0">
                                <RegisterPage onToggleView={() => setIsLogin(true)} />
                            </div>
                        </div>

                    </div>
                </motion.div>
            </section >

            {/* SECTION 3: FEATURES */}
            < section className="max-w-7xl mx-auto px-6 py-16" >
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="rounded-xl border-gray-200 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold text-gray-900">Fleet Management</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500">Track vehicles, availability, and lifecycle.</p>
                            </CardContent>
                        </Card>
                        <Card className="rounded-xl border-gray-200 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold text-gray-900">Smart Dispatching</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500">Assign drivers and trips with validation.</p>
                            </CardContent>
                        </Card>
                        <Card className="rounded-xl border-gray-200 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold text-gray-900">Maintenance Tracking</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500">Prevent breakdowns with service logs.</p>
                            </CardContent>
                        </Card>
                        <Card className="rounded-xl border-gray-200 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold text-gray-900">Analytics & Insights</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-500">Monitor fuel, cost, and ROI.</p>
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>
            </section >

            {/* SECTION 4: HOW IT WORKS */}
            < section className="bg-gray-50 border-y border-gray-100 py-16" >
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                    className="max-w-7xl mx-auto px-6 text-center"
                >
                    <div className="flex flex-col md:flex-row justify-center items-start gap-8 md:gap-4 lg:gap-8 relative">
                        {['Register Fleet', 'Assign Drivers', 'Dispatch Trips', 'Monitor Performance'].map((step, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center relative z-10">
                                <div className="w-12 h-12 rounded-full bg-white border-2 border-black flex items-center justify-center font-bold text-lg mb-4 text-gray-900 shadow-sm">
                                    {idx + 1}
                                </div>
                                <h3 className="font-semibold text-gray-900">{step}</h3>
                                {idx < 3 && (
                                    <div className="hidden md:block absolute top-6 left-[calc(50%+1.5rem)] w-[calc(100%-3rem)] h-[2px] bg-gray-200 -z-10"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section >

            {/* SECTION 4: CTA SECTION */}
            < section className="max-w-7xl mx-auto px-6 py-24 text-center" >
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                >
                    <h2 className="text-3xl font-semibold tracking-tight text-gray-900 mb-8">Start Managing Your Fleet Today</h2>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Button className="bg-black text-white hover:bg-gray-900 font-medium rounded-lg px-8 h-12 text-base shadow-sm focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 transition-all" onClick={handleGetStarted}>
                            {isLoggedIn ? 'Go to Dashboard' : 'Sign In'}
                        </Button>
                        <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg px-8 h-12 text-base focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1 transition-all" onClick={handleSecondaryAction}>
                            {isLoggedIn ? 'View Dashboard' : 'Register Now'}
                        </Button>
                    </div>
                </motion.div>
            </section >

            {/* SECTION 5: FOOTER */}
            < footer className="border-t border-gray-100 py-8 bg-white" >
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                            <span className="text-white font-bold text-xs">F</span>
                        </div>
                        <span className="font-bold text-gray-900 tracking-tight">FleetFlow</span>
                    </div>
                    <p className="text-sm text-gray-500">© 2026 FleetFlow. All rights reserved.</p>
                </div>
            </footer >
        </div >
    );
}
