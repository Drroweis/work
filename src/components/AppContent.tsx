import React, { useState, useEffect } from 'react';
import LuckyWheel from './LuckyWheel';
import Header from './Header';
import Footer from './Footer';
import WinModal from './WinModal';
import Leaderboard from './Leaderboard';
import AuthForm from './AuthForm';
import { useAuth } from '../contexts/AuthContext';
import {
  getLuckyWheelData,
  spinWheel,
  getUserBalance,
  getLastWinner,
  getLeaderboard,
} from '../api/luckyWheelApi';

const AppContent: React.FC = () => {
  const { isLoggedIn, login, logout, register, resetPassword } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState(0);
  const [lastWinner, setLastWinner] = useState('');
  const [lastWinAmount, setLastWinAmount] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [winAmount, setWinAmount] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [prizes, setPrizes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      fetchInitialData();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      const [balanceData, lastWinnerData, leaderboardData, wheelData] = await Promise.all([
        getUserBalance(),
        getLastWinner(),
        getLeaderboard(),
        getLuckyWheelData(),
      ]);

      setBalance(balanceData.balance);
      setLastWinner(lastWinnerData.winner);
      setLastWinAmount(lastWinnerData.amount);
      setLeaderboard(leaderboardData);
      setPrizes(wheelData.prizes);
    } catch (error) {
      setError('Failed to load initial data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpin = async () => {
    setIsSpinning(true);
    try {
      const result = await spinWheel();
      setWinAmount(result.amount);
      setShowWinModal(true);
      setBalance((prevBalance) => prevBalance + parseFloat(result.amount));
    } catch (error) {
      setError('Failed to spin the wheel. Please try again.');
    } finally {
      setIsSpinning(false);
    }
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      await login(username, password);
      fetchInitialData();
    } catch (error) {
      throw new Error('Login failed. Please check your credentials and try again.');
    }
  };

  const handleRegister = async (username: string, password: string) => {
    try {
      await register(username, password);
      fetchInitialData();
    } catch (error) {
      throw new Error('Registration failed. Please try again.');
    }
  };

  const handleResetPassword = async (email: string) => {
    try {
      await resetPassword(email);
      setError('Password reset email sent. Please check your inbox.');
    } catch (error) {
      throw new Error('Password reset failed. Please try again.');
    }
  };

  if (!isLoggedIn) {
    return (
      <AuthForm
        onLogin={handleLogin}
        onRegister={handleRegister}
        onForgotPassword={handleResetPassword}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-2xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header balance={balance} lastWinner={lastWinner} lastWinAmount={lastWinAmount} onLogout={logout} />
      <main className="container mx-auto px-4 py-8">
        <LuckyWheel onSpin={handleSpin} prizes={prizes} isSpinning={isSpinning} />
        <Leaderboard leaderboard={leaderboard} />
      </main>
      <Footer />
      {showWinModal && (
        <WinModal winAmount={winAmount} onClose={() => setShowWinModal(false)} />
      )}
      {error && (
        <div className="fixed bottom-4 left-4 right-4 bg-red-500 text-white p-4 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default AppContent;