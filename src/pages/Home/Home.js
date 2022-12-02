import React from 'react';
import Navbar from '../../components/Navbar';
import Dashboard from './Dashboard';
import './Home.css';


function Home() {
  return (
    <div>
      <Navbar/>
      <div className='home'>
        <div className='img'>
        <img 
      src="https://www.linkpicture.com/q/25560318_7053342_1.jpg"  style={{ width: 750, height: 500 }}
      alt="new"
      />
        </div>
        <div>
        <Dashboard/>
        </div>
      
      </div>
      
    </div>
  );
}

export default Home;
