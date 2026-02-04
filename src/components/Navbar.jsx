import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white/90 backdrop-blur-md fixed top-0 w-full z-50 border-b border-gray-100/50 transition-all duration-300">
            <div className="container mx-auto px-6 h-20 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2 group">
                    {/* Logo Icon */}
                    <div className="bg-slate-900 text-white p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    Karoo
                </Link>

                {/* Centered Links (Desktop) */}
                <div className="hidden md:flex gap-8 items-center text-sm font-medium text-gray-500">
                    <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
                    <Link to="/about" className="hover:text-slate-900 transition-colors">About</Link>
                    <Link to="/services" className="hover:text-slate-900 transition-colors">Services</Link>
                    <Link to="/help" className="hover:text-slate-900 transition-colors">Help</Link>
                </div>

                <div className="flex gap-4 items-center">
                    {!user ? (
                        <Link
                            to="/onboarding"
                            className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-slate-900/20 hover:-translate-y-0.5"
                        >
                            Register now
                        </Link>
                    ) : (
                        <div className="flex items-center gap-6">
                            <div className="hidden md:flex gap-4 text-sm font-medium text-slate-600">
                                <Link to="/wallet" className="hover:text-indigo-600 transition-colors">Wallet</Link>
                                <Link to="/apply-loan" className="hover:text-indigo-600 transition-colors">Loans</Link>
                            </div>
                            <div className="w-px h-6 bg-gray-200 hidden md:block"></div>

                            <div className="flex items-center gap-3 pl-2">
                                <div className="text-right hidden sm:block">
                                    <p className="text-xs font-bold text-slate-900 leading-none">{user.fullName}</p>
                                    <p className="text-[10px] text-gray-500 font-medium">Verified User</p>
                                </div>
                                <FaUserCircle className="text-3xl text-slate-200" />
                                <button
                                    onClick={handleSignOut}
                                    className="ml-2 text-sm font-bold text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                                >
                                    Log Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
