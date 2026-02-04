import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', data);
            toast.success('Welcome back!');
            login(response.data.user);
            navigate('/wallet');
        } catch (err) {
            toast.error(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Welcome Back</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        {...register('email')}
                        className={`w-full px-4 py-2 border rounded-lg outline-none transition-colors ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'}`}
                        placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        {...register('password')}
                        className={`w-full px-4 py-2 border rounded-lg outline-none transition-colors ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'}`}
                        placeholder="••••••••"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isSubmitting ? 'Logging In...' : 'Log In'}
                </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
                Don't have an account? <Link to="/onboarding" className="text-indigo-600 font-medium hover:underline">Sign up</Link>
            </p>
        </div>
    );
};

export default Login;
