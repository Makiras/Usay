import React from "react";
import {
  Routes,
  Route,
  Link as RouterLink,
  useLocation,
} from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Link } from '@mui/material';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import HelpTwoToneIcon from '@mui/icons-material/HelpTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import moment from 'moment';

import './App.css';
import Home from './pages/home';
import About from './pages/about';
import Verify from './pages/verify';
import Sign from './pages/sign';

function App() {
  const [value, setValue] = React.useState('Recents');

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <div style={{ height: '40px' }}></div>
      <div className="navigator" style={{ position: 'fixed', bottom: 0, width: '100%', textAlign: 'center', display: useLocation().pathname === '/' ? 'none' : '' }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction value="sign" label="Sign" component={RouterLink} to="/sign" icon={<AccountCircleTwoToneIcon />} />
          <BottomNavigationAction value="verify" label="Verify" component={RouterLink} to="/verify" icon={<HelpTwoToneIcon />} />
          <BottomNavigationAction value="about" label="About" component={RouterLink} to="/about" icon={<InfoTwoToneIcon />} />
        </BottomNavigation>
        <div style={{ height: '10px', backgroundColor: "white"}}></div>
      </div>
      <div style={{
        position: 'fixed', bottom: 2, width: '100%', textAlign: 'center',
        opacity: useLocation().pathname === '/' ? 0.6 : 0.2,
        fontSize: '12px',
        color: '#9E9E9E',
      }} >
        ©2022-{moment().format("YYYY")} <Link color="#9E9E9E" underline="none" href="https://github.com/Makiras">@Makiras</Link>
      </div>
    </div>
  );
}

export default App;