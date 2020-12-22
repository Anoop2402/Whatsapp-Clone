import {React,useState } from 'react';
import Sidebar from './Components/Sidebar/Sidebar'
import './App.css';
import Chat from "./Components/Chat/Chat";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './Components/Login/Login';
import { useStateValue } from './StateProvider';
import { useMediaQuery } from 'react-responsive'
import { slide as Menu } from 'react-burger-menu';
 


function App() {
  var styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
      left: '20px',
      top: '20px'
    },
    bmBurgerBars: {
      background: '#373a47'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '30px',
      width: '30px'
    },
    bmCross: {
      background: 'black'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%'
    },
    bmMenu: {
      background: 'white',
     
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    bmItem: {
      display: 'inline-block'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })
  const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)'
  })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })
 

 const [{user}, dispatch] = useStateValue();
  
  

  return (
    <div className="App">
    {!user ? (
     
      <Login />
    ): (
     (isDesktopOrLaptop) ? (<div className="app__body">
<Router>
  
     
     <Sidebar />
    <Switch>
    

    <Route path="/rooms/:roomId">
     <Chat />
    </Route>

    <Route path="/">
     <Chat /> 
    </Route>
    
  </Switch>
</Router>

    

      </div>
):
(<div className="app__body">
<Router>


<Menu styles={styles} ><Sidebar /></Menu>
    <Switch>
    

    <Route path="/rooms/:roomId">
     <Chat />
    </Route>

    <Route path="/">
     <Chat /> 
    </Route>
    
  </Switch>
</Router>

    

      </div>)

    )}

    
    </div>
  );
}

export default App;
