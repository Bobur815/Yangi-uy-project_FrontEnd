import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
// import OAuthCatch from './pages/OAuthCatch';
import ProfilePage from './pages/ProfilePage';
import UsersPage from './pages/UsersPage';
import Protected from './components/home/Protected';
import Home from './pages/Home';
import Listings from './pages/Listings';
import Contacts from './pages/Contacts';
import MainLayout from './layouts/MainLayout';
import PlainLayout from './layouts/PLainLayout';
import RequireRole from './components/auth/RequireRole';
import ListingCreatePage from './pages/ListingCreatePage';
import OAuthCatch from './pages/OAuthCatch';
import MyProperties from './components/listing/MyProperties';
import ListingEditPage from './pages/ListingEditPage';
import ListingDetails from './pages/ListingDetail';


export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/:id" element={<ListingDetails />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route element={<Protected />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/listings/new" element={
            <RequireRole roles={['SELLER', 'AGENT']}>
              <ListingCreatePage />
            </RequireRole>
          }
          />
          <Route path="/my-properties" element={<MyProperties />} />
           <Route path="/listings/:id/edit" element={<ListingEditPage />} />
        </Route>

      </Route>


      <Route element={<PlainLayout />}>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/oauth" element={<OAuthCatch />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
