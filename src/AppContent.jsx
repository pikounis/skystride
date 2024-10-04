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
import Landing from './pages/Landing/Landing';

// Import the PrivateRoute component
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function AppContent() {
  const location = useLocation();

  // Paths where the AppBar and Footer should not be displayed
  const hideAppBarAndFooter = ['/login', '/signup'];

  // Check if it's a wildcard route to show Error404
  const isErrorPage =
    location.pathname !== '/' &&
    !hideAppBarAndFooter.includes(location.pathname) &&
    ![
      '/settings',
      '/teams',
      '/activity',
      '/leaderboard',
      '/test',
    ].includes(location.pathname);

  return (
    <div>
      {/* Conditionally render AppBar */}
      {!hideAppBarAndFooter.includes(location.pathname) && !isErrorPage && <ResponsiveAppBar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/landing" element={<Landing />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/activity"
          element={
            <PrivateRoute>
              <Activity />
            </PrivateRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <PrivateRoute>
              <Leaderboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route
          path="/teams"
          element={
            <PrivateRoute>
              <Teams />
            </PrivateRoute>
          }
        />
        <Route
          path="/test"
          element={
            <PrivateRoute>
              <TestPage />
            </PrivateRoute>
          }
        />

        {/* Catch-all route for 404 errors */}
        <Route path="*" element={<Error404 />} />
      </Routes>

      {/* Conditionally render Footer */}
      {!hideAppBarAndFooter.includes(location.pathname) && !isErrorPage && <Footer />}
    </div>
  );
}

export default AppContent;
