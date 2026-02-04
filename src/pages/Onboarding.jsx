import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const schema = yup.object().shape({
    fullName: yup.string().required('Full name is required').min(2, 'Name too short'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const Onboarding = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5000/api/onboarding', data);
            toast.success('Account created successfully!');
            login(response.data.user); // Log them in immediately context-wise
            navigate('/verify');
        } catch (err) {
            toast.error(err.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-sm border border-gray-100 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Create Account</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        {...register('fullName')}
                        className={`w-full px-4 py-2 border rounded-lg outline-none transition-colors ${errors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'}`}
                        placeholder="John Doe"
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                </div>

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
                    {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
};

export default Onboarding;
