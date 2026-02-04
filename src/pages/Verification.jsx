import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaEllipsisV } from 'react-icons/fa';

const Verification = () => {
    const { user, login } = useAuth();
    const [progress, setProgress] = useState(0);
    const [scanning, setScanning] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Auto-start scanning simulation
        setScanning(true);
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 99) {
                    clearInterval(interval);
                    completeVerification();
                    return 99;
                }
                return prev + 1;
            });
        }, 50); // Speed of scan

        return () => clearInterval(interval);
    }, []);

    const completeVerification = async () => {
        try {
            // Mock API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            const response = await axios.post('http://localhost:5000/api/verify', {
                userId: user.id
            });

            if (response.data.verified) {
                // Update local user state via context
                login({ ...user, verified: true });
                toast.success('Face Verification Successful!');
                setTimeout(() => {
                    navigate('/wallet', { state: { createWallet: true } });
                }, 1000);
            }
        } catch (error) {
            toast.error('Verification failed. Please try again.');
            setScanning(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900 text-white flex flex-col items-center justify-between py-10 px-4">
            {/* Header */}
            <div className="w-full flex justify-between items-center max-w-md">
                <button onClick={() => navigate(-1)} className="p-2">
                    <FaArrowLeft className="text-xl" />
                </button>
                <h1 className="text-lg font-medium">Face verification</h1>
                <button className="p-2">
                    <FaEllipsisV className="text-xl" />
                </button>
            </div>

            {/* Instruction */}
            <div className="text-center mt-6">
                <h2 className="text-2xl font-bold mb-2">Face verification</h2>
                <p className="text-slate-400">Look into camera and hold still</p>
            </div>

            {/* Scan Area */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 my-8">
                {/* Face Mesh Simulation Image/Graphic */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden border-4 border-slate-700 bg-slate-800">
                    {/* Placeholder for Face Mesh - In a real app this would be a <video> or <canvas> */}
                    <div className="w-full h-full relative">
                        <img
                            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=688&auto=format&fit=crop"
                            alt="Face Scan"
                            className="w-full h-full object-cover opacity-60"
                        />
                        {/* Mesh Overlay Animation */}
                        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Culais_wireframe.svg/1024px-Culais_wireframe.svg.png')] bg-cover opacity-30 mix-blend-overlay animate-pulse"></div>

                        {/* Scan Line */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>

                        {/* Facial Landmarks Simulation */}
                        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-white rounded-full opacity-80 shadow-glow"></div>
                        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white rounded-full opacity-80 shadow-glow"></div>
                        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full opacity-80 shadow-glow"></div>

                        {/* Corners */}
                        <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-teal-400 rounded-tl-lg"></div>
                        <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-teal-400 rounded-tr-lg"></div>
                        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-teal-400 rounded-bl-lg"></div>
                        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-teal-400 rounded-br-lg"></div>
                    </div>
                </div>
            </div>

            {/* Status */}
            <div className="text-center w-full max-w-xs">
                <p className="text-yellow-300 font-medium mb-4 animate-pulse">Please blink your eyes</p>

                <div className="text-5xl font-bold mb-4 font-mono">{progress}%</div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-yellow-300 to-teal-400 transition-all duration-75"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <p className="text-slate-400 mt-2 text-sm">Verifying Your Face</p>
            </div>

            {/* Bottom Action */}
            <button
                className="w-full max-w-md bg-teal-600 hover:bg-teal-500 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 mt-8 transition-colors"
                disabled={progress < 99}
            >
                Done <FaArrowLeft className="rotate-180" />
            </button>
        </div>
    );
};

export default Verification;
