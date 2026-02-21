import { BrowserRouter 
 as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { VehicleRegistryPage } from './pages/VehicleRegistryPage';
import { TripDispatcherPage } from './pages/TripDispatcherPage';
import { AppLayout } from './components/layout/AppLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<AuthPage />} />
        
        {/* Protected Routes Wrapper (Mock) */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/vehicles" element={<VehicleRegistryPage />} />
          <Route path="/trips" element={<TripDispatcherPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
