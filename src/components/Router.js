import React from 'react';
import { Routes ,Route  ,  Switch} from 'react-router-dom';
  import Home from './Home';
  import App from './App';

function Router(props) {
    return (
        <div>
         <Switch>
          <Route exact path="/" component = {Home}/>
            {/* <Home /> */}
          {/* </Route> */}
          <Route  path="/App" component = {App} />
            {/* <App />
          </Route> */}
          
        </Switch>
        </div>
    );
}

export default Router;