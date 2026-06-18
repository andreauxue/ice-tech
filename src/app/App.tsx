import { BrowserRouter, Routes, Route } from 'react-router';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Skaters } from './pages/Skaters';
import { SkaterProfile } from './pages/SkaterProfile';
import { NewSkater } from './pages/NewSkater';
import { QRCodes } from './pages/QRCodes';
import { Settings } from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/skaters" element={<Skaters />} />
          <Route path="/skaters/new" element={<NewSkater />} />
          <Route path="/skaters/:id" element={<SkaterProfile />} />
          <Route path="/skates" element={<Dashboard />} />
          <Route path="/qr-codes" element={<QRCodes />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}