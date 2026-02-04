import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import heroPhone from '../assets/hero-phone.png';
import featureCard from '../assets/feature-card.png';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';

const Home = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleApplyNow = () => {
        if (!user) {
            navigate('/login');
        } else {
            navigate('/apply-loan');
        }
    };

    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Navbar is rendered in App.jsx, but we are designing the page flow */}

            {/* Hero Section */}
            <header className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <p className="text-sm font-semibold text-gray-500 mb-4 tracking-wide uppercase">Fuss-Free Finance</p>
                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-6">
                        Fuss-Free Finance
                    </h1>
                    <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
                        A loan that's easier, faster, and better.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                        <button
                            onClick={handleApplyNow}
                            className="bg-slate-900 text-white px-8 py-3.5 rounded-full font-medium hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Apply now
                        </button>
                        <button
                            onClick={() => navigate('/onboarding')}
                            className="bg-gray-100 text-slate-900 px-8 py-3.5 rounded-full font-medium hover:bg-gray-200 transition-all"
                        >
                            Learn more
                        </button>
                    </div>

                    {/* Authentication Check Widget (Design Element) */}
                    <div className="relative max-w-5xl mx-auto mt-8">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                            {/* Left: Floating Notification */}
                            <div className="hidden md:block absolute left-10 top-1/2 -translate-y-1/2 animate-float-slow z-20">
                                <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <div className="flex -space-x-2">
                                            <div className="w-6 h-6 rounded-full bg-red-400 border-2 border-white"></div>
                                            <div className="w-6 h-6 rounded-full bg-yellow-400 border-2 border-white"></div>
                                            <div className="w-6 h-6 rounded-full bg-blue-400 border-2 border-white"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-semibold">5K+ users</p>
                                        <p className="text-xs font-bold text-slate-900">❤️❤️❤️ Karoo!</p>
                                    </div>
                                </div>
                            </div>

                            {/* Center: Hero Image */}
                            <div className="relative z-10 animate-fade-in-up">
                                <img
                                    src={heroPhone}
                                    alt="App Interface"
                                    className="w-64 md:w-80 rounded-[3rem] shadow-2xl border-8 border-slate-900/10"
                                />
                                {/* Glow Effect */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/20 blur-[100px] -z-10 rounded-full"></div>
                            </div>

                            {/* Right: Loan Approved Widget */}
                            <div className="hidden md:block absolute right-20 top-1/2 -translate-y-1/2 animate-float-delayed z-20">
                                <div className="bg-white/80 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/50 w-48">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="text-xs font-bold text-slate-900 leading-tight">Your loan is<br />approved!</p>
                                        </div>
                                        <div className="w-6 h-6 bg-teal-400 rounded-full flex items-center justify-center text-white text-xs">
                                            <FaCheckCircle />
                                        </div>
                                    </div>
                                    <div className="h-1 w-full bg-gray-100 rounded-full mb-2 overflow-hidden">
                                        <div className="h-full bg-teal-400 w-full animate-progress-fill"></div>
                                    </div>
                                    <p className="text-xl font-bold text-slate-900">$2,000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Feature Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-16 max-w-6xl mx-auto">
                        <div className="md:w-1/2 text-left">
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                                Experience Banking<br />Designed For You
                            </h2>
                            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                                From seamless money transfers and effortless payments to intelligent financial insights, our platform is designed with cutting-edge technology to meet your needs in today's fast-paced world.
                            </p>
                        </div>
                        <div className="md:w-1/2 relative">
                            <img
                                src={featureCard}
                                alt="Premium Card"
                                className="w-full rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute bottom-6 left-6 text-white">
                                <h3 className="text-xl font-bold">Karoo</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer-like CTA */}
            <section className="py-20 bg-slate-50 text-center">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to get started?</h2>
                <button
                    onClick={() => navigate('/onboarding')}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition"
                >
                    Create your account <FaArrowRight className="inline ml-2" />
                </button>
            </section>
        </div>
    );
};

export default Home;
