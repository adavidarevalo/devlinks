import { Route } from 'react-router-dom';
import ProfilePage from '../pages/profile';
// import HomePage from '../pages/home';

export default function PrivateRoutes() {
  return (
      <Route path="/profile" element={<ProfilePage />} /> 
  )
}
