import './App.css';
import {Route} from 'react-router-dom'
// import Nav from './components/nav/Nav';
import Home from './components/home/Home';
import CreateDog from './components/createDog/CreateDog';
import Landing from './components/landing/Landing';
import Detail from './components/detail/Detail';
function App() {
  return (
    <div className='app'>
      <Route exact path="/" component={Landing}/>
      {/* <Route path='/dogs' component={Nav}/> */}
      <Route  path="/home" component={Home} />
      <Route  path="/detail/:id" component={Detail} />
      <Route path="/createDog" component={CreateDog}/>
    </div>
  );
}

export default App;
