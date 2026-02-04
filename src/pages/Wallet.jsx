import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { FaWallet, FaMinus, FaArrowUp, FaArrowDown, FaMoneyBillWave, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const Wallet = () => {
    const { user } = useAuth();
    const [wallet, setWallet] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showWithdraw, setShowWithdraw] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [externalAccount, setExternalAccount] = useState('');
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if (user) {
            fetchWallet(user.id);
            fetchTransactions(user.id);
        }
    }, [user, refreshTrigger]);

    const fetchWallet = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/wallet/${userId}`);
            setWallet(response.data);
            localStorage.setItem('wallet', JSON.stringify(response.data));
        } catch (error) {
            setWallet(null);
        }
    };

    const fetchTransactions = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/transactions/${userId}`);
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions', error);
        }
    };

    const createWallet = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/wallet/create', { userId: user.id });
            setWallet(response.data.wallet);
            localStorage.setItem('wallet', JSON.stringify(response.data.wallet));
        } catch (error) {
            console.error('Error creating wallet', error);
            toast.error('Could not create wallet');
        } finally {
            setLoading(false);
        }
    };

    const handleWithdraw = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/wallet/withdraw', {
                userId: user.id,
                amount: parseFloat(withdrawAmount),
                externalAccount: externalAccount
            });
            setShowWithdraw(false);
            setWithdrawAmount('');
            setExternalAccount('');
            setRefreshTrigger(prev => prev + 1);
            toast.success('Withdrawal successful!');
        } catch (error) {
            toast.error(error.response?.data?.error || 'Withdrawal failed');
        }
    };

    // If user is not yet loaded from context, display nothing or a loader
    if (!user) return null;

    if (!wallet) {
        return (
            <div className="max-w-md mx-auto mt-20 text-center animate-fade-in">
                <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaWallet className="text-indigo-600 text-3xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Activate Your Wallet</h2>
                <p className="text-gray-600 mb-8 max-w-sm mx-auto">Create your secure wallet to start managing funds and receiving loans.</p>
                <button
                    onClick={createWallet}
                    disabled={loading}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-500/30"
                >
                    {loading ? 'Creating...' : 'Get Wallet Account'}
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            {/* User Header */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.fullName}</h1>
                    <p className="text-gray-500">{user.email}</p>
                </div>
                <div className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium ${user.verified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {user.verified ? <FaCheckCircle /> : <FaExclamationCircle />}
                    {user.verified ? 'Verified Account' : 'Pending Verification'}
                </div>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-4">My Wallet</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Balance Card */}
                <div className="md:col-span-2 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <FaWallet className="text-9xl" />
                    </div>
                    <div className="relative z-10 w-full">
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-indigo-200 font-medium">Total Balance</p>
                            <div className="text-right">
                                <p className="text-indigo-300 text-xs uppercase tracking-wider">Account Number</p>
                                <p className="font-mono text-lg tracking-widest">{wallet.accountNumber}</p>
                            </div>
                        </div>

                        <h2 className="text-5xl font-bold mb-8">
                            ${wallet?.balance?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </h2>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowWithdraw(true)}
                                className="bg-white text-indigo-700 hover:bg-gray-50 px-6 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition shadow-sm"
                            >
                                <FaMinus /> Withdraw Funds
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick Actions / Stats */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 bg-green-100 rounded-lg text-green-600">
                                <FaMoneyBillWave />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Loan Limit</p>
                                <p className="text-lg font-bold text-gray-900">$15,000.00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transaction History */}
            <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50">
                    <h3 className="text-lg font-bold text-gray-900">Transaction History</h3>
                </div>

                {transactions.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        No transactions yet.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Type</th>
                                    <th className="px-6 py-4 font-medium">Date</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                    <th className="px-6 py-4 font-medium text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {transactions.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 flex items-center gap-2">
                                            <div className={`p-2 rounded-lg ${tx.type === 'Withdrawal' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                                {tx.type === 'Withdrawal' ? <FaArrowUp className="text-xs" /> : <FaArrowDown className="text-xs" />}
                                            </div>
                                            <div>
                                                {tx.type}
                                                {tx.externalAccount && <span className="block text-xs text-gray-400 font-mono">To: {tx.externalAccount}</span>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(tx.date).toLocaleDateString()} <span className="text-xs text-gray-400">{new Date(tx.date).toLocaleTimeString()}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tx.type === 'Withdrawal' ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'}`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                        <td className={`px-6 py-4 text-sm font-bold text-right ${tx.type === 'Withdrawal' ? 'text-red-600' : 'text-green-600'}`}>
                                            {tx.type === 'Withdrawal' ? '-' : '+'}${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Withdraw Modal */}
            {showWithdraw && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm animate-fade-in">
                        <h3 className="text-xl font-bold mb-4">Withdraw Funds</h3>
                        <p className="text-sm text-gray-500 mb-4">Transfer funds to an external bank account.</p>
                        <form onSubmit={handleWithdraw}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">External Account Number</label>
                                <input
                                    type="text"
                                    value={externalAccount}
                                    onChange={(e) => setExternalAccount(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono"
                                    placeholder="0000000000"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                    <input
                                        type="number"
                                        value={withdrawAmount}
                                        onChange={(e) => setWithdrawAmount(e.target.value)}
                                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="0.00"
                                        required
                                        min="1"
                                        max={wallet?.balance}
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                                        Max: ${wallet?.balance}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowWithdraw(false)}
                                    className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
                                >
                                    Withdraw
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Wallet;
