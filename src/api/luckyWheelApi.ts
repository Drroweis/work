import apiClient from './apiClient';

export const login = async (username: string, password: string) => {
  try {
    // Simulating a successful login for demonstration purposes
    console.log('Login attempt:', { username, password });
    localStorage.setItem('token', 'fake-jwt-token');
    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const register = async (username: string, password: string) => {
  try {
    // Simulating a successful registration for demonstration purposes
    console.log('Registration attempt:', { username, password });
    localStorage.setItem('token', 'fake-jwt-token');
    return { success: true };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const resetPassword = async (email: string) => {
  try {
    // Simulating a password reset request for demonstration purposes
    console.log('Password reset request for:', email);
    return { success: true };
  } catch (error) {
    console.error('Password reset error:', error);
    throw error;
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const getLuckyWheelData = async () => {
  try {
    // Simulating API call for lucky wheel data
    return {
      prizes: [
        { name: '100 Coins', color: 'bg-yellow-500', icon: '💰' },
        { name: '200 Coins', color: 'bg-green-500', icon: '💎' },
        { name: '500 Coins', color: 'bg-blue-500', icon: '🏆' },
        { name: '1000 Coins', color: 'bg-purple-500', icon: '🎉' },
        { name: '2000 Coins', color: 'bg-red-500', icon: '🚀' },
        { name: '5000 Coins', color: 'bg-indigo-500', icon: '🌟' },
      ]
    };
  } catch (error) {
    console.error('Error fetching lucky wheel data:', error);
    throw error;
  }
};

export const spinWheel = async () => {
  try {
    // Simulating a wheel spin result
    const prizes = ['100', '200', '500', '1000', '2000', '5000'];
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
    return { amount: randomPrize };
  } catch (error) {
    console.error('Error spinning wheel:', error);
    throw error;
  }
};

export const getUserBalance = async () => {
  try {
    // Simulating user balance fetch
    return { balance: 10000 };
  } catch (error) {
    console.error('Error fetching user balance:', error);
    throw error;
  }
};

export const getLastWinner = async () => {
  try {
    // Simulating last winner data fetch
    return { winner: 'LuckyUser123', amount: '5000 Coins' };
  } catch (error) {
    console.error('Error fetching last winner:', error);
    throw error;
  }
};

export const getLeaderboard = async () => {
  try {
    // Simulating leaderboard data fetch
    return [
      { username: 'TopPlayer1', score: 50000 },
      { username: 'LuckyGamer', score: 45000 },
      { username: 'WheelMaster', score: 40000 },
      { username: 'CoinCollector', score: 35000 },
      { username: 'FortuneSeeker', score: 30000 },
    ];
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
};