import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Verification from './pages/Verification';
import Wallet from './pages/Wallet';
import LoanApplication from './pages/LoanApplication';
import Home from './pages/Home';
import Footer from './components/Footer';
import GenericPage from './pages/GenericPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
          <Toaster position="top-right" />
          <Navbar />
          <main className="container mx-auto px-4 pt-24 pb-8 min-h-[calc(100vh-320px)]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/onboarding" element={<Onboarding />} />

              {/* Public Static Pages */}
              <Route path="/about" element={<GenericPage title="About Us" content="Learn more about our mission to democratize finance." />} />
              <Route path="/services" element={<GenericPage title="Our Services" content="Explore our range of loans and wallet features." />} />
              <Route path="/help" element={<GenericPage title="Help Center" content="Find answers to common questions and get support." />} />
              <Route path="/contact" element={<GenericPage title="Contact Us" content="Get in touch with our team for assistance." />} />
              <Route path="/terms" element={<GenericPage title="Terms of Service" content="Read our terms and conditions carefully." />} />
              <Route path="/privacy" element={<GenericPage title="Privacy Policy" content="We utilize your data to verify your identity and prevent fraud." />} />

              {/* Protected Routes */}
              <Route path="/verify" element={
                <ProtectedRoute>
                  <Verification />
                </ProtectedRoute>
              } />
              <Route path="/wallet" element={
                <ProtectedRoute>
                  <Wallet />
                </ProtectedRoute>
              } />
              <Route path="/apply-loan" element={
                <ProtectedRoute>
                  <LoanApplication />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
