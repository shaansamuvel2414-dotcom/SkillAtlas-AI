import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { usePreferences } from './hooks/useLocalStorage';

import HomePage from './pages/HomePage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import SearchResultsPage from './pages/SearchResultsPage';
import ExplorePage from './pages/ExplorePage';
import RoadmapPage from './pages/RoadmapPage';
import PracticePage from './pages/PracticePage';
import SavedPage from './pages/SavedPage';
import ProgressPage from './pages/ProgressPage';
import AITutorPage from './pages/AITutorPage';
import SettingsPage from './pages/SettingsPage';

function AppRoutes() {
  const { onboardingDone } = usePreferences();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/onboarding"
        element={<OnboardingPage />}
      />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/roadmap" element={<RoadmapPage />} />
      <Route path="/practice" element={<PracticePage />} />
      <Route path="/saved" element={<SavedPage />} />
      <Route path="/progress" element={<ProgressPage />} />
      <Route path="/ai-tutor" element={<AITutorPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
