import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import OAuthCatch from './pages/OAuthCatch';
import ProfilePage from './pages/ProfilePage';
import UsersPage from './pages/UsersPage';
import Protected from './components/Protected';
import Home from './pages/Home';
import Listings from './pages/Listings';
import Contacts from './pages/Contacts';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


export default function App() {
  return (
    <div className="relative min-h-screen transition-colors">
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/oauth" element={<OAuthCatch />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route element={<Protected />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/users" element={<UsersPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}
