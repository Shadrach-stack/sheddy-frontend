import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaMoneyBillWave, FaCheck, FaUserCheck, FaExclamationCircle } from 'react-icons/fa';

const LoanApplication = () => {
    const [loanOptions, setLoanOptions] = useState([]);
    const [selectedLoan, setSelectedLoan] = useState(null);
    const [amount, setAmount] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [isAccountVerified, setIsAccountVerified] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        // Fetch static loan options
        const fetchOptions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/loans/static');
                setLoanOptions(response.data);
            } catch (error) {
                console.error('Failed to load options', error);
            }
        };
        fetchOptions();
    }, []);

    // Auto-verify when account number reaches 10 digits
    useEffect(() => {
        if (accountNumber && accountNumber.length === 10) {
            verifyAccount();
        }
    }, [accountNumber]);

    const verifyAccount = async () => {
        if (!accountNumber || accountNumber.length < 10) return;

        setVerifying(true);
        setRecipientName('');
        setIsAccountVerified(false);

        try {
            // Add artificial delay to verify loader visibility (optional, but good for UX feel)
            // await new Promise(resolve => setTimeout(resolve, 500)); 

            const response = await axios.get(`http://localhost:5000/api/wallet/lookup/${accountNumber}`);
            if (response.data.valid) {
                setRecipientName(response.data.ownerName);
                setIsAccountVerified(true);
            }
        } catch (error) {
            // console.error('Account lookup failed', error);
            setRecipientName('');
            setIsAccountVerified(false);
        } finally {
            setVerifying(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('Please login first');
            navigate('/onboarding');
            return;
        }

        if (!isAccountVerified) {
            toast.error('Please verify the destination account number first.');
            return;
        }

        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/loans/apply', {
                userId: user.id,
                loanId: selectedLoan.id,
                amount: parseFloat(amount),
                accountNumber: accountNumber
            });
            setSuccess(true);
            setTimeout(() => {
                navigate('/wallet');
            }, 3000);
        } catch (error) {
            console.error(error);
            toast.error('Application failed');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="max-w-md mx-auto mt-20 text-center animate-fade-in-up">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <FaCheck className="text-green-600 text-3xl" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Loan Approved!</h2>
                <p className="text-gray-600 text-lg">The funds have been credited to:</p>
                <div className="bg-gray-50 rounded-lg p-4 mt-4 mb-6 inline-block text-left w-full">
                    <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Credited To</p>
                    <p className="text-xl font-bold text-gray-900">{recipientName}</p>
                    <p className="text-sm text-gray-500 font-mono">{accountNumber}</p>
                </div>
                <p className="text-sm text-gray-500 mt-4">Redirecting to wallet...</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto animate-fade-in-up">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Apply for a Loan</h1>
            <p className="text-gray-600 mb-8">Choose a plan that works best for you.</p>

            <div className="grid gap-4 mb-8">
                {loanOptions.map((option) => (
                    <div
                        key={option.id}
                        onClick={() => setSelectedLoan(option)}
                        className={`p-6 border rounded-2xl cursor-pointer transition-all ${selectedLoan?.id === option.id
                            ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-600 shadow-md'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{option.name}</h3>
                                <p className="text-indigo-600 font-medium">{option.interestRate} Interest</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500 uppercase tracking-wide">Up to</p>
                                <p className="text-xl font-bold text-gray-900">${option.maxAmount.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedLoan && (
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl animate-fade-in-up">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <FaMoneyBillWave className="text-indigo-600" /> Application Details
                    </h3>

                    {/* Amount Field */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Loan Amount (Max ${selectedLoan.maxAmount.toLocaleString()})
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">$</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                max={selectedLoan.maxAmount}
                                className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 outline-none transition-colors font-medium text-lg"
                                placeholder="0.00"
                                required
                            />
                        </div>
                    </div>

                    {/* Account Verification Field */}
                    <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Destination Account Number
                        </label>
                        <div className="relative mb-2">
                            <input
                                type="text"
                                value={accountNumber}
                                onChange={(e) => {
                                    setAccountNumber(e.target.value);
                                    setIsAccountVerified(false);
                                    setRecipientName('');
                                }}
                                onBlur={verifyAccount}
                                className={`w-full pl-4 pr-12 py-3 border-2 rounded-xl focus:outline-none transition-colors font-mono
                                    ${isAccountVerified
                                        ? 'border-green-500 focus:border-green-500'
                                        : 'border-gray-200 focus:border-indigo-500'
                                    }`}
                                placeholder="Enter 10-digit account number"
                                required
                                minLength="10"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                {verifying ? (
                                    <div className="animate-spin h-5 w-5 border-2 border-indigo-500 border-t-transparent rounded-full"></div>
                                ) : isAccountVerified ? (
                                    <FaCheck className="text-green-500 text-lg" />
                                ) : (
                                    <FaUserCheck className="text-gray-400 text-lg" />
                                )}
                            </div>
                        </div>

                        {/* Verification Feedback */}
                        <div className="h-6">
                            {verifying ? (
                                <p className="text-sm text-indigo-600 font-medium animate-pulse flex items-center gap-2">
                                    Verifying account...
                                </p>
                            ) : isAccountVerified ? (
                                <p className="text-sm text-green-600 font-medium flex items-center gap-2 animate-fade-in-up">
                                    <FaCheck /> Verified: {recipientName}
                                </p>
                            ) : accountNumber.length >= 10 && !isAccountVerified ? (
                                <p className="text-sm text-red-500 flex items-center gap-2 animate-fade-in-up">
                                    <FaExclamationCircle /> Account not found
                                </p>
                            ) : (
                                <p className="text-xs text-gray-500">Enter your wallet account number to verify.</p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !isAccountVerified}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg
                            ${loading || !isAccountVerified
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-500/30 hover:-translate-y-0.5'
                            }`}
                    >
                        {loading ? 'Processing Application...' : 'Submit Application'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default LoanApplication;
