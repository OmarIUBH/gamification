/**
 * App — Root Application Component
 * 
 * Sets up React Router with all page routes.
 * Wraps the authenticated pages in the GameProvider context
 * and Layout shell. The landing page is outside the layout.
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import Layout from './components/Layout';

// Pages
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ActivitiesPage from './pages/ActivitiesPage';
import QuizPage from './pages/QuizPage';
import AchievementsPage from './pages/AchievementsPage';
import MissionsPage from './pages/MissionsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import AnalyticsDashboard from './pages/AnalyticsDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <Routes>
          {/* Public landing page (no sidebar) */}
          <Route path="/" element={<LandingPage />} />

          {/* Authenticated pages with sidebar layout */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/quiz/:activityId" element={<QuizPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/missions" element={<MissionsPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </GameProvider>
    </BrowserRouter>
  );
}
