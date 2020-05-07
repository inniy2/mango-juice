import React from 'react';
//import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/login';
import Ghost from './pages/ghost';
import MyPage from './pages/myPage';
//import Ghost2 from './pages/ghost2';
import Nav from './pages/Nav';
import NavMate from './pages/NavMate';
import Footer from './pages/footer';



const App = () => {

  return (
    <Router>
      <div className="App">
        <NavMate/>
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path="/login" component={Login}/>
          <Route path="/ghost" exact component={Ghost}/>
          <Route path="/mypage" exact component={MyPage}/>
          { 
            //<Route path="/ghost2" exact component={() => <Ghost2 title={'mimimi'}/>}/> 
          }
        </Switch>
        <Footer/>
      </div>
    </Router>

  );
}

export default App;
