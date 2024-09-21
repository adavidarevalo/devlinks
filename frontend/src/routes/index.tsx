import { BrowserRouter as Router, Switch } from 'react-router-dom'; // {{ edit_1 }}
import PublicRoutes from './public';
import PrivateRoutes from './private';

export default function MainRoutes() {
    return (
        <Router>
          <Switch>
            <PublicRoutes/>
            <PrivateRoutes/> 
          </Switch>
        </Router>
      )
}
