import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2 mb-4">
                            <div className="bg-slate-900 text-white p-1.5 rounded-lg">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                            </div>
                            Karoo
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Empowering your financial journey with instant loans and secure wallet management.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><Link to="/about" className="hover:text-indigo-600 transition-colors">About Us</Link></li>
                            <li><Link to="/careers" className="hover:text-indigo-600 transition-colors">Careers</Link></li>
                            <li><Link to="/blog" className="hover:text-indigo-600 transition-colors">Blog</Link></li>
                            <li><Link to="/press" className="hover:text-indigo-600 transition-colors">Press</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Support</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><Link to="/help" className="hover:text-indigo-600 transition-colors">Help Center</Link></li>
                            <li><Link to="/contact" className="hover:text-indigo-600 transition-colors">Contact Us</Link></li>
                            <li><Link to="/terms" className="hover:text-indigo-600 transition-colors">Terms of Service</Link></li>
                            <li><Link to="/privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Follow Us</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                                <FaFacebook />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                                <FaTwitter />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                                <FaInstagram />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Karoo Financial. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-gray-600">Privacy</Link>
                        <Link to="/terms" className="hover:text-gray-600">Terms</Link>
                        <Link to="/cookies" className="hover:text-gray-600">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
