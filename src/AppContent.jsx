import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Activity from './pages/Activity/Activity';
import Home from './pages/Home/Home';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import Login from './pages/Login/Login';
import Settings from './pages/Settings/Settings';
import Signup from './pages/Signup/Signup';
import Teams from './pages/Teams/Teams';
import TestPage from './pages/TestPage/TestPage';
import Error404 from './pages/Error404/Error404';
import ResponsiveAppBar from './components/ResponsiveAppBar/ResponsiveAppBar';
import Footer from './components/Footer/Footer';

function AppContent() {
  const location = useLocation();

  // paths where the AppBar and Footer should not be displayed
  const hideAppBarAndFooter = ['/login', '/signup'];

  // Check if it's a wildcard route to show Error404
  const isErrorPage = location.pathname !== '/' && !hideAppBarAndFooter.includes(location.pathname) && location.pathname !== '/settings' && location.pathname !== '/teams' && location.pathname !== '/activity' && location.pathname !== '/settings' && location.pathname !== '/leaderboard';

  return (
    <div>
      {/* Conditionally render AppBar */}
      {!hideAppBarAndFooter.includes(location.pathname) && !isErrorPage && <ResponsiveAppBar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="*" element={<Error404 />} />
      </Routes>

        {/* and Footer based on the current route */}
      {!hideAppBarAndFooter.includes(location.pathname) && !isErrorPage && <Footer />}
    </div>
  );
}

export default AppContent;
