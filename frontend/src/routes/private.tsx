import { Route } from 'react-router-dom'; // {{ edit_1 }}
import ProfilePage from '../pages/profile';
// import HomePage from '../pages/home';

export default function PrivateRoutes() {
  return (
    <>
      <Route path="/profile" component={ProfilePage} /> 
    </>
  )
}
