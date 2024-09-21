import { BrowserRouter as Router, Routes } from 'react-router-dom';
import PublicRoutes from './public';
import PrivateRoutes from './private';

export default function MainRoutes() {
    return (
        <Router>
          <Routes>
            <PrivateRoutes/> 
            <PublicRoutes/>
          </Routes>
        </Router>
      )
}
