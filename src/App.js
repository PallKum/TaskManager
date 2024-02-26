import Login from './User/Login';
import Signup from './User/Signup';
import { Provider } from 'react-redux';
import store from './Authentication/store';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Home from './Home/Home';
import './App.css';

function App() {
  return (
    <Provider store={store}>
    <Router>
    <div>
      <Routes>
        <Route exact path='/' Component={Login}/>
        <Route path='/home' Component={Home}/>
        <Route path='/signup' Component={Signup}/>
      </Routes>
    </div>
    </Router>
    </Provider>
  );
}

export default App;
