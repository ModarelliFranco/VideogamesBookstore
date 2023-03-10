import './App.css';
import { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import GameDetail from './components/GameDetail/GameDetail'
import GameCreateForm from './components/GameCreate/GameCreateForm';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';
// axios.defaults.baseURL = 'https://videogamesbookstoreback-production.up.railway.app/';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage}/>
      <Route path='/home' component={Home}/>
      <Route path='/gamecreate' component={GameCreateForm}/>
      <Route exact path='/videogames/:id' component={GameDetail} />
    </div>
    
  );
}

export default App;


//Route abraza al componente que quiero renderizar en dicha ruta